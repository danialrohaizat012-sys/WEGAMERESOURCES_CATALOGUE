/* WeGame Resources — Katalog Borong (app) */
(function(){
"use strict";
const Store = window.WGStore;

/* ============ constants ============ */
const CATS = [
  {id:"", label:"Semua produk", short:"Semua"},
  {id:"konsol", label:"Konsol", short:"Konsol", blurb:"PS5, Switch, Xbox"},
  {id:"controller", label:"Controller", short:"Controller", blurb:"Rasmi & pihak ketiga"},
  {id:"aksesori", label:"Aksesori", short:"Aksesori", blurb:"Kabel, pengecas, pelindung"},
  {id:"sparepart", label:"Alat Ganti", short:"Alat Ganti", blurb:"Untuk kedai repair"}
];
const PLATFORMS = ["PS5","PS4","Switch 2","Switch","Xbox Series","Xbox One","PC","Universal"];
const CONDITIONS = ["Baru","Refurbished","OEM"];
const UNITS = ["unit","pcs","set","pek","kotak"];
const POPULAR = ["DualSense","Joy-Con","HDMI","Kipas PS5","Switch 2","Hall Effect"];
const BRAND_TINT = {"sony":"#2D5BEA","nintendo":"#E3101E","microsoft":"#12892B","8bitdo":"#D98200","oem":"#55657F","generik":"#0E8C8C"};
const TINT_POOL = ["#2D5BEA","#0E8C8C","#C2410C","#7A4FD1","#B8326B","#12892B"];

const I = (d,extra) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'+(extra||"")+'>'+d+'</svg>';
const ICON = {
  all: I('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
  konsol: I('<rect x="7" y="3" width="10" height="18" rx="3"/><path d="M12 3v18"/>'),
  controller: I('<path d="M7 7h10a4 4 0 0 1 4 3.5l.8 6a2.4 2.4 0 0 1-4.2 1.8L15 15H9l-2.6 3.3a2.4 2.4 0 0 1-4.2-1.8l.8-6A4 4 0 0 1 7 7z"/><path d="M8 10v3M6.5 11.5h3"/><circle cx="16" cy="11" r=".6" fill="currentColor"/>'),
  aksesori: I('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>'),
  sparepart: I('<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>'),
  x: I('<path d="M6 6l12 12M18 6 6 18"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  check: I('<path d="M5 12l5 5 9-10"/>'),
  arrow: I('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  down: I('<path d="M12 5v14M6 13l6 6 6-6"/>'),
  phone: I('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: I('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  chat: I('<path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z"/>'),
  copy: I('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>'),
  gear: I('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  upload: I('<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>'),
  edit: I('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
  dup: I('<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V6a2 2 0 0 1 2-2h10"/>'),
  trash: I('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
  sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
  moon: I('<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>'),
  info: I('<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/>'),
  trend: I('<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>'),
  box: I('<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/>'),
  reset: I('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  link: I('<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>')
};

/* product illustrations — viewBox 0 0 160 120 */
const ILL = {
  ps5:'<path class="s w" d="M58 10c-9 2-13 7-13 16v70c0 8 5 13 13 14h10V10z"/><path class="s f3" d="M68 14h14v92H68z" style="fill-opacity:.85"/><path class="s w" d="M82 10h8c10 2 17 8 17 18l-3 66c-1 10-7 16-16 16h-6z"/><path class="s" d="M54 30v40M98 32l-1 36"/>',
  switch:'<path class="s f2" d="M46 30h-8a14 14 0 0 0-14 14v32a14 14 0 0 0 14 14h8z"/><path class="s f2" d="M114 30h8a14 14 0 0 1 14 14v32a14 14 0 0 1-14 14h-8z"/><rect class="s w" x="46" y="30" width="68" height="60" rx="4"/><rect class="f" x="53" y="37" width="54" height="46" rx="2" style="fill-opacity:.3"/><circle class="s w" cx="35" cy="48" r="5"/><circle class="s w" cx="125" cy="70" r="5"/><path class="s" d="M32 66h6M35 63v6"/><circle class="f3" cx="125" cy="47" r="2.5"/><circle class="f3" cx="125" cy="55" r="2.5"/>',
  xbox:'<rect class="s w" x="42" y="18" width="76" height="86" rx="8"/><circle class="s f2" cx="80" cy="46" r="18"/><circle class="s" cx="80" cy="46" r="8"/><path class="s" d="M52 90h18M106 90h.01"/><path class="s f" d="M42 100h76v4H42z"/>',
  pad:'<path class="s w" d="M50 34h60c14 0 21 8 24 20l8 30c3 12-10 19-18 10l-12-14H48L36 94c-8 9-21 2-18-10l8-30c3-12 10-20 24-20z"/><path class="s" d="M48 52v18M39 61h18"/><circle class="s f2" cx="110" cy="52" r="4"/><circle class="s f2" cx="121" cy="62" r="4"/><circle class="s f2" cx="99" cy="62" r="4"/><circle class="s f2" cx="110" cy="72" r="4"/><circle class="s f" cx="66" cy="78" r="7"/><circle class="s f" cx="94" cy="78" r="7"/>',
  stick:'<rect class="s w" x="44" y="62" width="72" height="38" rx="6"/><path class="s" d="M80 62V44"/><ellipse class="s f2" cx="80" cy="36" rx="26" ry="11"/><ellipse class="s w" cx="80" cy="33" rx="14" ry="5"/><path class="s" d="M54 100v10M68 100v10M92 100v10M106 100v10"/><rect class="s f" x="96" y="70" width="12" height="10" rx="2"/>',
  cable:'<path class="s" d="M44 72c0-34 26-46 44-30s36 12 36-22" style="stroke-width:5"/><rect class="s w" x="30" y="72" width="28" height="20" rx="3"/><path class="s f2" d="M34 92h20l-3 12H37z"/><rect class="s w" x="110" y="8" width="28" height="20" rx="3" transform="rotate(0)"/><path class="s f2" d="M114 28h20l-3 12h-14z" transform="rotate(180 124 34)"/>',
  glass:'<rect class="s w" x="30" y="24" width="100" height="68" rx="10"/><rect class="f" x="38" y="32" width="84" height="52" rx="4"/><path class="f3" d="M62 32h14L58 84H44z" style="fill-opacity:.22"/><path class="f3" d="M82 32h6L70 84h-6z" style="fill-opacity:.18"/><path class="s" d="M40 104h80" stroke-dasharray="3 7"/><path class="s" d="M120 14l6-6M128 22l8-4" />',
  charger:'<path class="s w" d="M26 92h108l-10 16H36z"/><rect class="s f2" x="44" y="34" width="28" height="58" rx="12"/><rect class="s f2" x="88" y="34" width="28" height="58" rx="12"/><path class="s" d="M58 46v12M102 46v12"/><path class="s f3" d="M82 8l-8 14h8l-6 14 14-18h-8l6-10z"/>',
  chip:'<rect class="s w" x="44" y="24" width="72" height="72" rx="8"/><rect class="s f2" x="62" y="42" width="36" height="36" rx="4"/><path class="s" d="M58 12v12M72 12v12M88 12v12M102 12v12M58 96v12M72 96v12M88 96v12M102 96v12M32 40h12M32 54h12M32 68h12M32 82h12M116 40h12M116 54h12M116 68h12M116 82h12"/>',
  port:'<rect class="s w" x="34" y="34" width="92" height="52" rx="6"/><path class="s f2" d="M48 50h64v12l-8 10H56l-8-10z"/><path class="s" d="M60 58h40"/><path class="s" d="M44 86v14M60 86v14M76 86v14M92 86v14M108 86v14M116 86v14"/>',
  fan:'<rect class="s w" x="32" y="12" width="96" height="96" rx="16"/><circle class="s f" cx="80" cy="60" r="38"/><g class="s f2"><path d="M80 60c-6-14 0-28 14-32 4 12-2 24-14 32z"/><path d="M80 60c-6-14 0-28 14-32 4 12-2 24-14 32z" transform="rotate(72 80 60)"/><path d="M80 60c-6-14 0-28 14-32 4 12-2 24-14 32z" transform="rotate(144 80 60)"/><path d="M80 60c-6-14 0-28 14-32 4 12-2 24-14 32z" transform="rotate(216 80 60)"/><path d="M80 60c-6-14 0-28 14-32 4 12-2 24-14 32z" transform="rotate(288 80 60)"/></g><circle class="s w" cx="80" cy="60" r="9"/><circle class="f3" cx="42" cy="22" r="3"/><circle class="f3" cx="118" cy="22" r="3"/><circle class="f3" cx="42" cy="98" r="3"/><circle class="f3" cx="118" cy="98" r="3"/>',
  psu:'<rect class="s w" x="24" y="30" width="112" height="64" rx="8"/><path class="s" d="M40 46v32M50 46v32M60 46v32M70 46v32M80 46v32"/><rect class="s f2" x="96" y="46" width="26" height="32" rx="4"/><path class="s" d="M104 56v10M114 56v10"/><path class="s f3" d="M106 18l-6 10h6l-4 10 10-13h-6l4-7z"/>',
  headset:'<path class="s" d="M34 74V60a46 46 0 0 1 92 0v14" style="stroke-width:5"/><rect class="s f2" x="24" y="68" width="24" height="40" rx="10"/><rect class="s f2" x="112" y="68" width="24" height="40" rx="10"/><path class="s" d="M48 98c10 8 22 10 32 8"/><circle class="s w" cx="82" cy="106" r="4"/>',
  box:'<path class="s w" d="M80 14l52 24v48l-52 24-52-24V38z"/><path class="s f" d="M80 62l52-24v48l-52 24z"/><path class="s" d="M28 38l52 24 52-24M80 62v48M54 26l52 24"/>'
};
function illKind(p){
  const n = (p.name+" "+(p.desc||"")).toLowerCase();
  const has = (...w) => w.some(x=>n.includes(x));
  if(p.category==="konsol"){ if(has("switch")) return "switch"; if(has("xbox")) return "xbox"; if(has("playstation","ps5","ps4")) return "ps5"; return "box"; }
  if(p.category==="controller") return "pad";
  if(has("kipas","fan")) return "fan";
  if(has("power supply","psu","adp-")) return "psu";
  if(has("port","soket","socket")) return "port";
  if(has("stick","analog","joystick")) return "stick";
  if(has("hdmi","kabel","cable")) return "cable";
  if(has("tempered","glass","pelindung","screen protector")) return "glass";
  if(has("pengecas","charging","charger","dock")) return "charger";
  if(has("headset","earphone","headphone")) return "headset";
  return p.category==="sparepart" ? "chip" : "box";
}
function tint(brand){
  const k = String(brand||"").toLowerCase().trim();
  if(BRAND_TINT[k]) return BRAND_TINT[k];
  let h = 0; for(const c of k) h = (h*31 + c.charCodeAt(0))>>>0;
  return TINT_POOL[h % TINT_POOL.length];
}
function ill(kind){ return '<svg class="ill" viewBox="0 0 160 120" aria-hidden="true">'+(ILL[kind]||ILL.box)+'</svg>'; }
function media(p, cls, inner){
  const body = p.image ? '<img src="'+esc(p.image)+'" alt="'+esc(p.name)+'" loading="lazy">' : ill(illKind(p));
  return '<div class="media '+(cls||"")+'">'+body+(inner||"")+'</div>';
}
/* ============ state ============ */
let data = {settings:Object.assign({}, (window.WG_SEED||{}).settings), products:[]};
const ui = {route:"catalog", loaded:false, cat:"", q:"", plats:new Set(), brands:new Set(), conds:new Set(), instock:false, sort:"featured", view:"grid",
  inv:{q:"", status:"", cat:"", sort:"name", dir:1}};
const pd = {id:null, qty:1};
let quote = [];
const ls = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
quote = (ls.get("wg-quote", []) || []).filter(q=>q && q.id && q.qty>0);
ui.view = ls.get("wg-view","grid")==="list" ? "list" : "grid";

/* ============ helpers ============ */
function clone(o){ return JSON.parse(JSON.stringify(o)); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function rm(n){ return "RM " + Number(n||0).toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2}); }
function rm0(n){ const v = Number(n||0); return "RM " + v.toLocaleString("en-MY",{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2}); }
const $ = (s,r)=>(r||document).querySelector(s);
const $$ = (s,r)=>Array.from((r||document).querySelectorAll(s));
function uid(){ return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function today(){ const d = new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function fmtDate(s){ if(!s) return "—"; const [y,m,d] = s.split("-").map(Number); const M=["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis"]; return d+" "+M[m-1]+" "+y; }
const S = ()=>data.settings;
function byId(id){ return data.products.find(p=>p.id===id); }
function catLabel(id){ const c = CATS.find(c=>c.id===id); return c ? c.label : id; }
function status(p){
  if(p.stock<=0) return p.preorder ? {k:"info",t:"Pra-tempah"} : {k:"bad",t:"Habis stok"};
  if(p.stock<=Number(S().lowStock||0)) return {k:"warn",t:"Stok rendah"};
  return {k:"ok",t:"Ada stok"};
}
function tiersOf(p){ return (p.tiers||[]).filter(t=>t && t.price>0 && t.min>0).sort((a,b)=>a.min-b.min); }
function basePrice(p){ const t = tiersOf(p); return t.length ? t[0].price : 0; }
function bestPrice(p){ const t = tiersOf(p); return t.length ? t[t.length-1].price : 0; }
function savePct(p){ const b = basePrice(p), l = bestPrice(p); return b && l<b ? Math.round((1-l/b)*100) : 0; }
function priceFor(p, qty){ const t = tiersOf(p); let pr = t.length ? t[0].price : 0; t.forEach(x=>{ if(qty>=x.min) pr = x.price; }); return pr; }
function tierIndex(p, qty){ const t = tiersOf(p); let i = 0; t.forEach((x,j)=>{ if(qty>=x.min) i = j; }); return i; }
function nextTier(p, qty){ return tiersOf(p).find(x=>x.min>qty) || null; }
function tierRange(t, i, arr, unit){ const n = arr[i+1]; return n ? (t.min+"–"+(n.min-1)+" "+unit) : (t.min+"+ "+unit); }
function canBuy(p){ return status(p).k!=="bad"; }
function inQuote(id){ return quote.find(q=>q.id===id); }
function showPrices(){ return !!S().showPrices; }
function showStock(){ return !!S().showStock || ui.route==="inventory"; }

/* ============ toast & confirm ============ */
let toastT;
function toast(msg, icon){
  const slot = $("#toast-slot");
  slot.innerHTML = '<div class="toast" role="status">'+(icon===false?"":(ICON[icon||"check"]))+'<span>'+esc(msg)+'</span></div>';
  clearTimeout(toastT); toastT = setTimeout(()=>{ slot.innerHTML = ""; }, 2600);
}
let confirmCb = null;
function confirmBox(title, body, okLabel, onOk, danger){
  confirmCb = onOk;
  $("#cf").innerHTML = '<div class="dlg-head"><h2>'+esc(title)+'</h2></div><div class="dlg-body"><p style="color:var(--muted)">'+esc(body)+'</p></div><div class="dlg-foot"><button class="btn" data-act="close">Batal</button><button class="btn '+(danger?"danger":"primary")+'" data-act="confirm-ok">'+esc(okLabel)+'</button></div>';
  $("#dlg-confirm").showModal();
}

/* ============ persistence ============ */
function applyDb(db){ data = db; ui.loaded = true; quote = quote.filter(q=>byId(q.id)); renderAll(); }
async function persist(fn, okMsg){
  try{ applyDb(await fn()); if(okMsg) toast(okMsg); return true; }
  catch(e){ toast((e && e.message) || "Gagal menyimpan. Cuba lagi.", "info"); return false; }
}
function saveQuote(){ ls.set("wg-quote", quote); }

/* ============ theme ============ */
function applyTheme(){
  const t = ls.get("wg-theme", "");
  if(t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme");
  const dark = t ? t==="dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  $("#btn-theme").innerHTML = (dark ? ICON.sun : ICON.moon) + (dark ? "Tema cerah" : "Tema gelap");
}
/* ============ routing ============ */
function readRoute(){
  const h = location.hash.replace(/^#/,"");
  if(h==="inventori"){ ui.route = "inventory"; ls.set("wg-staff", true); }
  else { ui.route = "catalog"; }
  const m = h.match(/^produk-(.+)$/);
  renderAll();
  if(m && byId(m[1])) openProduct(m[1], true);
  if(h==="inventori" || h==="katalog") window.scrollTo({top:0});
}

/* ============ filtering ============ */
function matchQ(p, q){
  if(!q) return true;
  const hay = [p.name,p.sku,p.brand,(p.platforms||[]).join(" "),p.desc,p.specs,catLabel(p.category),p.condition].join(" ").toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every(w=>hay.includes(w));
}
function baseFiltered(skip){
  return data.products.filter(p=>{
    if(skip!=="cat" && ui.cat && p.category!==ui.cat) return false;
    if(skip!=="plat" && ui.plats.size && !(p.platforms||[]).some(x=>ui.plats.has(x))) return false;
    if(skip!=="brand" && ui.brands.size && !ui.brands.has(p.brand)) return false;
    if(skip!=="cond" && ui.conds.size && !ui.conds.has(p.condition)) return false;
    if(skip!=="stock" && ui.instock && !canBuy(p)) return false;
    return matchQ(p, ui.q);
  });
}
function sorted(list){
  const rank = p=>status(p).k==="bad" ? 1 : 0;
  const by = {
    featured:(a,b)=>rank(a)-rank(b) || (b.featured?1:0)-(a.featured?1:0) || CATS.findIndex(c=>c.id===a.category)-CATS.findIndex(c=>c.id===b.category) || a.name.localeCompare(b.name),
    name:(a,b)=>a.name.localeCompare(b.name),
    "price-asc":(a,b)=>basePrice(a)-basePrice(b),
    "price-desc":(a,b)=>basePrice(b)-basePrice(a),
    save:(a,b)=>savePct(b)-savePct(a),
    stock:(a,b)=>b.stock-a.stock
  };
  return list.slice().sort(by[ui.sort]||by.featured);
}
function activeCount(){ return ui.plats.size + ui.brands.size + ui.conds.size + (ui.instock?1:0); }
function clearFilters(){ ui.plats.clear(); ui.brands.clear(); ui.conds.clear(); ui.instock = false; }

/* ============ render: header & hero ============ */
function renderHeader(){
  $("#nav-inv").setAttribute("aria-current", ui.route==="inventory" ? "page" : "false");
  $("#quote-count").textContent = quote.length;
  $("#quote-count").hidden = !quote.length;
  const t = quoteTotals();
  $("#quote-sub").textContent = quote.length ? (showPrices() && t.total ? rm(t.total) : quote.length+" item") : "Senarai";
  $("#view-catalog").hidden = ui.route!=="catalog";
  $("#view-inventory").hidden = ui.route!=="inventory";
  const s = S(), wa = (s.whatsapp||"").replace(/\D/g,"");
  $("#u-contact").innerHTML = wa ? 'WhatsApp jualan: <a href="https://wa.me/'+wa+'" target="_blank" rel="noopener">'+esc(s.whatsapp)+'</a>' : (s.phone ? 'Jualan: <span class="num">'+esc(s.phone)+'</span>' : (s.hours ? esc(s.hours) : ""));
  const counts = {}; data.products.forEach(p=>{ counts[p.category] = (counts[p.category]||0)+1; });
  $("#catnav").innerHTML = CATS.map(c=>'<button type="button" data-act="cat" data-cat="'+c.id+'" aria-pressed="'+(ui.route==="catalog" && ui.cat===c.id)+'">'+esc(c.id?c.label:"Semua produk")+' <span class="c">'+(c.id?(counts[c.id]||0):data.products.length)+'</span></button>').join("") + '<span class="upd">Senarai harga dikemas kini <b class="num">'+fmtDate(s.updated)+'</b></span>';
  const qc = $("#q-cat");
  qc.innerHTML = CATS.map(c=>'<option value="'+c.id+'"'+(ui.cat===c.id?" selected":"")+'>'+esc(c.id?c.label:"Semua kategori")+'</option>').join("");
}
function renderHero(){
  const s = S(), ps = data.products;
  const scope = ui.cat ? ps.filter(p=>p.category===ui.cat) : ps;
  const c = CATS.find(x=>x.id===ui.cat) || CATS[0];
  $("#crumbs").innerHTML = '<button type="button" data-act="cat" data-cat="">Katalog borong</button>' + (ui.cat ? '<span class="sep">/</span><b>'+esc(c.label)+'</b>' : '') + (ui.q ? '<span class="sep">/</span><b>Carian “'+esc(ui.q)+'”</b>' : '');
  $("#r-title").textContent = ui.q ? 'Hasil carian “'+ui.q+'”' : (ui.cat ? c.label : "Katalog borong");
  const leads = {
    "": "Konsol, controller, aksesori dan alat ganti untuk peruncit, reseller dan kedai repair. Harga borong turun ikut kuantiti setiap SKU.",
    konsol: "Konsol PlayStation, Nintendo dan Xbox. Set Malaysia dan Asia, baharu dan refurbished.",
    controller: "Controller rasmi dan pihak ketiga, termasuk model Hall Effect bebas drift.",
    aksesori: "Kabel, pengecas, pelindung skrin dan aksesori harian dengan MOQ rendah.",
    sparepart: "Alat ganti untuk kedai repair: analog stick, port HDMI, kipas, bekalan kuasa dan komponen lain."
  };
  $("#ph-lead").textContent = ui.q ? (baseFiltered().length+" produk sepadan dengan carian anda.") : leads[ui.cat||""];
  const inStock = scope.filter(p=>p.stock>0).length;
  const brands = new Set(scope.map(p=>p.brand)).size;
  $("#facts").innerHTML = '<div><dt>SKU</dt><dd>'+scope.length+'</dd></div><div><dt>Ada stok</dt><dd>'+inStock+'</dd></div><div><dt>Jenama</dt><dd>'+brands+'</dd></div>';
}
/* ============ render: filters ============ */
function filterPanel(){
  const counts = k => { const m = {}; baseFiltered(k).forEach(p=>{ const vals = k==="plat" ? (p.platforms||[]) : k==="brand" ? [p.brand] : k==="cond" ? [p.condition] : [p.category]; vals.forEach(v=>{ m[v]=(m[v]||0)+1; }); }); return m; };
  const cc = counts("cat"), pc = counts("plat"), bc = counts("brand"), dc = counts("cond");
  const allN = baseFiltered("cat").length;
  const plats = PLATFORMS.filter(x=>data.products.some(p=>(p.platforms||[]).includes(x)));
  const brands = Array.from(new Set(data.products.map(p=>p.brand).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  return ''+
  '<div class="fgroup"><h4>Kategori</h4><div class="catlist">'+CATS.map(c=>'<button data-act="cat" data-cat="'+c.id+'" aria-pressed="'+(ui.cat===c.id)+'">'+(c.id?ICON[c.id]:ICON.all)+esc(c.short)+'<span class="c">'+(c.id?(cc[c.id]||0):allN)+'</span></button>').join("")+'</div></div>'+
  '<div class="fgroup"><h4>Platform '+(ui.plats.size?'<button data-act="clear-group" data-g="plats">Set semula</button>':'')+'</h4><div class="togs">'+plats.map(x=>'<button class="tog" data-act="plat" data-v="'+esc(x)+'" aria-pressed="'+ui.plats.has(x)+'">'+esc(x)+' <span class="c">'+(pc[x]||0)+'</span></button>').join("")+'</div></div>'+
  '<div class="fgroup"><h4>Jenama '+(ui.brands.size?'<button data-act="clear-group" data-g="brands">Set semula</button>':'')+'</h4><div class="checklist">'+brands.map((b,i)=>'<label class="check"><input type="checkbox" data-act="brand" data-v="'+esc(b)+'"'+(ui.brands.has(b)?" checked":"")+'><span>'+esc(b)+'</span><span class="c">'+(bc[b]||0)+'</span></label>').join("")+'</div></div>'+
  '<div class="fgroup"><h4>Keadaan</h4><div class="togs">'+CONDITIONS.map(x=>'<button class="tog" data-act="cond" data-v="'+x+'" aria-pressed="'+ui.conds.has(x)+'">'+x+' <span class="c">'+(dc[x]||0)+'</span></button>').join("")+'</div></div>'+
  '<div class="fgroup"><label class="switch"><span>Boleh ditempah sahaja</span><input type="checkbox" data-act="instock"'+(ui.instock?" checked":"")+'></label></div>'+
  helpBox();
}
function helpBox(){
  const s = S();
  const wa = (s.whatsapp||"").replace(/\D/g,"");
  return '<div class="side-help"><b>Harga untuk kuantiti besar</b><p>Tempahan melebihi tier tertinggi atau item yang tiada dalam katalog? Minta sebut harga khas.</p>'+
    (wa ? '<a class="btn sm block" href="https://wa.me/'+wa+'" target="_blank" rel="noopener">'+ICON.chat+'WhatsApp jualan</a>' : '<button class="btn sm block" data-act="quote" type="button">Buka senarai sebut harga</button>')+'</div>';
}
function renderFilters(){
  const html = filterPanel();
  $("#side").innerHTML = html;
  const m = $("#filters-m"); if(m) m.innerHTML = html.replace(/<div class="side-help">[\s\S]*$/,"");
  const n = activeCount(); $("#f-count").textContent = n ? "("+n+")" : "";
}

/* ============ render: cards ============ */
function priceHTML(p){
  const t = tiersOf(p);
  if(!showPrices() || !t.length) return '<div class="c-ask">Harga atas permintaan<small>Tambah ke senarai untuk sebut harga</small></div>';
  const base = t[0].price;
  return '<table class="c-tiers"><tbody>'+t.map((x,i,a)=>{ const sp = i ? Math.round((1-x.price/base)*100) : 0;
    return '<tr class="'+(i===a.length-1&&i>0?"best":"")+'"><td>'+x.min+(a[i+1]?'–'+(a[i+1].min-1):'+')+' '+esc(p.unit)+'</td><td>'+(sp?'<span class="sv">−'+sp+'%</span>':'')+rm(x.price)+'</td></tr>'; }).join("")+'</tbody></table>';
}
function badges(p){
  return p.condition && p.condition!=="Baru" ? '<span class="tag cond '+(p.condition==="Refurbished"?"refurb":"oem")+'">'+esc(p.condition)+'</span>' : '';
}
function stepperHTML(p, qty, act, cls){
  return '<div class="stepper '+(cls||"")+'"><button type="button" data-act="'+act+'" data-id="'+p.id+'" data-d="-1" aria-label="Kurangkan">−</button><input type="number" inputmode="numeric" min="0" value="'+qty+'" data-act="'+act+'-set" data-id="'+p.id+'" aria-label="Kuantiti '+esc(p.name)+'"><button type="button" data-act="'+act+'" data-id="'+p.id+'" data-d="1" aria-label="Tambah">+</button></div>';
}
function cardHTML(p){
  const q = inQuote(p.id), st = status(p);
  const admin = ui.route==="catalog" && ls.get("wg-staff", false);
  const plats = (p.platforms||[]);
  return '<article class="card">'+
    '<button class="card-media" type="button" data-act="open" data-id="'+p.id+'" aria-label="Lihat '+esc(p.name)+'">'+media(p,"",badges(p))+'</button>'+
    (admin ? '<div class="card-admin"><button class="btn xs icon" type="button" data-act="edit" data-id="'+p.id+'" title="Edit produk" aria-label="Edit produk">'+ICON.edit+'</button></div>' : '')+
    '<div class="card-body">'+
      '<div class="c-meta"><span class="c-brand">'+esc(p.brand||"—")+'</span><span class="mono">'+esc(p.sku)+'</span></div>'+
      '<h3><button type="button" data-act="open" data-id="'+p.id+'">'+esc(p.name)+'</button></h3>'+
      '<div class="c-sub">'+(showStock()?'<span class="stock '+st.k+'">'+st.t+'</span>':'')+(plats.length?'<span>'+esc(plats.slice(0,3).join(" · "))+(plats.length>3?' +'+(plats.length-3):'')+'</span>':'')+'</div>'+
      priceHTML(p)+
    '</div>'+
    '<div class="card-foot">'+
      (!canBuy(p) ? '<button class="btn sm block" type="button" disabled>Habis stok</button>' :
       q ? stepperHTML(p, q.qty, "qq", "in") :
       '<div class="moq">MOQ<b class="num">'+p.moq+' '+esc(p.unit)+'</b></div><button class="btn dark sm" type="button" data-act="add" data-id="'+p.id+'">'+ICON.plus+'Sebut harga</button>')+
    '</div></article>';
}
function featuredHTML(){ return ""; }
function chipsHTML(){
  const c = [];
  if(ui.q) c.push('<button class="achip" data-act="rm-q">“'+esc(ui.q)+'”'+ICON.x+'</button>');
  if(ui.cat) c.push('<button class="achip" data-act="cat" data-cat="">'+esc(catLabel(ui.cat))+ICON.x+'</button>');
  ui.plats.forEach(v=>c.push('<button class="achip" data-act="plat" data-v="'+esc(v)+'">'+esc(v)+ICON.x+'</button>'));
  ui.brands.forEach(v=>c.push('<button class="achip" data-act="brand-chip" data-v="'+esc(v)+'">'+esc(v)+ICON.x+'</button>'));
  ui.conds.forEach(v=>c.push('<button class="achip" data-act="cond" data-v="'+esc(v)+'">'+esc(v)+ICON.x+'</button>'));
  if(ui.instock) c.push('<button class="achip" data-act="instock-chip">Boleh ditempah'+ICON.x+'</button>');
  if(c.length>1) c.push('<button class="achip clear" data-act="reset-all">Kosongkan semua</button>');
  return c.join("");
}
function renderResults(){
  const list = sorted(baseFiltered());
  $("#r-sub").innerHTML = 'Memaparkan <b>'+list.length+'</b> daripada '+data.products.length+' produk';
  $("#active-chips").innerHTML = chipsHTML();
  $("#active-chips").hidden = !$("#active-chips").innerHTML;
  $("#f-sort").value = ui.sort;
  $("#v-grid").setAttribute("aria-pressed", ui.view==="grid"); $("#v-list").setAttribute("aria-pressed", ui.view==="list");
  const root = $("#results");
  if(!ui.loaded){ return; }
  if(!list.length){
    root.innerHTML = data.products.length
      ? '<div class="empty"><div class="eico">'+ICON.search+'</div><h3>Tiada produk sepadan</h3><p>Cuba kata kunci lain, atau kosongkan penapis.</p><button class="btn" data-act="reset-all">Kosongkan carian &amp; penapis</button></div>'
      : '<div class="empty"><div class="eico">'+ICON.box+'</div><h3>Katalog masih kosong</h3><p>Pergi ke Inventori untuk tambah produk pertama atau import CSV.</p><a class="btn primary" href="#inventori">Buka Inventori</a></div>';
    return;
  }
  if(ui.view==="grid"){ root.innerHTML = '<div class="grid">'+list.map(cardHTML).join("")+'</div>'; return; }
  root.innerHTML = '<div class="table-wrap"><table class="table"><thead><tr><th>Produk</th><th>Platform</th>'+(showStock()?'<th>Status</th>':'')+'<th class="r">MOQ</th><th class="r">Harga asas</th><th class="r">Harga terbaik</th><th class="r" style="width:150px">Sebut harga</th></tr></thead><tbody>'+
    list.map(p=>{ const q = inQuote(p.id); const st = status(p);
      return '<tr><td><div class="nm">'+media(p,"mini")+'<div style="min-width:0"><button class="t" data-act="open" data-id="'+p.id+'">'+esc(p.name)+'</button><div class="meta"><span>'+esc(p.brand)+'</span><span class="dot"></span><span class="mono">'+esc(p.sku)+'</span><span class="dot"></span><span>'+esc(p.condition)+'</span></div></div></div></td>'+
      '<td><div class="chips">'+(p.platforms||[]).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div></td>'+
      (showStock()?'<td><span class="pill '+st.k+'">'+st.t+'</span></td>':'')+
      '<td class="r num">'+p.moq+' '+esc(p.unit)+'</td>'+
      '<td class="r num" style="font-weight:600">'+(showPrices()&&basePrice(p)?rm(basePrice(p)):'—')+'</td>'+
      '<td class="r num">'+(showPrices()&&savePct(p)?'<span style="color:var(--ok);font-weight:600">'+rm(bestPrice(p))+'</span><div style="font-size:12px;color:var(--muted)">@ '+tiersOf(p).slice(-1)[0].min+'+ '+esc(p.unit)+'</div>':'—')+'</td>'+
      '<td class="r">'+(!canBuy(p)?'<span style="color:var(--muted);font-size:13px">Habis</span>': q ? stepperHTML(p,q.qty,"qq","in") : '<button class="btn sm primary" data-act="add" data-id="'+p.id+'">'+ICON.plus+'Tambah</button>')+'</td></tr>';
    }).join("")+'</tbody></table></div>';
}
function renderNotice(){
  const s = S(); let n = "";
  if(s.sample) n = '<div class="notice" style="margin-bottom:16px">'+ICON.info+'<span>Katalog ini memaparkan <b>data contoh</b>. Harga dan stok bukan angka sebenar.</span></div>';
  $("#notice-slot").innerHTML = n;
}

/* ============ render: footer & cart bar ============ */
function renderFooter(){
  const s = S();
  $("#foot-about").textContent = s.about || "";
  const L = [];
  if(s.phone) L.push('<div class="cline">'+ICON.phone+'<span class="num">'+esc(s.phone)+'</span></div>');
  if(s.whatsapp) L.push('<div class="cline">'+ICON.chat+'<a href="https://wa.me/'+esc(s.whatsapp.replace(/\D/g,""))+'" target="_blank" rel="noopener">WhatsApp '+esc(s.whatsapp)+'</a></div>');
  if(s.email) L.push('<div class="cline">'+ICON.mail+'<span>'+esc(s.email)+'</span></div>');
  if(s.address) L.push('<div class="cline">'+ICON.pin+'<span>'+esc(s.address).replace(/\n/g,"<br>")+'</span></div>');
  if(s.hours) L.push('<div class="cline">'+ICON.clock+'<span>'+esc(s.hours)+'</span></div>');
  if(!s.phone && !s.whatsapp && !s.email) L.unshift('<div class="cline m">'+ICON.info+'<span>Maklumat hubungan belum ditetapkan. Tetapkan di Inventori → Tetapan syarikat.</span></div>');
  $("#foot-contact").innerHTML = L.join("");
  $("#foot-terms").innerHTML = (s.terms||"").split("\n").filter(Boolean).map(t=>'<div class="cline m">'+ICON.check+'<span>'+esc(t)+'</span></div>').join("");
  $("#foot-copy").textContent = "© "+(s.updated||today()).slice(0,4)+" "+(s.company||"WeGame Resources")+". Jenama dagangan adalah milik pemilik masing-masing.";
  $("#foot-updated").textContent = "Senarai harga: " + fmtDate(s.updated);
}
function quoteTotals(){
  let total = 0, base = 0, units = 0;
  quote.forEach(q=>{ const p = byId(q.id); if(!p) return; total += priceFor(p,q.qty)*q.qty; base += basePrice(p)*q.qty; units += q.qty; });
  return {total, save: Math.max(0, base-total), units};
}
function renderCartbar(){
  const slot = $("#cartbar-slot");
  const open = $("#dlg-quote").open;
  if(!quote.length || open || ui.route!=="catalog"){ slot.innerHTML = ""; document.body.style.paddingBottom = ""; return; }
  const t = quoteTotals();
  const names = quote.map(q=>byId(q.id)).filter(Boolean).map(p=>p.name).join(", ");
  slot.innerHTML = '<div class="cartbar"><div class="wrap"><div class="ci"><b>Senarai sebut harga · '+quote.length+' item, '+t.units+' unit</b><span>'+esc(names)+'</span></div>'+(showPrices()&&t.total?'<div class="tot"><small>Anggaran</small><b>'+rm(t.total)+'</b></div>':'')+'<button class="btn primary" type="button" data-act="quote">Semak &amp; hantar'+ICON.arrow+'</button></div></div>';
  document.body.style.paddingBottom = "64px";
}
/* ============ product detail ============ */
function openProduct(id, fromHash){
  const p = byId(id); if(!p) return;
  pd.id = id; pd.qty = (inQuote(id)||{}).qty || p.moq;
  renderProduct();
  const d = $("#dlg-product"); if(!d.open) d.showModal();
  $(".dlg-body", d).scrollTop = 0;
  if(!fromHash) history.replaceState(null, "", "#produk-"+id);
}
function renderProduct(){
  const p = byId(pd.id); if(!p) return;
  const t = tiersOf(p), st = status(p), q = inQuote(p.id);
  const qty = pd.qty, unitPr = priceFor(p, qty), total = unitPr*qty, save = (basePrice(p)-unitPr)*qty;
  const nt = nextTier(p, qty);
  const ti = tierIndex(p, qty);
  const specs = (p.specs||"").split("\n").map(l=>l.trim()).filter(Boolean).map(l=>{ const i = l.indexOf(":"); return i>0 ? '<dt>'+esc(l.slice(0,i))+'</dt><dd>'+esc(l.slice(i+1).trim())+'</dd>' : '<dt>•</dt><dd>'+esc(l)+'</dd>'; }).join("");
  const related = data.products.filter(x=>x.id!==p.id && x.category===p.category).sort((a,b)=>((b.platforms||[]).some(v=>(p.platforms||[]).includes(v))?1:0)-((a.platforms||[]).some(v=>(p.platforms||[]).includes(v))?1:0)).slice(0,4);
  const priced = showPrices() && t.length;
  $("#pd").innerHTML =
    '<div class="dlg-head"><span class="eyebrow" style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(catLabel(p.category))+' · <span class="mono">'+esc(p.sku)+'</span></span>'+
      '<button class="btn ghost sm" data-act="copy-link" data-id="'+p.id+'">'+ICON.link+'<span class="lbl">Salin pautan</span></button>'+
      (ls.get("wg-staff",false)?'<button class="btn ghost sm" data-act="edit" data-id="'+p.id+'">'+ICON.edit+'<span class="lbl">Edit</span></button>':'')+
      '<button class="btn ghost icon" data-act="close" aria-label="Tutup">'+ICON.x+'</button></div>'+
    '<div class="dlg-body"><div class="pd">'+
      '<div>'+media(p)+'<div class="pd-badges">'+(showStock()?'<span class="pill '+st.k+'">'+st.t+(st.k!=="bad"&&st.k!=="info"&&ui.route==="inventory"?' · '+p.stock:'')+'</span>':'')+'<span class="tag '+(p.condition==="Refurbished"?"refurb":p.condition==="OEM"?"oem":"")+'">'+esc(p.condition)+'</span>'+(p.platforms||[]).map(x=>'<span class="chip">'+esc(x)+'</span>').join("")+'</div></div>'+
      '<div style="min-width:0"><div class="meta">'+esc(p.brand)+'</div><h2 id="pd-title">'+esc(p.name)+'</h2>'+
        (p.desc?'<p class="desc">'+esc(p.desc)+'</p>':'')+
        (priced ?
          '<div class="eyebrow">Harga ikut kuantiti · per '+esc(p.unit)+'</div><div class="tiers">'+t.map((x,i,a)=>{ const sp = i>0 ? Math.round((1-x.price/a[0].price)*100) : 0; return '<button class="tier" data-act="tier" data-min="'+x.min+'" aria-pressed="'+(i===ti)+'"><small>'+tierRange(x,i,a,p.unit)+'</small><b>'+rm(x.price)+'</b>'+(sp?'<em>Jimat '+sp+'%</em>':'<em style="color:var(--muted)">Harga asas</em>')+'</button>'; }).join("")+'</div>'
          : '<div class="hint">'+ICON.info+'Harga borong item ini diberi atas permintaan. Tambah ke senarai dan hantar kepada kami.</div>')+
        (canBuy(p) ?
          '<div class="calc">'+stepperHTML(p, qty, "pq", "lg")+'<div class="tot">'+(priced?'<small>Jumlah untuk '+qty+' '+esc(p.unit)+' · '+rm(unitPr)+' seunit</small><b>'+rm(total)+'</b>'+(save>0?'<em>Jimat '+rm(save)+' berbanding harga asas</em>':''):'<small>Kuantiti</small><b>'+qty+' '+esc(p.unit)+'</b>')+'</div></div>'+
          (priced && nt ? '<div class="hint">'+ICON.trend+'<span>Tambah <b>'+(nt.min-qty)+' '+esc(p.unit)+'</b> lagi untuk harga <b>'+rm(nt.price)+'</b> seunit.</span></div>' : '')+
          '<button class="btn primary block" type="button" data-act="pd-add" style="height:46px;font-size:15px">'+(q?ICON.check+'Kemas kini senarai sebut harga':ICON.plus+'Tambah ke senarai sebut harga')+'</button>'+
          '<div style="font-size:12.5px;color:var(--muted);margin-top:8px;text-align:center">MOQ '+p.moq+' '+esc(p.unit)+(p.srp>0&&priced?' · SRP '+rm(p.srp)+' · margin anggaran <b style="color:var(--ok)">'+Math.round((1-unitPr/p.srp)*100)+'%</b>':'')+'</div>'
          : '<div class="hint bad">'+ICON.info+'Item ini habis stok. Hubungi kami untuk tarikh stok seterusnya.</div>')+
        (specs?'<div class="sec-t">Spesifikasi</div><dl class="specs">'+specs+'<dt>MOQ</dt><dd class="num">'+p.moq+' '+esc(p.unit)+'</dd><dt>SKU</dt><dd class="mono">'+esc(p.sku)+'</dd></dl>':'')+
      '</div></div>'+
      (related.length?'<div class="sec-t">Produk berkaitan</div><div class="related">'+related.map(r=>'<button class="feat" type="button" data-act="open" data-id="'+r.id+'">'+media(r)+'<div class="ft"><div class="m">'+esc(r.brand)+'</div><b>'+esc(r.name)+'</b><div class="p num">'+(showPrices()&&basePrice(r)?rm(basePrice(r)):'')+'</div></div></button>').join("")+'</div>':'')+
    '</div>';
}

/* ============ quote ============ */
function setQuote(id, qty, silent){
  const p = byId(id); if(!p) return;
  const ex = inQuote(id);
  if(qty<=0){ quote = quote.filter(q=>q.id!==id); if(!silent) toast("Dibuang dari senarai", "x"); }
  else { qty = Math.max(p.moq, qty); if(ex) ex.qty = qty; else { quote.push({id, qty}); bumpCount(); if(!silent) toast("Ditambah: "+p.name); } }
  saveQuote();
  refreshQuoteViews();
}
function bumpCount(){ const c = $("#quote-count"); c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
function refreshQuoteViews(){
  renderHeader();
  if(ui.route==="catalog") renderResults();
  renderCartbar();
  if($("#dlg-quote").open) renderQuote();
  if($("#dlg-product").open) renderProduct();
}
function quoteText(){
  const s = S(), c = ls.get("wg-cust", {}) || {};
  const L = ["*Permintaan Sebut Harga — "+(s.company||"WeGame Resources")+"*", "Tarikh: "+fmtDate(today())];
  if(c.name) L.push("Nama: "+c.name);
  if(c.shop) L.push("Kedai/Syarikat: "+c.shop);
  if(c.phone) L.push("Telefon: "+c.phone);
  if(c.area) L.push("Lokasi hantar: "+c.area);
  L.push("");
  quote.forEach((q,i)=>{ const p = byId(q.id); if(!p) return; const pr = priceFor(p,q.qty); L.push((i+1)+". ["+p.sku+"] "+p.name); L.push("   "+q.qty+" "+p.unit+(showPrices()&&pr?" × "+rm(pr)+" = "+rm(pr*q.qty):"")); });
  const t = quoteTotals();
  if(showPrices() && t.total){ L.push(""); L.push("Anggaran jumlah: "+rm(t.total)+" (sebelum penghantaran)"); }
  if(c.note){ L.push(""); L.push("Nota: "+c.note); }
  return L.join("\n");
}
function openQuote(){ renderQuote(); const d = $("#dlg-quote"); if(!d.open) d.showModal(); renderCartbar(); }
function renderQuote(){
  const s = S(), c = ls.get("wg-cust", {}) || {};
  const t = quoteTotals();
  const wa = (s.whatsapp||"").replace(/\D/g,"");
  const items = quote.map(q=>{ const p = byId(q.id); if(!p) return ""; const pr = priceFor(p,q.qty); const nt = nextTier(p,q.qty);
    return '<div class="qitem">'+media(p)+'<div style="min-width:0"><b>'+esc(p.name)+'</b><div class="sub"><span class="mono">'+esc(p.sku)+'</span> · MOQ '+p.moq+'</div>'+
      '<div class="row2">'+stepperHTML(p, q.qty, "qq")+'<div class="lt">'+(showPrices()&&pr?'<b>'+rm(pr*q.qty)+'</b><div class="sub">'+rm(pr)+' / '+esc(p.unit)+'</div>':'<span class="sub">Atas permintaan</span>')+'</div></div></div>'+
      '<button class="btn ghost sm icon" data-act="q-rm" data-id="'+p.id+'" aria-label="Buang '+esc(p.name)+'">'+ICON.trash+'</button>'+
      (showPrices()&&nt?'<div class="tip">'+ICON.trend+'<span>+'+(nt.min-q.qty)+' lagi untuk '+rm(nt.price)+'/'+esc(p.unit)+' · <button data-act="q-tier" data-id="'+p.id+'" data-min="'+nt.min+'">Naikkan ke '+nt.min+'</button></span></div>':'')+
    '</div>'; }).join("");
  $("#qt").innerHTML = '<div class="dlg-head"><h2 id="qt-title">Senarai Sebut Harga</h2>'+(quote.length?'<span class="eyebrow">'+quote.length+' item</span>':'')+'<button class="btn ghost icon" data-act="close" aria-label="Tutup">'+ICON.x+'</button></div>'+
    '<div class="dlg-body">'+(quote.length ? items +
      (showPrices()&&t.total ? '<div class="summary"><div><span>Jumlah unit</span><span class="num">'+t.units+'</span></div>'+(t.save>0?'<div class="save"><span>Jimat harga bertier</span><span class="num">− '+rm(t.save)+'</span></div>':'')+'<div class="grand"><span>Anggaran jumlah<br><small style="color:var(--muted)">Sebelum penghantaran</small></span><b>'+rm(t.total)+'</b></div></div>' : '<div style="height:16px"></div>')+
      '<div class="fsec"><h3>Maklumat anda</h3><div class="form-grid">'+
        '<div class="field"><label for="c-name">Nama</label><input id="c-name" data-cust="name" value="'+esc(c.name||"")+'" placeholder="cth. Ahmad" autocomplete="name"></div>'+
        '<div class="field"><label for="c-shop">Kedai / syarikat</label><input id="c-shop" data-cust="shop" value="'+esc(c.shop||"")+'" placeholder="cth. AZ Game Store" autocomplete="organization"></div>'+
        '<div class="field"><label for="c-phone">No. telefon</label><input id="c-phone" data-cust="phone" type="tel" value="'+esc(c.phone||"")+'" placeholder="cth. 012-345 6789" autocomplete="tel"></div>'+
        '<div class="field"><label for="c-area">Lokasi penghantaran</label><input id="c-area" data-cust="area" value="'+esc(c.area||"")+'" placeholder="cth. Shah Alam, Selangor"></div>'+
        '<div class="field full"><label for="c-note">Nota (pilihan)</label><textarea id="c-note" data-cust="note" style="min-height:64px" placeholder="cth. Perlu invois syarikat">'+esc(c.note||"")+'</textarea></div>'+
      '</div><details class="preview"><summary>Pratonton mesej</summary><pre class="qtext" id="q-text">'+esc(quoteText())+'</pre></details></div>'
      : '<div class="empty" style="border:0;background:none"><div class="eico">'+ICON.box+'</div><h3>Senarai masih kosong</h3><p>Tekan “Tambah” pada mana-mana produk untuk mula membina sebut harga.</p><button class="btn dark" type="button" data-act="close">Lihat katalog</button></div>')+'</div>'+
    (quote.length ? '<div class="dlg-foot"><button class="btn ghost danger" data-act="q-clear" style="margin-right:auto">Kosongkan</button><button class="btn" data-act="q-copy">'+ICON.copy+'Salin</button>'+(wa?'<a class="btn primary" id="q-wa" href="https://wa.me/'+wa+'?text='+encodeURIComponent(quoteText())+'" target="_blank" rel="noopener">'+ICON.chat+'Hantar WhatsApp</a>':'')+'</div>' : '');
}
function copyText(t, okMsg){
  const fallback = ()=>{ const ta = document.createElement("textarea"); ta.value = t; ta.setAttribute("readonly",""); ta.style.cssText = "position:fixed;top:0;left:0;opacity:0"; document.body.appendChild(ta); ta.select(); let ok = false; try{ ok = document.execCommand("copy"); }catch(e){} ta.remove(); toast(ok ? okMsg : "Penyalinan disekat. Pilih teks dan salin secara manual.", ok ? "check" : "info"); };
  try{ navigator.clipboard.writeText(t).then(()=>toast(okMsg), fallback); }catch(e){ fallback(); }
}

/* ============ inventory (staff) ============ */
function invRows(){
  const q = ui.inv.q;
  let list = data.products.filter(p=>{
    if(ui.inv.cat && p.category!==ui.inv.cat) return false;
    if(ui.inv.status && status(p).k!==ui.inv.status) return false;
    return matchQ(p, q);
  });
  const dir = ui.inv.dir;
  const key = {name:p=>p.name.toLowerCase(), cat:p=>p.category, stock:p=>p.stock, price:p=>basePrice(p), value:p=>p.stock*basePrice(p), status:p=>["bad","warn","info","ok"].indexOf(status(p).k)}[ui.inv.sort] || (p=>p.name);
  return list.sort((a,b)=>{ const x = key(a), y = key(b); return (x>y?1:x<y?-1:0)*dir; });
}
function renderInventory(){
  const ps = data.products, s = S();
  const cnt = {ok:0,warn:0,bad:0,info:0}; ps.forEach(p=>cnt[status(p).k]++);
  const value = ps.reduce((a,p)=>a+p.stock*basePrice(p),0);
  const units = ps.reduce((a,p)=>a+Math.max(0,p.stock),0);
  const rows = invRows();
  const th = (k,l,r)=>'<th class="sortable'+(r?" r":"")+'" data-act="inv-sort" data-k="'+k+'" aria-sort="'+(ui.inv.sort===k?(ui.inv.dir>0?"ascending":"descending"):"none")+'">'+l+(ui.inv.sort===k?(ui.inv.dir>0?" ↑":" ↓"):"")+'</th>';
  const maxStock = Math.max(1, ...ps.map(p=>p.stock));
  $("#inv").innerHTML =
    '<div class="inv-head"><div><span class="eyebrow">Panel staf</span><h1>Inventori</h1><p>'+ps.length+' SKU · kemas kini terakhir '+fmtDate(s.updated)+'</p></div>'+
      '<div class="acts"><button class="btn ghost" data-act="staff-off" type="button">Keluar mod staf</button><button class="btn" data-act="settings">'+ICON.gear+'<span class="lbl">Tetapan syarikat</span></button><label class="btn" for="csv-in" style="cursor:pointer">'+ICON.upload+'<span class="lbl">Import CSV</span></label><input id="csv-in" type="file" accept=".csv,text/csv" hidden><button class="btn" data-act="copy-csv">'+ICON.copy+'<span class="lbl">Salin CSV</span></button><button class="btn primary" data-act="new">'+ICON.plus+'Tambah produk</button></div></div>'+
    '<div class="notice info" style="margin-bottom:20px">'+ICON.info+'<span><b>Versi demo:</b> perubahan disimpan dalam pelayar ini sahaja (localStorage). Peranti lain tidak akan nampak sehingga sistem disambung ke pangkalan data.</span>'+
      '<div class="nacts">'+(s.sample?'<button class="btn sm" data-act="clear-sample">Buang data contoh</button>':'')+'<button class="btn sm ghost" data-act="reset-demo">'+ICON.reset+'Reset demo</button></div></div>'+
    '<div class="kpis">'+
      '<div class="kpi" style="--c:var(--brand)"><span class="k"><i></i>Nilai stok (harga asas)</span><b class="num">'+rm0(Math.round(value))+'</b><small>'+units.toLocaleString("en-MY")+' unit dalam stor</small></div>'+
      '<button class="kpi" data-act="inv-status" data-s="ok" aria-pressed="'+(ui.inv.status==="ok")+'" style="--c:var(--ok)"><span class="k"><i></i>Ada stok</span><b class="num">'+cnt.ok+'</b><small>SKU sedia dihantar</small></button>'+
      '<button class="kpi" data-act="inv-status" data-s="warn" aria-pressed="'+(ui.inv.status==="warn")+'" style="--c:var(--warn)"><span class="k"><i></i>Stok rendah</span><b class="num">'+cnt.warn+'</b><small>≤ '+(s.lowStock||0)+' unit · perlu restock</small></button>'+
      '<button class="kpi" data-act="inv-status" data-s="bad" aria-pressed="'+(ui.inv.status==="bad")+'" style="--c:var(--bad)"><span class="k"><i></i>Habis stok</span><b class="num">'+cnt.bad+'</b><small>'+cnt.info+' lagi pra-tempah</small></button>'+
    '</div>'+
    '<div class="inv-tools"><label class="field-s" for="inv-q"><span class="sr">Cari inventori</span>'+ICON.search+'<input id="inv-q" type="search" placeholder="Cari nama atau SKU…" value="'+esc(ui.inv.q)+'"></label>'+
      '<div class="tabs" role="group" aria-label="Status">'+[["","Semua",ps.length],["ok","Ada stok",cnt.ok],["warn","Rendah",cnt.warn],["info","Pra-tempah",cnt.info],["bad","Habis",cnt.bad]].map(([k,l,n])=>'<button data-act="inv-status" data-s="'+k+'" aria-pressed="'+(ui.inv.status===k)+'">'+l+' <span class="c">'+n+'</span></button>').join("")+'</div>'+
      '<label class="sr" for="inv-cat">Kategori</label><select class="select" id="inv-cat"><option value="">Semua kategori</option>'+CATS.filter(c=>c.id).map(c=>'<option value="'+c.id+'"'+(ui.inv.cat===c.id?" selected":"")+'>'+c.label+'</option>').join("")+'</select></div>'+
    (rows.length ?
    '<div class="table-wrap"><table class="table"><thead><tr>'+th("name","Produk")+th("cat","Kategori")+th("stock","Stok")+th("status","Status")+th("price","Harga asas",1)+th("value","Nilai stok",1)+'<th class="r">Tindakan</th></tr></thead><tbody>'+
      rows.map(p=>{ const st = status(p); const c = st.k==="ok"?"var(--ok)":st.k==="warn"?"var(--warn)":st.k==="info"?"var(--info)":"var(--bad)";
        return '<tr><td><div class="nm">'+media(p,"mini")+'<div style="min-width:0"><button class="t" data-act="edit" data-id="'+p.id+'">'+esc(p.name)+'</button><div class="meta"><span class="mono">'+esc(p.sku)+'</span><span class="dot"></span><span>'+esc(p.brand)+'</span>'+(p.featured?'<span class="dot"></span><span style="color:var(--accent);font-weight:600">★ Pilihan</span>':'')+'</div></div></div></td>'+
        '<td>'+esc(catLabel(p.category))+'</td>'+
        '<td><div class="stockcell">'+stepperHTML(p, p.stock, "st")+'<span class="meter" style="--c:'+c+'"><i style="width:'+Math.max(p.stock>0?4:0, Math.round(p.stock/maxStock*100))+'%"></i></span></div></td>'+
        '<td><span class="pill '+st.k+'">'+st.t+'</span></td>'+
        '<td class="r num">'+(basePrice(p)?rm(basePrice(p)):'—')+'<div style="font-size:12px;color:var(--muted)">'+tiersOf(p).length+' tier</div></td>'+
        '<td class="r num" style="font-weight:600">'+rm(p.stock*basePrice(p))+'</td>'+
        '<td><div class="row-acts"><button class="btn xs icon" data-act="open" data-id="'+p.id+'" title="Lihat" aria-label="Lihat">'+ICON.search+'</button><button class="btn xs icon" data-act="edit" data-id="'+p.id+'" title="Edit" aria-label="Edit">'+ICON.edit+'</button><button class="btn xs icon" data-act="dup" data-id="'+p.id+'" title="Salin" aria-label="Salin">'+ICON.dup+'</button><button class="btn xs icon danger" data-act="del" data-id="'+p.id+'" title="Padam" aria-label="Padam">'+ICON.trash+'</button></div></td></tr>';
      }).join("")+'</tbody></table></div>'
    : '<div class="empty"><div class="eico">'+ICON.box+'</div><h3>'+(ps.length?'Tiada produk sepadan':'Belum ada produk')+'</h3><p>'+(ps.length?'Tukar penapis atau kata carian.':'Tambah produk pertama anda atau import senarai CSV.')+'</p><button class="btn primary" data-act="new">'+ICON.plus+'Tambah produk</button></div>');
}

/* ============ editor ============ */
let ed = null;
function openEditor(id){
  const isNew = !id;
  const p = isNew ? {id:uid(), sku:"", name:"", brand:"", category: ui.inv.cat || ui.cat || "aksesori", platforms:[], condition:"Baru", stock:0, preorder:false, unit:"unit", moq:1, tiers:[{min:1,price:0},{min:10,price:0},{min:50,price:0}], srp:0, desc:"", specs:"", image:"", featured:false} : clone(byId(id));
  if(!p) return;
  while(p.tiers.length<3) p.tiers.push({min:0,price:0});
  ed = {p, isNew};
  if($("#dlg-product").open) $("#dlg-product").close();
  const brands = Array.from(new Set(data.products.map(x=>x.brand).filter(Boolean)));
  $("#ed").innerHTML = '<div class="dlg-head"><h2 id="ed-title">'+(isNew?"Tambah produk":"Edit produk")+'</h2><button type="button" class="btn ghost icon" data-act="close" aria-label="Tutup">'+ICON.x+'</button></div>'+
  '<div class="dlg-body"><div class="ed-grid"><div>'+
    '<div class="fsec"><h3>Maklumat asas</h3><div class="form-grid">'+
      '<div class="field full"><label for="e-name">Nama produk *</label><input id="e-name" required value="'+esc(p.name)+'" placeholder="cth. DualSense Wireless Controller — Midnight Black"></div>'+
      '<div class="field"><label for="e-sku">SKU *</label><input id="e-sku" class="mono" required value="'+esc(p.sku)+'" placeholder="cth. WG-CTL-DS5-BK"></div>'+
      '<div class="field"><label for="e-brand">Jenama</label><input id="e-brand" list="brand-list" value="'+esc(p.brand)+'" placeholder="cth. Sony"><datalist id="brand-list">'+brands.map(b=>'<option value="'+esc(b)+'">').join("")+'</datalist></div>'+
      '<div class="field"><label for="e-cat">Kategori</label><select id="e-cat">'+CATS.filter(c=>c.id).map(c=>'<option value="'+c.id+'"'+(p.category===c.id?" selected":"")+'>'+c.label+'</option>').join("")+'</select></div>'+
      '<div class="field"><label for="e-cond">Keadaan</label><select id="e-cond">'+CONDITIONS.map(c=>'<option'+(p.condition===c?" selected":"")+'>'+c+'</option>').join("")+'</select></div>'+
      '<div class="field full"><span class="lab">Platform serasi</span><div class="togs">'+PLATFORMS.map(x=>'<button type="button" class="tog" data-act="e-plat" data-v="'+x+'" aria-pressed="'+p.platforms.includes(x)+'">'+x+'</button>').join("")+'</div></div>'+
      '<div class="field full"><span class="lab">Gambar produk</span><div class="img-pick"><div id="e-media">'+media(p)+'</div><div style="display:flex;gap:8px;flex-wrap:wrap"><label class="btn sm" for="e-img" style="cursor:pointer">'+ICON.upload+'Muat naik gambar</label><input type="file" id="e-img" accept="image/*" hidden><button type="button" class="btn sm ghost" data-act="e-img-rm">Guna ilustrasi</button></div></div><span class="help">Tiada gambar? Ilustrasi dijana automatik ikut jenis produk dan warna jenama.</span></div>'+
    '</div></div>'+
    '<div class="fsec"><h3>Harga borong</h3><div class="tier-edit">'+[0,1,2].map(i=>'<div class="te"><span>Tier '+(i+1)+(i===0?' · asas':'')+'</span><input id="e-tmin-'+i+'" type="number" min="0" value="'+(p.tiers[i].min||"")+'" placeholder="Kuantiti min" aria-label="Kuantiti minimum tier '+(i+1)+'"><input id="e-tpr-'+i+'" type="number" min="0" step="0.01" value="'+(p.tiers[i].price||"")+'" placeholder="RM seunit" aria-label="Harga tier '+(i+1)+'"></div>').join("")+'</div>'+
      '<div class="form-grid" style="margin-top:14px"><div class="field"><label for="e-srp">Harga runcit cadangan (SRP)</label><input id="e-srp" type="number" min="0" step="0.01" value="'+(p.srp||"")+'" placeholder="Pilihan"></div><div class="field"><label for="e-moq">MOQ (minimum tempahan)</label><input id="e-moq" type="number" min="1" value="'+p.moq+'"></div></div>'+
      '<span class="help" style="display:block;margin-top:8px">Biarkan tier kosong jika tidak digunakan. Tier diisih ikut kuantiti.</span></div>'+
    '<div class="fsec"><h3>Stok</h3><div class="form-grid">'+
      '<div class="field"><label for="e-stock">Kuantiti stok</label><input id="e-stock" type="number" min="0" value="'+p.stock+'"></div>'+
      '<div class="field"><label for="e-unit">Unit</label><select id="e-unit">'+UNITS.map(u=>'<option'+(p.unit===u?" selected":"")+'>'+u+'</option>').join("")+'</select></div>'+
      '<label class="switch full"><span>Terima pra-tempah bila habis stok</span><input type="checkbox" id="e-pre"'+(p.preorder?" checked":"")+'></label>'+
      '<label class="switch full"><span>Tunjuk dalam “Pilihan minggu ini”</span><input type="checkbox" id="e-feat"'+(p.featured?" checked":"")+'></label>'+
    '</div></div>'+
    '<div class="fsec"><h3>Penerangan</h3><div class="form-grid">'+
      '<div class="field full"><label for="e-desc">Penerangan ringkas</label><textarea id="e-desc">'+esc(p.desc)+'</textarea></div>'+
      '<div class="field full"><label for="e-specs">Spesifikasi</label><textarea id="e-specs" class="mono" placeholder="Label: Nilai (satu baris setiap item)">'+esc(p.specs)+'</textarea><span class="help">Satu baris setiap item, format “Label: Nilai”.</span></div>'+
    '</div></div>'+
    '<p class="err" id="e-err" hidden></p>'+
  '</div><aside class="ed-preview"><div class="eyebrow" style="margin-bottom:10px">Pratonton kad</div><div id="e-prev"></div></aside></div></div>'+
  '<div class="dlg-foot">'+(isNew?'':'<button type="button" class="btn ghost danger" data-act="del" data-id="'+p.id+'" style="margin-right:auto">'+ICON.trash+'Padam</button>')+'<button type="button" class="btn" data-act="close">Batal</button><button type="submit" class="btn primary">'+(isNew?"Tambah ke katalog":"Simpan perubahan")+'</button></div>';
  updatePreview();
  $("#dlg-edit").showModal();
}
function readEditor(){
  const p = ed.p;
  const tiers = [0,1,2].map(i=>({min:parseInt($("#e-tmin-"+i).value)||0, price:parseFloat($("#e-tpr-"+i).value)||0})).filter(t=>t.min>0&&t.price>0).sort((a,b)=>a.min-b.min);
  return Object.assign(clone(p), {
    name:$("#e-name").value.trim(), sku:$("#e-sku").value.trim().toUpperCase(), brand:$("#e-brand").value.trim(),
    category:$("#e-cat").value, condition:$("#e-cond").value, platforms:p.platforms.slice(),
    stock:Math.max(0, parseInt($("#e-stock").value)||0), unit:$("#e-unit").value, moq:Math.max(1, parseInt($("#e-moq").value)||1),
    srp:parseFloat($("#e-srp").value)||0, tiers, preorder:$("#e-pre").checked, featured:$("#e-feat").checked,
    desc:$("#e-desc").value.trim(), specs:$("#e-specs").value.trim(), image:p.image||""
  });
}
function updatePreview(){
  if(!ed) return;
  const p = readEditor();
  if(!p.name) p.name = "Nama produk";
  if(!p.sku) p.sku = "SKU";
  const saved = quote; quote = [];
  $("#e-prev").innerHTML = cardHTML(p);
  quote = saved;
  $("#e-media").innerHTML = media(p);
}
async function saveEditor(){
  const out = readEditor(), err = $("#e-err");
  const fail = m=>{ err.textContent = m; err.hidden = false; err.scrollIntoView({block:"nearest"}); };
  if(!out.name) return fail("Isikan nama produk.");
  if(!out.sku) return fail("Isikan SKU produk.");
  if(data.products.some(x=>x.sku===out.sku && x.id!==out.id)) return fail("SKU "+out.sku+" sudah digunakan. Gunakan SKU yang unik.");
  if(await persist(()=>Store.saveProduct(out), ed.isNew ? "Produk ditambah" : "Perubahan disimpan")){ $("#dlg-edit").close(); ed = null; }
}
function shrink(file){
  return new Promise((res,rej)=>{
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = ()=>{ const max = 800, s = Math.min(1, max/Math.max(img.width,img.height)); const c = document.createElement("canvas"); c.width = Math.round(img.width*s); c.height = Math.round(img.height*s); const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0,0,c.width,c.height); x.drawImage(img,0,0,c.width,c.height); URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg",.8)); };
    img.onerror = ()=>{ URL.revokeObjectURL(url); rej(new Error("bad image")); };
    img.src = url;
  });
}

/* ============ settings ============ */
function openSettings(){
  const s = S();
  const f = (id,label,val,ph,type,full)=>'<div class="field'+(full?" full":"")+'"><label for="s-'+id+'">'+label+'</label><input id="s-'+id+'" type="'+(type||"text")+'" value="'+esc(val==null?"":val)+'" placeholder="'+esc(ph||"")+'"></div>';
  $("#st").innerHTML = '<div class="dlg-head"><h2 id="st-title">Tetapan syarikat</h2><button type="button" class="btn ghost icon" data-act="close" aria-label="Tutup">'+ICON.x+'</button></div>'+
  '<div class="dlg-body">'+
    '<div class="fsec"><h3>Profil</h3><div class="form-grid">'+f("company","Nama syarikat",s.company)+f("hours","Waktu operasi",s.hours,"Isnin – Sabtu, 10 pagi – 7 malam")+f("tagline","Slogan",s.tagline,"","text",1)+
      '<div class="field full"><label for="s-about">Tentang syarikat</label><textarea id="s-about">'+esc(s.about)+'</textarea></div></div></div>'+
    '<div class="fsec"><h3>Hubungan</h3><div class="form-grid">'+f("whatsapp","No. WhatsApp",s.whatsapp,"cth. 60123456789","tel")+f("phone","No. telefon",s.phone,"cth. 03-1234 5678","tel")+f("email","E-mel",s.email,"cth. sales@syarikat.com","email",1)+
      '<div class="field full"><label for="s-address">Alamat</label><textarea id="s-address" style="min-height:64px">'+esc(s.address)+'</textarea></div>'+
      '<span class="help full">No. WhatsApp dengan kod negara tanpa “+”. Butang “Hantar WhatsApp” akan muncul dalam senarai sebut harga.</span></div></div>'+
    '<div class="fsec"><h3>Paparan katalog</h3><div class="form-grid">'+
      '<label class="switch full"><span>Paparkan harga kepada pelanggan</span><input type="checkbox" id="s-prices"'+(s.showPrices?" checked":"")+'></label>'+
      '<label class="switch full"><span>Paparkan status stok</span><input type="checkbox" id="s-stock"'+(s.showStock?" checked":"")+'></label>'+
      '<label class="switch full"><span>Tunjuk notis “data contoh”</span><input type="checkbox" id="s-sample"'+(s.sample?" checked":"")+'></label>'+
      f("lowStock","Had stok rendah (unit)",s.lowStock,"10","number")+
      '<div class="field full"><label for="s-terms">Terma borong</label><textarea id="s-terms">'+esc(s.terms)+'</textarea><span class="help">Satu terma setiap baris. Dipaparkan di footer.</span></div>'+
    '</div></div></div>'+
  '<div class="dlg-foot"><button type="button" class="btn" data-act="close">Batal</button><button type="submit" class="btn primary">Simpan tetapan</button></div>';
  $("#dlg-settings").showModal();
}
async function saveSettings(){
  const s = clone(S());
  ["company","hours","tagline","about","phone","whatsapp","email","address","terms"].forEach(k=>{ s[k] = $("#s-"+k).value.trim(); });
  s.company = s.company || "WeGame Resources";
  s.lowStock = Math.max(0, parseInt($("#s-lowStock").value)||0);
  s.showPrices = $("#s-prices").checked; s.showStock = $("#s-stock").checked; s.sample = $("#s-sample").checked;
  if(await persist(()=>Store.saveSettings(s), "Tetapan disimpan")) $("#dlg-settings").close();
}

/* ============ CSV ============ */
const CSV_COLS = ["sku","name","brand","category","platforms","condition","stock","unit","moq","min1","price1","min2","price2","min3","price3","srp","preorder","featured","desc","specs"];
function csvCell(v){ v = String(v==null?"":v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; }
function toCSV(){
  return [CSV_COLS.join(",")].concat(data.products.map(p=>{ const t = tiersOf(p); return [p.sku,p.name,p.brand,p.category,(p.platforms||[]).join("|"),p.condition,p.stock,p.unit,p.moq,(t[0]||{}).min,(t[0]||{}).price,(t[1]||{}).min,(t[1]||{}).price,(t[2]||{}).min,(t[2]||{}).price,p.srp||"",p.preorder?1:0,p.featured?1:0,p.desc,p.specs].map(csvCell).join(","); })).join("\n");
}
function parseCSV(text){
  const rows = []; let row = [], cell = "", q = false;
  for(let i=0;i<text.length;i++){ const c = text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){ cell += '"'; i++; } else q = false; } else cell += c; }
    else if(c==='"') q = true; else if(c===","){ row.push(cell); cell = ""; }
    else if(c==="\n"||c==="\r"){ if(c==="\r"&&text[i+1]==="\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c; }
  if(cell || row.length){ row.push(cell); rows.push(row); }
  return rows.filter(r=>r.some(c=>c.trim()));
}
function importCSV(file){
  const r = new FileReader();
  r.onload = ()=>{
    const rows = parseCSV(String(r.result).replace(/^﻿/,""));
    if(rows.length<2) return toast("Fail CSV kosong atau tiada baris data.", "info");
    const head = rows[0].map(h=>h.trim().toLowerCase());
    if(!head.includes("sku") || !head.includes("name")) return toast("CSV perlu lajur “sku” dan “name”. Guna “Salin CSV” untuk format.", "info");
    const get = (row,k)=>{ const i = head.indexOf(k); return i>=0 ? (row[i]||"").trim() : ""; };
    let added = 0, updated = 0; const touched = [];
    rows.slice(1).forEach(row=>{
      const sku = get(row,"sku").toUpperCase(); if(!sku) return;
      const tiers = [1,2,3].map(n=>({min:parseInt(get(row,"min"+n))||0, price:parseFloat(get(row,"price"+n))||0})).filter(t=>t.min>0&&t.price>0);
      const cat = get(row,"category").toLowerCase();
      const obj = {sku, name:get(row,"name")||sku, brand:get(row,"brand"), category:CATS.some(c=>c.id&&c.id===cat)?cat:"aksesori",
        platforms:get(row,"platforms").split(/[|;]/).map(s=>s.trim()).filter(Boolean), condition:CONDITIONS.find(c=>c.toLowerCase()===get(row,"condition").toLowerCase())||"Baru",
        stock:parseInt(get(row,"stock"))||0, unit:get(row,"unit")||"unit", moq:Math.max(1,parseInt(get(row,"moq"))||1), tiers, srp:parseFloat(get(row,"srp"))||0,
        preorder:/^(1|ya|yes|true)$/i.test(get(row,"preorder")), featured:/^(1|ya|yes|true)$/i.test(get(row,"featured")), desc:get(row,"desc"), specs:get(row,"specs")};
      const prev = touched.find(p=>p.sku===sku), ex = data.products.find(p=>p.sku===sku);
      if(prev) Object.assign(prev, obj);
      else if(ex){ touched.push(Object.assign(clone(ex), obj)); updated++; }
      else { touched.push(Object.assign({id:uid(), image:""}, obj)); added++; }
    });
    persist(()=>Store.saveProducts(touched), added+" produk ditambah, "+updated+" dikemas kini");
  };
  r.readAsText(file);
}

/* ============ render all ============ */
function renderAll(){
  document.body.classList.toggle("is-staff", !!ls.get("wg-staff", false));
  renderHeader();
  if(ui.route==="catalog"){ renderHero(); renderNotice(); renderFilters(); renderResults(); }
  else { renderInventory(); }
  renderFooter(); renderCartbar();
}

/* ============ events ============ */
function setQ(v){ ui.q = v.trim(); $("#q").value = ui.q; renderHero(); renderFilters(); renderResults(); }
function scrollToResults(){ const el = $("#results-top"); if(el){ const y = el.getBoundingClientRect().top + window.scrollY - 90; window.scrollTo({top:y, behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}); } }
function toggleSet(set, v){ set.has(v) ? set.delete(v) : set.add(v); }
function closestDialog(el){ return el.closest("dialog"); }

document.addEventListener("click", e=>{
  const t = e.target.closest("[data-act]"); if(!t) return;
  const act = t.dataset.act, id = t.dataset.id;
  if(t.tagName==="INPUT") return; // handled on change/input
  switch(act){
    case "close": { const d = closestDialog(t); if(d) d.close(); break; }
    case "confirm-ok": { $("#dlg-confirm").close(); const cb = confirmCb; confirmCb = null; if(cb) cb(); break; }
    case "theme": { const cur = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"); ls.set("wg-theme", cur==="dark"?"light":"dark"); applyTheme(); break; }
    case "quote": { if($("#dlg-filters").open) $("#dlg-filters").close(); openQuote(); break; }
    case "filters": $("#dlg-filters").showModal(); break;
    case "cat": { ui.cat = t.dataset.cat; if(ui.route!=="catalog"){ location.hash = "katalog"; } renderHeader(); renderHero(); renderFilters(); renderResults(); break; }
    case "plat": toggleSet(ui.plats, t.dataset.v); renderFilters(); renderResults(); break;
    case "cond": toggleSet(ui.conds, t.dataset.v); renderFilters(); renderResults(); break;
    case "brand-chip": ui.brands.delete(t.dataset.v); renderFilters(); renderResults(); break;
    case "instock-chip": ui.instock = false; renderFilters(); renderResults(); break;
    case "clear-group": ui[t.dataset.g].clear(); renderFilters(); renderResults(); break;
    case "clear-filters": clearFilters(); renderFilters(); renderResults(); break;
    case "reset-all": clearFilters(); ui.cat = ""; setQ(""); renderHeader(); renderHero(); break;
    case "rm-q": setQ(""); break;
    case "popular": setQ(t.dataset.q); scrollToResults(); break;
    case "view": ui.view = t.dataset.v; ls.set("wg-view", ui.view); renderResults(); break;
    case "open": openProduct(id); break;
    case "add": { const p = byId(id); setQuote(id, p.moq); break; }
    case "qq": { const q = inQuote(id), p = byId(id); const step = Number(t.dataset.d); const cur = q ? q.qty : 0; let nv = cur + step; if(step<0 && nv<p.moq) nv = 0; setQuote(id, nv); break; }
    case "pq": { const p = byId(pd.id); pd.qty = Math.max(p.moq, pd.qty + Number(t.dataset.d)); renderProduct(); break; }
    case "tier": { const p = byId(pd.id); pd.qty = Math.max(p.moq, Number(t.dataset.min)); renderProduct(); break; }
    case "pd-add": { const p = byId(pd.id); const had = inQuote(p.id); setQuote(p.id, pd.qty, true); toast((had?"Dikemas kini: ":"Ditambah: ")+p.name+" × "+pd.qty); $("#dlg-product").close(); break; }
    case "copy-link": { const url = location.href.split("#")[0] + "#produk-" + id; copyText(url, "Pautan produk disalin"); break; }
    case "q-rm": setQuote(id, 0); break;
    case "q-tier": setQuote(id, Number(t.dataset.min), true); break;
    case "q-clear": confirmBox("Kosongkan senarai?", "Semua "+quote.length+" item akan dibuang dari senarai sebut harga.", "Kosongkan", ()=>{ quote = []; saveQuote(); refreshQuoteViews(); }, true); break;
    case "q-copy": copyText(quoteText(), "Mesej disalin. Tampal dalam WhatsApp atau e-mel."); break;
    /* staff */
    case "new": openEditor(null); break;
    case "edit": openEditor(id); break;
    case "dup": { const p = clone(byId(id)); p.id = uid(); p.sku = p.sku+"-2"; p.name = p.name+" (salinan)"; persist(()=>Store.saveProduct(p), "Produk disalin").then(ok=>{ if(ok) openEditor(p.id); }); break; }
    case "del": { const p = byId(id); if(!p) break; confirmBox("Padam produk ini?", p.name+" ("+p.sku+") akan dibuang daripada katalog.", "Padam", ()=>{ if($("#dlg-edit").open) $("#dlg-edit").close(); persist(()=>Store.deleteProduct(id), "Produk dipadam"); }, true); break; }
    case "st": { const p = byId(id); const nv = Math.max(0, p.stock + Number(t.dataset.d)); persist(()=>Store.saveProduct(Object.assign(clone(p), {stock:nv}))); break; }
    case "inv-status": ui.inv.status = ui.inv.status===t.dataset.s && t.classList.contains("kpi") ? "" : t.dataset.s; renderInventory(); break;
    case "inv-sort": { const k = t.dataset.k; if(ui.inv.sort===k) ui.inv.dir *= -1; else { ui.inv.sort = k; ui.inv.dir = (k==="stock"||k==="value"||k==="price") ? -1 : 1; } renderInventory(); break; }
    case "settings": openSettings(); break;
    case "staff-off": ls.set("wg-staff", false); location.hash = "katalog"; toast("Mod staf dimatikan pada peranti ini"); break;
    case "copy-csv": copyText(toCSV(), "CSV disalin. Tampal dalam Excel atau Google Sheets."); break;
    case "reset-demo": confirmBox("Reset data demo?", "Semua produk dan tetapan dalam pelayar ini akan dikembalikan kepada data contoh asal.", "Reset", ()=>persist(()=>Store.reset(), "Data demo dikembalikan"), true); break;
    case "clear-sample": confirmBox("Buang data contoh?", "Semua produk contoh akan dipadam supaya anda boleh masukkan inventori sebenar. Produk yang anda tambah sendiri kekal.", "Buang data contoh", ()=>{ const ids = data.products.filter(p=>/^p\d\d$/.test(p.id)).map(p=>p.id); persist(async ()=>{ const db = await Store.deleteProducts(ids); db.settings.sample = false; return Store.saveSettings(db.settings); }, "Data contoh dibuang"); }, true); break;
    case "e-plat": { toggleSet0(ed.p.platforms, t.dataset.v); t.setAttribute("aria-pressed", ed.p.platforms.includes(t.dataset.v)); updatePreview(); break; }
    case "e-img-rm": ed.p.image = ""; updatePreview(); break;
  }
});
function toggleSet0(arr, v){ const i = arr.indexOf(v); if(i>=0) arr.splice(i,1); else arr.push(v); }

document.addEventListener("change", e=>{
  const t = e.target;
  const act = t.dataset && t.dataset.act;
  if(act==="brand"){ toggleSet(ui.brands, t.dataset.v); renderFilters(); renderResults(); }
  else if(act==="instock"){ ui.instock = t.checked; renderFilters(); renderResults(); }
  else if(act==="qq-set"){ const p = byId(t.dataset.id); const v = parseInt(t.value)||0; setQuote(p.id, v>0 ? Math.max(p.moq, v) : 0); }
  else if(act==="pq-set"){ const p = byId(pd.id); pd.qty = Math.max(p.moq, parseInt(t.value)||p.moq); renderProduct(); }
  else if(act==="st-set"){ const p = byId(t.dataset.id); persist(()=>Store.saveProduct(Object.assign(clone(p), {stock:Math.max(0, parseInt(t.value)||0)})), "Stok dikemas kini"); }
  else if(t.id==="q-cat"){ ui.cat = t.value; renderHeader(); renderHero(); renderFilters(); renderResults(); }
  else if(t.id==="f-sort"){ ui.sort = t.value; renderResults(); }
  else if(t.id==="inv-cat"){ ui.inv.cat = t.value; renderInventory(); }
  else if(t.id==="csv-in"){ if(t.files[0]) importCSV(t.files[0]); t.value = ""; }
  else if(t.id==="e-img"){ const f = t.files[0]; if(!f) return; shrink(f).then(src=>{ ed.p.image = src; updatePreview(); }, ()=>toast("Gambar tidak dapat dibaca. Cuba fail JPG atau PNG.", "info")); }
  else if(t.closest && t.closest("#ed")) updatePreview();
});
let qT, invT;
document.addEventListener("input", e=>{
  const t = e.target;
  if(t.id==="q"){ clearTimeout(qT); const v = t.value; qT = setTimeout(()=>{ if(ui.route!=="catalog") location.hash = "katalog"; setQ(v); }, 140); }
  else if(t.id==="inv-q"){ clearTimeout(invT); invT = setTimeout(()=>{ ui.inv.q = t.value; const pos = t.selectionStart; renderInventory(); const n = $("#inv-q"); n.focus(); try{ n.setSelectionRange(pos,pos); }catch(_){} }, 160); }
  else if(t.dataset && t.dataset.cust){ const c = ls.get("wg-cust", {}) || {}; c[t.dataset.cust] = t.value; ls.set("wg-cust", c); const pre = $("#q-text"); if(pre) pre.textContent = quoteText(); const wa = $("#q-wa"); if(wa) wa.href = wa.href.split("?")[0] + "?text=" + encodeURIComponent(quoteText()); }
  else if(t.closest && t.closest("#ed")){ updatePreview(); }
});
document.addEventListener("submit", e=>{
  e.preventDefault();
  if(e.target.id==="search-form"){ if(ui.route!=="catalog") location.hash = "katalog"; setQ($("#q").value); scrollToResults(); }
  else if(e.target.id==="ed") saveEditor();
  else if(e.target.id==="st") saveSettings();
});
document.addEventListener("keydown", e=>{
  if(e.key==="/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.querySelector("dialog[open]")){
    e.preventDefault(); if(ui.route!=="catalog") location.hash = "katalog";
    $("#q").focus();
  }
});
$$("dialog").forEach(d=>{
  d.addEventListener("click", e=>{ if(e.target===d) d.close(); });
  d.addEventListener("close", ()=>{
    if(d.id==="dlg-product" && /^#produk-/.test(location.hash)) history.replaceState(null, "", ui.route==="inventory" ? "#inventori" : "#katalog");
    if(d.id==="dlg-quote") renderCartbar();
  });
});
window.addEventListener("hashchange", readRoute);
/* phone: hide the header while scrolling down, bring it back on scroll up */
(function(){
  const mq = matchMedia("(max-width:900px)"); let lastY = window.scrollY, ticking = false;
  window.addEventListener("scroll", ()=>{
    if(ticking) return; ticking = true;
    requestAnimationFrame(()=>{
      const y = window.scrollY, bar = $(".topbar");
      const hide = mq.matches && y > 200 && y > lastY + 4 && !document.querySelector("dialog[open]") && document.activeElement !== $("#q");
      if(hide) bar.classList.add("hide"); else if(y < lastY - 4 || y < 200) bar.classList.remove("hide");
      lastY = y; ticking = false;
    });
  }, {passive:true});
})();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);
/* Mod staf (demo): aktif selepas peranti ini membuka #inventori. Ganti dengan log masuk Supabase. */

/* ============ boot ============ */
applyTheme();
Store.load().then(db=>{ applyDb(db); readRoute(); }, ()=>{ applyDb(clone(window.WG_SEED)); readRoute(); });
})();
