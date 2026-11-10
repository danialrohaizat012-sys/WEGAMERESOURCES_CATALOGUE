(function(){
"use strict";
const CATS = [
  {id:"", label:"Semua"},
  {id:"konsol", label:"Konsol"},
  {id:"controller", label:"Controller"},
  {id:"aksesori", label:"Aksesori"},
  {id:"sparepart", label:"Alat Ganti"}
];
const PLATFORMS = ["PS5","PS4","Switch 2","Switch","Xbox Series","Xbox One","PC","Universal"];
const CONDITIONS = ["Baru","Refurbished","OEM"];
const UNITS = ["unit","pcs","set","pek","kotak"];
const ICONS = {
  konsol:'<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"><path d="M40 12c6-3 12-3 14 2l3 62c0 4-4 6-10 4l-8-3c-3-1-4-3-4-6V18c0-3 2-5 5-6z"/><path d="M80 12c-6-3-12-3-14 2l-3 62c0 4 4 6 10 4l8-3c3-1 4-3 4-6V18c0-3-2-5-5-6z"/><path d="M57 14h6v62h-6z"/></svg>',
  controller:'<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M38 26h44c10 0 15 6 17 14l6 22c2 9-8 14-14 7l-9-10H38l-9 10c-6 7-16 2-14-7l6-22c2-8 7-14 17-14z"/><path d="M36 38v12M30 44h12"/><circle cx="80" cy="39" r="2.5" fill="currentColor"/><circle cx="88" cy="46" r="2.5" fill="currentColor"/><circle cx="72" cy="46" r="2.5" fill="currentColor"/><circle cx="80" cy="53" r="2.5" fill="currentColor"/></svg>',
  aksesori:'<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M32 58V48a28 28 0 0 1 56 0v10"/><rect x="24" y="52" width="14" height="24" rx="5"/><rect x="82" y="52" width="14" height="24" rx="5"/></svg>',
  sparepart:'<svg viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><rect x="38" y="20" width="44" height="50" rx="5"/><rect x="50" y="34" width="20" height="22" rx="2"/><path d="M30 30h8M30 42h8M30 54h8M82 30h8M82 42h8M82 54h8M48 12v8M60 12v8M72 12v8M48 70v8M60 70v8M72 70v8"/></svg>'
};
const SVG = {
  all:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
  gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M7 9l5-5 5 5M5 20h14"/></svg>'
};

/* ---------- state ---------- */
let data = {settings:Object.assign({}, (window.WG_SEED||{}).settings), products:[]};
const ui = {cat:"", q:"", platform:"", brand:"", status:"", sort:"featured", view:"grid", admin:false, canEdit:true, loaded:false};
try{ const v = localStorage.getItem("wg-view"); if(v==="list"||v==="grid") ui.view = v; }catch(e){}
let quote = [];
try{ quote = JSON.parse(localStorage.getItem("wg-quote")||"[]") || []; }catch(e){ quote = []; }
const Store = window.WGStore;

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function rm(n){ return "RM " + Number(n||0).toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2}); }
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.from((r||document).querySelectorAll(s)); }
function uid(){ return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function today(){ const d = new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function fmtDate(s){ if(!s) return ""; const [y,m,d] = s.split("-").map(Number); const M=["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis"]; return d+" "+M[m-1]+" "+y; }
function S(){ return data.settings; }
function status(p){
  if(p.stock<=0) return p.preorder ? {k:"info",t:"Pra-tempah"} : {k:"bad",t:"Habis stok"};
  if(p.stock<=Number(S().lowStock||0)) return {k:"warn",t:"Stok rendah"};
  return {k:"ok",t:"Ada stok"};
}
function tiersOf(p){ return (p.tiers||[]).filter(t=>t && t.price>0 && t.min>0).sort((a,b)=>a.min-b.min); }
function minPrice(p){ const t = tiersOf(p); return t.length ? Math.min.apply(null,t.map(x=>x.price)) : 0; }
function basePrice(p){ const t = tiersOf(p); return t.length ? t[0].price : 0; }
function priceFor(p,qty){ const t = tiersOf(p); let pr = t.length?t[0].price:0; t.forEach(x=>{ if(qty>=x.min) pr = x.price; }); return pr; }
function tierLabel(t,i,arr,unit){ const next = arr[i+1]; return next ? (t.min+"–"+(next.min-1)+" "+unit) : (t.min+"+ "+unit); }
function art(p){ return p.image ? '<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy">' : '<div class="art" aria-hidden="true">'+(ICONS[p.category]||ICONS.aksesori)+'</div>'; }
function catLabel(id){ const c = CATS.find(c=>c.id===id); return c?c.label:id; }
function condTag(p){ const cls = p.condition==="Refurbished"?"refurb":p.condition==="OEM"?"oem":""; return '<span class="tag cond '+cls+'">'+esc(p.condition)+'</span>'; }
function saveQuote(){ try{ localStorage.setItem("wg-quote", JSON.stringify(quote)); }catch(e){} }
function applyDb(db){ data = db; ui.loaded = true; renderAll(); }
async function persist(fn, okMsg){ try{ applyDb(await fn()); if(okMsg) toast(okMsg); return true; }catch(e){ toast((e && e.message) || "Gagal menyimpan. Cuba lagi."); return false; } }

let toastT;
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(()=>{ t.hidden = true; }, 2600); }

/* ---------- mount ---------- */
$("#app").appendChild(document.getElementById("wg-shell").content.cloneNode(true));

function renderAll(){ renderIntro(); renderTabs(); renderFilters(); renderResults(); renderFooter(); renderQuoteCount(); $("#btn-admin").setAttribute("aria-pressed", ui.admin?"true":"false"); $("#btn-admin").classList.toggle("accent", ui.admin); }

function renderIntro(){
  const s = S(), ps = data.products;
  $("#intro-eyebrow").innerHTML = ui.admin ? '<span class="admin-flag">Mod pengurusan</span>' : "Katalog Borong " + (s.updated||"").slice(0,4);
  $("#intro-sub").textContent = s.tagline + " Tambah item ke senarai sebut harga dan hantar kepada kami untuk harga akhir.";
  const inStock = ps.filter(p=>p.stock>0).length;
  $("#stats").innerHTML =
    '<div class="stat"><b>'+ps.length+'</b><span>SKU dalam katalog</span></div>'+
    '<div class="stat"><b>'+inStock+'</b><span>Sedia untuk dihantar</span></div>'+
    '<div class="stat"><b style="font-size:17px;padding-block:5px">'+esc(fmtDate(s.updated))+'</b><span>Kemas kini terakhir</span></div>';
  let n = "";
  if(s.sample){
    n = '<div class="notice"><span>Katalog ini memaparkan <b>data contoh</b>. Harga dan stok bukan angka sebenar.</span>' + (ui.admin ? '<button class="btn sm" id="clear-sample">Buang data contoh</button>' : '') + '</div>';
  }
  if(ui.admin) n += '<div class="notice" style="background:var(--info-soft);color:var(--info)"><span><b>Versi demo:</b> semua perubahan disimpan dalam pelayar ini sahaja (localStorage). Pelanggan di peranti lain tidak akan nampak perubahan sehingga sistem disambung ke pangkalan data.</span></div>';
  $("#notice-slot").innerHTML = n;
  const cs = $("#clear-sample"); if(cs) cs.onclick = ()=>confirmBox("Buang semua data contoh?", "Semua produk contoh akan dipadam supaya anda boleh masukkan inventori sebenar. Produk yang anda tambah sendiri tidak terjejas.", "Buang data contoh", ()=>{ const ids = data.products.filter(p=>/^p\d\d$/.test(p.id)).map(p=>p.id); ui.admin = true; persist(async ()=>{ const db = await Store.deleteProducts(ids); db.settings.sample = false; return Store.saveSettings(db.settings); }, "Data contoh dibuang"); });
}

function renderTabs(){
  const counts = {}; data.products.forEach(p=>{ counts[p.category]=(counts[p.category]||0)+1; });
  $("#tabs").innerHTML = CATS.map(c=>{
    const n = c.id ? (counts[c.id]||0) : data.products.length;
    const ic = c.id ? ICONS[c.id].replace('stroke-width="3.5"','stroke-width="7"') : SVG.all;
    return '<button class="tab" data-cat="'+c.id+'" aria-pressed="'+(ui.cat===c.id)+'">'+ic+esc(c.label)+' <span class="c">'+n+'</span></button>';
  }).join("");
  $$("#tabs .tab").forEach(b=>b.onclick=()=>{ ui.cat = b.dataset.cat; renderTabs(); renderResults(); });
}

function renderFilters(){
  const plats = PLATFORMS.filter(pl=>data.products.some(p=>(p.platforms||[]).includes(pl)));
  $("#f-platform").innerHTML = '<option value="">Semua platform</option>' + plats.map(p=>'<option'+(ui.platform===p?' selected':'')+'>'+esc(p)+'</option>').join("");
  const brands = Array.from(new Set(data.products.map(p=>p.brand).filter(Boolean))).sort();
  $("#f-brand").innerHTML = '<option value="">Semua jenama</option>' + brands.map(b=>'<option'+(ui.brand===b?' selected':'')+'>'+esc(b)+'</option>').join("");
  $("#f-status").value = ui.status; $("#f-sort").value = ui.sort;
  $("#f-status").hidden = !S().showStock && !ui.admin;
  $("#v-grid").setAttribute("aria-pressed", ui.view==="grid"); $("#v-list").setAttribute("aria-pressed", ui.view==="list");
}

function filtered(){
  const q = ui.q.trim().toLowerCase();
  let list = data.products.filter(p=>{
    if(ui.cat && p.category!==ui.cat) return false;
    if(ui.platform && !(p.platforms||[]).includes(ui.platform)) return false;
    if(ui.brand && p.brand!==ui.brand) return false;
    if(ui.status && status(p).k!==ui.status) return false;
    if(q){ const hay = [p.name,p.sku,p.brand,(p.platforms||[]).join(" "),p.desc,p.specs,catLabel(p.category)].join(" ").toLowerCase(); if(!q.split(/\s+/).every(w=>hay.includes(w))) return false; }
    return true;
  });
  const rank = p=>{ const k = status(p).k; return k==="bad"?2:0; };
  const by = {
    featured:(a,b)=> rank(a)-rank(b) || (b.featured?1:0)-(a.featured?1:0) || CATS.findIndex(c=>c.id===a.category)-CATS.findIndex(c=>c.id===b.category) || a.name.localeCompare(b.name),
    name:(a,b)=>a.name.localeCompare(b.name),
    "price-asc":(a,b)=>basePrice(a)-basePrice(b),
    "price-desc":(a,b)=>basePrice(b)-basePrice(a),
    stock:(a,b)=>b.stock-a.stock
  };
  return list.sort(by[ui.sort]||by.featured);
}

function priceBlock(p){
  if(!S().showPrices) return '<div class="price"><small>Harga borong</small><span class="ask">Hubungi untuk harga</span></div>';
  const t = tiersOf(p);
  if(!t.length) return '<div class="price"><small>Harga borong</small><span class="ask">Hubungi untuk harga</span></div>';
  const lo = minPrice(p);
  return '<div class="price"><small>'+(t.length>1?"Borong dari":"Harga borong")+'</small><b>'+rm(lo)+'</b></div>';
}
function stockPill(p){ if(!S().showStock && !ui.admin) return ""; const s = status(p); return '<span class="pill '+s.k+'">'+s.t+(ui.admin && p.stock>0?' · '+p.stock:'')+'</span>'; }

function renderResults(){
  const list = filtered(), root = $("#results");
  $("#result-count").textContent = list.length + " produk";
  let html = "";
  if(ui.admin){
    html += '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px"><button class="btn primary" id="add-product">'+SVG.plus+'Tambah produk</button><button class="btn" id="open-settings">'+SVG.gear+'Tetapan syarikat</button><label class="btn" for="csv-in" style="cursor:pointer">'+SVG.upload+'Import CSV</label><input id="csv-in" type="file" accept=".csv,text/csv" hidden><button class="btn" id="copy-csv">'+SVG.copy+'Salin CSV</button><button class="btn ghost danger" id="reset-demo" style="margin-left:auto">Reset data demo</button></div>';
  }
  if(!list.length){
    html += (data.products.length || !ui.loaded)
      ? '<div class="empty"><h3>Tiada produk sepadan</h3><p>Cuba kata kunci lain atau tetapkan semula penapis.</p><button class="btn" id="reset-f">Tetapkan semula penapis</button></div>'
      : '<div class="empty"><h3>Katalog masih kosong</h3><p>'+(ui.canEdit?'Tekan “Urus”, kemudian “Tambah produk” atau “Import CSV” untuk masukkan inventori.':'Produk akan dipaparkan di sini tidak lama lagi.')+'</p></div>';
  } else if(ui.view==="grid"){
    html += '<div class="grid">' + list.map(p=>{
      const inQ = quote.find(q=>q.id===p.id);
      const out = status(p).k==="bad";
      return '<article class="card" data-id="'+p.id+'">'+
        '<button class="thumb" data-open="'+p.id+'" aria-label="Lihat '+esc(p.name)+'">'+art(p)+stockPill(p)+condTag(p)+'</button>'+
        '<div class="card-body">'+
          '<div class="meta"><span>'+esc(p.brand)+'</span><span class="dot"></span><span class="mono">'+esc(p.sku)+'</span></div>'+
          '<h3 data-open="'+p.id+'">'+esc(p.name)+'</h3>'+
          '<div class="chips">'+(p.platforms||[]).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div>'+
          '<div class="price-row">'+priceBlock(p)+'<div class="moq">MOQ<br><b class="num">'+p.moq+' '+esc(p.unit)+'</b></div></div>'+
          '<div class="card-actions"><button class="btn sm" data-open="'+p.id+'">Butiran</button><button class="btn sm '+(inQ?'':'primary')+'" data-add="'+p.id+'"'+(out?' disabled':'')+'>'+(inQ?'✓ Dalam senarai':'+ Sebut harga')+'</button></div>'+
        '</div>'+
        (ui.admin?'<div class="admin-strip"><button class="btn sm" data-edit="'+p.id+'">Edit</button><button class="btn sm" data-dup="'+p.id+'">Salin</button><button class="btn sm danger" data-del="'+p.id+'">Padam</button></div>':'')+
      '</article>';
    }).join("") + '</div>';
  } else {
    html += '<div class="list"><table><thead><tr><th>Produk</th><th>Platform</th><th>Status</th><th class="r">MOQ</th><th class="r">Harga borong</th><th></th></tr></thead><tbody>'+
      list.map(p=>{
        const inQ = quote.find(q=>q.id===p.id); const out = status(p).k==="bad";
        const price = S().showPrices && tiersOf(p).length ? rm(minPrice(p)) : '<span style="color:var(--brand);font-weight:600">Hubungi</span>';
        return '<tr><td><div class="nm"><div class="mini">'+art(p)+'</div><div style="min-width:0"><a data-open="'+p.id+'">'+esc(p.name)+'</a><div class="meta"><span>'+esc(p.brand)+'</span><span class="dot"></span><span class="mono">'+esc(p.sku)+'</span><span class="dot"></span><span>'+esc(p.condition)+'</span></div></div></div></td>'+
        '<td><div class="chips">'+(p.platforms||[]).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div></td>'+
        '<td>'+stockPill(p)+'</td><td class="r num">'+p.moq+' '+esc(p.unit)+'</td><td class="r num" style="font-weight:600">'+price+'</td>'+
        '<td class="r" style="white-space:nowrap">'+(ui.admin?'<button class="btn sm" data-edit="'+p.id+'">Edit</button> ':'')+'<button class="btn sm '+(inQ?'':'primary')+'" data-add="'+p.id+'"'+(out?' disabled':'')+'>'+(inQ?'✓':'+ Sebut harga')+'</button></td></tr>';
      }).join("")+'</tbody></table></div>';
  }
  root.innerHTML = html;
  $$("[data-open]",root).forEach(b=>b.onclick=()=>openProduct(b.dataset.open));
  $$("[data-add]",root).forEach(b=>b.onclick=()=>{ const p = byId(b.dataset.add); if(quote.find(q=>q.id===p.id)){ openQuote(); return; } addToQuote(p, p.moq); });
  $$("[data-edit]",root).forEach(b=>b.onclick=()=>openEditor(b.dataset.edit));
  $$("[data-dup]",root).forEach(b=>b.onclick=async ()=>{ const p = clone(byId(b.dataset.dup)); p.id = uid(); p.sku = p.sku+"-SALIN"; p.name = p.name+" (salinan)"; if(await persist(()=>Store.saveProduct(p))) openEditor(p.id); });
  $$("[data-del]",root).forEach(b=>b.onclick=()=>{ const p = byId(b.dataset.del); confirmBox("Padam produk ini?", p.name+" ("+p.sku+") akan dibuang daripada katalog.", "Padam", ()=>persist(()=>Store.deleteProduct(p.id), "Produk dipadam")); });
  const rf = $("#reset-f"); if(rf) rf.onclick = ()=>{ Object.assign(ui,{cat:"",q:"",platform:"",brand:"",status:""}); $("#q").value=""; renderTabs(); renderFilters(); renderResults(); };
  const ap = $("#add-product"); if(ap) ap.onclick = ()=>openEditor(null);
  const os = $("#open-settings"); if(os) os.onclick = openSettings;
  const ci = $("#csv-in"); if(ci) ci.onchange = importCSV;
  const rd = $("#reset-demo"); if(rd) rd.onclick = ()=>confirmBox("Reset data demo?", "Semua produk dan tetapan dalam pelayar ini akan dikembalikan kepada data contoh asal. Produk yang anda tambah akan hilang.", "Reset", ()=>persist(()=>Store.reset(), "Data demo dikembalikan"));
  const cc = $("#copy-csv"); if(cc) cc.onclick = ()=>copyText(toCSV(), "CSV disalin. Tampal dalam Excel atau Google Sheets.");
}
function byId(id){ return data.products.find(p=>p.id===id); }

function contactLines(){
  const s = S(); const L = [];
  if(s.phone) L.push('<div class="contact-line">'+SVG.phone+'<span class="num">'+esc(s.phone)+'</span></div>');
  if(s.whatsapp) L.push('<div class="contact-line">'+SVG.chat+'<a href="https://wa.me/'+esc(s.whatsapp.replace(/\D/g,""))+'" target="_blank" rel="noopener" style="color:inherit">WhatsApp '+esc(s.whatsapp)+'</a></div>');
  if(s.email) L.push('<div class="contact-line">'+SVG.mail+'<span>'+esc(s.email)+'</span></div>');
  if(s.address) L.push('<div class="contact-line">'+SVG.pin+'<span>'+esc(s.address)+'</span></div>');
  if(s.hours) L.push('<div class="contact-line">'+SVG.clock+'<span>'+esc(s.hours)+'</span></div>');
  return L;
}
function renderFooter(){
  const s = S();
  $("#foot-about").textContent = s.about;
  const L = contactLines();
  $("#foot-contact").innerHTML = L.length ? L.join("") : '<div class="contact-line" style="color:var(--muted)">Maklumat hubungan belum ditetapkan.'+(ui.canEdit?' Tetapkan melalui Urus → Tetapan syarikat.':'')+'</div>';
  $("#foot-terms").innerHTML = (s.terms||"").split("\n").filter(Boolean).map(t=>'<div class="contact-line" style="color:var(--muted)">'+esc(t)+'</div>').join("");
  $("#foot-copy").textContent = "© "+(s.updated||today()).slice(0,4)+" "+s.company+". Semua jenama dagangan adalah milik pemilik masing-masing.";
  $("#foot-updated").textContent = "Senarai harga dikemas kini " + fmtDate(s.updated);
}

/* ---------- product detail ---------- */
function openProduct(id){
  const p = byId(id); if(!p) return;
  const t = tiersOf(p); const st = status(p);
  const specs = (p.specs||"").split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{ const i = l.indexOf(":"); return i>0 ? '<dt>'+esc(l.slice(0,i))+'</dt><dd>'+esc(l.slice(i+1).trim())+'</dd>' : '<dt>•</dt><dd>'+esc(l)+'</dd>'; }).join("");
  const tierRows = S().showPrices && t.length ? '<table class="tiers"><thead><tr><th>Kuantiti</th><th class="r">Harga / '+esc(p.unit)+'</th></tr></thead><tbody>'+t.map((x,i,a)=>'<tr class="'+(i===a.length-1&&a.length>1?'best':'')+'"><td class="num">'+tierLabel(x,i,a,p.unit)+'</td><td class="r num">'+rm(x.price)+'</td></tr>').join("")+'</tbody></table>'+(p.srp>0?'<div style="font-size:13px;color:var(--muted);margin:-6px 0 14px">Harga runcit cadangan (SRP): <b class="num" style="color:var(--ink)">'+rm(p.srp)+'</b> · margin anggaran <b class="num" style="color:var(--ok)">'+Math.round((1-minPrice(p)/p.srp)*100)+'%</b></div>':'') : '<p style="color:var(--brand);font-weight:600">Hubungi kami untuk harga borong item ini.</p>';
  $("#pd").innerHTML =
    '<div class="dlg-head"><span class="eyebrow" style="flex:1">'+esc(catLabel(p.category))+' · <span class="mono">'+esc(p.sku)+'</span></span><button class="btn ghost icon-btn" data-close aria-label="Tutup">'+SVG.x+'</button></div>'+
    '<div class="dlg-body"><div class="detail">'+
      '<div><div class="media">'+art(p)+'</div><div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">'+stockPill(p)+condTag(p).replace("tag cond","tag")+'</div></div>'+
      '<div><div class="meta">'+esc(p.brand)+'</div><h2 id="pd-title">'+esc(p.name)+'</h2>'+
      '<div class="chips" style="margin-bottom:14px">'+(p.platforms||[]).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div>'+
      (p.desc?'<p>'+esc(p.desc)+'</p>':'')+
      '<div class="eyebrow">Harga ikut kuantiti</div>'+tierRows+
      (specs?'<div class="eyebrow" style="margin-bottom:8px">Spesifikasi</div><dl class="specs">'+specs+'<dt>MOQ</dt><dd class="num">'+p.moq+' '+esc(p.unit)+'</dd>'+(S().showStock?'<dt>Stok</dt><dd>'+st.t+'</dd>':'')+'</dl>':'')+
      '</div></div></div>'+
    '<div class="dlg-foot">'+(ui.admin?'<button class="btn" data-edit-pd style="margin-right:auto">Edit produk</button>':'')+
      '<div class="qty"><button type="button" data-q="-1" aria-label="Kurang">−</button><input id="pd-qty" type="number" min="'+p.moq+'" value="'+Math.max(p.moq,(quote.find(q=>q.id===p.id)||{}).qty||p.moq)+'" aria-label="Kuantiti"><button type="button" data-q="1" aria-label="Tambah">+</button></div>'+
      '<button class="btn primary" id="pd-add"'+(st.k==="bad"?' disabled':'')+'>'+(st.k==="bad"?'Habis stok':(quote.find(q=>q.id===p.id)?'Kemas kini senarai':'Tambah ke sebut harga'))+'</button></div>';
  const dlg = $("#dlg-product");
  $$("[data-close]",dlg).forEach(b=>b.onclick=()=>dlg.close());
  $$("[data-q]",dlg).forEach(b=>b.onclick=()=>{ const i = $("#pd-qty"); i.value = Math.max(p.moq,(parseInt(i.value)||0)+Number(b.dataset.q)); });
  $("#pd-add").onclick = ()=>{ addToQuote(p, Math.max(p.moq, parseInt($("#pd-qty").value)||p.moq)); dlg.close(); };
  const ep = $("[data-edit-pd]",dlg); if(ep) ep.onclick = ()=>{ dlg.close(); openEditor(p.id); };
  if(!dlg.open) dlg.showModal();
}

