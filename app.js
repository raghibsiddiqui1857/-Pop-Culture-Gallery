/* ---------- config ---------- */
const CONFIG = {
  // Live Claude web search only works inside Claude. On GitHub Pages it is switched off
  // automatically and the app uses Apple, CheapShark, Wikipedia and its starter catalog.
  // To enable it elsewhere, point AI_ENDPOINT at your own server proxy (never put an API key in this file).
  USE_AI: !/github\.io$/.test(location.hostname),
  AI_ENDPOINT: "https://api.anthropic.com/v1/messages",
  MODEL: "claude-sonnet-4-6"
};
const TODAY = new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
const REFRESH_MS = 30 * 60 * 1000;
const SYS = `You are the data service for a movies and video games website. Today is ${TODAY}. Use web search to get current, accurate information. Reply with ONLY one valid JSON object. No markdown, no commentary, no citations. Keep every string short. Never invent titles or dates: if unsure, leave the field empty.`;

/* ---------- starter catalog: always available, even offline ---------- */
const STARTER_MOVIES = [
 {title:"Dune: Part Two",year:"2024",genres:["Sci-fi","Adventure"],blurb:"Paul Atreides joins the Fremen to take on the empire that destroyed his family.",where:"Streaming and rental",status:"Staff pick",tags:"epic story sci-fi spectacle intense"},
 {title:"Sinners",year:"2025",genres:["Horror","Drama"],blurb:"Twin brothers open a juke joint in 1930s Mississippi and something dark shows up.",where:"Streaming and rental",status:"Staff pick",tags:"horror edge-of-seat music vampire stylish"},
 {title:"KPop Demon Hunters",year:"2025",genres:["Animation","Musical"],blurb:"A pop trio moonlights as demon hunters in this animated musical.",where:"Netflix",status:"Staff pick",tags:"funny animation music cozy friends laugh"},
 {title:"Everything Everywhere All at Once",year:"2022",genres:["Sci-fi","Comedy"],blurb:"A laundromat owner jumps across universes to save her family.",where:"Streaming and rental",status:"Staff pick",tags:"mind-bending funny weird emotional multiverse"},
 {title:"Knives Out",year:"2019",genres:["Mystery","Comedy"],blurb:"A detective untangles a wealthy family's secrets after a novelist dies.",where:"Streaming and rental",status:"Staff pick",tags:"mystery funny twisty laugh friends smart"},
 {title:"Oppenheimer",year:"2023",genres:["Drama","History"],blurb:"The story of the scientist behind the atomic bomb and what it cost him.",where:"Streaming and rental",status:"Staff pick",tags:"epic story drama intense serious"},
 {title:"Spider-Man: Across the Spider-Verse",year:"2023",genres:["Animation","Superhero"],blurb:"Miles Morales meets a multiverse of Spider-people in a visual feast.",where:"Streaming and rental",status:"Staff pick",tags:"animation mind-bending superhero stylish"},
 {title:"Parasite",year:"2019",genres:["Thriller","Drama"],blurb:"A poor family schemes its way into a wealthy household with dark results.",where:"Streaming and rental",status:"Staff pick",tags:"thriller edge-of-seat twisty smart dark"}
];
const STARTER_GAMES = [
 {title:"Baldur's Gate 3",year:"2023",genres:["RPG","Fantasy"],rating:"Metacritic 96",blurb:"A huge, reactive Dungeons & Dragons adventure you can play solo or with friends.",where:"PC, PS5, Xbox",status:"Staff pick",tags:"epic story rpg fantasy friends co-op choices"},
 {title:"Elden Ring",year:"2022",genres:["Action RPG","Open world"],rating:"Metacritic 96",blurb:"Explore a vast, dangerous world from the creators of Dark Souls.",where:"PC, PS, Xbox",status:"Staff pick",tags:"epic story action fantasy intense hard"},
 {title:"Hades",year:"2020",genres:["Roguelike","Action"],rating:"Metacritic 93",blurb:"Fight out of the underworld in fast runs with a story that grows each time.",where:"PC, Switch, PS, Xbox",status:"Staff pick",tags:"action funny story short roguelike"},
 {title:"Hollow Knight: Silksong",year:"2025",genres:["Metroidvania","Platformer"],blurb:"Hornet climbs a kingdom of silk and song in the long-awaited sequel.",where:"PC, Switch, PS, Xbox",status:"Staff pick",tags:"action hard exploration atmospheric"},
 {title:"Clair Obscur: Expedition 33",year:"2025",genres:["RPG","Turn-based"],blurb:"A painter's expedition tries to stop a curse in a turn-based RPG with real-time dodging.",where:"PC, PS5, Xbox",status:"Staff pick",tags:"epic story rpg emotional stylish"},
 {title:"Stardew Valley",year:"2016",genres:["Farming sim","Cozy"],blurb:"Inherit a farm, make friends and set your own pace.",where:"PC, Switch, PS, Xbox, mobile",status:"Staff pick",tags:"cozy relaxing friends co-op wholesome"},
 {title:"It Takes Two",year:"2021",genres:["Co-op","Adventure"],blurb:"A two-player adventure where every level invents a new idea.",where:"PC, PS, Xbox, Switch",status:"Staff pick",tags:"co-op friends funny with friends puzzle"},
 {title:"Portal 2",year:"2011",genres:["Puzzle","Comedy"],blurb:"Clever physics puzzles with some of the funniest writing in games.",where:"PC, consoles",status:"Staff pick",tags:"puzzle funny mind-bending short co-op laugh"}
];
STARTER_MOVIES.push(
 {title:"Inception",year:"2010",genres:["Sci-fi","Thriller"],blurb:"A thief who steals secrets from dreams takes on one impossible job.",where:"Streaming and rental",status:"Staff pick",tags:"mind-bending heist twisty smart sci-fi"},
 {title:"Mad Max: Fury Road",year:"2015",genres:["Action","Sci-fi"],blurb:"One long, ferocious chase across a desert wasteland.",where:"Streaming and rental",status:"Staff pick",tags:"action intense edge-of-seat spectacle"},
 {title:"Interstellar",year:"2014",genres:["Sci-fi","Drama"],blurb:"Astronauts travel through a wormhole to find humanity a new home.",where:"Streaming and rental",status:"Staff pick",tags:"epic story sci-fi emotional mind-bending"},
 {title:"Get Out",year:"2017",genres:["Horror","Thriller"],blurb:"A visit to his girlfriend's family turns deeply unsettling.",where:"Streaming and rental",status:"Staff pick",tags:"horror thriller edge-of-seat smart twisty"},
 {title:"Whiplash",year:"2014",genres:["Drama","Music"],blurb:"A young drummer is pushed to the limit by a ruthless teacher.",where:"Streaming and rental",status:"Staff pick",tags:"intense drama music edge-of-seat short"},
 {title:"Spirited Away",year:"2001",genres:["Animation","Fantasy"],blurb:"A girl wanders into a spirit world and must work to free her parents.",where:"Streaming and rental",status:"Staff pick",tags:"animation fantasy cozy epic story wonder"},
 {title:"Barbie",year:"2023",genres:["Comedy","Fantasy"],blurb:"Barbie leaves Barbieland and discovers the real world.",where:"Streaming and rental",status:"Staff pick",tags:"funny laugh friends colorful comedy"},
 {title:"Top Gun: Maverick",year:"2022",genres:["Action","Drama"],blurb:"Maverick trains a new generation for a near-impossible mission.",where:"Streaming and rental",status:"Staff pick",tags:"action friends spectacle crowd-pleaser"},
 {title:"Coco",year:"2017",genres:["Animation","Family"],blurb:"A boy enters the Land of the Dead to find his family's story.",where:"Disney+",status:"Staff pick",tags:"animation cozy music emotional family"},
 {title:"The Grand Budapest Hotel",year:"2014",genres:["Comedy","Adventure"],blurb:"A legendary concierge and his lobby boy get tangled in a theft and a feud.",where:"Streaming and rental",status:"Staff pick",tags:"funny laugh stylish quirky friends"},
 {title:"John Wick",year:"2014",genres:["Action","Thriller"],blurb:"A retired hitman returns to the underworld after a personal loss.",where:"Streaming and rental",status:"Staff pick",tags:"action edge-of-seat stylish intense"},
 {title:"The Dark Knight",year:"2008",genres:["Superhero","Crime"],blurb:"Batman faces the Joker in a battle for Gotham's soul.",where:"Streaming and rental",status:"Staff pick",tags:"superhero thriller epic story intense"}
);
STARTER_GAMES.push(
 {title:"The Witcher 3: Wild Hunt",year:"2015",genres:["RPG","Fantasy"],rating:"Metacritic 93",blurb:"Hunt monsters and chase a lost daughter across a rich open world.",where:"PC, PS, Xbox, Switch",status:"Staff pick",tags:"epic story rpg fantasy open world"},
 {title:"Red Dead Redemption 2",year:"2018",genres:["Action","Open world"],rating:"Metacritic 97",blurb:"An outlaw gang runs from the law at the end of the Wild West.",where:"PC, PS, Xbox",status:"Staff pick",tags:"epic story open world western emotional"},
 {title:"God of War Ragnarok",year:"2022",genres:["Action","Adventure"],blurb:"Kratos and Atreus face the end of the world in Norse myth.",where:"PS, PC",status:"Staff pick",tags:"epic story action intense emotional"},
 {title:"Celeste",year:"2018",genres:["Platformer","Indie"],rating:"Metacritic 92",blurb:"Climb a mountain in a tough platformer with a big heart.",where:"PC, Switch, PS, Xbox",status:"Staff pick",tags:"hard short emotional platformer indie"},
 {title:"Disco Elysium",year:"2019",genres:["RPG","Mystery"],blurb:"A detective with amnesia solves a murder through dialogue.",where:"PC, consoles",status:"Staff pick",tags:"story rpg funny mystery smart"},
 {title:"Minecraft",year:"2011",genres:["Sandbox","Survival"],blurb:"Build, mine and survive in endless blocky worlds.",where:"Almost everywhere",status:"Staff pick",tags:"cozy friends co-op creative sandbox"},
 {title:"The Legend of Zelda: Tears of the Kingdom",year:"2023",genres:["Adventure","Open world"],rating:"Metacritic 96",blurb:"Explore Hyrule's sky and depths with wild building powers.",where:"Nintendo Switch",status:"Staff pick",tags:"epic story adventure open world fantasy cozy"},
 {title:"Cyberpunk 2077",year:"2020",genres:["RPG","Sci-fi"],blurb:"A mercenary chases immortality in Night City.",where:"PC, PS, Xbox",status:"Staff pick",tags:"rpg sci-fi story action open world"},
 {title:"Hades II",year:"2025",genres:["Roguelike","Action"],blurb:"Melinoë fights through Greek myth to take on the Titan of Time.",where:"PC, Switch",status:"Staff pick",tags:"action roguelike story fantasy short"},
 {title:"Super Mario Odyssey",year:"2017",genres:["Platformer","Adventure"],blurb:"Mario travels the world with a hat that can possess enemies.",where:"Nintendo Switch",status:"Staff pick",tags:"cozy friends colorful platformer funny"},
 {title:"Balatro",year:"2024",genres:["Card game","Roguelike"],blurb:"A poker-based roguelike that is hard to put down.",where:"PC, consoles, mobile",status:"Staff pick",tags:"short puzzle addictive cozy card"},
 {title:"Outer Wilds",year:"2019",genres:["Adventure","Mystery"],blurb:"Explore a solar system stuck in a 22-minute time loop.",where:"PC, PS, Xbox",status:"Staff pick",tags:"mind-bending mystery story short exploration"}
);
const STARTER_SOON = [
 {title:"Avengers: Doomsday",type:"movie",date:"2026-12-18",blurb:"The next big Marvel team-up.",where:"theaters"},
 {title:"Dune: Part Three",type:"movie",date:"2026-12-18",blurb:"Denis Villeneuve closes out the Dune trilogy.",where:"theaters"},
 {title:"Grand Theft Auto VI",type:"game",date:"2026-11-19",blurb:"Rockstar's next open-world crime epic. Confirm the date with Rockstar.",where:"PS5 and Xbox Series"}
];

