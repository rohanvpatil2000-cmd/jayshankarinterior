
function setupSlider(id, images){
 let i=0; const el=document.getElementById(id); if(!el||!images.length) return;
 el.src=images[0];
 setInterval(()=>{i=(i+1)%images.length; el.src=images[i];},3000);
}
