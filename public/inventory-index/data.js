/* Illustrative data only. Twelve balances reproduce the user's draft; all other rows are demo fixtures. */
const inventoryCollections = [
 ['Badge Holder','Badge Holder'],['Buttons','Buttons'],['Calendar','Seasons of Pride'],
 ['Enamel Pins','Animals'],['Enamel Pins','Queer Coven'],['Enamel Pins','Special'],
 ['Equipment','Donations'],['Equipment','Banners'],['Equipment','Tablecloth'],
 ['Handouts','Info Sheets'],['Handouts','Partners'],['Program','Gaming Safe Space'],
 ['Program','Gayme Night'],['Program','Gayme Night Games'],['Program','Reroll'],
 ['Ribbons','GA'],['Ribbons','Pride Flag'],['Ribbons','Pronouns'],['Ribbons','Special'],
 ['Ribbons','Trays - Cards'],['RPG','Queer Coven'],['Shipping','Boxes'],
 ['Shipping','Consumables'],['Shipping','Hardware'],['Shipping','Signage'],
 ['Tokens','Sponsor'],['Wristbands','Wristbands']
].map(([category,collection])=>({category,collection,key:category+' : '+collection})).sort((a,b)=>a.key.localeCompare(b.key));
const inventoryItems=[];
function demoItem(category,collection,name,balances=[0,0,0,0,0,0,0],active=true){
 inventoryItems.push({id:'item-'+(inventoryItems.length+1),category,collection,key:category+' : '+collection,name,active,
 central:balances[0]||0,indianapolis:balances[1]||0,ames:balances[2]||0,boston:balances[3]||0,event:balances[4]||0,transit:balances[5]||0,ordered:balances[6]||0});
}
demoItem('Buttons','Buttons','Ally Button',[5500,800,50,36,350,0,2000]);
demoItem('Buttons','Buttons','Gaymer Button',[7000,1250,27,72,500,0,3000]);
demoItem('Buttons','Buttons','Support Trans Youth Button',[3500,720,0,15,1000]);
demoItem('Buttons','Buttons',"I'll Go With You Button",[4100,34,5,22,500]);
demoItem('Ribbons','GA','Ally Ribbon',[12000,2300,3000,500,5500,15000]);
demoItem('Ribbons','GA','Gaymer Ribbon',[11500,150,3500,600,5260,15000]);
demoItem('Ribbons','Pronouns','Any-All',[1200,240,0,300,2000,5000]);
demoItem('Ribbons','Pronouns','He-Him',[4000,800,2200,700,3000]);
demoItem('Ribbons','Pronouns','He-They',[2000,400,0,700,1000]);
demoItem('Ribbons','Pronouns','She-Her',[5500,900,1700,500,3000]);
demoItem('Ribbons','Pronouns','She-They',[1750,350,0,100,1000,5000]);
demoItem('Ribbons','Pronouns','They-Them',[1500,1330,560,200,2000]);
demoItem('Buttons','Buttons','Retired Button — zero stock',[],false);
demoItem('Buttons','Buttons','Retired Button — pending order',[0,0,0,0,0,0,250],false);
demoItem('Buttons','Buttons','Retired Button — offset balances',[10,-10],false);
demoItem('Wristbands','Wristbands','New Wristband — zero stock');
const labels={'Badge Holder':'Clear Badge Holder','Seasons of Pride':'Seasons of Pride Calendar','Animals':'Animal Enamel Pin','Queer Coven':'Queer Coven','Special':'Special Edition','Donations':'Donation Display','Banners':'Event Banner','Tablecloth':'Tablecloth','Info Sheets':'Information Sheet','Partners':'Partner Handout','Gaming Safe Space':'Gaming Safe Space Kit','Gayme Night':'Gayme Night Flyer','Reroll':'Reroll Card','Pride Flag':'Pride Flag Ribbon','Trays - Cards':'Ribbon Display Tray','Consumables':'Packing Tape','Hardware':'Shipping Tool','Signage':'Shipping Label Sign','Sponsor':'Sponsor Token','Wristbands':'Wristband','Buttons':'Button','GA':'GA Ribbon','Pronouns':'Pronoun Ribbon'};
const general=inventoryCollections.filter(c=>c.collection!=='Boxes'&&c.collection!=='Gayme Night Games');
let variant=0;
while(inventoryItems.length<160){
 const c=general[variant%general.length],n=Math.floor(variant/general.length)+1;
 demoItem(c.category,c.collection,(labels[c.collection]||c.collection)+' — Sample '+String(n).padStart(2,'0'),[30+n*15,c.category==='Shipping'?0:n*3,c.category==='Shipping'?0:n*2,0,0,0,0]);
 variant++;
}
for(let i=1;i<=30;i++)demoItem('Shipping','Boxes',['Shipping Box','Padded Envelope','Rigid Mailer'][(i-1)%3]+' — Size '+String(i).padStart(2,'0'),[25+i*5]);
for(let i=1;i<=35;i++)demoItem('Program','Gayme Night Games','Gayme Night Game — Sample '+String(i).padStart(2,'0'),[i%4===0?0:1,i%4===0?1:0]);