const upcomingStarter = () => STARTER_SOON.filter(x=>{ const d=new Date(x.date+'T23:59:59'); return isNaN(d) || d>=new Date(); });

/* ---------- state + helpers ---------- */
const state = { filter:'all', saved:new Map(), items:new Map(), details:new Map(), wiki:new Map(), src:{}, nextAt:Date.now()+REFRESH_MS, loading:false, mood:new Set(), recType:'both', lastMsg:'' };
const $ = s => document.querySelector(s);
const clean = v => String(v ?? '').replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#39;|&#8217;/g,"'").replace(/&quot;/g,'"').trim();
const esc = v => clean(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const key = (t,type) => type + ':' + clean(t).toLowerCase();

/* fresh picks every refresh */
const rand = a => a[Math.floor(Math.random()*a.length)];
function shuffle(a){ const r=[...a]; for(let i=r.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [r[i],r[j]]=[r[j],r[i]]; } return r; }
const seen = {movie:[],game:[]};
try{ const s=JSON.parse(localStorage.getItem('pcg_seen')||'null'); if(s){ seen.movie=s.movie||[]; seen.game=s.game||[]; } }catch(e){}
function markSeen(type,titles){
  seen[type] = [...new Set([...titles.map(clean), ...seen[type]])].slice(0,14);
  try{ localStorage.setItem('pcg_seen',JSON.stringify(seen)); }catch(e){}
}
function pickFresh(type,arr,n){
  const s = seen[type].map(x=>x.toLowerCase());
  let pool = arr.filter(x=>!s.includes(x.title.toLowerCase()));
  if(pool.length<n) pool = arr;
  const out = shuffle(pool).slice(0,n);
  markSeen(type,out.map(x=>x.title));
  return out;
}
const LENS_MOVIE=['crowd-pleasing blockbusters','critically acclaimed dramas','horror and thrillers','animated and family hits','sci-fi and fantasy','comedies and romances','international and indie standouts','action and superhero films'];
const LENS_GAME=['big-budget action and adventure','indie darlings','RPGs and story-driven games','co-op and multiplayer','cozy and relaxing games','shooters and competitive games','Nintendo and handheld favorites','horror and survival games'];
let searchId = 0;

async function getJSON(url, ms=9000){
  const ctl = new AbortController(); const t = setTimeout(()=>ctl.abort(), ms);
  try{ const r = await fetch(url,{signal:ctl.signal}); if(!r.ok) throw new Error('HTTP '+r.status); return await r.json(); }
  finally{ clearTimeout(t); }
}

/* Claude + web search */
async function ask(prompt){
  if(!CONFIG.USE_AI) throw new Error("AI disabled");
  const ctl = new AbortController(); const t = setTimeout(()=>ctl.abort(), 60000);
  try{
    const res = await fetch(CONFIG.AI_ENDPOINT,{
      method:"POST", headers:{"Content-Type":"application/json"}, signal:ctl.signal,
      body:JSON.stringify({model:CONFIG.MODEL,max_tokens:1000,system:SYS,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:prompt}]})
    });
    if(!res.ok) throw new Error("HTTP "+res.status);
    const data = await res.json();
    const text = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
    const s = text.indexOf("{"), e = text.lastIndexOf("}");
    if(s<0||e<0) throw new Error("No JSON");
    return JSON.parse(text.slice(s,e+1));
  } finally { clearTimeout(t); }
}

