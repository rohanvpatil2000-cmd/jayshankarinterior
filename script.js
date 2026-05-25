const images = ["bedroom1.jpeg", "bedroom2.jpeg", "Full cushion sofa1.jpeg", "Full cushion sofa2.jpeg", "Full cushion sofa3.jpeg", "Full cushion sofa4.jpeg", "Full cushion sofa5.jpeg", "hero-bedroom.jpeg", "Hydrulic bed.jpeg", "Hydrulic bed1.jpeg", "kitchen1.jpeg", "kitchen2.jpeg", "kitchen3.jpeg", "kitchen4.jpeg", "TV unit 1.jpeg", "TV unit 2.jpeg", "TV unit 3.jpeg", "TV unit 4.jpeg", "Wardrobe1.jpeg", "Wardrobe2.jpeg"];
const gallery=document.getElementById('gallery');
images.forEach(name=>{
 const card=document.createElement('div'); card.className='card';
 const img=document.createElement('img'); img.src='images/'+name; img.alt=name;
 img.onerror=()=>card.remove();
 const cap=document.createElement('div'); cap.className='caption'; cap.textContent=name;
 card.appendChild(img); card.appendChild(cap); gallery.appendChild(card);
});