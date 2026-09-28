"""Extract the eight reviewed ULINE confirmations; no inventory posting."""
import datetime, json, pathlib, re
from decimal import Decimal
import pdfplumber

root=pathlib.Path('_data/uline-orders')
files=sorted(root.glob('*.pdf'))
assert len(files)==8
orders=[]
money=lambda x: format(Decimal(x),'.2f')
for path in files:
    with pdfplumber.open(path) as pdf:
        assert len(pdf.pages)==1
        text=pdf.pages[0].extract_text()
    number=re.search(r'ORDER # (\d+)',text).group(1)
    header=re.search(r'^(\d+) (UPS GROUND) (\d{2}/\d{2}/\d{2}) \d{2}/\d{2}/\d{2} (\w+)$',text,re.M)
    assert header
    address=re.search(r'SOLD TO: (.+?) SHIP TO: (.+?)\n(.+?)\nAMES IA ([\d-]+) AMES IA ([\d-]+)\n',text)
    assert address
    street=address[3]
    half=len(street)//2
    # All eight have identical sold-to/ship-to street text, independently checked.
    left,right=street[:half].strip(),street[half:].strip()
    assert left==right
    country='US' if '\nUS US\n' in text else None
    def addr(name,street,postal):
        return dict(name=name,address_lines=[street],city='AMES',state='IA',postal_code=postal,country=country)
    items=[]
    for match in re.finditer(r'^(\d+) (EA|C) (S-\S+) (.+?) ([\d]*\.\d{2}) ([\d]+\.\d{2})$',text,re.M):
        qty,uom,model,description,price,extended=match.groups()
        unit=Decimal(price)/(100 if uom=='C' else 1)
        assert unit*int(qty)==Decimal(extended)
        items.append(dict(line_number=len(items)+1,item_number=model,description=description,quantity=int(qty),unit_of_measure='each',unit_price=money(unit),extended_price=money(extended),no_charge=Decimal(extended)==0))
    totals=re.search(r'SUB-TOTAL SALES TAX SHIPPING/HANDLING TOTAL\n([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)',text)
    assert totals and items
    subtotal,tax,shipping,total=map(Decimal,totals.groups())
    assert sum(Decimal(i['extended_price']) for i in items)==subtotal
    assert subtotal+tax+shipping==total
    orders.append(dict(source_file=path.name,order_number=number,customer_number=header[1],order_date=datetime.datetime.strptime(header[3],'%m/%d/%y').date().isoformat(),sold_to=addr(address[1],left,address[4]),ship_to=addr(address[2],right,address[5]),ship_via=header[2],payment_terms=header[4],line_items=items,subtotal=money(subtotal),sales_tax=money(tax),shipping_handling=money(shipping),other_fees=[],total=money(total)))
assert len({o['order_number'] for o in orders})==8
orders.sort(key=lambda o:(o['order_date'],o['order_number']))
output=dict(supplier='ULINE',currency='USD',currency_basis='US order context',amount_format='Decimal strings; unit_price is per individual item and excludes tax, shipping and fees.',orders=orders)
target=root/'uline-orders.json'
target.write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
saved=json.loads(target.read_text(encoding='utf-8'))
assert saved==output
print(json.dumps(dict(file=str(target),orders=len(orders),line_items=sum(len(o['line_items']) for o in orders),total=str(sum(Decimal(o['total']) for o in orders)),validation='All line extensions, subtotals and order totals reconcile.')))