/* Wikipedia: free photo + summary for any title */
async function wikiLookup(title,type,year){
  const k = key(title,type);
  if(state.wiki.has(k)) return state.wiki.get(k);
  const names = type==='game'
    ? [`${title} (video game)`, title]
    : [`${title} (${year} film)`, `${title} (film)`, title];
  let out = {};
  for(const n of names){
    try{
      const d = await getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(n.replace(/ /g,'_'))+'?redirect=true',7000);
      if(d.type==='disambiguation') continue;
      const img = (d.thumbnail && d.thumbnail.source) ? d.thumbnail.source.replace(/\/\d+px-/,'/500px-') : '';
      out = {img, extract:d.extract||'', url:d.content_urls?.desktop?.page||''};
      if(img || out.extract) break;
    }catch(e){}
  }
  state.wiki.set(k,out);
  return out;
}

/* ---------- covers ---------- */
const PALETTES = [['#5B2A86','#E8362A'],['#0B6E99','#00B8A9'],['#B5179E','#FF8A00'],['#2D3A8C','#F72585'],['#0F5132','#5FBF8F'],['#7A1F3D','#E09A00']];
function hash(s){ let h=0; for(const c of s) h=(h*31+c.charCodeAt(0))|0; return Math.abs(h); }
function coverStyle(title){ const [a,b]=PALETTES[hash(title)%PALETTES.length]; return `background-color:${a};background-image:radial-gradient(120% 80% at 15% 0%,rgba(255,255,255,.30),transparent 60%),linear-gradient(145deg,${a},${b});`; }
function initials(t){ const w=clean(t).split(/\s+/).filter(Boolean); return (w.length>1 ? w[0][0]+w[1][0] : (w[0]||'?').slice(0,2)).toUpperCase(); }
const chip = x => `<span class="chip">${esc(x)}</span>`;

function attachPhoto(img, it, type){
  const cover = img.closest('.cover');
  img.addEventListener('load',()=>cover.classList.add('ok'));
  img.addEventListener('error',()=>{ img.removeAttribute('src'); });
  if(it.img){ img.src = it.img; return; }
  wikiLookup(clean(it.title),type,it.year).then(w=>{ if(w.img){ it.img = w.img; img.src = w.img; } });
}

