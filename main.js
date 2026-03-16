/* VKS — Interactions v5 | 2026 */
(function(){
  'use strict';

  /* ── IMAGE PROTECTION ── */
 document.addEventListener('contextmenu', e=>e.preventDefault());
document.addEventListener('touchstart', e=>{ if(e.touches.length>1) e.preventDefault(); }, {passive:false});
document.addEventListener('touchmove', e=>{ if(e.touches.length>1) e.preventDefault(); }, {passive:false});
document.addEventListener('keydown', e=>{ if((e.ctrlKey||e.metaKey)&&(e.key==='+'||e.key==='-'||e.key==='=')) e.preventDefault(); });
document.addEventListener('wheel', e=>{ if(e.ctrlKey) e.preventDefault(); }, {passive:false});
  document.addEventListener('dragstart', e=>{ if(e.target.tagName==='IMG') e.preventDefault(); });

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  const stt = document.querySelector('.stt');

  window.addEventListener('scroll', ()=>{
    const s = window.scrollY;
    nav?.classList.toggle('scrolled', s > 40);
    stt?.classList.toggle('show', s > 500);
    updateSvcNav();
  }, {passive:true});

  /* ── SCROLL TO TOP ── */
  stt?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  /* ── HAMBURGER DRAWER ── */
  const ham = document.querySelector('.ham');
  const drawer = document.querySelector('.drawer');
  const navDropdowns = document.querySelectorAll('.nav-item.has-dropdown');
  const drawerGroups = document.querySelectorAll('.drawer-group');
  const closeDesktopDropdowns = ()=>{
    navDropdowns.forEach(item=>{
      item.classList.remove('open');
      item.querySelector('.nav-drop-toggle')?.setAttribute('aria-expanded','false');
    });
  };
  ham?.addEventListener('click', ()=>{
    const open = ham.classList.toggle('open');
    drawer?.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
  });
  drawer?.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      ham?.classList.remove('open');
      drawer?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  navDropdowns.forEach(item=>{
    const toggle = item.querySelector('.nav-drop-toggle');
    toggle?.addEventListener('click', e=>{
      if(window.innerWidth <= 900) return;
      e.preventDefault();
      const shouldOpen = !item.classList.contains('open');
      closeDesktopDropdowns();
      item.classList.toggle('open', shouldOpen);
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    });
    item.addEventListener('mouseenter', ()=>{
      if(window.innerWidth > 900){
        item.classList.add('open');
        toggle?.setAttribute('aria-expanded','true');
      }
    });
    item.addEventListener('mouseleave', ()=>{
      if(window.innerWidth > 900){
        item.classList.remove('open');
        toggle?.setAttribute('aria-expanded','false');
      }
    });
  });

  document.addEventListener('click', e=>{
    if(!e.target.closest('.nav-item.has-dropdown')) closeDesktopDropdowns();
  });

  drawerGroups.forEach(group=>{
    const toggle = group.querySelector('.drawer-toggle');
    toggle?.addEventListener('click', ()=>{
      const shouldOpen = !group.classList.contains('open');
      drawerGroups.forEach(other=>{
        other.classList.remove('open');
        other.querySelector('.drawer-toggle')?.setAttribute('aria-expanded','false');
      });
      group.classList.toggle('open', shouldOpen);
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    });
  });

  /* ── REVEAL ON SCROLL ── */
  const rvEls = document.querySelectorAll('.rv, .rv-scale');
  if(rvEls.length){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, {threshold:0.06, rootMargin:'0px 0px -30px 0px'});
    rvEls.forEach(el => io.observe(el));
  }

  /* ── TYPEWRITER (home hero) ── */
  const tw = document.querySelector('.hero-typewriter');
  if(tw){
    const cursor = tw.querySelector('.tw-cursor');
    const phrases = ['Audit & Assurance','Direct Taxation','Indirect Tax & GST','Legal Services','Debt Syndication','Insolvency & IBC','State Incentives','Listing Compliances'];
    let pi=0,ci=0,deleting=false;
    const textNode = document.createElement('span');
    tw.insertBefore(textNode, cursor);
    function typeStep(){
      const phrase = phrases[pi];
      if(!deleting){
        textNode.textContent = phrase.slice(0, ++ci);
        if(ci===phrase.length){ deleting=true; setTimeout(typeStep,2000); return; }
        setTimeout(typeStep,65);
      } else {
        textNode.textContent = phrase.slice(0, --ci);
        if(ci===0){ deleting=false; pi=(pi+1)%phrases.length; setTimeout(typeStep,380); return; }
        setTimeout(typeStep,36);
      }
    }
    setTimeout(typeStep,1000);
  }

  /* ── PEER REVIEW STAMP MODAL ── */
  const peerStamp = document.querySelector('.hero-peer-stamp');
  const peerModal = document.getElementById('peerReviewModal');
  const peerImage = peerModal?.querySelector('.peer-review-image');
  const peerPlaceholder = peerModal?.querySelector('.peer-review-placeholder');
  if(peerStamp){
    requestAnimationFrame(()=> peerStamp.classList.add('is-live'));
  }
  const openPeerModal = ()=>{
    if(!peerModal) return;
    peerModal.classList.add('open');
    peerModal.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
  };
  const closePeerModal = ()=>{
    if(!peerModal) return;
    peerModal.classList.remove('open');
    peerModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('no-scroll');
  };
  peerStamp?.addEventListener('click', openPeerModal);
  peerModal?.querySelectorAll('[data-peer-close]').forEach(el=>{
    el.addEventListener('click', closePeerModal);
  });
  document.addEventListener('click', e=>{
    if(e.target.closest('.hero-peer-stamp')) openPeerModal();
    if(e.target.closest('[data-peer-close]')) closePeerModal();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && peerModal?.classList.contains('open')) closePeerModal();
  });
  if(peerImage && peerPlaceholder){
    peerImage.addEventListener('load', ()=>{ peerPlaceholder.style.display = 'none'; });
    peerImage.addEventListener('error', ()=>{ peerPlaceholder.style.display = 'block'; });
    if(peerImage.complete && peerImage.naturalWidth > 0){
      peerPlaceholder.style.display = 'none';
    }
  }

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      if(a.closest('.svc-nav')) return;
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
        window.scrollTo({top: target.offsetTop - navH - 4, behavior:'smooth'});
      }
    });
  });

  /* ── SERVICES SIDEBAR ACTIVE STATE ── */
  function updateSvcNav(){
    const navLinks = document.querySelectorAll('.svc-nav a');
    if(!navLinks.length) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
    const sections = document.querySelectorAll('.svc-section');
    let current = '';
    sections.forEach(s=>{ if(window.scrollY >= s.offsetTop - navH - 60) current = '#' + s.id; });
    navLinks.forEach(a=>{ a.classList.toggle('active', a.getAttribute('href')===current); });
  }

  /* ── CONTACT FORM ── */
  const form = document.querySelector('#contactForm');
  form?.addEventListener('submit', ()=>{
    const btn = form.querySelector('button[type="submit"]');
    if(btn){
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
    }
  });

  /* ── DRAWER STAGGER ── */
  document.querySelectorAll('.drawer a').forEach((a,i)=>{
    a.style.animationDelay = `${i*0.055 + 0.08}s`;
  });

  /* ── PUBLICATIONS FILTER ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card[data-cat]');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      pubCards.forEach(card=>{
        card.style.display = (cat==='all' || card.dataset.cat===cat) ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.p-card[data-partner-link]').forEach(card=>{
    const target = card.dataset.partnerLink;
    if(!target) return;
    card.style.cursor = 'pointer';
    card.addEventListener('click', e=>{
      if(e.target.closest('a, button')) return;
      window.location.href = target;
    });
    card.addEventListener('keydown', e=>{
      if((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a, button')){
        e.preventDefault();
        window.location.href = target;
      }
    });
  });

 

})();

/* ── EVENTS TABS + SLIDERS ── */
(function(){
  const tabs = document.querySelectorAll('.event-tab');
  const panels = document.querySelectorAll('.event-panel');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      panels.forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('tab-'+tab.dataset.tab);
      if(target) target.classList.add('active');
    });
  });

  const sliderState = {};

  function getCardW(sliderId){
    const slider = document.getElementById(sliderId);
    if(!slider) return 0;
    const card = slider.querySelector('.event-card');
    if(!card) return 0;
    return card.offsetWidth + parseInt(getComputedStyle(slider).gap || '16');
  }

  function slideTo(sliderId, dir){
    const slider = document.getElementById(sliderId);
    if(!slider) return;
    const cards = slider.querySelectorAll('.event-card');
    if(!sliderState[sliderId]) sliderState[sliderId] = 0;
    sliderState[sliderId] = Math.max(0, Math.min(sliderState[sliderId]+dir, cards.length-1));
    slider.style.transform = `translateX(-${sliderState[sliderId] * getCardW(sliderId)}px)`;
  }

  document.querySelectorAll('.slider-btn[data-slider]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      slideTo(btn.dataset.slider, parseInt(btn.dataset.dir));
    });
  });

  /* Touch/swipe */
  document.querySelectorAll('.events-slider-wrap').forEach(wrap=>{
    let startX=0, isDragging=false;
    wrap.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; }, {passive:true});
    wrap.addEventListener('touchend', e=>{
      const diff = startX - e.changedTouches[0].clientX;
      const slider = wrap.querySelector('.events-slider');
      if(!slider || Math.abs(diff)<45) return;
      slideTo(slider.id, diff>0 ? 1 : -1);
    });
    /* Mouse drag */
    wrap.addEventListener('mousedown', e=>{ startX=e.clientX; isDragging=true; });
    wrap.addEventListener('mousemove', e=>{ if(isDragging) e.preventDefault(); });
    wrap.addEventListener('mouseup', e=>{
      if(!isDragging) return;
      isDragging=false;
      const diff = startX - e.clientX;
      const slider = wrap.querySelector('.events-slider');
      if(!slider || Math.abs(diff)<45) return;
      slideTo(slider.id, diff>0 ? 1 : -1);
    });
    wrap.addEventListener('mouseleave', ()=>{ isDragging=false; });
  });
})();

