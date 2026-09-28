const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
for(const file of ['public/purchase-entry/mockup.js','public/purchase-requests/costing.js']) {
 const src=fs.readFileSync(file,'utf8'); const start=src.indexOf('function allocate('); const end=src.indexOf('\nconst editable',start);
 const c=vm.createContext({}); vm.runInContext(src.slice(start,end<0?undefined:end),c);
 const item=(qty,cost,fee=0)=>({name:'Test',qty,cost,fee,amount:cost,unitPrice:cost/qty});
 const o={items:[item(5200,900),item(3100,600)],other:0,discount:236.25,tax:88.46,shipping:124.16,shippingAllocation:'line_total'};
 const calc=()=>JSON.parse(JSON.stringify(c.calculate(o)));
 assert.deepEqual(calc().totals,[88583,59054]); assert.equal(calc().total,147637);
 o.shippingAllocation='quantity';assert.deepEqual(calc().totals,[88912,58725]);
 delete o.shippingAllocation;assert.deepEqual(calc().totals,[88912,58725]);
 o.shippingAllocation='line_total';o.items=[item(1,100,300),item(9,100)];o.discount=100;o.tax=0;o.shipping=20;
 assert.deepEqual(calc().shipping,[1000,1000]); // Fee and fee discount excluded.
 o.items=[item(1,50),item(9,100)];o.discount=0;assert.deepEqual(calc().shipping,[667,1333]);
 o.items=[item(1,0),item(1,0)]; assert.ok(calc().errors.length);
 o.shippingAllocation='quantity';assert.deepEqual(calc().shipping,[1000,1000]);
 o.shippingAllocation='line_total';o.shipping=0;assert.equal(calc().errors.length,0);
 o.items=[item(1,10),item(1,10),item(1,10)];o.shipping=.02;assert.deepEqual(calc().shipping,[1,1,0]);
 for(let i=0;i<200;i++){
  o.items=[item(1,1+i/100,i/100),item(7,17.31,1.03),item(4,3.21)];o.other=.31;o.discount=1.29;o.tax=1.67;o.shipping=3.71;
  const r=calc();assert.equal(r.errors.length,0);
  for(const f of ['other','discount','tax','shipping'])assert.equal(r[f].reduce((a,b)=>a+b,0),Math.round(o[f]*100));
 }
 console.log(file+': shipping choices, discounts, fee exclusion, legacy compatibility, zero bases and 200 reconciliation cases passed');
}
