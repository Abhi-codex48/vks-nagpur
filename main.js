/* VK&S — Interactions v5 | 2026 */
(function(){
  'use strict';

  /* ── IMAGE PROTECTION ── */
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
  const closeMobileDrawer = ()=>{
    ham?.classList.remove('open');
    ham?.setAttribute('aria-expanded','false');
    drawer?.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };
  ham?.setAttribute('aria-expanded','false');
  ham?.addEventListener('click', ()=>{
    const open = ham.classList.toggle('open');
    drawer?.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    ham.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  drawer?.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', closeMobileDrawer);
  });
  drawer?.addEventListener('click', e=>{
    if(e.target === drawer) closeMobileDrawer();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape' && drawer?.classList.contains('open')){
      closeMobileDrawer();
    }
  });

  /* ── INTERNAL TIMESHEET ACCESS ── */
  document.querySelectorAll('[data-timesheet-link]').forEach(link=>{
    link.addEventListener('click', e=>{
      const allowed = window.confirm('This timesheet is for the internal VK&S team only. Click OK to continue, or Cancel to stay on this page.');
      if(!allowed){
        e.preventDefault();
        return;
      }
    });
  });

  /* ── PARTNER PHONE PRIVACY ── */
  document.querySelectorAll('.bento-card[data-card-href]').forEach(card=>{
    const target = card.dataset.cardHref;
    if(!target) return;
    const openCard = e=>{
      if(e?.button === 1 || e?.ctrlKey || e?.metaKey || e?.shiftKey) return;
      e?.preventDefault();
      if(card.classList.contains('is-opening')) return;
      card.classList.add('is-opening');
      window.setTimeout(()=>{ window.location.href = target; }, 240);
    };
    card.addEventListener('click', openCard);
    card.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') openCard(e);
    });
  });

  const eyeIcon = '<svg class="phone-reveal-eye" viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/></svg>';
  const callIcon = '<svg class="phone-reveal-call" viewBox="0 0 24 24" fill="none" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16z"/></svg>';
  document.querySelectorAll('a.ft-p-num[href^="tel:"],a.p-mobile[href^="tel:"],a.pf-mobile-link[href^="tel:"]').forEach(link=>{
    const phoneText = link.textContent.replace(/\s+/g,' ').trim();
    if(!phoneText) return;
    link.classList.add('phone-reveal-link');
    link.dataset.phoneText = phoneText;
    link.setAttribute('aria-expanded','false');
    link.setAttribute('aria-label',`Show mobile number for ${phoneText}`);
    link.innerHTML = `${eyeIcon}<span class="phone-reveal-label">View contact details</span>`;
    link.addEventListener('click', e=>{
      if(link.classList.contains('is-revealed')) return;
      e.preventDefault();
      link.classList.add('is-revealed');
      link.setAttribute('aria-expanded','true');
      link.setAttribute('aria-label',`Dial ${phoneText}`);
      link.innerHTML = `${callIcon}<span class="phone-reveal-label">${phoneText}</span>`;
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

  /* ── PEER REVIEW STAMP MODAL ── */
  const peerStamp = document.querySelector('.hero-peer-stamp');
  const peerTriggers = document.querySelectorAll('[data-peer-open]');
  const peerModal = document.getElementById('peerReviewModal');
  const peerImage = peerModal?.querySelector('.peer-review-image');
  const peerPlaceholder = peerModal?.querySelector('.peer-review-placeholder');
  const peerFocusable = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';
  let peerReturnFocus = null;
  if(peerStamp){
    requestAnimationFrame(()=> peerStamp.classList.add('is-live'));
  }
  const openPeerModal = ()=>{
    if(!peerModal) return;
    peerReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    peerModal.classList.add('open');
    peerModal.setAttribute('aria-hidden','false');
    document.body.classList.add('no-scroll');
    window.setTimeout(()=> peerModal.querySelector(peerFocusable)?.focus(), 0);
  };
  const closePeerModal = ()=>{
    if(!peerModal) return;
    peerModal.classList.remove('open');
    peerModal.setAttribute('aria-hidden','true');
    document.body.classList.remove('no-scroll');
    peerReturnFocus?.focus?.();
  };
  peerTriggers.forEach(trigger=>{
    trigger.addEventListener('click', openPeerModal);
  });
  peerModal?.querySelectorAll('[data-peer-close]').forEach(el=>{
    el.addEventListener('click', closePeerModal);
  });
  document.addEventListener('click', e=>{
    if(e.target.closest('[data-peer-close]')) closePeerModal();
  });
  document.addEventListener('keydown', e=>{
    if(!peerModal?.classList.contains('open')) return;
    if(e.key === 'Escape'){
      closePeerModal();
      return;
    }
    if(e.key !== 'Tab') return;
    const focusables = [...peerModal.querySelectorAll(peerFocusable)].filter(el=>el.offsetParent !== null);
    if(!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault();
      last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault();
      first.focus();
    }
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
    const navLinks = document.querySelectorAll('.svc-nav a, .svc-mobile-jump a');
    if(!navLinks.length) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||76;
    const sections = document.querySelectorAll('.svc-section');
    let current = sections.length ? '#' + sections[0].id : '';
    sections.forEach(s=>{
      // offsetTop is relative to the positioned .svc-layout; use document coords
      const top = s.getBoundingClientRect().top + window.scrollY;
      if(window.scrollY >= top - navH - 90) current = '#' + s.id;
    });
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

/* ── SCROLL PROGRESS BAR ── */
(function(){
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden','true');
  document.body.appendChild(bar);
  let ticking = false;
  function update(){
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = `scaleX(${ratio})`;
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if(!ticking){ ticking = true; requestAnimationFrame(update); }
  }, {passive:true});
  update();
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
  let current = 0, autoTimer = null, resumeTimer = null, initialized = false;
  let touchStartX = 0, touchStartY = 0;

  function stopAuto(){
    clearInterval(autoTimer);
    autoTimer = null;
  }

  function startAuto(){
    stopAuto();
    if(!isMob() || track.querySelectorAll('.p-card').length < 2) return;
    autoTimer = setInterval(()=>goTo(current+1),4500);
  }

  function restartAuto(delay = 6500){
    stopAuto();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, delay);
  }

  function init(){
    if(initialized) return;
    initialized = true;
    Array.from(grid.querySelectorAll('.p-card')).forEach((card,i)=>{
      const clone = card.cloneNode(true);
      clone.style.cursor = 'pointer';
      clone.addEventListener('click',e=>{
        if(e.target.closest('a, button')) return;
        window.location.href = partnerLinks[i]||'partners.html';
      });
      clone.querySelectorAll('.phone-reveal-link').forEach(link=>{
        link.addEventListener('click',e=>{
          e.stopPropagation();
          if(link.classList.contains('is-revealed')) return;
          e.preventDefault();
          const phoneText = link.dataset.phoneText || link.getAttribute('href')?.replace('tel:','') || '';
          link.classList.add('is-revealed');
          link.setAttribute('aria-expanded','true');
          link.innerHTML = `<span class="phone-reveal-label">${phoneText}</span>`;
        });
      });
      clone.classList.remove('rv','rv-d1','rv-d2','rv-d3');
      clone.classList.add('vis');
      track.appendChild(clone);
      const dot = document.createElement('div');
      dot.className = 'p-slider-dot'+(i===0?' active':'');
      dot.addEventListener('click',()=>{ goTo(i); restartAuto(); });
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

  prevBtn?.addEventListener('click',()=>{ goTo(current-1); restartAuto(); });
  nextBtn?.addEventListener('click',()=>{ goTo(current+1); restartAuto(); });
  sliderWrap.addEventListener('touchstart',e=>{
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    stopAuto();
  }, {passive:true});
  sliderWrap.addEventListener('touchend',e=>{
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if(Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)){
      goTo(current + (dx > 0 ? 1 : -1));
    }
    restartAuto();
  }, {passive:true});
  sliderWrap.addEventListener('mouseenter',stopAuto);
  sliderWrap.addEventListener('mouseleave',startAuto);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) stopAuto();
    else startAuto();
  });

  function toggle(){
    if(isMob()){ grid.style.display='none'; sliderWrap.style.display='block'; init(); startAuto(); }
    else { grid.style.display=''; sliderWrap.style.display='none'; stopAuto(); }
  }
  toggle();
  window.addEventListener('resize',toggle);
})();
