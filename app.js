(() => {
  'use strict';
  const search = document.getElementById('menu-search');
  const buttons = [...document.querySelectorAll('.categories button')];
  const dishes = [...document.querySelectorAll('#menu-grid .dish')];
  const count = document.getElementById('result-count');
  let category = 'All';
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '');
  function render() {
    const query = normalize(search.value.trim());
    let visible = 0;
    dishes.forEach(dish => {
      const matches = (category === 'All' || dish.dataset.category === category) && normalize(dish.dataset.name).includes(query);
      dish.hidden = !matches;
      if (matches) visible++;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === category)));
    document.getElementById('empty-state').hidden = visible > 0;
    count.textContent = `${visible} ${visible === 1 ? 'dish' : 'dishes'} · ${category === 'All' ? 'all categories' : category}${search.value.trim() ? ` matching “${search.value.trim()}”` : ''}`;
  }
  function reset() { category = 'All'; search.value = ''; render(); }
  buttons.forEach(button => button.addEventListener('click', () => {category = button.dataset.category; render();}));
  search.addEventListener('input', render);
  document.getElementById('reset-menu').addEventListener('click', () => {reset(); search.focus({preventScroll:true});});
  document.getElementById('show-all').addEventListener('click', () => {reset(); search.focus({preventScroll:true});});
  document.querySelectorAll('[data-pick]').forEach(link => link.addEventListener('click', () => {category = link.dataset.pick; search.value = ''; render();}));
  // Explicit full-menu links restore all categories; browsing section navigation keeps search state.
  document.querySelectorAll('.hero-actions a[href="#menu"], .featured .section-heading a, .hero-figure a').forEach(link => link.addEventListener('click', reset));
  document.getElementById('menu-tools').hidden = false;
  document.getElementById('year').textContent = new Date().getFullYear();
  const toggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('navigation');
  function closeMenu(returnFocus=false) {
    navigation.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
    if(returnFocus) toggle.focus();
  }
  toggle.addEventListener('click',()=>{
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  });
  navigation.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape' && navigation.classList.contains('open'))closeMenu(true);});
  document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
  window.matchMedia('(min-width:641px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
  render();
})();
