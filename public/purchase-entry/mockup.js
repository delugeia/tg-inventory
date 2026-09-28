'use strict';
const $ = id => document.getElementById(id);
const key = 'tg-purchase-workflow-v3';
const clone = value => JSON.parse(JSON.stringify(value));
const today = () => new Date().toLocaleDateString('en-CA');
const money = cents => (cents / 100).toLocaleString('en-US', {style:'currency', currency:'USD'});
const unit = value => '$' + value.toFixed(6);
const catalog = value => value === 0 ? 'n/a' : '$' + value.toFixed(3);
const number = value => value.toLocaleString('en-US');
let data, draft, screen;
function sample() {
  return {status:'Draft', order:{name:'Wristband resupply',manufacturer:'Example wristband vendor',location:'Central',ordered:today(),shipped:'',received:'',discount:236.25,tax:88.46,shipping:124.16,shippingAllocation:'line_total',other:0,items:[
    {id:'gaymer',name:'GAYMER wristband',qty:5200,mode:'total',amount:900,unitPrice:900/5200,cost:900,fee:0},
    {id:'ally',name:'ALLY wristband',qty:3100,mode:'total',amount:600,unitPrice:600/3100,cost:600,fee:0}
  ]},stock:{gaymer:{name:'GAYMER wristband',qty:1000,cost:0.2},ally:{name:'ALLY wristband',qty:500,cost:0}},notes:[],postedAt:null};
}
function save() { try {localStorage.setItem(key,JSON.stringify({data,draft,screen}));} catch {} }
function allocate(cents, weights) {
  const sum = weights.reduce((a,b)=>a+b,0);
  if (!sum) return weights.map(()=>0);
  const exact = weights.map(w=>cents*w/sum), result=exact.map(Math.floor);
  const ranked=exact.map((n,i)=>({i,f:n-result[i]})).sort((a,b)=>b.f-a.f || a.i-b.i);
  for(let n=cents-result.reduce((a,b)=>a+b,0),i=0;i<n;i++) result[ranked[i%ranked.length].i]++;
  return result;
}
function calculate(order) {
  const errors=[];
  if (!order.items.length) errors.push('Add at least one item.');
  for (const item of order.items) {
    if (!item.name.trim() || !Number.isSafeInteger(item.qty) || item.qty<=0 || !Number.isFinite(item.amount) || item.amount<0 || !Number.isFinite(item.fee) || item.fee<0) errors.push('Each item needs a name, a positive whole quantity, and nonnegative prices and fees.');
  }
  for (const item of order.items) {
    if (!Number.isFinite(item.unitPrice) || item.unitPrice<0 || !Number.isFinite(item.cost) || item.cost<0 || Math.round(item.qty*item.unitPrice*100)!==Math.round(item.cost*100)) errors.push(`${item.name || 'Unnamed item'}: QTY × Unit must match Cost rounded to cents. Recalculate the row before saving.`);
  }
  for(const field of ['discount','tax','shipping','other']) if(!Number.isFinite(order[field])||order[field]<0) errors.push('Enter a nonnegative amount for each order charge.');
  if(errors.length) return {errors};
  const merch=order.items.map(i=>Math.round(i.cost*100));
  const fees=order.items.map(i=>Math.round(i.fee*100));
  const other=allocate(Math.round(order.other*100),order.items.map(()=>1));
  const base=merch.map((n,i)=>n+fees[i]+other[i]);
  if(base.some(n=>!Number.isSafeInteger(n))) return {errors:['Amount is too large.']};
  if(Math.round(order.discount*100)>base.reduce((a,b)=>a+b,0)) return {errors:['Discount cannot exceed merchandise plus fees.']};
  const discount=allocate(Math.round(order.discount*100),base);
  const net=base.map((n,i)=>n-discount[i]);
  if(order.tax>0 && !net.some(n=>n>0)) return {errors:['Tax needs a positive discounted cost to allocate against.']};
  const tax=allocate(Math.round(order.tax*100),net);
  const method=order.shippingAllocation ?? 'quantity'; // Preserve older saved examples.
  if(!['line_total','quantity'].includes(method)) return {errors:['Choose a shipping allocation method.']};
  const weights=method==='quantity' ? order.items.map(i=>i.qty) : merch.map((n,i)=>base[i]>0 ? n*net[i]/base[i] : 0);
  if(order.shipping>0 && !weights.some(n=>n>0)) return {errors:['Shipping needs positive discounted merchandise value. Choose By quantity or correct the amounts.']};
  const shipping=allocate(Math.round(order.shipping*100),weights);
  const totals=net.map((n,i)=>n+tax[i]+shipping[i]);
  return {errors:[],merch,fees,other,discount,tax,shipping,totals,total:totals.reduce((a,b)=>a+b,0)};
}
const editable = () => ['create','edit','receive'].includes(screen);
function cell(row, value) {const td=document.createElement('td');td.textContent=value;row.append(td);}
function table(headers, rows) {
  const t=document.createElement('table'),h=document.createElement('thead'),r=document.createElement('tr'),b=document.createElement('tbody');
  headers.forEach(s=>{const th=document.createElement('th');th.textContent=s;r.append(th);});h.append(r);
  rows.forEach(values=>{const tr=document.createElement('tr');values.forEach(v=>cell(tr,v));b.append(tr);});t.append(h,b);return t;
}
function projected(item,cents) {
  const old=data.stock[item.id]||{qty:0,cost:0};
  return {qty:old.qty+item.qty,cost:old.qty<=0 || old.cost===0 ? cents/100/item.qty : (old.qty*old.cost+cents/100)/(old.qty+item.qty)};
}
function totals() {
  const c=calculate(draft);$('error').textContent=[...new Set(c.errors)].join(' ');
  $('total').textContent=c.errors.length?'—':money(c.total);$('breakdown').replaceChildren();
  if(!c.errors.length) draft.items.forEach((item,i)=>{
    const tr=document.createElement('tr');[item.name,money(c.merch[i]),money(c.fees[i]),money(c.other[i]),'−'+money(c.discount[i]),money(c.tax[i]),money(c.shipping[i]),money(c.totals[i]),unit(c.totals[i]/100/item.qty)].forEach(v=>cell(tr,v));$('breakdown').append(tr);
  });
  if(screen==='confirm' && !c.errors.length){
    $('confirm-location').textContent=draft.location;
    $('impact').replaceChildren(table(['Item','Held now','Receiving','Held after','Current cost','New cost'],draft.items.map((item,i)=>{
      const old=data.stock[item.id]||{qty:0,cost:0},next=projected(item,c.totals[i]);return[item.name,number(old.qty),'+'+number(item.qty),number(next.qty),catalog(old.cost),catalog(next.cost)];
    })));
  }
  return c;
}
// Cost edits derive Unit; quantity edits then preserve that full-precision Unit.
function reconcileItem(item) {
  if(item.mode==='unit') {
    item.unitPrice=item.amount;
    item.cost=Number.isFinite(item.qty)&&item.qty>0 ? Math.round(item.qty*item.unitPrice*100)/100 : NaN;
  } else {
    item.cost=item.amount;
    item.unitPrice=Number.isFinite(item.qty)&&item.qty>0 ? item.cost/item.qty : NaN;
  }
}
function renderItems() {
  $('items').replaceChildren();
  const t=document.createElement('table');t.className='items-table';
  t.innerHTML='<thead><tr><th>Catalog Item</th><th>QTY</th><th>Unit</th><th>Cost</th><th>Fee</th><th>Line</th><th><span class="sr-only">Actions</span></th></tr></thead><tbody></tbody>';
  const body=t.querySelector('tbody');
  draft.items.forEach(item=>{
    const row=document.createElement('tr');row.className='item';
    row.innerHTML='<td><input data-field="name" aria-label="Catalog Item"></td><td><input data-field="qty" aria-label="QTY" type="number" min="1" step="1"></td><td><input data-field="unitPrice" aria-label="Unit" type="number" min="0" step="any"></td><td><input data-field="cost" aria-label="Cost" type="number" min="0" step="0.01"></td><td><input data-field="fee" aria-label="Fee" type="number" min="0" step="0.01"></td><td><output aria-label="Line"></output></td><td class="row-actions"><button type="button" class="secondary recalculate" title="Recalculate using the last edited price" aria-label="Recalculate item">↻</button> <button type="button" class="secondary remove">Remove</button></td>';
    function display() {
      row.querySelectorAll('[data-field]').forEach(input=>{
        const field=input.dataset.field, value=item[field];
        input.value=field==='name'?value:!Number.isFinite(value)?'':field==='unitPrice'?((item.unitEntered ?? item.mode==='unit')?value:value.toFixed(6)):['cost','fee'].includes(field)?value.toFixed(2):value;
        input.disabled=!editable();
      });
      row.querySelector('output').textContent=Number.isFinite(item.cost)&&Number.isFinite(item.fee)?((Math.round(item.cost*100)+Math.round(item.fee*100))/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';
    }
    row.querySelectorAll('[data-field]').forEach(input=>input.addEventListener('change',()=>{
      const field=input.dataset.field;
      item[field]=field==='name'?input.value:(input.value===''?NaN:Number(input.value));
      if(field==='unitPrice'){item.mode='unit';item.amount=item.unitPrice;item.unitEntered=true;}
      if(field==='cost'){item.mode='total';item.amount=item.cost;item.unitEntered=false;}
      if(field==='qty'){item.unitEntered ??= item.mode==='unit';item.mode='unit';item.amount=item.unitPrice;}
      if(['unitPrice','cost','qty'].includes(field))reconcileItem(item);
      display();totals();save();
    }));
    const refresh=row.querySelector('.recalculate');refresh.hidden=!editable();refresh.addEventListener('click',()=>{reconcileItem(item);display();totals();save();});
    const remove=row.querySelector('.remove');remove.hidden=!editable();remove.addEventListener('click',()=>{draft.items=draft.items.filter(i=>i.id!==item.id);renderItems();totals();save();});
    display();body.append(row);
  });
  $('items').append(t);
}
function renderNotes() {
  $('notes').replaceChildren();
  if(!data.notes.length){const p=document.createElement('p');p.className='hint';p.textContent='No notes yet.';$('notes').append(p);}
  data.notes.forEach(note=>{const div=document.createElement('article');div.className='note';const who=document.createElement('small');who.textContent=`Jarod Nash · ${new Date(note.at).toLocaleString()}`;const p=document.createElement('p');p.textContent=note.text;div.append(who,p);$('notes').append(div);});
}
function renderInventory() {
  const pending=data.status==='Ordered';
  $('inventory').replaceChildren(table(['Item','Held stock (all locations)','Ordered','Catalog unit cost'],Object.entries(data.stock).map(([id,s])=>[s.name,number(s.qty),number(pending?data.order.items.filter(i=>i.id===id).reduce((n,i)=>n+i.qty,0):0),catalog(s.cost)])));
  if(data.postedAt){const p=document.createElement('p');p.className='hint';p.textContent=`Receipt posted ${new Date(data.postedAt).toLocaleString()} to ${data.order.location}.`;$('inventory').append(p);}
}
function button(text, fn, secondary=false) {const b=document.createElement('button');b.type='button';b.textContent=text;if(secondary)b.className='secondary';b.addEventListener('click',fn);$('actions').append(b);}
function notice(message){$('message').textContent=message;}
function valid() {
  if(totals().errors.length)return false;
  if(!draft.name.trim()||!draft.manufacturer.trim()||!draft.location.trim()||!draft.ordered||(['receive','confirm'].includes(screen)&&!draft.received)) { $('error').textContent='Complete the purchase name, manufacturer, location, ordered date, and received date when receiving.';return false; }
  return true;
}
function enter(next){screen=next;draft=clone(data.order);if(next==='receive')draft.received=today();notice('');render();save();}
function commit(){if(!valid())return;data.order=clone(draft);data.status='Ordered';for(const i of draft.items)if(!data.stock[i.id])data.stock[i.id]={name:i.name,qty:0,cost:0};screen='view';render();notice('Purchase saved. Ordered quantities updated; held stock and catalog costs are unchanged.');save();}
function postReceipt(){
  if(data.status!=='Ordered'||data.postedAt||!valid())return;
  const c=calculate(draft);
  draft.items.forEach((item,i)=>{data.stock[item.id]={name:item.name,...projected(item,c.totals[i])};});
  data.order=clone(draft);data.status='Received';data.postedAt=new Date().toISOString();screen='view';render();notice('Receipt finalized. Ordered quantities cleared; stock and catalog costs updated.');save();
}
function render() {
  $('title').textContent=screen==='create'?'New purchase':screen==='edit'?'Modify purchase':screen==='receive'?'Receive purchase':screen==='confirm'?'Review receipt':data.order.name;
  $('badge').textContent=data.status==='Ordered'&&data.order.shipped?'Ordered · Shipped':data.status;
  $('guidance').textContent=screen==='create'?'Record the order when it is placed. Stock and catalog costs update only on receipt.':screen==='receive'?'Verify actual quantities and final costs. Remove missing lines and explain differences in Notes.':screen==='confirm'?'Review the final inventory effects, then confirm receipt.':data.status==='Received'?'This purchase is finalized. Add notes here; make later inventory or cost corrections separately.':'Edit the order, record an optional shipment date, or receive it directly.';
  document.querySelectorAll('[data-meta]').forEach(input=>{input.value=draft[input.dataset.meta];input.disabled=!editable();});
  document.querySelectorAll('[data-charge]').forEach(input=>{input.value=draft[input.dataset.charge];input.disabled=!editable();});
  $('received-label').hidden=!['receive','confirm'].includes(screen)&&data.status!=='Received';
  $('add-line').hidden=!editable();$('confirmation').hidden=screen!=='confirm';
  renderItems();totals();renderNotes();renderInventory();$('actions').replaceChildren();
  if(screen==='create')button('Save as Ordered',commit);
  if(screen==='edit'){button('Discard changes',()=>enter('view'),true);button('Save changes',commit);}
  if(screen==='view'&&data.status==='Ordered'){
    button('Edit purchase',()=>enter('edit'),true);
    if(!data.order.shipped)button('Mark shipped (optional)',()=>{enter('edit');draft.shipped=today();render();$('shipped').focus();notice('Verify the shipped date, then save changes. Shipping does not change inventory or cost.');},true);
    button('Receive purchase',()=>enter('receive'));
  }
  if(screen==='receive'){button('Cancel receiving',()=>enter('view'),true);button('Review receipt',()=>{if(valid()){screen='confirm';render();save();$('confirmation').scrollIntoView({behavior:'smooth',block:'start'});}});}
  if(screen==='confirm'){button('Back to receipt details',()=>{screen='receive';render();save();},true);button('Confirm receipt',postReceipt);}
}
document.querySelectorAll('[data-meta],[data-charge]').forEach(input=>input.addEventListener('change',()=>{const field=input.dataset.meta||input.dataset.charge;draft[field]=input.dataset.charge?(input.value===''?NaN:Number(input.value)):input.value;totals();save();}));
$('purchase').addEventListener('submit',event=>event.preventDefault());
$('add-line').addEventListener('click',()=>{draft.items.push({id:'item-'+Date.now(),name:'',qty:1,mode:'total',amount:0,unitPrice:0,cost:0,fee:0});renderItems();totals();save();});
$('add-note').addEventListener('click',()=>{const text=$('note').value.trim();if(!text)return;data.notes.unshift({text,at:new Date().toISOString()});$('note').value='';renderNotes();save();notice('Note added.');});
$('example').addEventListener('change',event=>{
  const choice=event.target.value;if(!choice)return;data=sample();draft=clone(data.order);screen=choice==='new'?'create':'view';
  if(choice!=='new'){data.status='Ordered';data.notes=[{text:'Order placed with the vendor. Bonus units are included in each quantity.',at:new Date().toISOString()}];}
  if(choice==='shipped'){data.order.shipped=today();draft=clone(data.order);}
  if(choice==='received'){screen='confirm';draft.received=today();postReceipt();}
  $('note').value='';render();notice('Example loaded. All actions affect local demo data only.');save();event.target.value='';
});
try {const stored=JSON.parse(localStorage.getItem(key));if(stored){({data,draft,screen}=stored);if(!data.order||!draft.items)throw new Error('Invalid saved demo');}} catch {data=null;}
if(!data){data=sample();draft=clone(data.order);screen='create';}
for(const order of [data.order,draft]) order.shippingAllocation ??= 'quantity';
// Upgrade locally saved examples from the previous price-selector form.
for(const order of [data.order,draft]) for(const item of order.items) {
  if(!Object.prototype.hasOwnProperty.call(item,'unitPrice'))reconcileItem(item);
}
render();
