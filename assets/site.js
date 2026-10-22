
(function(){
 var d=document.documentElement,$=function(i){return document.getElementById(i)};
 /* Load and play the background only when it can actually be seen. */
 var film=$('hero-film'), filmButton=$('film-toggle'), hero=$('home');
 var motion=matchMedia('(prefers-reduced-motion: reduce)'), userPaused=false, manualPlayback=false;
 var saveData=Boolean(navigator.connection && navigator.connection.saveData), inView=!('IntersectionObserver' in window), playRequest=0;
 var introReady=!d.classList.contains('signature-pending');
 var layoutReady=!location.hash || location.hash==='#home' || location.hash==='#main', playerOpen=false;
 function wantsPlayback(){return introReady && layoutReady && inView && !playerOpen && !document.hidden && !userPaused && (manualPlayback || (!motion.matches && !saveData));}
 function updateFilmControl(){
  var playing=!film.paused;
  filmButton.querySelector('span').textContent=playing?'Pause background video':'Play background video';
  filmButton.querySelector('use').setAttribute('href',playing?'#icon-pause':'#icon-play');
  filmButton.setAttribute('aria-pressed',String(playing));
 }
 function syncFilm(){
  var request=++playRequest;
  if(!wantsPlayback()){film.pause();updateFilmControl();return;}
  var source=film.querySelector('source');
  if(!source.hasAttribute('src')){source.src=source.dataset.src;film.load();}
  film.play().then(function(){if(request===playRequest){if(!wantsPlayback())film.pause();updateFilmControl();}}).catch(function(){if(request===playRequest)updateFilmControl();});
 }
 film.addEventListener('play',updateFilmControl);film.addEventListener('pause',updateFilmControl);
 film.addEventListener('error',updateFilmControl);
 filmButton.addEventListener('click',function(){
  if(film.paused){userPaused=false;manualPlayback=true;hero.setAttribute('data-motion-opt-in','true');}
  else{userPaused=true;}
  syncFilm();
 });
 motion.addEventListener('change',function(){manualPlayback=false;hero.removeAttribute('data-motion-opt-in');syncFilm();});
 document.addEventListener('visibilitychange',syncFilm);
 document.addEventListener('signature:complete',function(){introReady=true;syncFilm();},{once:true});
 if('IntersectionObserver' in window){
  new IntersectionObserver(function(entries){inView=entries[0].isIntersecting && entries[0].intersectionRatio>=.2;syncFilm();},{threshold:[0,.2]}).observe(hero);
 }
 if(!layoutReady){
  var settleHashLayout=function(){requestAnimationFrame(function(){
   var initialTarget;try{initialTarget=document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch(error){}
   if(initialTarget)initialTarget.scrollIntoView({behavior:'instant',block:'start'});
   requestAnimationFrame(function(){
   var bounds=hero.getBoundingClientRect();
   inView=Math.max(0,Math.min(bounds.bottom,innerHeight)-Math.max(bounds.top,0))/bounds.height>=.2;
   layoutReady=true;syncFilm();
  });});};
  if(document.readyState==='complete')settleHashLayout();else window.addEventListener('load',settleHashLayout,{once:true});
 }
 syncFilm();
 /* creator features: cards come from the JSON block; no video is requested until a card is chosen */
 var features=[],featureGrid=$('feature-grid'),player=$('feature-player'),playerVideo=$('feature-video'),playerError=$('feature-error'),activeFeature=null,playerTrigger=null;
 try{features=JSON.parse($('creator-features').textContent)}catch(error){}
 function clock(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
 function spoken(s){s=Math.floor(s);var m=Math.floor(s/60),r=s%60;return m+(m===1?' minute':' minutes')+(r?' '+r+(r===1?' second':' seconds'):'')}
 function svgUse(id,cls){return '<svg class="icon'+(cls?' '+cls:'')+'" aria-hidden="true" focusable="false"><use href="#'+id+'"/></svg>'}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
 features.forEach(function(f){
  var li=document.createElement('li');li.className='feature-card';
  li.innerHTML='<button class="feature-trigger" type="button" data-feature="'+esc(f.id)+'" aria-label="'+esc('Play video by '+f.creatorName+': '+f.title+(f.duration?', '+spoken(f.duration):''))+'">'+
   '<span class="feature-frame"><img src="'+esc(f.posterSrc)+'" width="540" height="960" alt="" loading="lazy" decoding="async">'+
   '<span class="feature-play">'+svgUse('icon-play-solid')+'</span>'+(f.duration?'<span class="feature-time">'+clock(f.duration)+'</span>':'')+'</span>'+
   '<span class="feature-meta"><span class="feature-creator">'+svgUse('icon-facebook','feature-platform')+esc(f.creatorName)+'</span><span class="feature-title">'+esc(f.title)+'</span></span></button>'+
   (f.originalPostUrl?'<a class="feature-source" href="'+esc(f.originalPostUrl)+'" target="_blank" rel="noopener noreferrer">Watch on '+esc(f.platform)+'<span class="sr-only"> (opens in a new tab)</span></a>':'');
  featureGrid.appendChild(li);
 });
 function releaseVideo(){playerVideo.pause();playerVideo.removeAttribute('src');playerVideo.removeAttribute('poster');playerVideo.load()}
 function startFeature(f){
  activeFeature=f;playerError.hidden=true;playerVideo.hidden=false;
  $('feature-player-creator').textContent=f.creatorName;$('feature-player-title').textContent=f.title;
  playerVideo.setAttribute('aria-label','Video by '+f.creatorName+': '+f.title);
  playerVideo.poster=f.posterSrc;playerVideo.src=f.localVideoSrc;
  var attempt=playerVideo.play();if(attempt&&attempt.catch)attempt.catch(function(){/* controls stay available for a manual start */});
 }
 function openFeature(f,trigger){
  if(playerOpen&&activeFeature===f)return;
  if(playerOpen)releaseVideo();
  playerTrigger=trigger;playerOpen=true;syncFilm();
  if(!player.open){if(typeof player.showModal==='function')player.showModal();else{player.setAttribute('open','');d.classList.add('player-fallback');lockPage(true)}}
  startFeature(f);
  $('feature-close').focus({preventScroll:true});
 }
 function lockPage(lock){[].forEach.call(document.querySelectorAll('.bar, main, footer, body > .skip'),function(el){el.inert=lock})}
 function closeFeature(){
  if(!playerOpen)return;
  releaseVideo();activeFeature=null;playerOpen=false;
  if(player.open){if(typeof player.close==='function'&&!d.classList.contains('player-fallback'))player.close();else{player.removeAttribute('open');d.classList.remove('player-fallback');lockPage(false)}}
  if(playerTrigger&&playerTrigger.isConnected)playerTrigger.focus({preventScroll:true});
  syncFilm();
 }
 featureGrid.addEventListener('click',function(e){
  var t=e.target.closest('[data-feature]');if(!t)return;
  var f=features.filter(function(x){return x.id===t.dataset.feature})[0];if(f)openFeature(f,t);
 });
 playerVideo.addEventListener('error',function(){if(playerOpen&&playerVideo.getAttribute('src')){playerVideo.hidden=true;playerError.hidden=false;$('feature-retry').focus({preventScroll:true})}});
 $('feature-retry').addEventListener('click',function(){if(activeFeature){releaseVideo();startFeature(activeFeature);$('feature-close').focus({preventScroll:true})}});
 $('feature-close').addEventListener('click',closeFeature);$('feature-error-close').addEventListener('click',closeFeature);
 player.addEventListener('cancel',function(e){e.preventDefault();closeFeature()});
 player.addEventListener('close',function(){if(playerOpen)closeFeature()});
 player.addEventListener('click',function(e){if(e.target===player)closeFeature()});
 document.addEventListener('keydown',function(e){
  if(!playerOpen||!d.classList.contains('player-fallback'))return;
  if(e.key==='Escape'){e.preventDefault();closeFeature();return}
  if(e.key==='Tab'){var f=[].filter.call(player.querySelectorAll('button,video[controls],a[href]'),function(x){return !x.hidden&&x.offsetParent!==null});if(!f.length)return;var first=f[0],last=f[f.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 });
 /* nav */
 var burger=$('burger'),nav=$('nav');
 function closeNav(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open navigation')}
 burger.addEventListener('click',function(){var o=burger.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close navigation':'Open navigation')});
 nav.addEventListener('click',function(e){if(e.target.closest('a'))closeNav()});
 document.addEventListener('click',function(e){if(!e.target.closest('.bar'))closeNav()});
 matchMedia('(min-width:981px)').addEventListener('change',function(e){if(e.matches)closeNav()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){closeNav();burger.focus()}});
 /* menu */
 var q=$('q'),btns=[].slice.call(document.querySelectorAll('#cats button')),dishes=[].slice.call(document.querySelectorAll('#grid .dish')),cat='All';
 var norm=function(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'')};
 var dishNames=dishes.map(function(dish){return norm(dish.dataset.name)});
 function render(){
  var t=norm(q.value.trim()),n=0;
  dishes.forEach(function(x,index){var ok=(cat==='All'||x.dataset.category===cat)&&dishNames[index].indexOf(t)>-1;x.hidden=!ok;if(ok)n++});
  btns.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.category===cat))});
  $('empty').hidden=n>0;
  $('count').textContent=n+(n===1?' dish':' dishes')+(cat==='All'?'':' in '+cat)+(q.value.trim()?' matching “'+q.value.trim()+'”':'');
 }
 function reset(){cat='All';q.value='';render()}
 btns.forEach(function(b){b.addEventListener('click',function(){cat=b.dataset.category;render()})});
 q.addEventListener('input',render);
 $('reset').addEventListener('click',function(){reset();q.focus({preventScroll:true})});
 $('showall').addEventListener('click',function(){reset();q.focus({preventScroll:true})});
 [].forEach.call(document.querySelectorAll('[data-pick]'),function(a){a.addEventListener('click',function(){cat=a.dataset.pick;q.value='';render()})});
 [].forEach.call(document.querySelectorAll('[data-reset]'),function(a){a.addEventListener('click',reset)});
 $('tools').hidden=false;$('yr').textContent=new Date().getFullYear();render();
})();
