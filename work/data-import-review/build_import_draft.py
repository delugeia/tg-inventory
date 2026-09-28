"""One-off, read-only source extraction into draft CSVs. Not application code.

Run from repository root with the bundled Python. Only generated files in the
manifest are overwritten. Workbook sources and review notes are never written.
"""
from __future__ import annotations
import collections, csv, datetime as dt, hashlib, json, pathlib, re, warnings, zipfile
import xml.etree.ElementTree as ET
from decimal import Decimal, InvalidOperation
import openpyxl
from openpyxl.utils import range_boundaries, get_column_letter

warnings.filterwarnings('ignore', category=UserWarning, module='openpyxl')
ROOT=pathlib.Path.cwd()
SRC=ROOT/'_data/current-inventory'
OUT=ROOT/'_data/data-for-import'
PRIVATE=ROOT/'_secrets/data-import-review'
OUT.mkdir(parents=True,exist_ok=True)
PRIVATE.mkdir(parents=True,exist_ok=True)
RUN_DATE='2026-09-28'
NS={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
FILES={'main':'main-inventory.xlsx','shipping':'shipping-materials.xlsx','games':'games.xlsx'}
EXPECTED_HASHES={'main':'31d1376ef4591f281e53a5164fd4e7e3d97c3d446cd11f87ab1e1f34d4a5af34','shipping':'9654a6d17b604406d4e9b1d14b3ee6287b3819599b4a3da01584b7708884c998','games':'420eb47d4708288a4c8a0d67e1b692223305eeb0ee6f3e3e57570a3e0dcabe1c'}
for key,filename in FILES.items():
    if hashlib.sha256((SRC/filename).read_bytes()).hexdigest()!=EXPECTED_HASHES[key]:
        raise RuntimeError(f'{filename} changed: review table ranges and mappings before rebuilding this snapshot.')
F={k:openpyxl.load_workbook(SRC/n,data_only=False) for k,n in FILES.items()}
V={k:openpyxl.load_workbook(SRC/n,data_only=True) for k,n in FILES.items()}
DATA={}; HEADERS={}; PURPOSE={}; SECRET_RECORDS=[]; CHECKS=[]; ISSUES=[]

def ident(prefix,*parts):
    return prefix+'-'+hashlib.sha256(json.dumps(parts,ensure_ascii=False,default=str).encode()).hexdigest()[:16]
def num(x):
    if x is None or x=='' or isinstance(x,bool): return None
    try: return Decimal(str(x)) if Decimal(str(x)).is_finite() else None
    except (InvalidOperation,ValueError): return None
def st(x):
    if x is None:return ''
    if isinstance(x,dt.datetime):return x.isoformat(timespec='seconds')
    if isinstance(x,dt.date):return x.isoformat()
    if isinstance(x,Decimal):return format(x,'f')
    return str(x)
def js(x):return json.dumps(x,ensure_ascii=False,default=st,separators=(',',':'))
def get(k,s,r,c):return V[k][s].cell(r,c).value
def rid(k,s,r):return f'{k}:{s}:{r}'
def add(file,headers,rows,purpose):
    HEADERS[file]=headers.split(',') if isinstance(headers,str) else headers
    DATA[file]=rows; PURPOSE[file]=purpose
def issue(code,source_row='',item_id='',detail='',severity='review'):
    ISSUES.append({'issue_id':ident('ISS',code,source_row,item_id,detail),'code':code,'severity':severity,'source_row_id':source_row,'item_id':item_id,'detail':detail,'resolution':'','status':'open'})
def check(name,actual,expected,tolerance=Decimal(0)):
    ok=abs(actual-expected)<=tolerance if isinstance(actual,(int,float,Decimal)) and isinstance(expected,(int,float,Decimal)) else actual==expected
    CHECKS.append({'check':name,'actual':st(actual),'expected':st(expected),'result':'pass' if ok else 'review','tolerance':st(tolerance)})
    return ok

# Restricted source labels and embedded access details stay only in _secrets.
# Detect from the source itself, without embedding identities/codes in this script.
people=[]
for sn in ['Ames','Indy','Boston','Milwaukee']:
    label=st(get('main',sn,1,1)); name=re.sub(r'\s+Inventory$','',label,flags=re.I)
    people += [name]+name.split()
people += [st(get('shipping','Shipping',1,10))]
people=sorted({x for x in people if len(x)>2},key=len,reverse=True)
personal=re.compile(r'\b(?:'+ '|'.join(re.escape(x) for x in people)+r')\b',re.I)
codepattern=re.compile(r'(Combination\s+)\d+(\s+Lock)',re.I)
def safe(value,source_ref=''):
    if not isinstance(value,str):return value
    cleaned=personal.sub('[source person]',value)
    cleaned=codepattern.sub(r'\1[withheld]\2',cleaned)
    if cleaned!=value:
        SECRET_RECORDS.append({'source_ref':source_ref,'original':value,'sanitized':cleaned})
    return cleaned

sources=[]; sheets=[]; cells=[]; rows=[]; media=[]; tablemeta=[]
for k,name in FILES.items():
    p=SRC/name
    sources.append({'source_id':k,'filename':name,'source_kind':'workbook','source_uri':'','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'bytes':p.stat().st_size,'extracted_on':RUN_DATE,'source_as_of':'','note':'Original unchanged; extraction date is not inventory date.'})
    with zipfile.ZipFile(p) as z:
        for entry in z.namelist():
            if entry.startswith('xl/media/'):
                b=z.read(entry); media.append({'source_id':k,'zip_path':entry,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'disposition':'retained_in_original_workbook'})
        book=ET.fromstring(z.read('xl/workbook.xml'))
        rels=ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        paths={e.attrib['Id']:e.attrib['Target'] for e in rels}
        sheetpaths={e.attrib['name']:paths[e.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']] for e in book.find('s:sheets',NS)}
        for si,s in enumerate(F[k],1):
            path=sheetpaths[s.title]; path=path.lstrip('/') if path.startswith('/') else 'xl/'+path
            xml=ET.fromstring(z.read(path)); raw={e.attrib['r']:e for e in xml.findall('.//s:sheetData/s:row/s:c',NS)}
            used=[c for row in s for c in row if c.value is not None]
            formulas=[c for c in used if c.data_type=='f']
            sheets.append({'source_id':k,'sheet':s.title,'sheet_index':si,'sheet_state':s.sheet_state,'max_row':s.max_row,'max_column':s.max_column,'nonempty_cells':len(used),'formula_cells':len(formulas),'cached_errors':sum(V[k][s.title][c.coordinate].data_type=='e' for c in used),'merged_ranges':js([str(x) for x in s.merged_cells.ranges]),'note':'Large dimensions may be formatting only; all nonempty cells extracted.'})
            for t in s.tables.values():
                tablemeta.append({'source_id':k,'sheet':s.title,'table':t.name,'range':t.ref,'header_rows':t.headerRowCount,'totals_rows':t.totalsRowCount,'columns_json':js([safe(c.name,f'{k}:{s.title}:{t.ref}') for c in t.tableColumns])})
            occupied=collections.defaultdict(list)
            for c in used:
                val=V[k][s.title][c.coordinate]; e=raw.get(c.coordinate); ve=e.find('s:v',NS) if e is not None else None
                form=c.data_type=='f'; rawtype=e.attrib.get('t','n') if e is not None else ''
                cache=('not_formula' if not form else 'error' if val.data_type=='e' else 'value' if val.value is not None else 'empty_string' if rawtype=='str' and ve is not None else 'missing')
                ref=f'{k}:{s.title}:{c.coordinate}'
                cells.append({'source_row_id':rid(k,s.title,c.row),'cell':c.coordinate,'column':c.column,'excel_type':c.data_type,'number_format':c.number_format,'value_json':js(safe(c.value,ref)),'cached_value_json':js(safe(val.value,ref)),'formula_json':js(safe(c.value,ref)) if form else '', 'cache_state':cache,'raw_xml_type':rawtype,'raw_cached_value':ve.text if ve is not None and ve.text else '', 'hyperlink':safe(c.hyperlink.target,ref) if c.hyperlink else '', 'hidden_row':bool(s.row_dimensions[c.row].hidden)})
                occupied[c.row].append(c)
                if val.data_type=='e':issue('source_formula_error',rid(k,s.title,c.row),detail=f'{c.coordinate}: {val.value}; retained as evidence, not imported as a numeric value.')
                if form and cache=='missing':issue('missing_formula_cache',rid(k,s.title,c.row),detail=c.coordinate)
            for r,cs in occupied.items():
                tabs=[t.name for t in s.tables.values() if range_boundaries(t.ref)[1]<=r<=range_boundaries(t.ref)[3]]
                rows.append({'source_row_id':rid(k,s.title,r),'source_id':k,'sheet':s.title,'row':r,'nonempty_cells':len(cs),'tables_json':js(tabs),'disposition':'source_evidence','note':''})

add('sources.csv','source_id,filename,source_kind,source_uri,sha256,bytes,extracted_on,source_as_of,note',sources,'Source fingerprint and provenance; three original workbooks plus one limited web observation input.')
add('source_sheets.csv','source_id,sheet,sheet_index,sheet_state,max_row,max_column,nonempty_cells,formula_cells,cached_errors,merged_ranges,note',sheets,'All 17 sheets, including lookups, scratch areas and OLD.')
add('source_tables.csv','source_id,sheet,table,range,header_rows,totals_rows,columns_json',tablemeta,'Original Excel table extents and headers.')
add('source_cells.csv','source_row_id,cell,column,excel_type,number_format,value_json,cached_value_json,formula_json,cache_state,raw_xml_type,raw_cached_value,hyperlink,hidden_row',cells,'Every nonempty source cell; values and formulas are JSON-encoded text, never executable formulas. Restricted labels are sanitized.')
add('source_rows.csv','source_row_id,source_id,sheet,row,nonempty_cells,tables_json,disposition,note',rows,'One row for every occupied worksheet row. Join source_cells to recover complete row contents.')
add('source_media.csv','source_id,zip_path,bytes,sha256,disposition',media,'Embedded media retained in untouched XLSX, not treated as inventory.')

categories=[{'category_id':'CAT-MAIN','name':'Legacy inventory','mapping_state':'agent_suggestion'}, {'category_id':'CAT-SHIP','name':'Shipping materials','mapping_state':'agent_suggestion'}, {'category_id':'CAT-GAMES','name':'Donated games','mapping_state':'agent_suggestion'}]
collections_out=[]; items=[]; item_sources=[]; aliases=[]; packages=[]; values=[]
mainmap={}; shipmap={}; gamemap={}; item_index={}; headings={}; duplicate_catalog=collections.defaultdict(list)
for r in range(2,160):
    code=st(get('main','Catalog',r,3)); suffix=st(get('main','Catalog',r,4))
    if suffix=='AAAA':headings[code]=st(get('main','Catalog',r,1))
for code in sorted({st(get('main','Catalog',r,3)) for r in range(2,160)}):
    collections_out.append({'collection_id':'COL-'+code,'category_id':'CAT-MAIN','name':headings.get(code,'Legacy prefix '+code),'proposed_sku_prefix':code+'_','source_prefix':code,'mapping_state':'agent_suggestion','note':'Legacy CatID proposed as Collection; missing heading retained explicitly.' if code not in headings else 'Heading rows are not items.'})
def newitem(i,collection,name,sku,source,kind):
    obj={'item_id':i,'collection_id':collection,'name':safe(name,source),'legacy_sku':sku,'proposed_sku':sku,'sku_state':'legacy_preserved' if sku else 'needs_assignment','base_unit':'each','item_kind':kind,'active_state':'unspecified','unit_cost':'','irs_fmv':'','in_person_ask':'','online_ask':'','source_row_id':source,'review_state':'draft'}
    items.append(obj);item_index[i]=obj
def linkitem(i,s,role):item_sources.append({'item_id':i,'source_row_id':s,'role':role})
def alias(i,system,value,s,state='source_exact'):
    aliases.append({'identifier_id':ident('ID',i,system,value,s),'item_id':i,'system':system,'identifier':value,'source_row_id':s,'mapping_state':state})
def valuation(i,typ,amount,s,method='',date='',unit='USD',status='evidence_only'):
    values.append({'value_id':ident('VAL',i,typ,s),'item_id':i,'value_type':typ,'amount':num(amount),'currency_or_unit':unit,'as_of':date,'source_row_id':s,'method':method,'review_state':status})
for r in range(2,160):
    sr=rid('main','Catalog',r); code=st(get('main','Catalog',r,3)); suffix=st(get('main','Catalog',r,4)); sku=st(get('main','Catalog',r,5))
    check('catalog identifier '+str(r),sku,code+'_'+suffix)
    if suffix=='AAAA':continue
    i='ITEM-MAIN-'+sku; mainmap[sku]=i; duplicate_catalog[sku].append(r)
    if i not in item_index:newitem(i,'COL-'+code,get('main','Catalog',r,1),sku,sr,'legacy_unspecified')
    linkitem(i,sr,'catalog');alias(i,'legacy_prod_id',sku,sr)
    packages.append({'package_id':ident('PACK',sr),'item_id':i,'package_type':'legacy_request_pack','quantity_each':num(get('main','Catalog',r,6)),'raw_quantity_json':js(get('main','Catalog',r,6)),'source_row_id':sr,'review_state':'confirm_pack_meaning','note':'Convenience only; does not enforce multiples or convert existing stock totals.'})
for sku,rs in duplicate_catalog.items():
    if len(rs)>1:issue('duplicate_catalog_identifier',rid('main','Catalog',rs[0]),mainmap[sku],f'Catalog rows {rs}; single draft item, preserve both source links; confirm intended identity.')
for cat in sorted({st(get('shipping','Shipping',r,2)) for r in range(2,33)}):
    collections_out.append({'collection_id':ident('COL-SHIP',cat),'category_id':'CAT-SHIP','name':cat,'proposed_sku_prefix':'','source_prefix':'','mapping_state':'agent_suggestion','note':'Supplier model is a separate identifier; final internal SKU prefix remains undecided.'})
for r in range(2,33):
    sr=rid('shipping','Shipping',r); model=st(get('shipping','Shipping',r,5)); i=ident('ITEM-SHIP',model);shipmap[model]=i
    newitem(i,ident('COL-SHIP',st(get('shipping','Shipping',r,2))),st(get('shipping','Shipping',r,2))+' '+st(get('shipping','Shipping',r,4))+' ['+model+']','',sr,'shipping_material')
    linkitem(i,sr,'catalog');alias(i,'supplier_model' if model.startswith('S-') else 'legacy_shipping_model',model,sr)
    for col,typ in [(24,'legacy_each_cost'),(25,'legacy_value_per_unit'),(26,'legacy_extended_stock_value')]:valuation(i,typ,get('shipping','Shipping',r,col),sr,'source literal or cached formula')
collections_out.append({'collection_id':'COL-GAMES','category_id':'CAT-GAMES','name':'Donated games','proposed_sku_prefix':'','source_prefix':'','mapping_state':'agent_suggestion','note':'Source provides no SKU; retain stable import item IDs and assign internal SKUs during review.'})
for r in range(2,28):
    sr=rid('games','Inventory',r); title=st(get('games','Inventory',r,2)); donor=st(get('games','Inventory',r,3));i=ident('ITEM-GAME',title,donor);gamemap[r]=i
    newitem(i,'COL-GAMES',title,'',sr,'donated_game');linkitem(i,sr,'catalog')
    item_index[i]['irs_fmv']=num(get('games','Inventory',r,5))
    valuation(i,'msrp',get('games','Inventory',r,5),sr,'source MSRP; user uses MSRP for insurance and IRS value',st(get('games','Inventory',r,1))[:10],status='user_described_basis')
    valuation(i,'legacy_extended_msrp_value',get('games','Inventory',r,6),sr,'source available × MSRP',st(get('games','Inventory',r,1))[:10])

add('categories.csv','category_id,name,mapping_state',categories,'Three proposed broad Categories, not approved classifications.')
add('collections.csv','collection_id,category_id,name,proposed_sku_prefix,source_prefix,mapping_state,note',collections_out,'Legacy prefix groups and shipping types proposed as Collections.')
add('items.csv','item_id,collection_id,name,legacy_sku,proposed_sku,sku_state,base_unit,item_kind,active_state,unit_cost,irs_fmv,in_person_ask,online_ask,source_row_id,review_state',items,'Deduplicated draft catalog. Games IRS FMV follows source MSRP per user-described practice; other unknown monetary fields remain blank; valuation evidence is separate.')
add('item_sources.csv','item_id,source_row_id,role',item_sources,'Many source rows may describe one item; retain all provenance.')
add('identifiers.csv','identifier_id,item_id,system,identifier,source_row_id,mapping_state',aliases,'Legacy identifiers remain text and distinct from proposed internal SKUs.')
add('packaging.csv','package_id,item_id,package_type,quantity_each,raw_quantity_json,source_row_id,review_state,note',packages,'Legacy pack counts, not inventory multipliers or mandatory order multiples.')

# Capture quantities as observations first. No record is approved for production.
locnames={'Central':'Central','Ames':'Ames IA','Indy':'Indianapolis IN','Boston':'Boston MA','Milwaukee':'Milwaukee WI'}
locations=[{'location_id':'LOC-'+sn.upper(),'source_label':sn,'proposed_name':name,'mapping_state':'name_alias_candidate','kind':'storage','note':'No manager/permission assignment imported.'} for sn,name in locnames.items()]
for key,label,note in [('SHIP-STOR','Shipping column I','Storage label needs mapping; do not assume Central.'),('SHIP-HOLDER','Shipping column J','Person-labelled column; do not infer person or location mapping.'),('SHIP-OR','Shipping column H (OR)','Meaning unknown; negative entries present; excluded from source Total.'),('GAME-UNASSIGNED','Games Avail','No location column.'),('MAIN-OTHER','Inventory Other','No nonblank source quantities; not a real location yet.')]:
    locations.append({'location_id':'LOC-'+key,'source_label':label,'proposed_name':'','mapping_state':'unresolved','kind':'source_bucket','note':note})
quantity=[]; openings=[]; duplicates=[]
def observe(k,s,r,col,item,loc,role,asof='',basis='',eligible=False,reason=''):
    val=get(k,s,r,col); n=num(val); obs=ident('QTY',k,s,r,col,role); sr=rid(k,s,r)
    quantity.append({'observation_id':obs,'item_id':item,'location_id':loc,'quantity':n,'raw_value_json':js(safe(val,sr)),'as_of':asof,'source_row_id':sr,'source_cell':get_column_letter(col)+str(r),'role':role,'basis':basis,'opening_candidate':bool(eligible and n is not None),'exclusion_reason':reason})
    if eligible and n is not None:
        openings.append({'opening_id':ident('OPEN',item,loc),'item_id':item,'location_id':loc,'quantity_each':n,'observed_as_of':asof,'observation_id':obs,'effective_posting_date':'','note':'starting inventory','review_state':'needs_count_confirmation','approved_for_production':False,'test_fixture_only':True})
    return obs
for sn,end,tc in [('Central',138,9),('Ames',146,9),('Indy',142,4),('Boston',128,4),('Milwaukee',130,4)]:
    ids=collections.defaultdict(list)
    for r in range(3,end+1):ids[st(get('main',sn,r,1))].append(r)
    asof=st(get('main',sn,2,11 if sn=='Ames' else 6))[:10] if sn in ['Ames','Indy','Milwaukee'] else ''
    for sku,rs in ids.items():
        if len(rs)>1:
            issue('duplicate_location_identifier',rid('main',sn,rs[0]),mainmap.get(sku,''),f'{sn} rows {rs}; excluded from opening candidates even if values agree.')
            duplicates.append({'source_id':'main','sheet':sn,'identifier':sku,'rows_json':js(rs),'values_json':js([get('main',sn,r,tc) for r in rs]),'disposition':'review_do_not_sum'})
        for r in rs:
            i=mainmap.get(sku,''); formula=F['main'][sn].cell(r,tc).data_type=='f'; n=num(get('main',sn,r,tc)); components=[get('main',sn,r,c) for c in range(4,9)] if tc==9 else []
            allblank=bool(components and all(x is None or x=='' for x in components))
            partial=bool(components and any((num(components[a]) is None)!=(num(components[b]) is None) for a,b in [(0,1),(2,3)]))
            reason='heading_or_unmapped_item' if not i else 'duplicate_item_location' if len(rs)>1 else 'blank_inputs_formula_zero' if formula and allblank else 'incomplete_pack_components' if formula and partial else 'missing_quantity' if n is None else ''
            if formula and components:
                calc=(num(components[0]) or Decimal(0))*(num(components[1]) or Decimal(0))+(num(components[2]) or Decimal(0))*(num(components[3]) or Decimal(0))+(num(components[4]) or Decimal(0))
                if n is not None and not check(f'{sn}!{get_column_letter(tc)}{r} arithmetic',calc,n):reason='formula_cache_disagreement';issue(reason,rid('main',sn,r),i)
            if i:linkitem(i,rid('main',sn,r),'location_observation')
            observe('main',sn,r,tc,i,'LOC-'+sn.upper(),'location_total',asof,'cached_pack_total' if formula else 'literal_count',not reason,reason)
            if components:
                for col in range(4,9):observe('main',sn,r,col,i,'LOC-'+sn.upper(),'count_component',asof,'Q1*C1 + Q2*C2 + IND',False,'components_not_additional_stock')
for r in range(3,161):
    sku=st(get('main','Inventory',r,2));i=mainmap.get(sku,'');sr=rid('main','Inventory',r)
    for c,loc in [(4,'CENTRAL'),(5,'AMES'),(6,'INDY'),(7,'BOSTON'),(8,'MILWAUKEE'),(9,'MAIN-OTHER'),(10,''),(11,'')]:observe('main','Inventory',r,c,i,'LOC-'+loc if loc else '','summary',basis='cached lookup or sum',reason='summary_not_additional_stock')
    if i:
        linkitem(i,sr,'inventory_summary')
        valuation(i,'legacy_latest_purchase_unit_cost',get('main','Inventory',r,12),sr,'last matching purchase row, default zero; not weighted average')
        valuation(i,'legacy_extended_inventory_value',get('main','Inventory',r,13),sr,'cached summary quantity × legacy cost')
    for c,role in [(14,'historical_purchased_total'),(15,'derived_distribution_residual')]:observe('main','Inventory',r,c,i,'',role,basis='cached summary arithmetic',reason='not_an_inventory_movement')
    if i and (num(get('main','Inventory',r,15)) or Decimal(0))<0:issue('negative_distribution_residual',sr,i,'Purchased minus remaining is negative. Purchase history is incomplete; this is not a historical distribution transaction.')
    if i and num(get('main','Inventory',r,12))==0 and not any(st(get('main','Purchases',p,3))==sku for p in range(2,82)):issue('cost_lookup_default_zero',sr,i,'No matching historical purchase. Source lookup defaults to zero; normalized Unit Cost remains unknown, not free.')
for r in range(3,147):
    sku=st(get('main','Ames',r,13));observe('main','Ames',r,16,mainmap.get(sku,''),'LOC-AMES','secondary_copy',st(get('main','Ames',2,11))[:10],reason='side_copy_not_additional_stock')
for r in range(2,33):
    i=shipmap[st(get('shipping','Shipping',r,5))]
    for c,loc in [(8,'SHIP-OR'),(9,'SHIP-STOR'),(10,'SHIP-HOLDER'),(11,'')]:observe('shipping','Shipping',r,c,i,'LOC-'+loc if loc else '','shipping_current_observation',basis='unknown date and bucket meaning',reason='unresolved_location_and_date')
for r in range(2,27):
    i=shipmap.get(st(get('shipping','OLD',r,6)),'')
    for c in range(7,12):observe('shipping','OLD',r,c,i,'','shipping_superseded_observation',st(get('shipping','OLD',r,1))[:10],reason='OLD_sheet_not_additional_stock')
for r,i in gamemap.items():observe('games','Inventory',r,4,i,'LOC-GAME-UNASSIGNED','game_available',st(get('games','Inventory',r,1))[:10],reason='unresolved_location')
add('locations.csv','location_id,source_label,proposed_name,mapping_state,kind,note',locations,'Five named-location aliases and unresolved source buckets. No account identities or permissions.')
add('quantity_observations.csv','observation_id,item_id,location_id,quantity,raw_value_json,as_of,source_row_id,source_cell,role,basis,opening_candidate,exclusion_reason',quantity,'All physical-count cells, components, summaries and superseded observations; never sum across roles.')
add('opening_balances.csv','opening_id,item_id,location_id,quantity_each,observed_as_of,observation_id,effective_posting_date,note,review_state,approved_for_production,test_fixture_only',openings,'Unambiguous main-workbook location observations only. Useful historical test fixture; every production row still needs confirmation.')
add('duplicate_identifiers.csv','source_id,sheet,identifier,rows_json,values_json,disposition',duplicates,'Ambiguous location rows excluded from opening balances.')

reconciliation=[]
for sku,i in mainmap.items():
    summaryrows=[r for r in range(3,161) if get('main','Inventory',r,2)==sku]
    for sn,end,col,totalcol in [('Central',138,4,9),('Ames',146,5,9),('Indy',142,6,4),('Boston',128,7,4),('Milwaukee',130,8,4)]:
        localrows=[r for r in range(3,end+1) if get('main',sn,r,1)==sku]
        localnums=[num(get('main',sn,r,totalcol)) for r in localrows]
        summarynum=num(get('main','Inventory',summaryrows[0],col)) if summaryrows else None
        candidate=next((x for x in openings if x['item_id']==i and x['location_id']=='LOC-'+sn.upper()),None)
        row={'item_id':i,'location_id':'LOC-'+sn.upper(),'summary_source_rows_json':js([rid('main','Inventory',r) for r in summaryrows]),'summary_first_quantity':summarynum,'location_source_rows_json':js([rid('main',sn,r) for r in localrows]),'location_quantities_json':js(localnums),'location_numeric_sum_for_audit_only':sum((n for n in localnums if n is not None),Decimal(0)) if any(n is not None for n in localnums) else None,'selected_opening_quantity':candidate['quantity_each'] if candidate else None,'disposition':'candidate' if candidate else 'no_candidate','explanation':'Opening remains test-only and needs a current count.' if candidate else 'See observations for blank, duplicate or absent source rows.'}
        if len(localrows)>1:
            row['disposition']='duplicate_source_rows'
            row['explanation']='Summary XLOOKUP uses the first matching row. Later matching counts may be omitted. Do not sum without review.'
        elif localnums and localnums[0] is not None and summarynum is not None and localnums[0]!=summarynum:
            row['disposition']='cached_summary_disagrees';issue('summary_quantity_disagreement',rid('main',sn,localrows[0]),i,'Source summary cache differs from local count.')
        reconciliation.append(row)
add('quantity_reconciliation.csv','item_id,location_id,summary_source_rows_json,summary_first_quantity,location_source_rows_json,location_quantities_json,location_numeric_sum_for_audit_only,selected_opening_quantity,disposition,explanation',reconciliation,'680 item/location comparisons expose duplicate first-match behavior and exclusions. Audit sums are not recommended balances.')

# Vendor/donor identities are organizations, not user accounts. Keep aliases exact.
orgs={}; relations=[]
def org(name,role,sr):
    name=st(name); key=ident('ORG',name)
    if key not in orgs:orgs[key]={'organization_id':key,'source_name':name,'canonical_name':'','review_state':'retain_source_alias'}
    return key
for r,i in gamemap.items():
    sr=rid('games','Inventory',r);oid=org(get('games','Inventory',r,3),'donor',sr)
    relations.append({'item_id':i,'organization_id':oid,'role':'donor_manufacturer_user_described','source_row_id':sr,'note':'No gift receipt date, quantity received or donation transaction inferred.'})
purchase_obs=[]
def po(k,s,r,date,order,model,vendor,qty,total,unit,desc='',bundle=None,priority=10,item=None):
    sr=rid(k,s,r);oid=org(vendor,'vendor',sr);i=item if item is not None else shipmap.get(st(model),'')
    purchase_obs.append({'observation_id':ident('PO',sr),'source_row_id':sr,'item_id':i,'organization_id':oid,'order_reference':st(order),'source_date':st(date)[:10] if isinstance(date,(dt.date,dt.datetime)) or re.match(r'^\d{4}-\d{2}-\d{2}',st(date)) else '', 'source_date_raw_json':js(date),'source_item_identifier':st(model),'description':safe(desc,sr),'quantity_each':num(qty),'extended_cost':num(total),'unit_cost':num(unit),'bundle_quantity':num(bundle),'priority':priority,'currency':'USD','currency_basis':'assumed_USD_from_context'})
for r in range(2,82):
    sr=rid('main','Purchases',r);sku=st(get('main','Purchases',r,3));q=num(get('main','Purchases',r,7));total=num(get('main','Purchases',r,6));computed=total/q if total is not None and q else None
    po('main','Purchases',r,get('main','Purchases',r,1),get('main','Purchases',r,2),sku,get('main','Purchases',r,5),q,total,computed,get('main','Purchases',r,4),item=mainmap.get(sku,''))
    if computed is not None:check(f'purchase unit cost row {r}',computed,num(get('main','Purchases',r,8)),Decimal('0.000000000001'))
    else:issue('missing_purchase_amount_or_quantity',sr,mainmap.get(sku,''),'Source IFERROR unit cost zero is not evidence of free goods; normalized unit cost remains blank.')
for r in range(6,17):
    desc=st(get('shipping','ULINE',r,5));bundle=re.search(r'(\d+)/bundle',desc)
    qty=num(get('shipping','ULINE',r,6));total=num(get('shipping','ULINE',r,7))
    po('shipping','ULINE',r,get('shipping','ULINE',r,1),get('shipping','ULINE',r,2),get('shipping','ULINE',r,4),'ULINE',qty,total,total/qty if qty and total is not None else None,desc,bundle.group(1) if bundle else None,1)
for r in range(2,19):
    if get('shipping','MyOrderHistory',r,2) is None:continue
    po('shipping','MyOrderHistory',r,get('shipping','MyOrderHistory',r,4),get('shipping','MyOrderHistory',r,5),get('shipping','MyOrderHistory',r,2),'ULINE',get('shipping','MyOrderHistory',r,8),get('shipping','MyOrderHistory',r,9),get('shipping','MyOrderHistory',r,10),get('shipping','MyOrderHistory',r,7),priority=2)
for sn,modelcol in [('Shipping',5),('OLD',6)]:
    for r in range(2,33 if sn=='Shipping' else 27):
        if not get('shipping',sn,r,21):continue
        po('shipping',sn,r,get('shipping',sn,r,20),get('shipping',sn,r,21),get('shipping',sn,r,modelcol),'ULINE',get('shipping',sn,r,22),get('shipping',sn,r,23),get('shipping',sn,r,24),priority=3 if sn=='Shipping' else 4)
webpath=OUT/'_support/uline-observations.json'
web=json.loads(webpath.read_text(encoding='utf-8'))
sources.append({'source_id':'uline_web','filename':'_data/data-for-import/_support/uline-observations.json','source_kind':'limited_browser_observations','source_uri':'https://www.uline.com/MyAccount/MyOrderHistory','sha256':hashlib.sha256(webpath.read_bytes()).hexdigest(),'bytes':webpath.stat().st_size,'extracted_on':RUN_DATE,'source_as_of':RUN_DATE,'note':'Two visible recent orders and three product pages; no complete account-history claim.'})
for r,p in enumerate(web['orders'],1):
    po('uline_web','OrderHistory',r,p['date'],p['order'],p['model'],'ULINE',p['quantity'],p['extended_price'],p['unit_price'],p['description'],p['bundle_quantity'],0)
    rows.append({'source_row_id':rid('uline_web','OrderHistory',r),'source_id':'uline_web','sheet':'OrderHistory','row':r,'nonempty_cells':'','tables_json':'[]','disposition':'limited_browser_order_line','note':'Ordinal in orders array of the hashed sanitized browser observation input; not an Excel row.'})
groups=collections.defaultdict(list)
for p in purchase_obs:
    # Main rows are each retained, including missing order refs. Shipping copies
    # of the same date/order/model are evidence of one line, not multiple receipts.
    key=('main',p['source_row_id']) if p['source_row_id'].startswith('main:') else ('shipping',p['organization_id'],p['order_reference'],p['source_date'],p['source_item_identifier'])
    groups[key].append(p)
orders={}; lines=[]; line_sources=[]
for key,observations in groups.items():
    p=sorted(observations,key=lambda x:x['priority'])[0];lid=ident('LINE',*key)
    orderkey=(p['organization_id'],p['order_reference'],p['source_date']) if p['order_reference'] else (p['organization_id'],'missing',p['source_row_id'])
    orderid=ident('ORDER',*orderkey)
    if orderid not in orders:orders[orderid]={'order_id':orderid,'organization_id':p['organization_id'],'legacy_order_reference':p['order_reference'],'source_date':p['source_date'],'date_meaning':'legacy_date_not_verified_received','record_kind':'historical_reference','production_status':'','currency':'USD','currency_basis':'assumed_USD_from_context','inventory_effect':'none','review_state':'needs_review'}
    line={k:p[k] for k in ['item_id','source_item_identifier','description','quantity_each','extended_cost','unit_cost','bundle_quantity','source_row_id']}
    line.update({'line_id':lid,'order_id':orderid,'record_kind':'historical_reference','inventory_effect':'none','review_state':'needs_review' if p['item_id'] else 'unmapped_non_catalog_product'})
    lines.append(line)
    for other in observations:
        line_sources.append({'line_id':lid,'observation_id':other['observation_id'],'selected':other is p})
        for field in ['quantity_each','extended_cost','unit_cost']:
            a,b=p[field],other[field]
            if a is not None and b is not None and abs(a-b)>Decimal('0.000000001'):issue('purchase_copy_conflict',other['source_row_id'],p['item_id'],f'{field} differs across copies; selected lowest priority rank source.')
    if p['quantity_each'] is not None and p['unit_cost'] is not None and p['extended_cost'] is not None:check('purchase line multiplication '+lid,p['quantity_each']*p['unit_cost'],p['extended_cost'],Decimal('0.00000001'))
for oid,o in orders.items():
    if o['legacy_order_reference'] and len({x['source_date'] for x in orders.values() if x['organization_id']==o['organization_id'] and x['legacy_order_reference']==o['legacy_order_reference']})>1:issue('order_reference_multiple_dates',detail=f'Order import key {oid} shares vendor/reference with another date; retain separate date groups pending review.')
add('organizations.csv','organization_id,source_name,canonical_name,review_state',list(orgs.values()),'Exact organization aliases. No automatic merging of donor abbreviations or event-labelled vendor names.')
add('item_organizations.csv','item_id,organization_id,role,source_row_id,note',relations,'Games donor/manufacturer association; does not assert a historical donation receipt.')
add('purchase_observations.csv','observation_id,source_row_id,item_id,organization_id,order_reference,source_date,source_date_raw_json,source_item_identifier,description,quantity_each,extended_cost,unit_cost,bundle_quantity,priority,currency,currency_basis',purchase_obs,'Every purchase-source occurrence before shipping copy deduplication.')
add('purchase_orders.csv','order_id,organization_id,legacy_order_reference,source_date,date_meaning,record_kind,production_status,currency,currency_basis,inventory_effect,review_state',list(orders.values()),'Historical order groups only; do not replay through live Ordered/Received actions.')
add('purchase_lines.csv','line_id,order_id,item_id,source_item_identifier,description,quantity_each,extended_cost,unit_cost,bundle_quantity,source_row_id,record_kind,inventory_effect,review_state',lines,'Deduplicated shipping lines and all 80 main purchase lines; header freight/tax/payment data are unknown.')
add('purchase_line_sources.csv','line_id,observation_id,selected',line_sources,'Links overlapping purchase source rows to one historical line.')

purchase_components=[]
for r in range(72,80):
    q=num(get('main','Purchases',r,11));itemcost=num(get('main','Purchases',r,10));total=num(get('main','Purchases',r,16))
    aligned=(q is not None and itemcost is not None and q==num(get('main','Purchases',r,7)) and total==num(get('main','Purchases',r,6)))
    lineid=ident('LINE','main',rid('main','Purchases',r)) if aligned else ''
    purchase_components.append({'source_row_id':rid('main','Purchases',r),'candidate_line_id':lineid,'item_cost':itemcost,'quantity_each':q,'discount':num(get('main','Purchases',r,12)),'shipping':num(get('main','Purchases',r,13)),'tax':num(get('main','Purchases',r,14)),'fee':num(get('main','Purchases',r,15)),'total':total,'association_state':'row_and_arithmetic_match_candidate' if aligned else 'unassociated_scratch','note':'Column alignment is evidence, not proof of receipt or accounting classification.'})
add('purchase_cost_components.csv','source_row_id,candidate_line_id,item_cost,quantity_each,discount,shipping,tax,fee,total,association_state,note',purchase_components,'Retain purchase costing scratch columns; only four rows align with named purchase lines. Do not apply remaining zeros to adjacent orders.')

purchased_products=[]
for r in range(6,17):
    sr=rid('shipping','PurchasedProducts',r);description=st(get('shipping','PurchasedProducts',r,2));candidates=[p for p in purchase_obs if p['source_row_id'].startswith('shipping:ULINE:') and p['description'].strip()==description.strip()]
    match=candidates[0] if len(candidates)==1 else None;price=num(get('shipping','PurchasedProducts',r,4));ratio=price/match['unit_cost'] if match and match['unit_cost'] else None
    purchased_products.append({'source_row_id':sr,'item_id':match['item_id'] if match else '', 'matched_observation_id':match['observation_id'] if match else '', 'source_category':get('shipping','PurchasedProducts',r,1),'product_description':description,'last_quantity_ordered':num(get('shipping','PurchasedProducts',r,3)),'unit_price_label_amount':price,'last_order_date':st(get('shipping','PurchasedProducts',r,5))[:10],'times_ordered':get('shipping','PurchasedProducts',r,6),'matched_price_each':match['unit_cost'] if match else None,'label_to_each_ratio':ratio,'price_basis':'per_100_candidate' if ratio==100 else 'each_candidate' if ratio==1 else 'zero_or_unknown','inventory_effect':'none'})
    if ratio==100:issue('price_per_100_vs_each',sr,match['item_id'],'Unit Price label is 100 times per-item cost derived from matching order quantity and extended amount. Preserve both bases.')
add('purchased_product_summaries.csv','source_row_id,item_id,matched_observation_id,source_category,product_description,last_quantity_ordered,unit_price_label_amount,last_order_date,times_ordered,matched_price_each,label_to_each_ratio,price_basis,inventory_effect',purchased_products,'ULINE PurchasedProducts is a summary, not extra orders; explicitly exposes two per-100 price labels.')

# External listings are aliases/reference quantities, never additional stock.
listings=[]
for r in range(2,81):
    sr=rid('main','Shopify',r);sku=st(get('main','Shopify',r,9));base=sku;pack=None;state='unmapped'
    if sku in mainmap:state='exact_legacy_sku'
    else:
        m=re.fullmatch(r'(.+)-(\d+)',sku)
        if m and m.group(1) in mainmap:base=m.group(1);pack=int(m.group(2));state='suffix_pack_candidate'
    i=mainmap.get(base,'')
    listings.append({'listing_id':f'LIST-SHOPIFY-{r:04d}','item_id':i,'handle':get('main','Shopify',r,1),'source_title':get('main','Shopify',r,2),'option1_name':get('main','Shopify',r,3),'option1_value':get('main','Shopify',r,4),'option2_name':get('main','Shopify',r,5),'option2_value':get('main','Shopify',r,6),'option3_name':get('main','Shopify',r,7),'option3_value':get('main','Shopify',r,8),'sku':sku,'hs_code':get('main','Shopify',r,10),'country_of_origin':get('main','Shopify',r,11),'channel_quantity':get('main','Shopify',r,12),'candidate_units_per_listing':pack,'mapping_state':state,'source_row_id':sr,'inventory_effect':'none'})
    if not i:issue('unmapped_channel_listing',sr,detail='No exact catalog identifier or numeric suffix match. Preserve as listing; do not invent a kit or new physical stock.')
    if i:alias(i,'shopify_variant_sku',sku,sr,state)
add('external_listings.csv','listing_id,item_id,handle,source_title,option1_name,option1_value,option2_name,option2_value,option3_name,option3_value,sku,hs_code,country_of_origin,channel_quantity,candidate_units_per_listing,mapping_state,source_row_id,inventory_effect',listings,'Shopify rows include packs/kits and missing/duplicate SKUs. Quantities are not location balances.')

shipping_details=[]
for r in range(2,33):
    sr=rid('shipping','Shipping',r);model=st(get('shipping','Shipping',r,5))
    row={'item_id':shipmap[model],'model':model,'stock_flag':get('shipping','Shipping',r,1),'source_note':get('shipping','Shipping',r,3),'size_text':get('shipping','Shipping',r,4),'source_row_id':sr,'dimension_unit':'in','weight_unit':'oz','weight_basis':'formula_estimate_not_measured','acquisition_label_json':js(get('shipping','Shipping',r,20)),'review_state':'source_evidence'}
    for name,col in [('estimated_packed_weight',6),('estimated_empty_weight',7),('inside_length',13),('inside_width',14),('inside_height',15),('outside_length',16),('outside_width',17),('outside_height',18),('outside_volume_ft3',19)]:row[name]=num(get('shipping','Shipping',r,col))
    shipping_details.append(row)
    if row['outside_height'] is not None and row['inside_height'] is not None and row['outside_height']<row['inside_height']:issue('dimension_height_conflict',sr,row['item_id'],'Outside height smaller than inside height; may be chosen score depth or a data error. Preserve both.')
    if row['inside_height']==0:issue('flat_mailer_zero_height',sr,row['item_id'],'Flat mailer height zero is a source placeholder, not validated packed shipping thickness.')
add('shipping_details.csv','item_id,model,stock_flag,source_note,size_text,inside_length,inside_width,inside_height,outside_length,outside_width,outside_height,dimension_unit,estimated_empty_weight,estimated_packed_weight,weight_unit,weight_basis,outside_volume_ft3,acquisition_label_json,source_row_id,review_state',shipping_details,'Source dimensions and weight estimates. Preserve variable-depth labels and unknown zero-height meaning.')
supplier=[]
for p in web['products']:
    p=dict(p);p.update(item_id=shipmap[p['model']],observed_on=web['observed_at'],currency='USD',inventory_effect='none');supplier.append(p)
add('supplier_product_observations.csv','item_id,model,url,observed_on,inside_length_in,inside_width_in,inside_height_in,outside_length_in,outside_width_in,outside_height_in,outside_tolerance_in,variable_depths_in,bundle_quantity,bale_quantity,bundle_weight_lb,unit_weight_lb,price_each,price_min_quantity,country_of_origin,currency,note,inventory_effect',supplier,'Three ULINE pages observed 2026-09-28; current quotes do not replace historical acquisition cost.')
add('item_values.csv','value_id,item_id,value_type,amount,currency_or_unit,as_of,source_row_id,method,review_state',values,'Separate MSRP, cost and extended values. No synthesized asks or weighted averages.')

for p in supplier:
    source=next(x for x in shipping_details if x['model']==p['model'])
    for attr in ['outside_length','outside_width','outside_height']:
        a,b=source[attr],num(p[attr+'_in'])
        if a is not None and b is not None and a!=b:issue('supplier_dimension_disagreement',source['source_row_id'],p['item_id'],f'{attr}: workbook {a} in; ULINE observation {b} in on {RUN_DATE}; not overwritten.')
issue('unverified_shipping_locations',detail='Shipping columns H/I/J are retained separately. No mapping to Central/Ames and no quantity posting inferred.')
issue('games_location_missing',detail='All 26 games have available counts but no location; held out of opening balances.')
issue('partial_purchase_history',detail='Main purchase dates end in 2024; stock/catalog information extends later. Preserve historical references without replaying receipts.')
issue('shipping_weights_are_estimates',detail='Shipping F/G apply a corrugated-box formula even to padded/flat mailers. Preserve formula and units; do not treat as measured product weights.')

# Controls and row disposition make every exclusion auditable.
gameqty=sum(num(get('games','Inventory',r,4)) for r in gamemap)
gamevalue=sum(num(get('games','Inventory',r,4))*num(get('games','Inventory',r,5)) for r in gamemap)
check('games MSRP value against source total F28',gamevalue,num(get('games','Inventory',28,6)),Decimal('0.00000001'))
for r in gamemap:check(f'game value F{r}',num(get('games','Inventory',r,4))*num(get('games','Inventory',r,5)),num(get('games','Inventory',r,6)),Decimal('0.00000001'))
for r in range(2,33):check(f'shipping Total K{r}',sum(num(get('shipping','Shipping',r,c)) or Decimal(0) for c in [9,10]),num(get('shipping','Shipping',r,11)))
for r in rows:
    k,s,n=r['source_id'],r['sheet'],r['row']
    if k=='main' and s=='Catalog':r['disposition']='header' if n==1 else 'collection_heading' if st(get(k,s,n,4))=='AAAA' else 'catalog_item'
    elif k=='main' and s in locnames:r['disposition']='header_metadata' if n<3 else 'location_observation_and_optional_side_copy'
    elif k=='main' and s=='Inventory':r['disposition']='header' if n<3 else 'summary_reference_only'
    elif k=='main' and s=='Purchases':r['disposition']='header' if n==1 else 'purchase_reference_and_optional_scratch'
    elif k=='main' and s=='Shopify':r['disposition']='header' if n==1 else 'channel_reference_only'
    elif k=='shipping' and s=='Shipping':r['disposition']='header' if n==1 else 'shipping_item_and_observation'
    elif k=='shipping' and s=='OLD':r['disposition']='superseded_reference_only'
    elif k=='shipping' and s in ['ULINE','MyOrderHistory','PurchasedProducts']:r['disposition']='purchase_reference_or_metadata'
    elif k=='shipping' and s=='Box Weight':r['disposition']='weight_research_reference_only'
    elif k=='games' and s=='Inventory':r['disposition']='header' if n==1 else 'control_total' if n==28 else 'game_item_and_observation'
    elif k=='games' and s=='Lookup':r['disposition']='state_lookup_not_inventory'
check('unique item IDs',len({x['item_id'] for x in items}),len(items))
check('unique opening item-location pairs',len({(x['item_id'],x['location_id']) for x in openings}),len(openings))
check('no production-approved openings',sum(x['approved_for_production'] for x in openings),0)
check('all item foreign keys valid',sum(bool(x['item_id']) and x['item_id'] not in item_index for name,data in DATA.items() if name not in ['items.csv'] for x in data if 'item_id' in x),0)
add('issues.csv','issue_id,code,severity,source_row_id,item_id,detail,resolution,status',ISSUES,'Data-quality review worklist; product questions remain in status/Open Questions.md.')
add('validation.csv','check,actual,expected,result,tolerance',CHECKS,'Independent arithmetic, identity and relational checks; historical data is not a current physical count.')

def csvvalue(v):
    if v is None:return ''
    if isinstance(v,bool):return 'true' if v else 'false'
    text=st(v)
    # Ordinary CSV consumers must not execute spreadsheet formulas. JSON columns
    # preserve original text; standalone strings beginning with operators escape.
    return "'"+text if text.startswith(('=','+','@','\t','\r','\n')) or (text.startswith('-') and num(text) is None) else text
manifest=[]
for file,data in DATA.items():
    path=OUT/file
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=HEADERS[file],extrasaction='raise');writer.writeheader()
        for row in data:writer.writerow({k:csvvalue(safe(v,f'{file}:{row.get("source_row_id","")}')) for k,v in row.items()})
    manifest.append({'filename':file,'row_count':len(data),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'purpose':PURPOSE[file]})
(OUT/'manifest.json').write_text(json.dumps({'schema_version':'draft-1','created_on':RUN_DATE,'sources':sources,'files':manifest,'production_ready':False,'currency_default':'USD assumed; confirm before production'},indent=2),encoding='utf-8')
# Keep the crosswalk local and restricted. Deduplicate without printing contents.
private={js(x):x for x in SECRET_RECORDS}
(PRIVATE/'restricted-source-text.json').write_text(json.dumps(list(private.values()),ensure_ascii=False,indent=2),encoding='utf-8')
summary={'csv_files':len(DATA),'items':len(items),'main_items':len(mainmap),'shipping_items':len(shipmap),'games':len(gamemap),'collections':len(collections_out),'source_cells':len(cells),'source_rows':len(rows),'opening_rows':len(openings),'opening_quantity':str(sum(x['quantity_each'] for x in openings)),'games_available':str(gameqty),'games_msrp_extended':str(gamevalue),'purchase_observations':len(purchase_obs),'purchase_lines':len(lines),'orders':len(orders),'issues':dict(collections.Counter(x['code'] for x in ISSUES)),'checks':dict(collections.Counter(x['result'] for x in CHECKS)),'source_hashes':{s['filename']:s['sha256'] for s in sources}}
summary['main_summary_quantity_including_duplicate_rows']=str(sum(num(get('main','Inventory',r,11)) or Decimal(0) for r in range(3,161)))
summary['main_summary_quantity_unique_items']=str(sum(sum(num(get('main','Inventory',next(r for r in range(3,161) if get('main','Inventory',r,2)==sku),c)) or Decimal(0) for c in range(4,9)) for sku in mainmap))
summary['main_location_numeric_sum_including_duplicates']=str(sum(num(x['quantity']) or Decimal(0) for x in quantity if x['role']=='location_total'))
summary['shipping_current_total']=str(sum(num(get('shipping','Shipping',r,11)) or Decimal(0) for r in range(2,33)))
summary['opening_by_location']={loc:{'rows':sum(x['location_id']==loc for x in openings),'quantity':str(sum(x['quantity_each'] for x in openings if x['location_id']==loc))} for loc in ['LOC-CENTRAL','LOC-AMES','LOC-INDY','LOC-BOSTON','LOC-MILWAUKEE']}
(OUT/'audit-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