/* ---------- renderers ---------- */
function renderCards(el, items=[], forced){
  el.innerHTML = '';
  items.forEach((it,idx)=>{
    const title = clean(it.title); if(!title) return;
    const type = forced || (/game/i.test(it.type) ? 'game' : 'movie');
    const k = key(title,type);
    const prev = state.items.get(k);
    if(prev && prev.img && !it.img) it.img = prev.img;
    state.items.set(k, {...it, type});
    const saved = state.saved.has(k);
    const d = document.createElement('div'); d.className='card';
    d.innerHTML = `
      <button class="open" data-open="${esc(title)}" data-type="${type}" aria-label="Open details for ${esc(title)}">
        <div class="cover ${type}" style="${coverStyle(title)}">
          <img class="photo" alt="" loading="lazy" referrerpolicy="no-referrer">
          <span class="tag">${esc(it.status||(type==='movie'?'Movie':'Game'))}</span>
          <span class="big">${esc(initials(title))}</span>
          ${it.rating?`<span class="scorebadge">${esc(it.rating)}</span>`:''}
        </div>
        <div class="body">
          <h3>${esc(title)}</h3>
          <div class="meta">${esc(it.year)}${it.where?', '+esc(it.where):''}</div>
          <p class="blurb">${esc(it.blurb)}</p>
          <div class="chips">${(it.genres||[]).slice(0,3).map(chip).join('')}</div>
        </div>
      </button>
      <button class="save" data-save="${esc(title)}" data-type="${type}" aria-pressed="${saved}" aria-label="Save ${esc(title)} to your list">${saved?'♥':'♡'}</button>`;
    el.appendChild(d); revealEl(d,idx);
    attachPhoto(d.querySelector('.photo'), state.items.get(k), type);
  });
  if(!el.children.length) el.innerHTML = '<p class="empty">Nothing came back. Try refreshing.</p>';
}

function renderSoon(el, items=[]){
  el.innerHTML = '';
  items.forEach((it,idx)=>{
    const title = clean(it.title); if(!title) return;
    const type = /game/i.test(it.type) ? 'game' : 'movie';
    state.items.set(key(title,type), {...state.items.get(key(title,type)), ...it, type});
    const dt = new Date(clean(it.date)+'T12:00:00');
    const ok = !isNaN(dt);
    const days = ok ? Math.round((dt - new Date())/864e5) : null;
    const r = document.createElement('div'); r.dataset.kind = type;
    r.innerHTML = `<button class="row" data-open="${esc(title)}" data-type="${type}">
      <div class="date ${type}">${ok?`<strong>${dt.getDate()}</strong><span>${dt.toLocaleString([], {month:'short'})}</span>`:`<span>${esc(it.date)||'TBA'}</span>`}</div>
      <div><h3>${esc(title)}</h3><p>${esc(it.blurb)}${it.where?' Coming to '+esc(it.where)+'.':''}</p>
      ${days!==null && days>=0?`<span class="in">${days===0?'Today':days===1?'Tomorrow':'In '+days+' days'}</span>`:''}</div></button>`;
    el.appendChild(r); revealEl(r,idx);
  });
  if(!el.children.length) el.innerHTML = '<p class="empty">No upcoming releases found.</p>';
}

function renderNews(el, items=[]){
  el.innerHTML = '';
  items.forEach((it,idx)=>{
    const type = /game/i.test(it.type) ? 'game' : 'movie';
    const d = document.createElement('article'); d.className='item'; d.dataset.kind = type;
    const head = it.link ? `<a href="${esc(it.link)}" target="_blank" rel="noopener">${esc(it.headline)}</a>` : esc(it.headline);
    d.innerHTML = `<div class="meta"><b>${type==='game'?'Games':'Movies'}</b> from ${esc(it.source)||'the web'}</div><h3>${head}</h3>${it.summary?`<p>${esc(it.summary)}</p>`:''}`;
    el.appendChild(d); revealEl(d,idx);
  });
  if(!el.children.length) el.innerHTML = '<p class="empty">No news found.</p>';
}
function renderTicker(items=[]){
  if(!items.length){ $('#ticker').innerHTML='<div class="ticker-empty">Headlines unavailable right now.</div>'; return; }
  const line = items.map(it=>`<span><i class="${/game/i.test(it.type)?'game':'movie'}"></i>${esc(it.headline)}</span>`).join('');
  $('#ticker').innerHTML = `<div class="ticker-track">${line}${line}</div>`;
}
function skeletons(el,n=3){ el.innerHTML = Array.from({length:n},()=>'<div class="skel"></div>').join(''); }

/* ---------- data pipeline: starter first, then upgrade with live data ---------- */
async function loadMovies(){
  const el=$('#moviesGrid');
  const wasLive=['claude','apple'].includes(state.src.movies);
  let done=false;
  if(!wasLive){ renderCards(el,pickFresh('movie',STARTER_MOVIES,6),'movie'); state.src.movies='starter'; }
  try{
    const d = await ask(`Find 6 movies that are the most talked about right now: in theaters or newly on streaming, as of ${TODAY}. Focus this time on: ${rand(LENS_MOVIE)}. Do not include any of these titles: ${seen.movie.slice(0,12).join('; ')||'none'}. Return {"items":[{"title":"","year":"","genres":["",""],"rating":"critic or audience score with source","blurb":"max 16 words","where":"theaters or streaming service","status":"In theaters or Streaming"}]}`);
    if(d.items?.length){ renderCards(el,d.items,'movie'); markSeen('movie',d.items.map(i=>i.title)); state.src.movies='claude'; done=true; }
  }catch(e){}
  if(!done){
    try{
      const d = await getJSON('https://itunes.apple.com/us/rss/topmovies/limit=30/json');
      const items = (d.feed?.entry||[]).map(e=>({
        title:e['im:name']?.label, year:(e['im:releaseDate']?.label||'').slice(0,4),
        genres:[e.category?.attributes?.label].filter(Boolean),
        blurb:clean(e.summary?.label||'').slice(0,110), where:'Apple TV', status:'Top seller',
        img:(e['im:image']||[]).slice(-1)[0]?.label?.replace(/\d+x\d+bb/,'400x600bb')
      })).filter(x=>x.title);
      if(items.length){ const pick=shuffle(items).slice(0,8); renderCards(el,pick,'movie'); markSeen('movie',pick.map(i=>i.title)); state.src.movies='apple'; done=true; }
    }catch(e){}
  }
  if(!done && wasLive){ renderCards(el,pickFresh('movie',STARTER_MOVIES,6),'movie'); state.src.movies='starter'; }
}

