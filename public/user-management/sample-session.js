
'use strict';
// Open a separate sample without clearing this example or its unsaved work.
function sampleKey(base){const token=new URLSearchParams(window.location.search).get('sample');return token?base+':sample:'+token.slice(0,80):base;}
function freshSampleURL(){const target=new URL(window.location.href);target.search='';target.hash='';target.searchParams.set('sample',Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8));return target.href;}
const newSampleLink=document.querySelector('#new-sample');
if(newSampleLink){newSampleLink.href=freshSampleURL();newSampleLink.onclick=()=>{newSampleLink.href=freshSampleURL();};newSampleLink.title='Open a fresh independent sample in a new tab; preserve this example';}
