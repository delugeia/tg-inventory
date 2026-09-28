'use strict';
const key=sampleKey('tg-user-profile-draft-v2');
let saved={first:'Gabby',last:'Barloon'},dirty=false,storageOK=true;
try{const raw=localStorage.getItem(key);if(raw){const value=JSON.parse(raw);if(typeof value.first==='string'&&typeof value.last==='string')saved=value;}}catch{storageOK=false;}
const first=document.querySelector('#first'),last=document.querySelector('#last');
function notice(text,error=false){const n=document.querySelector('dialog[open] .dialog-notice')||document.querySelector('#notice');n.hidden=false;n.className='notice'+(error?' error':'');n.textContent=text;n.setAttribute('role',error?'alert':'status');if(error){n.tabIndex=-1;n.focus({preventScroll:true});n.scrollIntoView({block:'nearest'});}}
function restore(){first.value=saved.first;last.value=saved.last;dirty=false;}
restore();if(!storageOK)notice('Browser storage is unavailable. Name changes will last only while this page stays open.',true);
document.querySelector('#profile').addEventListener('input',()=>dirty=first.value!==saved.first||last.value!==saved.last);
document.querySelector('#profile').addEventListener('submit',event=>{event.preventDefault();saved={first:first.value.trim(),last:last.value.trim()};restore();try{localStorage.setItem(key,JSON.stringify(saved));notice('Your name has been saved in this demo.');}catch{notice('Name updated for this page only; browser storage is unavailable.',true);}});
document.querySelector('#cancel').onclick=()=>{restore();notice('Returned to your saved name.');};
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