async function loadGames(){
  const el=$('#gamesGrid');
  const wasLive=['claude','cheapshark'].includes(state.src.games);
  let done=false;
  if(!wasLive){ renderCards(el,pickFresh('game',STARTER_GAMES,6),'game'); state.src.games='starter'; }
  try{
    const d = await ask(`Find 6 video games that are the most talked about right now: new releases or trending, as of ${TODAY}. Focus this time on: ${rand(LENS_GAME)}. Do not include any of these titles: ${seen.game.slice(0,12).join('; ')||'none'}. Return {"items":[{"title":"","year":"","genres":["",""],"rating":"Metacritic or OpenCritic score","blurb":"max 16 words","where":"platforms","status":"New or Trending"}]}`);
    if(d.items?.length){ renderCards(el,d.items,'game'); markSeen('game',d.items.map(i=>i.title)); state.src.games='claude'; done=true; }
  }catch(e){}
  if(!done){
    try{
      const d = await getJSON('https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Metacritic&metacritic=75&onSale=1&pageSize=16&pageNumber='+Math.floor(Math.random()*4));
      const items = d.map(g=>({
        title:g.title, year:g.releaseDate?new Date(g.releaseDate*1000).getFullYear():'', genres:['PC'],
        rating:g.metacriticScore?('Metacritic '+g.metacriticScore):'', blurb:`On sale for $${g.salePrice}, down from $${g.normalPrice}.${g.steamRatingText?' Steam reviews: '+g.steamRatingText+'.':''}`,
        where:'Steam', status:'On sale', img:g.thumb
      }));
      if(items.length){ const pick=shuffle(items).slice(0,8); renderCards(el,pick,'game'); markSeen('game',pick.map(i=>i.title)); state.src.games='cheapshark'; done=true; }
    }catch(e){}
  }
  if(!done && wasLive){ renderCards(el,pickFresh('game',STARTER_GAMES,6),'game'); state.src.games='starter'; }
}

async function loadSoon(){
  const el=$('#soonRows');
  if(!el.children.length || state.src.soon==='starter'){ renderSoon(el,upcomingStarter()); state.src.soon='starter'; }
  try{
    const d = await ask(`List 8 notable upcoming movies and video games releasing in the 90 days after ${TODAY}, soonest first, mixed. Return {"items":[{"title":"","type":"movie or game","date":"YYYY-MM-DD","blurb":"max 14 words","where":"theaters, streamer or platforms"}]}`);
    if(d.items?.length){ renderSoon(el,d.items); state.src.soon='claude'; }
  }catch(e){}
}

async function loadNews(){
  const el=$('#newsList');
  if(!el.children.length) skeletons(el,3);
  try{
    const d = await ask(`Find 8 of the biggest movie and video game news stories from the past 3 days before ${TODAY}: trailers, announcements, reviews, box office, awards, delays. Return {"items":[{"headline":"max 12 words","type":"movie or game","source":"outlet name","summary":"max 24 words"}]}`);
    if(d.items?.length){ renderNews(el,d.items); renderTicker(d.items); state.src.news='claude'; return; }
  }catch(e){}
  try{
    const feeds=[['https://variety.com/feed/','movie','Variety'],['https://feeds.ign.com/ign/all','game','IGN']];
    const all=[];
    await Promise.allSettled(feeds.map(async([u,type,source])=>{
      const d = await getJSON('https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(u));
      (d.items||[]).slice(0,5).forEach(i=>all.push({headline:clean(i.title),type,source,link:i.link,summary:clean(i.description||'').slice(0,140)}));
    }));
    if(all.length){ renderNews(el,all); renderTicker(all); state.src.news='rss'; return; }
  }catch(e){}
  el.innerHTML = '<div class="errbox"><strong>Live news is not reachable from here.</strong><p>Open this page inside Claude, or add a news source, to see today\'s headlines.</p><button class="linkbtn" id="retryNews">Try again</button></div>';
  renderTicker([]);
  state.src.news='none';
}

async function refreshAll(){
  if(state.loading) return;
  state.loading = true;
  setStatus('busy','Checking for updates…');
  await Promise.allSettled([loadMovies(),loadGames(),loadSoon(),loadNews()]);
  state.loading = false;
  state.nextAt = Date.now() + REFRESH_MS;
  const live = ['movies','games','soon','news'].filter(k=>['claude','apple','cheapshark','rss'].includes(state.src[k])).length;
  const t = new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
  if(live===4) setStatus('ok',`Live data updated at ${t}.`);
  else if(live>0) setStatus('warn',`Updated at ${t}. Some sections are showing starter picks.`);
  else setStatus('warn',`Showing starter picks. Live updates aren't reachable from here.`);
  $('#srcNote').textContent = state.src.movies==='starter' && state.src.games==='starter' ? 'Starter picks' : 'Live';
  applyFilter();
}
function setStatus(kind,msg){
  $('#pulse').className = 'pulse ' + (kind==='busy'?'busy':kind==='warn'?'warn':kind==='err'?'err':'');
  $('#statusText').textContent = msg; state.lastMsg = kind==='busy' ? '' : msg;
}
setInterval(()=>{
  if(state.loading) return;
  const left = state.nextAt - Date.now();
  if(left <= 0){ refreshAll(); return; }
  if(state.lastMsg){
    const m = Math.floor(left/60000), s = String(Math.floor(left/1000)%60).padStart(2,'0');
    $('#statusText').textContent = `${state.lastMsg} Next refresh in ${m}:${s}.`;
  }
},1000);
document.addEventListener('visibilitychange',()=>{ if(!document.hidden && !state.loading && Date.now()>state.nextAt) refreshAll(); });

/* ---------- filter ---------- */
function applyFilter(){
  const f = state.filter;
  document.body.dataset.mode = f;
  document.querySelectorAll('[data-kind]').forEach(el=>{ el.hidden = f!=='all' && el.dataset.kind!==f; });
  document.querySelectorAll('.cols-wrap').forEach(w=>{ w.className = 'cols-wrap' + (f==='all' ? ' cols' : ''); });
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
  state.filter = b.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed', x===b));
  applyFilter();
}));

