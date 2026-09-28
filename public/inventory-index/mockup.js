'use strict';
const $=id=>document.getElementById(id);
const SETTINGS_KEY='tg-inventory-index-settings-v1';
const RETURN_KEY='tg-inventory-index-return-v1';
// Item-view links explicitly submit an exact Category/Collection filter.
const itemSearchParams = new URLSearchParams(location.search);
const linkedCategory = itemSearchParams.get('category');
const linkedCollection = itemSearchParams.get('collection');
let linkedKeys = null;
if (linkedCategory) {
 const matches = inventoryCollections.filter(c => c.category === linkedCategory && (!linkedCollection || c.collection === linkedCollection));
 // A collection absent from the separate fixtures must show no matches, not all items.
 if (!matches.length) {
  const missing = {category: linkedCategory, collection: linkedCollection || '(no demo collections)', key: linkedCategory + ' : ' + (linkedCollection || '(no demo collections)')};
  inventoryCollections.push(missing); matches.push(missing);
 }
 linkedKeys = matches.map(c => c.key);
}
const locationChoices=[['central','Central'],['ames','Ames IA'],['boston','Boston MA'],['indianapolis','Indianapolis IN'],['milwaukee','Milwaukee WI'],['event','Gen Con'],['transit','In Transit'],['ordered','Ordered']];
const blank=()=>({text:'',collections:[],locations:[],includeInactive:false});
function normalize(value){return {text:typeof value?.text==='string'?value.text:'',collections:Array.isArray(value?.collections)?value.collections.filter(k=>inventoryCollections.some(c=>c.key===k)).sort():[],locations:Array.isArray(value?.locations)?value.locations.filter(k=>locationChoices.some(([key])=>key===k)).sort():[],includeInactive:value?.includeInactive===true};}
function readStorage(storage,key){try{return JSON.parse(storage.getItem(key)||'null');}catch{return null;}}
function writeStorage(storage,key,value){try{storage.setItem(key,JSON.stringify(value));}catch{$('storage-notice').hidden=false;}}
// Storage is a mockup convenience, not a production persistence design.
let saved;try{saved=readStorage(localStorage,SETTINGS_KEY);}catch{saved=null;$('storage-notice').hidden=false;}
let pending=normalize(saved?.pending), submitted=null, rows=[],columns=[];
let scrollPosition={top:0,left:0,page:0};
const balances=['central','indianapolis','ames','boston','milwaukee','event','transit','ordered'];
const storageColumns=[['central','Central'],['indianapolis','Indianapolis IN'],['ames','Ames IA'],['boston','Boston MA'],['milwaukee','Milwaukee WI']].sort((a,b)=>InventoryOrder.compare(a[1],b[1]));
const extraColumns=[['event','Gen Con'],['transit','In Transit'],['ordered','Ordered']].sort((a,b)=>InventoryOrder.compare(a[1],b[1],a[0]==='event'?'event':'storage',b[0]==='event'?'event':'storage'));
const same=(a,b)=>JSON.stringify(normalize(a))===JSON.stringify(normalize(b));
const available=item=>item.central+item.indianapolis+item.ames+item.boston+(item.milwaukee||0);
const value=(item,key)=>key==='available'?available(item):(item[key]||0);
function persist(){try{writeStorage(localStorage,SETTINGS_KEY,{pending,submitted});}catch{$('storage-notice').hidden=false;}}
function closeFilters(){$('filters').hidden=true;$('filter-toggle').setAttribute('aria-expanded','false');$('chevron').textContent='⌄';}
function syncControls(){
 $('search').value=pending.text;$('include-inactive').checked=pending.includeInactive;
 document.querySelectorAll('[data-collection]').forEach(input=>{input.checked=pending.collections.includes(input.value);});
 document.querySelectorAll('[data-location]').forEach(input=>{input.checked=pending.locations.includes(input.value);});
 updateIndicators();
}
function updateIndicators(){
 const n=pending.collections.length+pending.locations.length;
 $('filter-caption').textContent='Filters'+(n?' — '+n+' selected':'')+(pending.includeInactive?' · Include inactive zero-stock':'');
 $('filter-toggle').classList.toggle('active',n>0||pending.includeInactive);
 $('changed').hidden=submitted===null||same(pending,submitted);
}
function readControls(){pending={text:$('search').value,collections:[...document.querySelectorAll('[data-collection]:checked')].map(c=>c.value).sort(),locations:[...document.querySelectorAll('[data-location]:checked')].map(c=>c.value).sort(),includeInactive:$('include-inactive').checked};updateIndicators();persist();}
function matching(criteria){
 const needle=criteria.text.trim().toLocaleLowerCase();
 return inventoryItems.filter(item=>
 (criteria.includeInactive||item.active||balances.some(key=>(item[key]||0)!==0))&&
 (!criteria.collections.length||criteria.collections.includes(item.key))&&
 (!needle||[item.category,item.collection,item.name].some(s=>s.toLocaleLowerCase().includes(needle)))
 ).sort((a,b)=>a.category.localeCompare(b.category)||a.collection.localeCompare(b.collection)||a.name.localeCompare(b.name));
}
function make(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function render(){
 rows=submitted?matching(submitted):[];
 const shownLocations=[...storageColumns,...extraColumns].filter(([key])=>submitted?.locations.length?submitted.locations.includes(key):rows.some(item=>(item[key]||0)!==0));
 columns=[['name','Name'],['available','Available'],...shownLocations];
 const head=make('tr');
 for(const [key,label]of columns){const th=make('th');th.scope='col';if(['central','indianapolis','ames','boston','milwaukee'].includes(key)){const link=make('a',label);link.href='location.html';link.dataset.detail='true';th.append(link);}else th.textContent=label;head.append(th);}
 $('table-head').replaceChildren(head);
 const body=document.createDocumentFragment();let lastGroup='';
 for(const item of rows){
  if(item.key!==lastGroup){const group=make('tr',undefined,'group');const th=make('th');th.colSpan=columns.length;th.scope='rowgroup';th.append(make('span',item.key));group.append(th);body.append(group);lastGroup=item.key;}
  const tr=make('tr',undefined,'item-row');tr.dataset.item=item.id;
  for(const [key]of columns){const td=make('td');if(key==='name'){const link=make('a',item.name);link.href='../item-view/index.html';link.dataset.detail='true';td.append(link);if(!item.active)td.append(make('span','Inactive','inactive'));}else{const number=value(item,key);td.textContent=number===0?'—':number.toLocaleString('en-US');if(key==='available')td.classList.add('available');if(number<0)td.classList.add('negative');}tr.append(td);}
  body.append(tr);
 }
 if(!rows.length){const tr=make('tr',undefined,'empty');const td=make('td');td.colSpan=columns.length;td.append(make('strong',submitted?'No items match your search.':'Search inventory or choose Show All.'));td.append(make('span',submitted?'Change your search or filters, then select Search or Show All.':'Use collection filters to narrow your results before searching.'));tr.append(td);body.append(tr);}
 $('table-body').replaceChildren(body);$('download').disabled=rows.length===0;$('table-scroll').classList.toggle('no-results',rows.length===0);
 $('result-count').textContent=submitted?rows.length+' item'+(rows.length===1?'':'s')+' shown':'No results loaded';updateIndicators();
}
function runSearch(showAll=false){readControls();if(showAll)pending.text='';submitted=normalize(pending);persist();syncControls();closeFilters();render();$('table-scroll').scrollTo(0,0);}
for(const collection of inventoryCollections){const label=make('label',undefined,'check');const input=make('input');input.type='checkbox';input.value=collection.key;input.dataset.collection='true';label.append(input,make('span',collection.key));$('collections').append(label);}
for(const [key,name] of locationChoices){const label=make('label',undefined,'check'),input=make('input');input.type='checkbox';input.value=key;input.dataset.location='true';label.append(input,make('span',name));$(storageColumns.some(([k])=>k===key)?'storage-locations':'other-locations').append(label);}
$('search-form').addEventListener('submit',event=>{event.preventDefault();runSearch();});
$('search').addEventListener('input',readControls);
$('filters').addEventListener('change',readControls);
$('show-all').addEventListener('click',()=>runSearch(true));
$('filter-toggle').addEventListener('click',()=>{const open=$('filters').hidden;$('filters').hidden=!open;$('filter-toggle').setAttribute('aria-expanded',String(open));$('chevron').textContent=open?'⌃':'⌄';});
$('clear-filters').addEventListener('click',()=>{pending.collections=[];pending.locations=[];pending.includeInactive=false;syncControls();persist();});
$('reset').addEventListener('click',()=>{pending=blank();submitted=null;closeFilters();syncControls();persist();render();$('table-scroll').scrollTo(0,0);});
function csvCell(input){return '"'+String(input).replaceAll('"','""')+'"';}
function displayedCSV(){return '\uFEFF'+[['Category','Collection',...columns.map(c=>c[1])],...rows.map(item=>[item.category,item.collection,...columns.map(([key])=>value(item,key))])].map(row=>row.map(csvCell).join(',')).join('\r\n');}
$('download').addEventListener('click',()=>{if(!rows.length)return;const url=URL.createObjectURL(new Blob([displayedCSV()],{type:'text/csv;charset=utf-8'}));const anchor=make('a');anchor.href=url;anchor.download='inventory.csv';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
function rememberReturn(){
 scrollPosition={top:$('table-scroll').scrollTop,left:$('table-scroll').scrollLeft,page:window.scrollY};
 try{writeStorage(sessionStorage,RETURN_KEY,{pending,submitted,scrollPosition});}catch{/* storage notice handled for settings */}
}
document.addEventListener('click',event=>{if(event.target.closest('a[data-detail]'))rememberReturn();});
function restoreReturn(){
 const nav=performance.getEntriesByType('navigation')[0];
 let back=null;try{back=readStorage(sessionStorage,RETURN_KEY);}catch{}
 // Only history navigation restores results. Reload/reopen restores settings, not results.
 if((nav?.type==='back_forward'||restoreReturn.fromCache)&&back){pending=normalize(back.pending);submitted=back.submitted?normalize(back.submitted):null;scrollPosition=back.scrollPosition||scrollPosition;syncControls();render();requestAnimationFrame(()=>{$('table-scroll').scrollTo(scrollPosition.left,scrollPosition.top);window.scrollTo(0,scrollPosition.page);});}
 closeFilters();
}
if (linkedKeys) { pending=normalize({...blank(),collections:linkedKeys}); submitted=normalize(pending); }
syncControls();render();restoreReturn();
window.addEventListener('pageshow',event=>{if(event.persisted){restoreReturn.fromCache=true;restoreReturn();restoreReturn.fromCache=false;}closeFilters();});
