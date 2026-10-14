'use strict';
/* NATIVO mobile enhancement: graceful enhancement, safe on desktop and reduced-motion devices. */
(()=>{
 const mobile=window.matchMedia('(max-width: 740px)');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const dock=[...document.querySelectorAll('.dock-link')];
 const ids=['inicio','producto','manifiesto','historias','aprende','transparencia','comunidad'];
 const indicator=document.querySelector('.mobile-scroll-indicator span');
 let raf=0;
 function update(){raf=0;if(!mobile.matches)return;
  const doc=document.documentElement;const available=doc.scrollHeight-innerHeight;
  if(indicator)indicator.style.width=(available>0?Math.min(100,scrollY/available*100):0)+'%';
  let current='inicio',focus=innerHeight*.42;
  for(const id of ids){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=focus)current=id;}
  if(current==='manifiesto'||current==='aprende'||current==='transparencia')current='historias';
  dock.forEach(a=>{const selected=a.dataset.dock===current;a.classList.toggle('is-current',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
 }
 const request=()=>{if(!raf)raf=requestAnimationFrame(update)};
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request,{passive:true});request();
 // Immediate visual indication of navigation state; scrolling remains native and accessible.
 dock.forEach(a=>a.addEventListener('click',()=>{dock.forEach(x=>x.classList.remove('is-current'));a.classList.add('is-current')}));
 // Refined touch feedback without intercepting normal taps/scroll or relying on vibration APIs.
 document.querySelectorAll('.mobile-dock a,.hero-buttons .btn,.slider-controls button,.product-buttons .btn').forEach(el=>{
  el.addEventListener('pointerdown',e=>{if(!mobile.matches||reduced.matches)return;if(e.pointerType==='mouse')return;
   const dot=document.createElement('span');dot.className='tap-burst';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';document.body.appendChild(dot);dot.addEventListener('animationend',()=>dot.remove(),{once:true});
  },{passive:true});
 });
 // Dynamic subtle scroll reveal cadence on cards; no horizontal scroll hijacking.
 const stories=document.querySelector('.stories-track');
 if(stories&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){entry.target.classList.toggle('story-in-focus',entry.isIntersecting)}},{root:stories,threshold:.62});
  stories.querySelectorAll('.story-card').forEach(card=>observer.observe(card));
 }
 // Release oversized desktop-only movement effects on mobile orientation changes.
 const pic=document.querySelector('.hero-photo');
 function clearTransforms(){if(!mobile.matches)return;if(pic)pic.style.translate='none';document.querySelectorAll('.tilt-card').forEach(card=>card.style.transform='')}
 addEventListener('orientationchange',clearTransforms);clearTransforms();
})();
