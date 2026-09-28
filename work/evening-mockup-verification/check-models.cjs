// Targeted checks for planning mockup invariants; not an application test suite.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
function context(){const elements={};const element=id=>elements[id]??={value:'',hidden:false,innerHTML:'',textContent:'',setAttribute(){},focus(){},scrollIntoView(){},querySelectorAll:()=>[],insertAdjacentHTML(){}};const storage=new Map();return{InventoryOrder:require('../../public/inventory-order.js'),assert,sampleKey:base=>base,structuredClone,console,Date,Number,String,Object,Array,Set,Map,JSON,Math,document:{querySelector:s=>s.includes('dialog[open]')?null:element(s),querySelectorAll:()=>[]},window:{addEventListener(){},scrollTo(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},elements};}
const purchase=context();
vm.runInNewContext(fs.readFileSync('public/purchase-requests/costing.js','utf8')+'\n'+fs.readFileSync('public/purchase-requests/mockup.js','utf8').replace('});index();','});')+`
state=seed();persona='procurement';
const r=state.requests.find(r=>r.id==='PR-203'),stockBefore=JSON.stringify(state.stock);
const cost=calculate(r.order);assert.equal(cost.total,147637);assert.equal(cost.totals[0],88912);assert.equal(cost.totals[1],58725);
transition(r,'Ordered');assert.equal(r.history.length,2);transition(r,'Shipped');assert.equal(r.history.length,2);
transition(r,'Ordered');assert.equal(r.history.length,2);transition(r,'Request');assert.equal(r.history.length,4);
assert.equal(r.history[0].qty,'[- 3,100]');assert.equal(r.history[1].qty,'[- 5,200]');
transition(r,'Ordered');transition(r,'Cancelled');assert.equal(r.history.length,8);assert.equal(JSON.stringify(state.stock),stockBefore);assert.equal(r.owner,'Gabby Barloon');
const line=structuredClone(r.order.items[0]),fullUnit=line.unitPrice;line.qty=2600;line.mode='unit';line.amount=fullUnit;recalculate(line);assert.equal(line.cost,450);assert.equal(line.unitPrice,fullUnit);
assert.equal(projected({id:'ally',qty:3100},58725).qty,3600);assert.ok(Math.abs(projected({id:'ally',qty:3100},58725).cost-587.25/3100)<1e-12);
console.log('PASS purchase allocation, full-precision quantity change, expectation reversal/cancellation, ownership, unchanged held stock, unknown-cost receipt projection');
`,purchase);
const event=context();
vm.runInNewContext(fs.readFileSync('public/event-reconciliation/mockup.js','utf8').replace('});open();','});')+`
state=seed();draft={counts:{ribbon:'1800',pin:'0'},allocations:{ribbon:[{location:'Indianapolis IN',qty:'800'},{location:'Milwaukee WI',qty:'1000'}],pin:[{location:'Indianapolis IN',qty:'0'}]},manual:{ribbon:true}};
assert.equal(validate(true),'');draft.counts.pin='';assert.ok(validate(true).includes('not been counted'));draft.counts.pin='0';draft.allocations.ribbon[1].qty='900';assert.ok(validate(true).includes('must total'));draft.allocations.ribbon[1].qty='1000';
review();elements['#finalize'].onclick();assert.equal(state.status,'Finalized');assert.equal(state.report.ribbon.distributed,6450);assert.equal(state.stock['Indianapolis IN'].ribbon,10800);assert.equal(state.stock['Milwaukee WI'].ribbon,11000);assert.equal(state.held.ribbon,0);assert.equal(state.held.pin,0);
const inventoryBefore=JSON.stringify({stock:state.stock,held:state.held,history:state.history,posted:state.posted});elements['#finalize'].onclick();assert.equal(JSON.stringify({stock:state.stock,held:state.held,history:state.history,posted:state.posted}),inventoryBefore);
correction();document.querySelectorAll=selector=>selector==='[data-report]'?[{value:'8250',dataset:{item:'ribbon',report:'brought'}},{value:'1900',dataset:{item:'ribbon',report:'remaining'}},{value:'150',dataset:{item:'pin',report:'brought'}},{value:'0',dataset:{item:'pin',report:'remaining'}}]:[];
document.querySelector('#explanation').value='';elements['#save-correction'].onclick();assert.equal(state.report.ribbon.distributed,6350);assert.equal(state.corrected,true);assert.equal(state.log.length,2);assert.equal(JSON.stringify({stock:state.stock,held:state.held,history:state.history,posted:state.posted}),inventoryBefore);
console.log('PASS event blank/zero, allocation validation, direct split posting, exactly-once finalization, report-only correction preserves all inventory/cost/history');
`,event);