/* ── ACHIEVEMENT COUNTERS ── */
(function(){
  const counters = document.querySelectorAll('.achieve-num span[data-count], .stat-n[data-count], .ft-highlight strong[data-count]');
  if(!counters.length) return;

  function animateCount(el){
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const step = 16;
    const increment = target / (duration/step);
    let current = 0;
    const timer = setInterval(()=>{
      current += increment;
      if(current >= target){ current=target; clearInterval(timer); }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ animateCount(e.target); io.unobserve(e.target); }
    });
  }, {threshold:0.4});

  counters.forEach(c=>io.observe(c));
})();

/* Footer dynamics */
(function(){
  const footerText = document.querySelector('.ft-dynamic-text');
  if(footerText){
    const phrases = [
      'Audit and assurance mandates',
      'Direct and indirect tax advisory',
      'Litigation and representation support',
      'IBC and restructuring matters',
      'Business setup and incentive advisory'
    ];
    let index = 0;
    setInterval(()=>{
      index = (index + 1) % phrases.length;
      footerText.style.opacity = '0';
      footerText.style.transform = 'translateY(6px)';
      setTimeout(()=>{
        footerText.textContent = phrases[index];
        footerText.style.opacity = '1';
        footerText.style.transform = 'translateY(0)';
      }, 180);
    }, 2600);
  }
})();

