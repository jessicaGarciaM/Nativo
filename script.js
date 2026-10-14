'use strict';
/* NATIVO — BUILT NATURALLY. No frameworks / GitHub Pages compatible. */
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const updateYear=()=>{$('#year').textContent=new Date().getFullYear()};updateYear();
const progress=$('#progress-bar'),header=$('.header');
let ticking=false;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';header.classList.toggle('scrolled',scrollY>35);ticking=false})}
addEventListener('scroll',onScroll,{passive:true});onScroll();
// Section reveal observer — respects reduced motion
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver'in window&&!reduced){const obs=new IntersectionObserver((entries,observer)=>{entries.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('revealed');observer.unobserve(target)}})},{threshold:.08,rootMargin:'0px 0px -25px 0px'});$$('[data-reveal]').forEach(el=>obs.observe(el))}else{$$('[data-reveal]').forEach(el=>el.classList.add('revealed'))}
// Subtle premium cursor light
const glow=$('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches&&!reduced){document.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}
// Magnetic CTA only on capable pointers
if(matchMedia('(pointer:fine)').matches&&!reduced){$$('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.085}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}
const hamburger=$('.hamburger'),mobileMenu=$('#mobile-menu');
function closeMenu(){hamburger.classList.remove('active');hamburger.setAttribute('aria-expanded','false');mobileMenu.classList.remove('open')}
hamburger.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');hamburger.classList.toggle('active',open);hamburger.setAttribute('aria-expanded',String(open))});$$('a',mobileMenu).forEach(a=>a.addEventListener('click',closeMenu));
// Accessible overlay and drawer / modal interaction
const overlay=$('#modal-overlay'),drawer=$('#cart-drawer'),info=$('#info-modal'),search=$('#search-modal');let active=null,previousFocus=null;
function openLayer(layer){if(active)closeLayer(false);previousFocus=document.activeElement;active=layer;overlay.hidden=false;document.body.classList.add('locked');layer.classList.add('open');layer.setAttribute('aria-hidden','false');setTimeout(()=>{const focusable=layer.querySelector('button:not([disabled]),input,a');focusable?.focus()},100)}
function closeLayer(returnFocus=true){if(!active)return;active.classList.remove('open');active.setAttribute('aria-hidden','true');active=null;overlay.hidden=true;document.body.classList.remove('locked');if(returnFocus)previousFocus?.focus?.()}
overlay.addEventListener('click',()=>closeLayer());document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLayer();closeMenu()}if(e.key==='Tab'&&active){const nodes=$$('button:not([disabled]),input:not([disabled]),a[href]',active).filter(el=>el.offsetParent!==null);if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
$$('.cart-trigger').forEach(b=>b.addEventListener('click',()=>{renderCart();openLayer(drawer)}));$('.close-drawer').addEventListener('click',()=>closeLayer());$('.info-close').addEventListener('click',()=>closeLayer());
// Lightweight demo cart, persistent only in browser. No sales/checkout.
let cart=0;try{cart=Math.max(0,Math.min(99,Number(localStorage.getItem('nativo_demo_cart'))||0))}catch{}
function persist(){try{localStorage.setItem('nativo_demo_cart',String(cart))}catch{}}
function updateCartCount(){$$('.cart-count').forEach(el=>el.textContent=cart)}updateCartCount();
function renderCart(){const holder=$('#cart-items');holder.replaceChildren();if(!cart){holder.innerHTML='<p class="empty-cart">Todavía no agregas nada. Puedes explorar nuestro producto fundador.</p>';return}const row=document.createElement('div');row.className='cart-line';const pic=document.createElement('img');pic.src='assets/creatine-pack.webp';pic.alt='Creatina NATIVO';const detail=document.createElement('div');const title=document.createElement('strong');title.textContent='CREATINA MONOHIDRATADA NATIVO';const quantity=document.createElement('p');quantity.textContent='300 g · Cantidad: '+cart;const remove=document.createElement('button');remove.type='button';remove.textContent='Eliminar del carrito';remove.addEventListener('click',()=>{cart=0;persist();updateCartCount();renderCart()});detail.append(title,quantity,remove);row.append(pic,detail);holder.append(row)}
$$('.add-to-cart').forEach(btn=>btn.addEventListener('click',()=>{cart=Math.min(99,cart+1);persist();updateCartCount();renderCart();openLayer(drawer)}));$('#cart-request').addEventListener('click',()=>{closeLayer();location.hash='#comunidad'});
// Horizontal snap slider
$$('[data-slide]').forEach(btn=>btn.addEventListener('click',()=>{const track=$('#'+btn.dataset.slide+'-track');if(!track)return;const card=track.querySelector('.story-card');const step=card?card.getBoundingClientRect().width+13:300;track.scrollBy({left:step*Number(btn.dataset.direction),behavior:reduced?'instant':'smooth'})}));
// Manifesto expand
$('.manifesto-expand').addEventListener('click',e=>{const target=$('#full-manifesto'),show=target.hidden;target.hidden=!show;e.currentTarget.setAttribute('aria-expanded',String(show));e.currentTarget.innerHTML=show?'CERRAR MANIFIESTO <span>−</span>':'LEER MANIFIESTO COMPLETO <span>＋</span>'});
// Helpful educational content, not invented testimonials
const articles={
creatina:{k:'SUPLEMENTOS / GUÍA',title:'¿QUÉ ES LA CREATINA?',paragraphs:['La creatina es una sustancia que el cuerpo produce y también obtiene de los alimentos. Ayuda a reponer energía durante esfuerzos intensos y breves.','La creatina monohidratada es la forma más estudiada. Una pauta habitual en personas adultas sanas es 3 a 5 gramos al día, pero las necesidades individuales pueden variar.','No reemplaza entrenar, comer suficiente, dormir ni la constancia. Consulta a un profesional sanitario si tienes enfermedad renal, estás embarazada, lactando o tienes dudas sobre tu caso.']},
rutina:{k:'ENTRENAMIENTO / INICIO',title:'TU PRIMERA RUTINA DE FUERZA.',paragraphs:['Empieza con dos o tres días por semana y ejercicios que puedas repetir con buena técnica: sentadillas, bisagras de cadera, empujes, jalones y trabajo de abdomen.','No necesitas levantar al máximo el primer día. Aprende el movimiento, registra tus repeticiones y aumenta gradualmente la dificultad.','La rutina que puedes sostener durante meses es mucho más útil que el plan perfecto que abandonas en una semana.']},
nutricion:{k:'ALIMENTACIÓN / HÁBITOS',title:'COMER BIEN SIN COMPLICARTE.',paragraphs:['Una alimentación suficiente, variada y ajustada a tus objetivos es la base. Incluye alimentos con proteína, cereales, verduras, fruta y grasas saludables.','No necesitas comidas perfectas. Puedes planear opciones fáciles y repetibles que se adapten a tu presupuesto y tus horarios.','Tu progreso en el gimnasio también depende de descansar y de mantener hábitos que puedas cumplir.']},
natural:{k:'FILOSOFÍA / SIN ATAJOS',title:'PROGRESO NATURAL.',paragraphs:['No hay un solo físico “natural” ni un resultado que podamos prometer. Influyen genética, edad, experiencia, alimentación, descanso y entrenamiento.','NATIVO busca documentar procesos con honestidad: tiempos reales, cargas, hábitos y evolución sin atribuir todos los cambios a un suplemento.','No presentamos a personas anónimas como testimonios verificados. Las historias reales se publicarán con participación y consentimiento de sus protagonistas.']}
};
const stories=[['EMPEZAR ES PROGRESAR','La primera sesión rara vez es perfecta. Lo importante es aprender, encontrar un ritmo y seguir regresando.'],['LA CONSTANCIA CUENTA','La disciplina es repetir pequeñas acciones: entrenar, descansar, comer y adaptar el plan a la vida cotidiana.'],['TU PROPIO PROCESO','El crecimiento físico no es idéntico para todos. Un progreso sostenible importa más que compararte con alguien en redes.'],['SIN FALSAS PROMESAS','Queremos documentar transformaciones reales con fechas, mediciones y el consentimiento de las personas participantes.']];
function openInfo(k,title,paragraphs){$('#info-kicker').textContent=k;$('#info-title').textContent=title;const holder=$('#info-content');holder.replaceChildren();paragraphs.forEach(p=>{const el=document.createElement('p');el.textContent=p;holder.appendChild(el)});openLayer(info)}
$$('[data-article]').forEach(btn=>btn.addEventListener('click',()=>{const a=articles[btn.dataset.article];if(a)openInfo(a.k,a.title,a.paragraphs)}));$$('[data-story]').forEach(btn=>btn.addEventListener('click',()=>{const s=stories[Number(btn.dataset.story)];if(s)openInfo('FILOSOFÍA NATIVO',s[0],[s[1],'Este contenido ilustra nuestra filosofía. Las historias verificadas de participantes reales llegarán más adelante.'])}));$('#info-action').addEventListener('click',()=>closeLayer());
// Working on-page search
const searchable=[...Object.entries(articles).map(([id,a])=>({id,title:a.title})),{id:'producto',title:'Creatina monohidratada NATIVO'},{id:'manifiesto',title:'Nuestro manifiesto'},{id:'historias',title:'Historias reales'},{id:'comunidad',title:'Únete a NATIVO'}];
$('#search-trigger').addEventListener('click',()=>{openLayer(search);updateSearch('')});$('#search-close').addEventListener('click',()=>closeLayer());$('#site-search').addEventListener('input',e=>updateSearch(e.target.value));
function updateSearch(query){const holder=$('#search-results');holder.replaceChildren();const matches=searchable.filter(item=>item.title.toLowerCase().includes(query.trim().toLowerCase()));matches.forEach(item=>{const row=document.createElement('div');row.className='search-result';row.textContent=item.title+' ↗';row.tabIndex=0;const activate=()=>{closeLayer();if(articles[item.id]){const a=articles[item.id];openInfo(a.k,a.title,a.paragraphs)}else{location.hash='#'+item.id}};row.addEventListener('click',activate);row.addEventListener('keydown',e=>{if(e.key==='Enter')activate()});holder.appendChild(row)});if(!matches.length)holder.innerHTML='<p class="search-result">No encontramos resultados con ese término.</p>'}
// No backend is configured; be explicit about that
$('#newsletter').addEventListener('submit',e=>{e.preventDefault();$('#newsletter-status').textContent='¡Gracias por tu interés! Este formulario es una demostración: aún no guarda correos. La suscripción se activará con el lanzamiento.';$('#newsletter').reset()});

// V4: Cinematic scroll choreography, cards, hero focal point and feedback.
(function(){
const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fancyPointer=window.matchMedia('(pointer:fine)').matches;
const hero=document.querySelector('.hero');
const picture=document.querySelector('.hero-photo');
const sections=['inicio','producto','manifiesto','historias','aprende','comunidad'];
const pips=[...document.querySelectorAll('[data-index]')];
let nextFrame=0;
function frame(){nextFrame=0;const y=window.scrollY;
  const focus=y+window.innerHeight*.43;
  let current=sections[0];
  for(const id of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top+window.scrollY<=focus)current=id}
  pips.forEach(el=>{const on=el.dataset.index===current;el.classList.toggle('active',on);if(on)el.setAttribute('aria-current','location');else el.removeAttribute('aria-current')});
  if(motionOK&&hero&&picture&&window.innerWidth>740){const r=hero.getBoundingClientRect();if(r.bottom>0&&r.top<window.innerHeight){const v=Math.max(0,Math.min(1,-r.top/r.height));picture.style.translate=`0 ${v*30}px`;hero.style.setProperty('--hero-scroll',v.toFixed(3));}}
}
function schedule(){if(!nextFrame)nextFrame=requestAnimationFrame(frame)}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});frame();
// Interactive cards are subtle on desktop and entirely disabled for touch users.
if(fancyPointer&&motionOK){
 document.querySelectorAll('.tilt-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(950px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-5px)`});
  card.addEventListener('pointerleave',()=>card.style.transform='');
 });
}
// Button touch feedback; respects keyboard access and avoids cosmetic dependencies.
document.querySelectorAll('.btn').forEach(btn=>btn.addEventListener('pointerdown',e=>{
 if(!motionOK)return;const r=btn.getBoundingClientRect();const ripple=document.createElement('span');ripple.className='ripple';ripple.style.left=(e.clientX-r.left)+'px';ripple.style.top=(e.clientY-r.top)+'px';ripple.style.width=ripple.style.height=Math.max(r.width,r.height)+'px';btn.appendChild(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
}));
const toast=document.querySelector('.toast');let timeout;
function announce(s){if(!toast)return;toast.textContent=s;toast.classList.add('show');clearTimeout(timeout);timeout=setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelectorAll('.add-to-cart').forEach(b=>b.addEventListener('click',()=>announce('Agregado a tu carrito de demostración')));
})();
