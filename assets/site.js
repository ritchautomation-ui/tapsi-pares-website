
(function(){
 var d=document.documentElement,$=function(i){return document.getElementById(i)};
 /* Load and play the background only when it can actually be seen. */
 var film=$('hero-film'), filmButton=$('film-toggle'), hero=$('home');
 var motion=matchMedia('(prefers-reduced-motion: reduce)'), userPaused=false, manualPlayback=false;
 var saveData=Boolean(navigator.connection && navigator.connection.saveData), inView=!('IntersectionObserver' in window), playRequest=0;
 var introReady=!d.classList.contains('signature-pending');
 var layoutReady=!location.hash || location.hash==='#home' || location.hash==='#main';
 function wantsPlayback(){return introReady && layoutReady && inView && !document.hidden && !userPaused && (manualPlayback || (!motion.matches && !saveData));}
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
 /* nav */
 var burger=$('burger'),nav=$('nav');
 function closeNav(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Open navigation')}
 burger.addEventListener('click',function(){var o=burger.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close navigation':'Open navigation')});
 nav.addEventListener('click',function(e){if(e.target.closest('a'))closeNav()});
 document.addEventListener('click',function(e){if(!e.target.closest('.bar'))closeNav()});
 matchMedia('(min-width:761px)').addEventListener('change',function(e){if(e.matches)closeNav()});
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
