const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const script=fs.readFileSync('public/inventory-index/mockup.js','utf8');
const matching=script.slice(script.indexOf('function matching('),script.indexOf('\nfunction make('));
const csv=script.slice(script.indexOf('function csvCell('),script.indexOf("\n$('download').addEventListener"));
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync('public/inventory-index/data.js','utf8')+`
const balances=['central','indianapolis','ames','boston','event','transit','ordered'];
const available=i=>i.central+i.indianapolis+i.ames+i.boston;
const value=(i,k)=>k==='available'?available(i):i[k];
`+matching+csv+`
const criteria={text:'',collections:[],includeInactive:false};
let rows=matching(criteria),columns=[['name','Name'],['available','Available'],['central','Central']];
this.total=inventoryItems.length;this.defaultCount=rows.length;
this.all=matching({...criteria,includeInactive:true}).length;
this.edgeNames=rows.filter(i=>!i.active).map(i=>i.name);
rows=matching({...criteria,collections:['Ribbons : Pronouns']});
this.csv=displayedCSV();this.rowCount=rows.length;
this.filtered=matching({...criteria,text:'he-him',collections:['Buttons : Buttons']}).length;
this.caseCount=matching({...criteria,text:'RIBBONS'}).length;
`,ctx);
assert.equal(ctx.total,225);assert.equal(ctx.defaultCount,224);assert.equal(ctx.all,225);assert.equal(ctx.edgeNames.length,2);assert.equal(ctx.filtered,0);assert.equal(ctx.caseCount,38);assert.equal(ctx.csv.split('\r\n').length,ctx.rowCount+1);assert(ctx.csv.includes('"Any-All","1740","1200"'));assert(!ctx.csv.includes('Button'));assert(!ctx.csv.includes('undefined'));
console.log('PASS: 225 fixtures; inactive zero/offset/order rules; AND filtering; case-insensitive search; displayed-row CSV values and complete row count.');
