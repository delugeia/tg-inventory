'use strict';
// Copied from the established purchase-entry mockup; same allocation/validation rules.
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
  const shipping=allocate(Math.round(order.shipping*100),order.items.map(i=>i.qty));
  const totals=net.map((n,i)=>n+tax[i]+shipping[i]);
  return {errors:[],merch,fees,other,discount,tax,shipping,totals,total:totals.reduce((a,b)=>a+b,0)};
}

