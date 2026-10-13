"use strict";

/**
 * CONFIGURACIÓN NATIVO — EDITA ESTA SECCIÓN ANTES DE PUBLICAR
 * GitHub Pages solo publica archivos estáticos. No cobra ni procesa pagos.
 * Si activas las ventas, el pedido se envía a tu WhatsApp para confirmación manual.
 */
const SITE_CONFIG = {
  brand: "NATIVO",
  productName: "Creatina monohidratada 300 g",
  priceMXN: 399,              // EJEMPLO, NO ES UNA COTIZACIÓN NI PRECIO DEFINITIVO
  salesEnabled: false,       // Cambiar a true SOLO cuando estés lista para vender
  whatsappNumber: "",        // Ejemplo: "523312345678" (sin +, espacios ni guiones)
  formspreeEndpoint: "",     // Ejemplo: "https://formspree.io/f/xxxxxxxx"
  contactEmail: ""           // Tu correo para datos de contacto
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const pesos = (value) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
const els = {
  menu: $("#menu-toggle"), nav: $("#nav-links"), cart: $("#cart-drawer"),
  scrim: $("#scrim"), cartCount: $("#cart-count"), cartContent: $("#cart-content"),
  cartBottom: $("#cart-bottom"), toast: $("#toast"),
  articleDialog: $("#article-dialog"), articleBody: $("#article-dialog-content")
};
let cartQuantity = 0;
try { cartQuantity = Math.max(0, Math.min(99, Number(localStorage.getItem("nativo-cart-qty")) || 0)); } catch { /* almacenamiento opcional */ }
let lastCartOpener = null;
let toastTimer;

function notify(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => els.toast.classList.remove("visible"), 4500);
}
function setCartQuantity(q) {
  cartQuantity = Math.max(0, Math.min(99, q));
  try { localStorage.setItem("nativo-cart-qty", String(cartQuantity)); } catch { /* no es indispensable */ }
  els.cartCount.textContent = String(cartQuantity);
  renderCart();
}
function openCart(opener) {
  lastCartOpener = opener || document.activeElement;
  closeMenu();
  els.scrim.hidden = false;
  requestAnimationFrame(() => els.scrim.classList.add("show"));
  els.cart.classList.add("open");
  els.cart.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  $("#cart-close").focus();
}
function closeCart() {
  els.scrim.classList.remove("show");
  els.cart.classList.remove("open");
  els.cart.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  window.setTimeout(() => { if (!els.cart.classList.contains("open")) els.scrim.hidden = true; }, 300);
  if (lastCartOpener && lastCartOpener.isConnected) lastCartOpener.focus();
}
function renderCart() {
  els.cartCount.textContent = String(cartQuantity);
  if (!SITE_CONFIG.salesEnabled) {
    els.cartContent.innerHTML = '<div class="cart-empty"><span class="empty-icon">✳</span><strong>ESTAMOS PREPARANDO ALGO BUENO.</strong><p>La primera edición NATIVO todavía no está disponible. Pronto podrás encontrarla aquí.</p></div>';
    els.cartBottom.innerHTML = '<a href="#contacto" class="btn btn-olive" id="cart-waitlist">ENTÉRATE DEL LANZAMIENTO ↗</a><p>No estamos aceptando pagos ni pedidos todavía.</p>';
    $("#cart-waitlist").addEventListener("click", closeCart);
    return;
  }
  if (cartQuantity === 0) {
    els.cartContent.innerHTML = '<div class="cart-empty"><span class="empty-icon">✳</span><strong>TU CARRITO ESTÁ VACÍO.</strong><p>Tu progreso comienza con lo esencial.</p></div>';
    els.cartBottom.innerHTML = '<a class="btn btn-olive" href="#producto" id="cart-back">VER CREATINA ↗</a>';
    $("#cart-back").addEventListener("click", closeCart);
    return;
  }
  const subtotal = SITE_CONFIG.priceMXN * cartQuantity;
  els.cartContent.innerHTML = `<div class="cart-line"><img src="assets/creatine-pack.webp" alt="Bote NATIVO creatina monohidratada"><div><strong>${SITE_CONFIG.productName}</strong><p>${pesos(SITE_CONFIG.priceMXN)} MXN / unidad</p><div class="qty-controls"><button type="button" id="qty-minus" aria-label="Quitar una unidad">−</button><span aria-label="Cantidad">${cartQuantity}</span><button type="button" id="qty-plus" aria-label="Agregar una unidad">+</button></div></div></div>`;
  $("#qty-minus").addEventListener("click", () => setCartQuantity(cartQuantity - 1));
  $("#qty-plus").addEventListener("click", () => setCartQuantity(cartQuantity + 1));
  els.cartBottom.innerHTML = `<div class="cart-subtotal"><span>SUBTOTAL</span><span>${pesos(subtotal)}</span></div><button type="button" class="btn btn-olive" id="cart-order">PEDIR POR WHATSAPP ↗</button><p>Pedido sujeto a confirmación de inventario, envío y pago directamente contigo. La web no procesa pagos.</p>`;
  $("#cart-order").addEventListener("click", () => {
    const number = SITE_CONFIG.whatsappNumber.replace(/\D/g, "");
    if (number.length < 10) { notify("Configura tu número de WhatsApp en script.js antes de recibir pedidos."); return; }
    const message = `Hola, quiero pedir NATIVO:\n${cartQuantity} × ${SITE_CONFIG.productName}\nSubtotal: ${pesos(subtotal)} MXN\n¿Me confirmas existencias, envío y forma de pago?`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
}

function closeMenu() {
  els.nav.classList.remove("open");
  els.menu.setAttribute("aria-expanded", "false");
  els.menu.setAttribute("aria-label", "Abrir menú");
}
els.menu.addEventListener("click", () => {
  const open = els.nav.classList.toggle("open");
  els.menu.setAttribute("aria-expanded", String(open));
  els.menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
$$(".nav-links a").forEach((link) => link.addEventListener("click", closeMenu));
$$(".cart-open").forEach((button) => button.addEventListener("click", () => openCart(button)));
$("#cart-close").addEventListener("click", closeCart);
els.scrim.addEventListener("click", closeCart);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { if (els.cart.classList.contains("open")) closeCart(); else closeMenu(); }
  if (event.key === "Tab" && els.cart.classList.contains("open")) {
    const focusable = $$('button:not([disabled]), a[href], input', els.cart);
    if (focusable.length === 0) return;
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const buyButton = $("#primary-purchase");
if (SITE_CONFIG.salesEnabled) {
  buyButton.innerHTML = `AGREGAR AL CARRITO — ${pesos(SITE_CONFIG.priceMXN)} <span aria-hidden="true">↗</span>`;
  buyButton.addEventListener("click", () => { setCartQuantity(cartQuantity + 1); openCart(buyButton); });
} else {
  buyButton.addEventListener("click", () => { $("#contacto").scrollIntoView({ behavior: "smooth" }); });
}
renderCart();

// Animaciones discretas: se desactivan si el sistema solicita menos movimiento.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
  $$(".reveal").forEach((el) => observer.observe(el));
} else $$(".reveal").forEach((el) => el.classList.add("is-visible"));

function scrollStories(sign) { $("#stories").scrollBy({ left: sign * Math.round($("#stories").clientWidth * 0.72), behavior: "smooth" }); }
$("#stories-prev").addEventListener("click", () => scrollStories(-1));
$("#stories-next").addEventListener("click", () => scrollStories(1));

// Artículos completos incluidos para que cada enlace funcione incluso sin backend.
const articles = {
  creatina: {
    category: "SUPLEMENTOS / GUÍA PARA EMPEZAR",
    title: "Creatina: lo que sí hace (y lo que no)",
    body: `<p>La creatina es una sustancia presente naturalmente en el organismo y en algunos alimentos. Como suplemento, la creatina monohidratada puede apoyar el rendimiento en ejercicios repetidos de alta intensidad, como series de fuerza.</p>
      <h3>¿Qué beneficios puedes esperar?</h3><p>En combinación con entrenamiento constante, puede mejorar el desempeño en esfuerzos breves e intensos y contribuir a mejores adaptaciones de fuerza a lo largo del tiempo. Los resultados varían entre personas.</p>
      <h3>¿Cómo suele tomarse?</h3><p>Una pauta frecuente en adultos es de 3 a 5 gramos al día. No necesitas tomarla exactamente antes de entrenar; suele ser más importante la regularidad.</p>
      <h3>¿Qué no hace?</h3><p>No sustituye una rutina, una buena alimentación ni el sueño. Tampoco es un anabólico ni garantiza un físico concreto. Si tienes una condición médica, especialmente renal, estás embarazada o en lactancia, consulta a un profesional de salud antes de suplementarte.</p>
      <p><strong>En NATIVO creemos en vender información clara, no resultados imposibles.</strong></p>`
  },
  entrenamiento: {
    category: "ENTRENAMIENTO / PRINCIPIANTES",
    title: "Tu primer mes en el gimnasio",
    body: `<p>La mejor rutina al comenzar no es la más intensa: es la que puedes repetir sin lesionarte ni abandonar después de una semana.</p>
      <h3>Empieza simple</h3><p>Una opción para muchos principiantes es entrenar fuerza de dos a tres días por semana. Aprende movimientos básicos como sentarte y levantarte, empujar, jalar y levantar objetos con control.</p>
      <h3>Registra el progreso</h3><p>Anota los pesos, repeticiones y cómo te sientes. Aumenta la dificultad gradualmente cuando domines la técnica. Descansa entre sesiones y escucha las señales de tu cuerpo.</p>
      <h3>Una meta realista</h3><p>Tu objetivo inicial no tiene que ser transformar todo tu cuerpo. Puede ser completar tus entrenamientos y mejorar una repetición. La fuerza se construye entrenamiento tras entrenamiento.</p>`
  },
  nutricion: {
    category: "NUTRICIÓN / HÁBITOS",
    title: "Comer bien sin complicarte",
    body: `<p>No hace falta que cada comida sea perfecta para construir buenos hábitos. Empieza con una base: alimentos variados, suficientes proteínas, frutas y verduras, líquidos y un patrón alimentario que puedas sostener.</p>
      <h3>Hazlo práctico</h3><p>Piensa qué comidas puedes preparar incluso en días ocupados. Mantén ingredientes simples disponibles y considera preparaciones que puedas repetir.</p>
      <h3>No copies el plato de otra persona</h3><p>Las necesidades energéticas dependen de tu cuerpo, tus actividades y tus objetivos. Si necesitas un plan específico, un profesional en nutrición puede ayudarte a adaptarlo.</p>
      <p>El progreso real también se construye en la cocina, sin extremos ni castigos.</p>`
  },
  naturales: {
    category: "FILOSOFÍA / BUILT NATURALLY",
    title: "Sin atajos, sin comparaciones",
    body: `<p>Las redes sociales suelen mostrar un resultado sin mostrar el proceso completo. Cada cuerpo tiene una genética, un punto de partida y un contexto distintos.</p>
      <h3>Compara con tu propia historia</h3><p>Si decides documentar tu progreso, registra fuerza, hábitos, energía y fotografías tomadas en condiciones similares. Mira tendencias de meses, no cambios de un solo día.</p>
      <h3>Documentar con honestidad</h3><p>En NATIVO queremos compartir historias reales, sin presentar físicos obtenidos con ayudas farmacológicas como resultados naturales y sin atribuir transformaciones completas a un suplemento.</p>
      <p><strong>No vendemos el cuerpo que vas a tener. Creemos en darte herramientas para construir el tuyo.</strong></p>`
  }
};
$$("[data-article]").forEach((button) => button.addEventListener("click", () => {
  const article = articles[button.dataset.article];
  if (!article) return;
  els.articleBody.innerHTML = `<span class="dialog-kicker">${article.category}</span><h2 id="dialog-title">${article.title}</h2>${article.body}`;
  els.articleDialog.showModal();
}));
$("#dialog-close").addEventListener("click", () => els.articleDialog.close());
els.articleDialog.addEventListener("click", (e) => { if (e.target === els.articleDialog) els.articleDialog.close(); });

// Conectar un servicio real (por ejemplo, Formspree) antes de recolectar emails.
const signup = $("#signup-form"), signupMsg = $("#signup-message");
signup.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!signup.reportValidity()) return;
  const email = $("#signup-email").value.trim();
  signupMsg.className = "form-note";
  if (!SITE_CONFIG.formspreeEndpoint) {
    signupMsg.classList.add("error");
    signupMsg.textContent = "Formulario de muestra: configura Formspree en script.js para recibir correos de verdad.";
    return;
  }
  const button = $('button[type="submit"]', signup);
  button.disabled = true;
  const oldText = button.textContent;
  button.textContent = "ENVIANDO…";
  try {
    const response = await fetch(SITE_CONFIG.formspreeEndpoint, {
      method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "nativo-web" })
    });
    if (!response.ok) throw Error("No se pudo registrar");
    signup.reset();
    signupMsg.classList.add("success");
    signupMsg.textContent = "¡Gracias! Recibimos tu registro para las novedades de NATIVO.";
  } catch {
    signupMsg.classList.add("error");
    signupMsg.textContent = "No pudimos enviar tu correo. Inténtalo de nuevo más tarde.";
  } finally { button.disabled = false; button.textContent = oldText; }
});