/* ── PARTNER CARDS MOBILE SLIDER ── */
(function(){
  const isMob = () => window.innerWidth <= 640;
  const grid = document.getElementById('partnersGridDesktop');
  const sliderWrap = document.getElementById('partnerSliderMob');
  const track = document.getElementById('pSliderTrack');
  const dotsWrap = document.getElementById('pSliderDots');
  const prevBtn = document.getElementById('pSliderPrev');
  const nextBtn = document.getElementById('pSliderNext');
  if(!grid||!sliderWrap||!track) return;

  const partnerLinks = ['partners.html#varun','partners.html#pavan','partners.html#ashish'];
  let current = 0, autoTimer = null, initialized = false;

  function init(){
    if(initialized) return;
    initialized = true;
    Array.from(grid.querySelectorAll('.p-card')).forEach((card,i)=>{
      const clone = card.cloneNode(true);
      clone.style.cursor = 'pointer';
      clone.addEventListener('click',()=>{ window.location.href = partnerLinks[i]||'partners.html'; });
      clone.classList.remove('rv','rv-d1','rv-d2','rv-d3');
      clone.classList.add('vis');
      track.appendChild(clone);
      const dot = document.createElement('div');
      dot.className = 'p-slider-dot'+(i===0?' active':'');
      dot.addEventListener('click',()=>goTo(i));
      dotsWrap.appendChild(dot);
    });
    goTo(0);
    startAuto();
  }

  function goTo(idx){
    const cards = track.querySelectorAll('.p-card');
    current = (idx+cards.length)%cards.length;
    track.style.transform = `translateX(-${current*100}%)`;
    dotsWrap.querySelectorAll('.p-slider-dot').forEach((d,i)=>d.classList.toggle('active',i===current));
  }

  function startAuto(){ clearInterval(autoTimer); autoTimer = setInterval(()=>goTo(current+1),4500); }

  prevBtn.addEventListener('click',()=>{ goTo(current-1); startAuto(); });
  nextBtn.addEventListener('click',()=>{ goTo(current+1); startAuto(); });

  function toggle(){
    if(isMob()){ grid.style.display='none'; sliderWrap.style.display='block'; init(); }
    else { grid.style.display=''; sliderWrap.style.display='none'; }
  }
  toggle();
  window.addEventListener('resize',toggle);
})();

