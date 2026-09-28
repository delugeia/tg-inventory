const assert=require('node:assert/strict'),M=require('../public/relocation-requests/relocation-model.js');
const owner={name:'Gabby Barloon',manager:false},manager={name:'Jasmine Davidson',manager:true},other={name:'Darrin Dawson',manager:false};
const r={id:'test',status:'Draft',owner:owner.name,title:'Secret copy title',source:'Central',destination:'Ames IA',notes:'Do not copy',lines:[{id:'a',qty:2000}],logs:[],movements:[],fulfillment:{},receiving:{}};
assert(M.allowed(r,owner,'edit'));assert(M.allowed(r,manager,'cancel'));assert(!M.allowed(r,other,'submit'));
const copy=M.copy(r);assert.deepEqual(Object.keys(copy).sort(),['destination','lines','notes','source','title']);assert.equal(copy.source,'');assert.equal(copy.notes,'');assert.equal(copy.title,'');copy.lines[0].qty=0;assert.equal(r.lines[0].qty,2000);
M.validateLines([{qty:0}]);assert.throws(()=>M.validateLines([{qty:-1}]));
M.transition(r,owner,'Requested');assert(M.allowed(r,manager,'edit'));assert(!M.allowed(r,owner,'edit'));assert(!M.allowed(r,manager,'cancel'));
const state={stock:{Central:{a:7500},'Ames IA':{a:150}}},catalog=[{id:'a',name:'Ribbon',cost:.16}];
M.saveFulfillment(r,manager,{a:'1000'});assert.equal(r.status,'Requested');assert.equal(state.stock.Central.a,7500);
M.ship(state,r,manager,{a:'2000'},'2026-09-28',catalog);assert.equal(r.status,'Shipped');assert.equal(state.stock.Central.a,5500);assert(!M.allowed(r,manager,'edit'));assert(M.allowed(r,manager,'shipping'));assert.throws(()=>M.ship(state,r,manager,{a:'2000'},'2026-09-28',catalog));
M.saveReceiving(r,owner,{a:'700'});assert.equal(r.status,'Receiving');assert.equal(state.stock['Ames IA'].a,150);assert.throws(()=>M.complete(state,r,owner,{a:'700'},catalog));
M.saveReceiving(r,manager,{a:'2000'});assert.equal(state.stock['Ames IA'].a,150);M.complete(state,r,owner,{a:'2000'},catalog);assert.equal(state.stock['Ames IA'].a,2150);assert.equal(r.status,'Complete');assert.equal(r.movements.length,2);assert.throws(()=>M.complete(state,r,owner,{a:'2000'},catalog));
for(const status of M.statuses){r.status=status;if(status==='Cancelled'){assert(!M.allowed(r,manager,'shipping'));assert(M.allowed(r,owner,'copy'));}}
assert(M.trackingURL({carrier:'UPS',number:'A & B'}).includes('A%20%26%20B'));assert.equal(M.trackingURL({carrier:'Other',number:'1',url:'javascript:alert(1)'}),'');
console.log('PASS: permissions, item-only copy, zero/negative validation, draft fulfillment, partial receiving without posting, exact-once shipping/completion, cost preservation, safe tracking URLs.');


for(const status of M.statuses){
 const record={...structuredClone(r),status,owner:owner.name,title:'Original',logs:[],updated:'before'};
 const stable=JSON.stringify({status:record.status,owner:record.owner,lines:record.lines,movements:record.movements,source:record.source,destination:record.destination});
 assert(M.allowed(record,owner,'title'));assert(M.allowed(record,manager,'title'));assert(!M.allowed(record,other,'title'));
 assert.throws(()=>M.rename(record,owner,'   '));assert.throws(()=>M.rename(record,other,'New'));
 M.rename(record,manager,'  Updated title  ');assert.equal(record.title,'Updated title');assert.equal(record.logs.length,1);
 assert.equal(JSON.stringify({status:record.status,owner:record.owner,lines:record.lines,movements:record.movements,source:record.source,destination:record.destination}),stable);
}
console.log('PASS: required trimmed title; owner/manager-only title editing in all six stages leaves status, ownership, items and movement history unchanged.');
