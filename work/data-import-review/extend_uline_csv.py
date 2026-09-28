"""Allocate recorded order tax/handling in cents under D-042/D-047/D-051."""
import csv
import json
import sys
from decimal import Decimal
from fractions import Fraction
from pathlib import Path

folder = Path('_data/uline-orders')
by_value = '--shipping-by-value' in sys.argv
orders = json.loads((folder / 'uline-orders.json').read_text(encoding='utf-8'))['orders']
with (folder / 'uline-orders.csv').open(encoding='utf-8-sig', newline='') as stream:
    reader = csv.DictReader(stream)
    headers = reader.fieldnames
    original = list(reader)

def allocate(amount, weights):
    cents_decimal = Decimal(amount) * 100
    assert cents_decimal == cents_decimal.to_integral_value()
    cents = int(cents_decimal)
    weights = [Fraction(str(w)) for w in weights]
    assert cents >= 0 and all(w >= 0 for w in weights)
    if not sum(weights):
        assert cents == 0
        return [0] * len(weights)
    exact = [cents * w / sum(weights) for w in weights]
    portions = [x.numerator // x.denominator for x in exact]
    remaining = cents - sum(portions)
    ranked = sorted(range(len(weights)), key=lambda i: (-(exact[i] - portions[i]), i))
    for i in ranked[:remaining]:
        portions[i] += 1
    assert sum(portions) == cents
    return portions

assert allocate('10.00', [1, 1, 1]) == [334, 333, 333]
assert allocate('0.01', [0, 1, 1]) == [0, 1, 0]
assert allocate('0.00', [0, 0]) == [0, 0]

result = []
offset = 0
for order in orders:
    lines = order['line_items']
    # These confirmations contain no discounts or other fees; merchandise
    # extended amounts are therefore the discounted tax-allocation bases.
    assert order['other_fees'] == []
    tax = allocate(order['sales_tax'], [x['extended_price'] for x in lines])
    handling = allocate(order['shipping_handling'],
                        [Decimal(x['quantity']) * Decimal(x['unit_price']) for x in lines]
                        if by_value else [x['quantity'] for x in lines])
    for i, line in enumerate(lines):
        row = original[offset]
        assert row == {'Order Number': order['order_number'], 'Order Date': order['order_date'],
                       'Qty': str(line['quantity']), 'Item Number': line['item_number'],
                       'Description': line['description'], 'Unit Price': line['unit_price']}
        result.append({**row, 'Tax Portion': f'{Decimal(tax[i])/100:.2f}',
                       'SH Portion': f'{Decimal(handling[i])/100:.2f}'})
        offset += 1
assert offset == len(original) == 21
target = folder / ('uline-orders-extended-v2.csv' if by_value else 'uline-orders-extended.csv')
with target.open('w', encoding='utf-8-sig', newline='') as stream:
    writer = csv.DictWriter(stream, fieldnames=headers + ['Tax Portion', 'SH Portion'])
    writer.writeheader()
    writer.writerows(result)
with target.open(encoding='utf-8-sig', newline='') as stream:
    saved = list(csv.DictReader(stream))
assert saved == result
if by_value:
    with (folder / 'uline-orders-extended.csv').open(encoding='utf-8-sig', newline='') as stream:
        previous = list(csv.DictReader(stream))
    assert [{k: v for k, v in r.items() if k != 'SH Portion'} for r in saved] == [{k: v for k, v in r.items() if k != 'SH Portion'} for r in previous]
for order in orders:
    rows = [r for r in saved if r['Order Number'] == order['order_number']]
    assert sum(Decimal(r['Tax Portion']) for r in rows) == Decimal(order['sales_tax'])
    assert sum(Decimal(r['SH Portion']) for r in rows) == Decimal(order['shipping_handling'])
print(f'Created {target}: {len(saved)} rows; all {len(orders)} orders reconcile exactly.')
print('Portions are line amounts, not per-unit amounts. Merchandise unit prices remain unchanged.')