/* ---------- saved list ---------- */
function renderList(){
  const box = $('#myListBox'); box.innerHTML='';
  state.saved.forEach((v,k)=>{
    const p=document.createElement('span'); p.className='pill';
    p.innerHTML = `${esc(v.title)}<button data-unsave="${esc(k)}" aria-label="Remove ${esc(v.title)}">✕</button>`;
    box.appendChild(p);
  });
  if(!state.saved.size) box.innerHTML = '<p class="empty">Tap the heart on any title to save it here. Saved titles sharpen your picks.</p>';
  $('#moreLike').hidden = !state.saved.size;
  { const c=$('#listCount'); if(c.textContent!=String(state.saved.size)){ c.textContent = state.saved.size; c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); } }
  document.querySelectorAll('[data-save]').forEach(b=>{
    const on = state.saved.has(key(b.dataset.save,b.dataset.type));
    b.setAttribute('aria-pressed',on); b.textContent = on?'♥':'♡';
  });
  const ds = $('#dSave'); if(ds){ const on=state.saved.has(key(ds.dataset.title,ds.dataset.type)); ds.textContent = on?'Saved to your list':'Save to your list'; }
}
function toggleSave(title,type){
  const k = key(title,type);
  if(state.saved.has(k)) state.saved.delete(k); else state.saved.set(k,{title,type});
  renderList();
}

