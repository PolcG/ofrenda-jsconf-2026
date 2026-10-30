const boton = document.querySelector('#boton-vela');
const ofrenda = document.querySelector('#ofrenda');
const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)');
const petalos = document.querySelector('.petalos');
let avisoTimer;
function avisar(texto) {
  document.querySelector('#aviso').textContent = texto;
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => { document.querySelector('#aviso').textContent = ''; }, 4500);
}
function celebrar(cantidad = 22) {
  if (movimientoReducido.matches) return;
  for (let i = 0; i < cantidad; i++) {
    const petalo = document.createElement('span');
    petalo.className = 'petalo';
    petalo.style.setProperty('--x', `${(Math.random() - .5) * Math.min(innerWidth, 950)}px`);
    petalo.style.setProperty('--y', `${-100 - Math.random() * 550}px`);
    petalo.style.setProperty('--r', `${Math.random() * 720}deg`);
    petalo.style.setProperty('--color', ['#f9a83b', '#e9c477', '#b579ce'][i % 3]);
    petalo.style.animationDelay = `${Math.random() * .3}s`;
    petalos.append(petalo);
    setTimeout(() => petalo.remove(), 3300);
  }
}
for (let i = 0; i < 55; i++) {
  const estrella = document.createElement('span');
  estrella.className = 'estrella';
  estrella.style.left = `${(i * 37.13) % 100}%`;
  estrella.style.top = `${(i * 23.17) % 100}%`;
  estrella.style.setProperty('--duracion', `${3 + i % 6}s`);
  estrella.style.animationDelay = `${-(i % 7)}s`;
  document.querySelector('.cielo').append(estrella);
}
boton.addEventListener('click', () => {
  const encendida = ofrenda.classList.toggle('encendida');
  boton.setAttribute('aria-pressed', String(encendida));
  boton.textContent = encendida ? 'Apagar la vela' : 'Encender la vela';
  if (encendida) celebrar();
});

const puntos = [[100,265],[165,125],[175,50],[260,115],[340,115],[425,50],[435,125],[500,265],[300,310]];
const grupo = document.querySelector('.estrellas-gato');
puntos.forEach(([x,y]) => {
  const estrella = document.createElementNS('http://www.w3.org/2000/svg','path');
  estrella.setAttribute('d', `M${x} ${y-8}l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z`);
  estrella.classList.add('estrella-gato');
  grupo.append(estrella);
});
let flores = 0;
try { flores = Math.max(0,Math.min(9,Number(localStorage.getItem('gotty-flores')) || 0)); } catch {}
function pintarCielo() {
  [...grupo.children].forEach((estrella,i) => estrella.classList.toggle('activa',i < flores));
  document.querySelector('.constelacion').classList.toggle('completa', flores === 9);
  document.querySelector('#estado-flores').textContent = flores === 9 ? 'Nueve vidas. Infinitas huellas. Su constelación ya brilla contigo. 🐾' : `${flores} de 9 estrellas encendidas`;
  document.querySelector('#flor').textContent = flores === 9 ? '✿ Dejar otra flor para Gotty' : '✿ Dejar una flor';
}
function guardarFlores() { try { localStorage.setItem('gotty-flores', String(flores)); } catch {} }
pintarCielo();
document.querySelector('#flor').addEventListener('click', () => {
  const completa = flores === 9;
  flores = Math.min(9, flores + 1);
  guardarFlores(); pintarCielo(); celebrar(flores === 9 ? 45 : 16);
  if (completa) avisar('Otra flor para el gato más chulo. ✿');
});
document.querySelector('#reiniciar').addEventListener('click', () => { flores = 0; guardarFlores(); pintarCielo(); });

const visor = document.querySelector('#visor');
let fotoOrigen;
document.querySelectorAll('.foto-tarjeta').forEach(tarjeta => tarjeta.addEventListener('click', () => {
  fotoOrigen = tarjeta;
  document.querySelector('#foto-grande').src = tarjeta.dataset.foto;
  document.querySelector('#foto-grande').alt = tarjeta.querySelector('img').alt;
  document.querySelector('#pie-foto').textContent = tarjeta.dataset.pie;
  visor.showModal();
}));
document.querySelector('#cerrar-visor').addEventListener('click', () => visor.close());
visor.addEventListener('click', event => { if (event.target === visor) { const r = visor.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) visor.close(); } });
visor.addEventListener('close', () => fotoOrigen?.focus());
document.querySelector('#compartir').addEventListener('click', async () => {
  const url = location.origin + location.pathname;
  try {
    if (navigator.share) await navigator.share({title: 'Gotty · Nueve vidas, infinitas huellas', text: 'Enciende una vela y deja una flor para Gotty. 🐾', url});
    else { await navigator.clipboard.writeText(url); avisar('Enlace copiado. Comparte una luz para Gotty. 🧡'); }
  } catch (error) { if (error.name !== 'AbortError') avisar('Puedes compartir el enlace desde la barra del navegador.'); }
});
