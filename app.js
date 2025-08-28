function formatPrice(n){return new Intl.NumberFormat('ru-RU').format(n)+' ₽';}
function qs(s){return document.querySelector(s);}
async function loadListings(){
  const res = await fetch('data/listings.json?_=' + Date.now());
  const all = await res.json();
  return all.filter(x=>x.published);
}
function ytEmbed(url){
  if(!url) return '';
  try{
    const u = new URL(url);
    let id = '';
    if(u.hostname.includes('youtu.be')){ id = u.pathname.slice(1); }
    else if(u.searchParams.get('v')){ id = u.searchParams.get('v'); }
    if(!id) return '';
    return `<iframe class="video" src="https://www.youtube.com/embed/${id}" allowfullscreen></iframe>`;
  }catch(e){ return ''; }
}
async function renderGrid(){
  const items = await loadListings();
  const q = (qs('#q')?.value||'').toLowerCase().trim();
  const minp = parseInt(qs('#minp')?.value||'0',10);
  const maxp = parseInt(qs('#maxp')?.value||'0',10);
  const beds = parseInt(qs('#beds')?.value||'0',10);
  const filtered = items.filter(it=>{
    if(q && !(it.title.toLowerCase().includes(q) || it.location.toLowerCase().includes(q))) return false;
    if(minp && it.price_rub < minp) return false;
    if(maxp && it.price_rub > maxp) return false;
    if(beds && it.bedrooms < beds) return false;
    return true;
  });
  qs('#grid').innerHTML = filtered.map(it=>`
    <a class="card" href="listing.html?id=${encodeURIComponent(it.id)}">
      <img src="${it.cover}" alt="${it.title}">
      <div class="pad">
        <div class="title">${it.title}</div>
        <div>${it.location}</div>
        <div class="pills">
          <div class="pill">${it.area_m2} м²</div>
          <div class="pill">${it.bedrooms} сп.</div>
          <div class="pill">${it.bathrooms} с/у</div>
          <div class="pill">${it.lot_m2} м² участок</div>
        </div>
        <div class="pad"><span class="badge">${formatPrice(it.price_rub)}</span></div>
      </div>
    </a>
  `).join('');
}
async function renderDetails(){
  const id = new URLSearchParams(location.search).get('id');
  if(!id){ location.href='index.html'; return; }
  const items = await loadListings();
  const it = items.find(x=>x.id===id);
  if(!it){ qs('#details').innerHTML = '<p>Объект не найден.</p>'; return; }
  document.title = it.title + ' — ПроУют';
  const extLinks = [];
  if(it.links){
    if(it.links.telegram) extLinks.push(`<a class="ext" href="${it.links.telegram}" target="_blank" rel="noopener">Telegram</a>`);
    if(it.links.whatsapp) extLinks.push(`<a class="ext" href="${it.links.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`);
    if(it.links.vk)       extLinks.push(`<a class="ext" href="${it.links.vk}" target="_blank" rel="noopener">VK</a>`);
    if(it.links.youtube)  extLinks.push(`<a class="ext" href="${it.links.youtube}" target="_blank" rel="noopener">YouTube</a>`);
  }
  const videoHtml = ytEmbed(it.links?.video || it.links?.youtube);
  qs('#details').innerHTML = `
    <div>
      <h1>${it.title}</h1>
      <div>${it.location}</div>
      <div class="pills" style="margin:10px 0;">
        <div class="pill">${it.area_m2} м²</div>
        <div class="pill">${it.bedrooms} спален</div>
        <div class="pill">${it.bathrooms} санузла</div>
        <div class="pill">${it.lot_m2} м² участок</div>
      </div>
      <div class="gallery">
        ${it.photos.map(p=>`<img src="${p}" alt="${it.title}">`).join('')}
      </div>
      ${videoHtml}
    </div>
    <div>
      <div style="font-size:22px;font-weight:800;margin-bottom:10px;">${formatPrice(it.price_rub)}</div>
      <p>${it.description}</p>
      <ul>${it.features.map(f=>`<li>${f}</li>`).join('')}</ul>
      <div class="link-row">
        <a class="btn primary" href="tel:+79882483010">Позвонить</a>
        ${extLinks.join('')}
      </div>
    </div>
  `;
}
if(document.getElementById('grid')){ renderGrid(); document.getElementById('apply').addEventListener('click', renderGrid); }
if(document.getElementById('details')){ renderDetails(); }