/* ---------- quote ---------- */
function addToQuote(p, qty){
  const ex = quote.find(q=>q.id===p.id);
  if(ex) ex.qty = qty; else quote.push({id:p.id, qty});
  saveQuote(); renderQuoteCount(); renderResults();
  toast((ex?"Dikemas kini: ":"Ditambah: ")+p.name+" × "+qty);
}
function renderQuoteCount(){ quote = quote.filter(q=>byId(q.id)); $("#quote-count").textContent = quote.length; }
function quoteText(name, shop){
  const s = S(); const lines = ["*Permintaan Sebut Harga — "+s.company+"*", "Tarikh: "+fmtDate(today())];
  if(name) lines.push("Nama: "+name); if(shop) lines.push("Kedai/Syarikat: "+shop);
  lines.push("");
  let total = 0;
  quote.forEach((q,i)=>{ const p = byId(q.id); const pr = priceFor(p,q.qty); total += pr*q.qty; lines.push((i+1)+". ["+p.sku+"] "+p.name+"\n   "+q.qty+" "+p.unit+(s.showPrices&&pr?" × "+rm(pr)+" = "+rm(pr*q.qty):"")); });
  if(s.showPrices && total) { lines.push(""); lines.push("Anggaran jumlah: "+rm(total)+" (sebelum penghantaran)"); }
  return lines.join("\n");
}
function openQuote(){
  const s = S(); const dlg = $("#dlg-quote");
  let total = 0;
  const items = quote.map(q=>{ const p = byId(q.id); const pr = priceFor(p,q.qty); total += pr*q.qty;
    return '<div class="quote-item" data-qid="'+p.id+'"><div style="min-width:0"><b>'+esc(p.name)+'</b><div class="sub"><span class="mono">'+esc(p.sku)+'</span> · MOQ '+p.moq+' '+esc(p.unit)+'</div></div><button class="btn ghost icon-btn sm" data-rm aria-label="Buang">'+SVG.x+'</button>'+
      '<div class="row2"><div class="qty"><button type="button" data-d="-1" aria-label="Kurang">−</button><input type="number" min="'+p.moq+'" value="'+q.qty+'" aria-label="Kuantiti"><button type="button" data-d="1" aria-label="Tambah">+</button></div><div class="num" style="text-align:right">'+(s.showPrices&&pr?'<div class="sub">'+rm(pr)+' / '+esc(p.unit)+'</div><b>'+rm(pr*q.qty)+'</b>':'<span class="sub">Harga atas permintaan</span>')+'</div></div></div>';
  }).join("");
  let name="", shop=""; try{ const c = JSON.parse(localStorage.getItem("wg-cust")||"{}"); name=c.name||""; shop=c.shop||""; }catch(e){}
  $("#qt").innerHTML = '<div class="dlg-head"><h2 id="qt-title">Senarai Sebut Harga</h2><button class="btn ghost icon-btn" data-close aria-label="Tutup">'+SVG.x+'</button></div>'+
    '<div class="dlg-body">'+(quote.length ? items +
      (s.showPrices&&total?'<div class="totals"><span>Anggaran jumlah<br><span style="font-size:12.5px;color:var(--muted)">Ikut tier kuantiti · sebelum penghantaran</span></span><b class="num">'+rm(total)+'</b></div>':'')+
      '<div class="section-title">Maklumat anda</div><div class="form-grid"><div class="field"><label for="c-name">Nama</label><input id="c-name" value="'+esc(name)+'" placeholder="cth. Ahmad"></div><div class="field"><label for="c-shop">Kedai / syarikat</label><input id="c-shop" value="'+esc(shop)+'" placeholder="cth. AZ Game Store"></div></div>'+
      '<pre class="quote-text" id="q-text"></pre>'
      : '<div class="empty" style="border:0;background:none"><h3>Senarai masih kosong</h3><p>Tekan “+ Sebut harga” pada mana-mana produk untuk menambahnya di sini.</p></div>')+'</div>'+
    (quote.length?'<div class="dlg-foot"><button class="btn ghost danger" id="q-clear" style="margin-right:auto">Kosongkan</button><button class="btn" id="q-copy">'+SVG.copy+'Salin teks</button>'+(s.whatsapp?'<a class="btn primary" id="q-wa" target="_blank" rel="noopener">'+SVG.chat+'Hantar WhatsApp</a>':'')+'</div>':'');
  const upd = ()=>{ const n = ($("#c-name")||{}).value||"", sh = ($("#c-shop")||{}).value||""; try{ localStorage.setItem("wg-cust", JSON.stringify({name:n,shop:sh})); }catch(e){} const t = quoteText(n,sh); const pre = $("#q-text"); if(pre) pre.textContent = t; const wa = $("#q-wa"); if(wa) wa.href = "https://wa.me/"+s.whatsapp.replace(/\D/g,"")+"?text="+encodeURIComponent(t); };
  upd();
  $$("[data-close]",dlg).forEach(b=>b.onclick=()=>dlg.close());
  $$(".quote-item",dlg).forEach(row=>{ const id=row.dataset.qid, p=byId(id), inp=$("input",row);
    $("[data-rm]",row).onclick=()=>{ quote = quote.filter(q=>q.id!==id); saveQuote(); renderQuoteCount(); renderResults(); openQuote(); };
    const setQ = v=>{ const q = quote.find(q=>q.id===id); q.qty = Math.max(p.moq, v||p.moq); saveQuote(); openQuote(); };
    $$("[data-d]",row).forEach(b=>b.onclick=()=>setQ((parseInt(inp.value)||0)+Number(b.dataset.d)));
    inp.onchange=()=>setQ(parseInt(inp.value));
  });
  ["#c-name","#c-shop"].forEach(s=>{ const e=$(s); if(e) e.oninput=upd; });
  const qc = $("#q-copy"); if(qc) qc.onclick = ()=>copyText($("#q-text").textContent, "Senarai disalin. Tampal dalam WhatsApp atau e-mel.");
  const ql = $("#q-clear"); if(ql) ql.onclick = ()=>{ quote = []; saveQuote(); renderQuoteCount(); renderResults(); openQuote(); };
  if(!dlg.open) dlg.showModal();
}
function copyText(t, okMsg){
  try{ navigator.clipboard.writeText(t).then(()=>toast(okMsg), ()=>fallbackCopy(t, okMsg)); }catch(e){ fallbackCopy(t, okMsg); }
}
function fallbackCopy(t, okMsg){
  const pre = $("#q-text");
  if(pre && pre.textContent===t){ const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Teks dipilih. Tekan Ctrl+C / Salin."); return; }
  const ta = document.createElement("textarea"); ta.value = t; ta.style.cssText="position:fixed;opacity:0"; document.body.appendChild(ta); ta.select(); let ok=false; try{ ok = document.execCommand("copy"); }catch(e){} ta.remove(); toast(ok?okMsg:"Penyalinan disekat oleh pelayar ini.");
}

/* ---------- confirm ---------- */
function confirmBox(title, body, okLabel, onOk){
  const dlg = $("#dlg-confirm");
  $("#cf").innerHTML = '<div class="dlg-head"><h2>'+esc(title)+'</h2></div><div class="dlg-body"><p style="margin:0;color:var(--muted)">'+esc(body)+'</p></div><div class="dlg-foot"><button class="btn" data-no>Batal</button><button class="btn primary" data-yes>'+esc(okLabel)+'</button></div>';
  $("[data-no]",dlg).onclick=()=>dlg.close();
  $("[data-yes]",dlg).onclick=()=>{ dlg.close(); onOk(); };
  dlg.showModal();
}

/* ---------- editor ---------- */
let editImage = "";
function openEditor(id){
  const isNew = !id;
  const p = isNew ? {id:uid(), sku:"WG-", name:"", brand:"", category: ui.cat||"aksesori", platforms:[], condition:"Baru", stock:0, preorder:false, unit:"unit", moq:1, tiers:[{min:1,price:0},{min:10,price:0},{min:50,price:0}], srp:0, desc:"", specs:"", image:"", featured:false} : clone(byId(id));
  while(p.tiers.length<3) p.tiers.push({min:0,price:0});
  editImage = p.image||"";
  const f = $("#ed");
  f.innerHTML = '<div class="dlg-head"><h2 id="ed-title">'+(isNew?"Tambah produk":"Edit produk")+'</h2><button type="button" class="btn ghost icon-btn" data-close aria-label="Tutup">'+SVG.x+'</button></div>'+
  '<div class="dlg-body"><div class="form-grid">'+
    '<div class="field full"><label for="e-name">Nama produk *</label><input id="e-name" required value="'+esc(p.name)+'" placeholder="cth. DualSense Wireless Controller — Midnight Black"></div>'+
    '<div class="field"><label for="e-sku">SKU *</label><input id="e-sku" required class="mono" value="'+esc(p.sku)+'"></div>'+
    '<div class="field"><label for="e-brand">Jenama</label><input id="e-brand" list="brand-list" value="'+esc(p.brand)+'"><datalist id="brand-list">'+Array.from(new Set(data.products.map(x=>x.brand))).map(b=>'<option value="'+esc(b)+'">').join("")+'</datalist></div>'+
    '<div class="field"><label for="e-cat">Kategori</label><select id="e-cat">'+CATS.filter(c=>c.id).map(c=>'<option value="'+c.id+'"'+(p.category===c.id?' selected':'')+'>'+c.label+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="e-cond">Keadaan</label><select id="e-cond">'+CONDITIONS.map(c=>'<option'+(p.condition===c?' selected':'')+'>'+c+'</option>').join("")+'</select></div>'+
    '<div class="field full"><label>Platform serasi</label><div class="checks">'+PLATFORMS.map((pl,i)=>'<label><input type="checkbox" id="e-pl-'+i+'" value="'+pl+'"'+(p.platforms.includes(pl)?' checked':'')+'>'+pl+'</label>').join("")+'</div></div>'+
    '<div class="field full"><label>Gambar produk</label><div class="img-pick"><div class="prev" id="e-prev">'+art(p)+'</div><div style="display:flex;gap:8px;flex-wrap:wrap"><label class="btn sm" for="e-img" style="cursor:pointer">'+SVG.upload+'Muat naik gambar</label><input type="file" id="e-img" accept="image/*" hidden><button type="button" class="btn sm ghost" id="e-img-rm">Guna ilustrasi</button></div></div><span class="hint">Gambar akan dikecilkan secara automatik (maks 720px).</span></div>'+
  '</div>'+
  '<div class="section-title">Stok &amp; harga</div><div class="form-grid">'+
    '<div class="field"><label for="e-stock">Kuantiti stok</label><input id="e-stock" type="number" min="0" value="'+p.stock+'"></div>'+
    '<div class="field"><label for="e-unit">Unit</label><select id="e-unit">'+UNITS.map(u=>'<option'+(p.unit===u?' selected':'')+'>'+u+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="e-moq">MOQ (minimum tempahan)</label><input id="e-moq" type="number" min="1" value="'+p.moq+'"></div>'+
    '<div class="field"><label for="e-srp">Harga runcit cadangan (RM)</label><input id="e-srp" type="number" min="0" step="0.01" value="'+(p.srp||"")+'" placeholder="Pilihan"></div>'+
    '<div class="field full"><label>Tier harga borong (kuantiti minimum → harga seunit RM)</label><div class="tier-edit">'+p.tiers.slice(0,3).map((t,i)=>'<div style="display:flex;gap:6px"><input id="e-tmin-'+i+'" type="number" min="0" value="'+(t.min||"")+'" placeholder="Min" aria-label="Kuantiti minimum tier '+(i+1)+'" style="width:40%"><input id="e-tpr-'+i+'" type="number" min="0" step="0.01" value="'+(t.price||"")+'" placeholder="RM" aria-label="Harga tier '+(i+1)+'" style="width:60%"></div>').join("")+'</div><span class="hint">Biarkan kosong untuk tier yang tidak digunakan.</span></div>'+
    '<div class="field full"><div class="checks"><label><input type="checkbox" id="e-pre"'+(p.preorder?' checked':'')+'>Terima pra-tempah bila habis stok</label><label><input type="checkbox" id="e-feat"'+(p.featured?' checked':'')+'>Produk pilihan (dipaparkan dahulu)</label></div></div>'+
  '</div>'+
  '<div class="section-title">Penerangan</div><div class="form-grid">'+
    '<div class="field full"><label for="e-desc">Penerangan ringkas</label><textarea id="e-desc">'+esc(p.desc)+'</textarea></div>'+
    '<div class="field full"><label for="e-specs">Spesifikasi (satu baris setiap item, format “Label: Nilai”)</label><textarea id="e-specs" class="mono">'+esc(p.specs)+'</textarea></div>'+
  '</div><p id="e-err" style="color:var(--bad);font-weight:500" hidden></p></div>'+
  '<div class="dlg-foot"><button type="button" class="btn" data-close>Batal</button><button type="submit" class="btn primary">'+(isNew?"Tambah ke katalog":"Simpan perubahan")+'</button></div>';
  const dlg = $("#dlg-edit");
  $$("[data-close]",dlg).forEach(b=>b.onclick=()=>dlg.close());
  $("#e-img").onchange = async e=>{ const file = e.target.files[0]; if(!file) return; try{ editImage = await shrink(file); $("#e-prev").innerHTML = '<img src="'+editImage+'" alt="">'; }catch(err){ toast("Gambar tidak dapat dibaca. Cuba fail JPG atau PNG."); } };
  $("#e-img-rm").onclick = ()=>{ editImage = ""; $("#e-prev").innerHTML = art({category:$("#e-cat").value}); };
  f.onsubmit = e=>{
    e.preventDefault();
    const name = $("#e-name").value.trim(), sku = $("#e-sku").value.trim().toUpperCase();
    const err = $("#e-err");
    if(!name || !sku || sku==="WG-"){ err.textContent = "Isikan nama produk dan SKU sebelum menyimpan."; err.hidden = false; return; }
    if(data.products.some(x=>x.sku===sku && x.id!==p.id)){ err.textContent = "SKU "+sku+" sudah digunakan oleh produk lain. Gunakan SKU yang unik."; err.hidden = false; return; }
    const tiers = [0,1,2].map(i=>({min:parseInt($("#e-tmin-"+i).value)||0, price:parseFloat($("#e-tpr-"+i).value)||0})).filter(t=>t.min>0&&t.price>0);
    const out = Object.assign(p, {
      name, sku, brand:$("#e-brand").value.trim(), category:$("#e-cat").value, condition:$("#e-cond").value,
      platforms: PLATFORMS.filter((pl,i)=>$("#e-pl-"+i).checked),
      stock: Math.max(0, parseInt($("#e-stock").value)||0), unit:$("#e-unit").value, moq: Math.max(1, parseInt($("#e-moq").value)||1),
      srp: parseFloat($("#e-srp").value)||0, tiers, preorder:$("#e-pre").checked, featured:$("#e-feat").checked,
      desc:$("#e-desc").value.trim(), specs:$("#e-specs").value.trim(), image: editImage
    });
    persist(()=>Store.saveProduct(out), isNew?"Produk ditambah":"Perubahan disimpan").then(ok=>{ if(ok) dlg.close(); });
  };
  dlg.showModal();
}
function shrink(file){
  return new Promise((res,rej)=>{
    const url = URL.createObjectURL(file); const img = new Image();
    img.onload = ()=>{ const max=720; const s=Math.min(1,max/Math.max(img.width,img.height)); const c=document.createElement("canvas"); c.width=Math.round(img.width*s); c.height=Math.round(img.height*s); const x=c.getContext("2d"); x.fillStyle="#fff"; x.fillRect(0,0,c.width,c.height); x.drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg",0.8)); };
    img.onerror = ()=>{ URL.revokeObjectURL(url); rej(new Error("bad image")); };
    img.src = url;
  });
}

/* ---------- settings ---------- */
function openSettings(){
  const s = clone(S()), f = $("#st");
  const fld = (id,label,val,ph,full,type)=>'<div class="field'+(full?' full':'')+'"><label for="s-'+id+'">'+label+'</label><input id="s-'+id+'" type="'+(type||"text")+'" value="'+esc(val)+'" placeholder="'+esc(ph||"")+'"></div>';
  f.innerHTML = '<div class="dlg-head"><h2 id="st-title">Tetapan syarikat</h2><button type="button" class="btn ghost icon-btn" data-close aria-label="Tutup">'+SVG.x+'</button></div>'+
  '<div class="dlg-body"><div class="form-grid">'+
    fld("company","Nama syarikat",s.company,"",false)+fld("hours","Waktu operasi",s.hours,"Isnin – Sabtu, 10 pagi – 7 malam",false)+
    fld("tagline","Slogan ringkas",s.tagline,"",true)+
    '<div class="field full"><label for="s-about">Tentang syarikat (footer)</label><textarea id="s-about">'+esc(s.about)+'</textarea></div>'+
    fld("phone","No. telefon",s.phone,"cth. 03-1234 5678",false,"tel")+fld("whatsapp","No. WhatsApp (dengan kod negara)",s.whatsapp,"cth. 60123456789",false,"tel")+
    fld("email","E-mel",s.email,"cth. sales@syarikat.com",false,"email")+fld("lowStock","Had “stok rendah”",s.lowStock,"10",false,"number")+
    '<div class="field full"><label for="s-address">Alamat</label><textarea id="s-address" style="min-height:60px">'+esc(s.address)+'</textarea></div>'+
    '<div class="field full"><label for="s-terms">Terma borong (satu baris setiap terma)</label><textarea id="s-terms">'+esc(s.terms)+'</textarea></div>'+
    '<div class="field full"><div class="checks"><label><input type="checkbox" id="s-prices"'+(s.showPrices?' checked':'')+'>Paparkan harga kepada pelawat</label><label><input type="checkbox" id="s-stock"'+(s.showStock?' checked':'')+'>Paparkan status stok</label><label><input type="checkbox" id="s-sample"'+(s.sample?' checked':'')+'>Tunjuk notis “data contoh”</label></div><span class="hint">Jika harga disembunyikan, pelanggan masih boleh menghantar senarai sebut harga tanpa harga.</span></div>'+
  '</div></div><div class="dlg-foot"><button type="button" class="btn" data-close>Batal</button><button type="submit" class="btn primary">Simpan tetapan</button></div>';
  const dlg = $("#dlg-settings");
  $$("[data-close]",dlg).forEach(b=>b.onclick=()=>dlg.close());
  f.onsubmit = e=>{ e.preventDefault();
    ["company","hours","tagline","about","phone","whatsapp","email","address","terms"].forEach(k=>{ s[k] = $("#s-"+k).value.trim(); });
    s.company = s.company || "WeGame Resources";
    s.lowStock = Math.max(0, parseInt($("#s-lowStock").value)||0);
    s.showPrices = $("#s-prices").checked; s.showStock = $("#s-stock").checked; s.sample = $("#s-sample").checked;
    persist(()=>Store.saveSettings(s), "Tetapan disimpan").then(ok=>{ if(ok) dlg.close(); });
  };
  dlg.showModal();
}

/* ---------- CSV ---------- */
const CSV_COLS = ["sku","name","brand","category","platforms","condition","stock","unit","moq","min1","price1","min2","price2","min3","price3","srp","preorder","featured","desc","specs"];
function csvCell(v){ v = String(v==null?"":v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }
function toCSV(){
  return [CSV_COLS.join(",")].concat(data.products.map(p=>{ const t = tiersOf(p); return [p.sku,p.name,p.brand,p.category,(p.platforms||[]).join("|"),p.condition,p.stock,p.unit,p.moq,(t[0]||{}).min,(t[0]||{}).price,(t[1]||{}).min,(t[1]||{}).price,(t[2]||{}).min,(t[2]||{}).price,p.srp||"",p.preorder?1:0,p.featured?1:0,p.desc,p.specs].map(csvCell).join(","); })).join("\n");
}
function parseCSV(text){
  const rows=[]; let row=[], cell="", q=false;
  for(let i=0;i<text.length;i++){ const c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){ cell+='"'; i++; } else q=false; } else cell+=c; }
    else if(c==='"') q=true; else if(c===","){ row.push(cell); cell=""; } else if(c==="\n"||c==="\r"){ if(c==="\r"&&text[i+1]==="\n") i++; row.push(cell); rows.push(row); row=[]; cell=""; } else cell+=c; }
  if(cell||row.length){ row.push(cell); rows.push(row); }
  return rows.filter(r=>r.some(c=>c.trim()));
}
function importCSV(e){
  const file = e.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = ()=>{
    const rows = parseCSV(String(r.result).replace(/^﻿/,""));
    if(rows.length<2){ toast("Fail CSV kosong atau tiada baris data."); return; }
    const head = rows[0].map(h=>h.trim().toLowerCase());
    if(!head.includes("sku")||!head.includes("name")){ toast("CSV perlu lajur “sku” dan “name”. Guna Salin CSV untuk dapatkan format."); return; }
    const get = (row,k)=>{ const i = head.indexOf(k); return i>=0 ? (row[i]||"").trim() : ""; };
    let added=0, updated=0; const touched=[];
    rows.slice(1).forEach(row=>{
      const sku = get(row,"sku").toUpperCase(); if(!sku) return;
      const tiers = [1,2,3].map(n=>({min:parseInt(get(row,"min"+n))||0, price:parseFloat(get(row,"price"+n))||0})).filter(t=>t.min>0&&t.price>0);
      const cat = get(row,"category").toLowerCase();
      const obj = { sku, name:get(row,"name")||sku, brand:get(row,"brand"), category: CATS.some(c=>c.id&&c.id===cat)?cat:"aksesori",
        platforms: get(row,"platforms").split(/[|;]/).map(s=>s.trim()).filter(Boolean), condition: CONDITIONS.find(c=>c.toLowerCase()===get(row,"condition").toLowerCase())||"Baru",
        stock: parseInt(get(row,"stock"))||0, unit: get(row,"unit")||"unit", moq: Math.max(1,parseInt(get(row,"moq"))||1), tiers, srp: parseFloat(get(row,"srp"))||0,
        preorder: /^(1|ya|yes|true)$/i.test(get(row,"preorder")), featured: /^(1|ya|yes|true)$/i.test(get(row,"featured")), desc:get(row,"desc"), specs:get(row,"specs") };
      const ex = data.products.find(p=>p.sku===sku);
      const prev = touched.find(p=>p.sku===sku);
      if(prev){ Object.assign(prev, obj); }
      else if(ex){ touched.push(Object.assign(clone(ex), obj)); updated++; } else { touched.push(Object.assign({id:uid(), image:""}, obj)); added++; }
    });
    e.target.value = "";
    persist(()=>Store.saveProducts(touched), added+" produk ditambah, "+updated+" dikemas kini.");
  };
  r.readAsText(file);
}

/* ---------- wiring ---------- */
let qT;
$("#q").addEventListener("input", e=>{ clearTimeout(qT); qT = setTimeout(()=>{ ui.q = e.target.value; renderResults(); }, 120); });
$("#f-platform").onchange = e=>{ ui.platform = e.target.value; renderResults(); };
$("#f-brand").onchange = e=>{ ui.brand = e.target.value; renderResults(); };
$("#f-status").onchange = e=>{ ui.status = e.target.value; renderResults(); };
$("#f-sort").onchange = e=>{ ui.sort = e.target.value; renderResults(); };
const setView = v=>{ ui.view = v; try{ localStorage.setItem("wg-view", v); }catch(e){} renderFilters(); renderResults(); };
$("#v-grid").onclick = ()=>setView("grid"); $("#v-list").onclick = ()=>setView("list");
$("#btn-quote").onclick = openQuote;
$("#btn-admin").onclick = ()=>{ ui.admin = !ui.admin; renderAll(); toast(ui.admin?"Mod pengurusan dihidupkan":"Paparan pelanggan"); };
$$("dialog").forEach(d=>d.addEventListener("click", e=>{ if(e.target===d) d.close(); }));

renderAll();

$("#btn-admin").hidden = false;
Store.load().then(applyDb, ()=>applyDb(clone(window.WG_SEED)));
})();