/* ---------- details ---------- */
const dlg = $('#dlg');
async function openDetail(title,type){
  const k = key(title,type);
  const pre = state.items.get(k) || {};
  $('#dTitle').textContent = title;
  $('#dBody').innerHTML = `<div class="meta">${esc(pre.year)} ${type==='game'?'Video game':'Movie'}</div><div class="skel" style="min-height:140px"></div>`;
  dlg.classList.remove('closing'); if(!dlg.open) dlg.showModal();
  const wiki = await wikiLookup(title,type,pre.year);
  let d = state.details.get(k);
  if(!d){
    try{
      d = await ask(`Give accurate, current details for the ${type==='game'?'video game':'movie'} "${title}" ${pre.year?'('+pre.year+')':''}. Return {"tagline":"","synopsis":"max 45 words, no spoilers","creators":"${type==='game'?'developer and publisher':'director'}","cast":"${type==='game'?'key voice cast or empty':'top 4 actors'}","where":"${type==='game'?'platforms and stores':'where to watch, theaters or streaming'}","length":"${type==='game'?'typical playtime':'runtime'}","rating":"scores with sources","release":"release date","audience":"age rating","latest":["up to 2 recent news items, max 18 words each"],"similar":["3 similar titles"]}`);
      state.details.set(k,d);
    }catch(e){
      const ex = clean(wiki.extract||'').split(/(?<=[.!?])\s/).slice(0,3).join(' ');
      const sim = [...state.items.values()].filter(x=>x.type===type && clean(x.title)!==title && (x.genres||[]).some(g=>(pre.genres||[]).includes(g))).slice(0,3).map(x=>clean(x.title));
      d = {synopsis: ex || pre.blurb, release: pre.year, where: pre.where, rating: pre.rating, similar: sim, _fallback:true};
    }
  }
  const row = (l,v)=> clean(v) ? `<dt>${l}</dt><dd>${esc(v)}</dd>` : '';
  const sim = (d.similar||[]).slice(0,3).map(s=>`<button data-open="${esc(s)}" data-type="${type}">${esc(s)}</button>`).join('');
  const img = pre.img || wiki.img;
  $('#dBody').innerHTML = `
    ${img?`<img class="dpic" src="${esc(img)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">`:''}
    ${d.tagline?`<p class="tagline">${esc(d.tagline)}</p>`:''}
    <p>${esc(d.synopsis)}</p>
    <dl>
      ${row('Released',d.release)}${row(type==='game'?'Made by':'Directed by',d.creators)}${row(type==='game'?'Voice cast':'Cast',d.cast)}
      ${row(type==='game'?'Play on':'Watch at',d.where)}${row(type==='game'?'Playtime':'Runtime',d.length)}${row('Scores',d.rating)}${row('Age rating',d.audience)}
    </dl>
    ${(d.latest||[]).length?`<h3>Latest</h3><ul>${d.latest.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}
    ${sim?`<h3>If you like this</h3><div class="simlist">${sim}</div>`:''}
    ${wiki.url?`<a class="linkbtn" href="${esc(wiki.url)}" target="_blank" rel="noopener">Read more on Wikipedia</a>`:''}
    <button class="go dsave" id="dSave" data-title="${esc(title)}" data-type="${type}"></button>`;
  renderList();
}
function closeDlg(){
  if(!dlg.open || dlg.classList.contains('closing')) return;
  dlg.classList.add('closing');
  const fin=()=>{ dlg.classList.remove('closing'); if(dlg.open) dlg.close(); };
  const onEnd=e=>{ if(e.target===dlg){ dlg.removeEventListener('animationend',onEnd); fin(); } };
  dlg.addEventListener('animationend',onEnd);
  setTimeout(()=>{ dlg.removeEventListener('animationend',onEnd); if(dlg.classList.contains('closing')) fin(); },450);
}
$('#dClose').addEventListener('click',closeDlg);
dlg.addEventListener('click',e=>{ if(e.target===dlg) closeDlg(); });
dlg.addEventListener('cancel',e=>{ e.preventDefault(); closeDlg(); });

/* ---------- recommender ---------- */
const MOODKEYS = {'Cozy':'cozy relaxing wholesome','Mind-bending':'mind-bending twisty puzzle sci-fi weird','Edge-of-seat':'thriller horror intense edge-of-seat action','Laugh out loud':'funny comedy laugh','Epic story':'epic story fantasy rpg','With friends':'co-op friends party','Short and sweet':'short'};
document.querySelectorAll('#moods button').forEach(b=>b.addEventListener('click',()=>{
  const on = b.getAttribute('aria-pressed')!=='true';
  b.setAttribute('aria-pressed',on); on?state.mood.add(b.textContent):state.mood.delete(b.textContent);
}));
document.querySelectorAll('#recType button').forEach(b=>b.addEventListener('click',()=>{
  state.recType=b.dataset.t;
  document.querySelectorAll('#recType button').forEach(x=>x.setAttribute('aria-pressed',x===b));
}));

function localRecs(taste,list){
  const pool = [...STARTER_MOVIES.map(x=>({...x,type:'movie'})), ...STARTER_GAMES.map(x=>({...x,type:'game'}))]
    .filter(x=>state.recType==='both'||x.type===state.recType)
    .filter(x=>!list.some(l=>l.toLowerCase()===x.title.toLowerCase()));
  const words = new Set((taste+' '+[...state.mood].map(m=>MOODKEYS[m]).join(' ')).toLowerCase().split(/[^a-z-]+/).filter(w=>w.length>3));
  const liked = [...STARTER_MOVIES,...STARTER_GAMES].filter(x=>(taste+' '+list.join(' ')).toLowerCase().includes(x.title.toLowerCase()));
  return pool.map(x=>{
    const hay = (x.title+' '+x.genres.join(' ')+' '+x.blurb+' '+x.tags).toLowerCase();
    let s=0; words.forEach(w=>{ if(hay.includes(w)) s+=2; });
    liked.forEach(l=>{ if(l.title!==x.title && l.genres.some(g=>x.genres.includes(g))) s+=3; if(l.tags.split(' ').some(t=>x.tags.includes(t))) s+=1; });
    return {...x,s};
  }).sort((a,b)=>b.s-a.s).slice(0,6).map(x=>({title:x.title,type:x.type,year:x.year,why:x.blurb}));
}

async function recommend(){
  const box=$('#recs'), btn=$('#goRec');
  const taste=$('#taste').value.trim();
  const list=[...state.saved.values()].map(v=>v.title);
  if(!taste && !state.mood.size && !list.length){ box.innerHTML='<p class="empty">Add a title you loved or pick a mood first.</p>'; return; }
  btn.disabled=true; btn.textContent='Searching…'; skeletons(box,2);
  const kinds = state.recType==='both' ? 'movies and video games' : state.recType==='movie' ? 'movies only' : 'video games only';
  let items, offline=false;
  try{
    const d = await ask(`Recommend 6 ${kinds} for someone with this taste: "${taste||'not specified'}". Moods: ${[...state.mood].join(', ')||'any'}. Saved favorites: ${list.join(', ')||'none'}. Prefer well-reviewed titles, include at least 2 released in the last 12 months before ${TODAY}, never repeat saved favorites. Return {"items":[{"title":"","type":"movie or game","year":"","why":"max 20 words, specific to their taste"}]}`);
    items = d.items;
  }catch(e){ items = localRecs(taste,list); offline=true; }
  box.innerHTML='';
  (items||[]).forEach((it,idx)=>{
    const type=/game/i.test(it.type)?'game':'movie';
    if(!state.items.has(key(it.title,type))) state.items.set(key(it.title,type),{...it,type});
    const b=document.createElement('button'); b.className='rec'; b.dataset.open=clean(it.title); b.dataset.type=type;
    b.innerHTML=`<h3>${esc(it.title)}</h3><div class="meta">${type==='game'?'Game':'Movie'}${it.year?' from '+esc(it.year):''}</div><p>${esc(it.why)}</p>`;
    b.style.setProperty('--i',idx); b.classList.add('reveal','shown'); box.appendChild(b);
  });
  if(!box.children.length) box.innerHTML='<p class="empty">No picks came back. Try rewording your taste.</p>';
  if(offline) box.insertAdjacentHTML('beforeend','<p class="note">These picks come from the starter catalog because live search is not reachable from here.</p>');
  btn.disabled=false; btn.textContent='Get picks';
}
$('#goRec').addEventListener('click',recommend);
$('#moreLike').addEventListener('click',()=>{ $('#finder').scrollIntoView(); recommend(); });

/* ---------- search any movie or game ---------- */
function localSearch(q){
  const n=q.toLowerCase();
  return [...STARTER_MOVIES.map(x=>({...x,type:'movie'})),...STARTER_GAMES.map(x=>({...x,type:'game'}))]
    .filter(x=>(x.title+' '+x.genres.join(' ')+' '+x.tags+' '+x.blurb).toLowerCase().includes(n))
    .map(x=>({...x,status:'Match'}));
}
async function searchItunes(q){
  const d = await getJSON('https://itunes.apple.com/search?media=movie&entity=movie&limit=6&term='+encodeURIComponent(q));
  return (d.results||[]).map(r=>({title:r.trackName,type:'movie',year:(r.releaseDate||'').slice(0,4),genres:[r.primaryGenreName].filter(Boolean),
    blurb:clean(r.shortDescription||r.longDescription||'').slice(0,120),where:'Apple TV',status:'Match',
    img:(r.artworkUrl100||'').replace('100x100bb','400x600bb')})).filter(x=>x.title);
}
async function searchGames(q){
  const d = await getJSON('https://www.cheapshark.com/api/1.0/games?limit=6&title='+encodeURIComponent(q));
  return d.map(g=>({title:g.external,type:'game',year:'',genres:['PC'],blurb:`Cheapest right now: $${g.cheapest}.`,where:'PC',status:'Match',img:g.thumb}));
}
async function searchWiki(q){
  const d = await getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=8&srsearch='+encodeURIComponent(q+' film OR "video game"'));
  const out=[];
  (d.query?.search||[]).forEach(r=>{
    const t=r.title, text=t+' '+r.snippet;
    const isGame=/video game/i.test(text), isFilm=/\bfilm\b|\bmovie\b/i.test(text);
    if(!isGame && !isFilm) return;
    const ym=t.match(/\((\d{4}) film\)/);
    out.push({title:t.replace(/\s*\((?:\d{4} )?(?:film|video game)\)$/,''),type:isGame?'game':'movie',year:ym?ym[1]:'',genres:[],blurb:clean(r.snippet).slice(0,120),where:'',status:'Match'});
  });
  return out;
}
async function runSearch(q){
  q=q.trim(); if(!q) return;
  const id=++searchId;
  const sec=$('#searchSec'), grid=$('#searchGrid'), note=$('#searchNote');
  sec.hidden=false; skeletons(grid,4); note.textContent=`Searching for "${q}"…`;
  sec.scrollIntoView();
  $('#searchBtn').disabled=true;
  let claudeItems=[]; const others=new Map();
  const show=()=>{
    if(id!==searchId) return;
    const seenK=new Set(), merged=[];
    [...claudeItems,...others.values()].forEach(it=>{
      const type=/game/i.test(it.type)?'game':'movie', k=key(it.title,type);
      if(seenK.has(k)||!clean(it.title)) return; seenK.add(k); merged.push({...it,type});
    });
    if(merged.length) renderCards(grid,merged.slice(0,12));
  };
  const addOthers=arr=>{ arr.forEach(it=>{ const k=key(it.title,/game/i.test(it.type)?'game':'movie'); if(!others.has(k)) others.set(k,it); }); show(); };
  addOthers(localSearch(q));
  const tasks=[
    searchItunes(q).then(addOthers).catch(()=>{}),
    searchGames(q).then(addOthers).catch(()=>{}),
    searchWiki(q).then(addOthers).catch(()=>{}),
    ask(`Search the web for movies and video games matching "${q}" (a title, franchise, actor, director or studio). Return up to 8 best matches, most relevant first. Return {"items":[{"title":"","type":"movie or game","year":"","genres":["",""],"rating":"score with source","blurb":"max 16 words","where":"where to watch or play"}]}`)
      .then(d=>{ claudeItems=d.items||[]; show(); }).catch(()=>{})
  ];
  await Promise.allSettled(tasks);
  if(id!==searchId) return;
  $('#searchBtn').disabled=false;
  if(!grid.querySelector('.card')){ grid.innerHTML='<p class="empty" style="grid-column:1/-1">No matches for that search. Check the spelling or try a different title.</p>'; note.textContent=''; }
  else note.textContent=`Showing matches for "${q}". Tap any card for full details.`;
}
$('#searchForm').addEventListener('submit',e=>{ e.preventDefault(); runSearch($('#q').value); });
$('#clearSearch').addEventListener('click',()=>{ searchId++; $('#searchSec').hidden=true; $('#q').value=''; $('#searchBtn').disabled=false; $('#top').scrollIntoView(); });

/* ---------- global clicks ---------- */
document.addEventListener('click',e=>{
  if(e.target.id==='retryNews'){ loadNews(); return; }
  const t = e.target.closest('[data-open],[data-save],[data-unsave],#dSave');
  if(!t) return;
  if(t.dataset.unsave){ state.saved.delete(t.dataset.unsave); renderList(); return; }
  if(t.id==='dSave'){ toggleSave(t.dataset.title,t.dataset.type); return; }
  if(t.dataset.save){ toggleSave(t.dataset.save,t.dataset.type); return; }
  if(t.dataset.open){ openDetail(t.dataset.open,t.dataset.type||'movie'); }
});
$('#refreshBtn').addEventListener('click',refreshAll);
$('#listJump').addEventListener('click',()=>$('#mylist').scrollIntoView());

/* ---------- motion and smart-device polish ---------- */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = ('IntersectionObserver' in window) ? new IntersectionObserver(es=>{
  es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('shown'); io.unobserve(e.target); } });
},{threshold:.08,rootMargin:'0px 0px -4% 0px'}) : null;
function revealEl(el,i=0){ el.style.setProperty('--i', i%6); el.classList.add('reveal'); if(io) io.observe(el); else el.classList.add('shown'); }
document.querySelectorAll('.reveal').forEach((el,i)=>{ el.style.setProperty('--i',i%4); if(io) io.observe(el); else el.classList.add('shown'); });

/* sliding thumb for segmented controls */
function initSeg(seg){
  const th=document.createElement('span'); th.className='thumb'; th.style.transition='none'; seg.prepend(th);
  const upd=()=>{ const b=seg.querySelector('button[aria-pressed="true"]'); if(!b) return; th.style.width=b.offsetWidth+'px'; th.style.transform=`translateX(${b.offsetLeft}px)`; };
  upd(); requestAnimationFrame(()=>requestAnimationFrame(()=>{ th.style.transition=''; }));
  new MutationObserver(upd).observe(seg,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  if('ResizeObserver' in window) new ResizeObserver(upd).observe(seg);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(upd);
}
document.querySelectorAll('.seg').forEach(initSeg);

/* glass nav that firms up on scroll */
const nav=$('#nav');
const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>12);
addEventListener('scroll',onScroll,{passive:true}); onScroll();

/* highlight the current section in the nav and dock */
const spyMap=new Map();
document.querySelectorAll('[data-spy]').forEach(a=>{ const id=a.dataset.spy; if(!spyMap.has(id)) spyMap.set(id,[]); spyMap.get(id).push(a); });
if('IntersectionObserver' in window){
  const spy=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){
      document.querySelectorAll('[data-spy]').forEach(a=>a.classList.remove('active'));
      (spyMap.get(e.target.id)||[]).forEach(a=>a.classList.add('active'));
    }});
  },{rootMargin:'-40% 0px -55% 0px'});
  ['trending','soon','finder','news','mylist'].forEach(id=>{ const s=document.getElementById(id); if(s) spy.observe(s); });
}
document.querySelectorAll('[data-focus-search]').forEach(b=>b.addEventListener('click',()=>{
  $('#top').scrollIntoView(); setTimeout(()=>$('#q').focus({preventScroll:true}),400);
}));

/* gentle 3D tilt on posters (mouse only) */
if(matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion){
  document.addEventListener('pointermove',e=>{
    const c=e.target.closest && e.target.closest('.card .cover'); if(!c) return;
    const r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    c.style.setProperty('--ry',(x*9).toFixed(2)+'deg'); c.style.setProperty('--rx',(-y*9).toFixed(2)+'deg');
  });
  document.addEventListener('pointerout',e=>{
    const c=e.target.closest && e.target.closest('.card .cover');
    if(c && !c.contains(e.relatedTarget)){ c.style.setProperty('--rx','0deg'); c.style.setProperty('--ry','0deg'); }
  });
}

/* start: show starter content instantly, then upgrade */
renderSoon($('#soonRows'),upcomingStarter()); state.src.soon='starter';
skeletons($('#newsList'),3);
renderList(); applyFilter(); refreshAll();