const legalDialog = $("#legal-dialog");
function openLegal(type) {
  $("#legal-content").innerHTML = type === "privacy"
    ? `<span class="dialog-kicker">DOCUMENTO PENDIENTE</span><h2>AVISO DE PRIVACIDAD</h2><p>Esta página es un prototipo de NATIVO. Antes de captar correos, vender o tratar datos personales debes publicar un aviso de privacidad válido con nombre y domicilio del responsable, finalidades, mecanismos para ejercer derechos ARCO y demás elementos exigibles conforme a la legislación mexicana aplicable.</p><p>El formulario no guarda ni transmite datos mientras no se configure un servicio externo.</p>`
    : `<span class="dialog-kicker">DOCUMENTO PENDIENTE</span><h2>TÉRMINOS Y CONDICIONES</h2><p>Antes de abrir ventas, publica información real de la empresa, precios finales, envíos, devoluciones, medios de pago, disponibilidad y atención al consumidor. Esta página no tiene pasarela de pago integrada.</p>`;
  legalDialog.showModal();
}
$("#privacy-trigger").addEventListener("click", (e) => { e.preventDefault(); openLegal("privacy"); });
$("#terms-trigger").addEventListener("click", (e) => { e.preventDefault(); openLegal("terms"); });
$("#legal-close").addEventListener("click", () => legalDialog.close());
legalDialog.addEventListener("click", (e) => { if (e.target === legalDialog) legalDialog.close(); });
$("#year").textContent = String(new Date().getFullYear());
