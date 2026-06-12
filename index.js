function closeMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');

  navMenu?.classList.remove('open');
  hamburger?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
  hamburger?.setAttribute('aria-label', 'Abrir men\u00fa');
}

window.toggleMenu = function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');

  if (!navMenu || !hamburger) return;

  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar men\u00fa' : 'Abrir men\u00fa');
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#navMenu a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
});

const images = [
  {
    src:   "imagenes/puertadelsolimagenes/casaAmarillaSPS.jpg",
    thumb: "imagenes/puertadelsolimagenes/casaAmarillaSPS.jpg",
    alt:   "Fachada principal"
  },
  {
    src:   "imagenes/puertadelsolimagenes/entradalateralfoto.jpeg",
    thumb: "imagenes/puertadelsolimagenes/entradalateralfoto.jpeg",
    alt:   "Entrada lateral"
  },
  {
    src:   "imagenes/puertadelsolimagenes/backimgpuertadelsol.jpeg",
    thumb: "imagenes/puertadelsolimagenes/backimgpuertadelsol.jpeg",
    alt:   "Vista trasera"
  },
  {
    src:   "imagenes/puertadelsolimagenes/backyard.png",
    thumb: "imagenes/puertadelsolimagenes/backyard.png",
    alt:   "Patio trasero"
  },
  {
    src:   "imagenes/puertadelsolimagenes/jardinTrasero1.jpeg",
    thumb: "imagenes/puertadelsolimagenes/jardinTrasero1.jpeg",
    alt:   "Jardin trasero"
  },
  {
    src:   "imagenes/puertadelsolimagenes/kioskoTrasero1.jpeg",
    thumb: "imagenes/puertadelsolimagenes/kioskoTrasero1.jpeg",
    alt:   "Kiosko trasero"
  },
  {
    src:   "imagenes/puertadelsolimagenes/arcoFotos.jpeg",
    thumb: "imagenes/puertadelsolimagenes/arcoFotos.jpeg",
    alt:   "Arcos de la propiedad"
  },
  {
    src:   "imagenes/puertadelsolimagenes/terraza1.jpeg",
    thumb: "imagenes/puertadelsolimagenes/terraza1.jpeg",
    alt:   "Terraza 1"
  },
  {
    src:   "imagenes/puertadelsolimagenes/terraza2.jpeg",
    thumb: "imagenes/puertadelsolimagenes/terraza2.jpeg",
    alt:   "Terraza 2"
  },
  {
    src:   "imagenes/puertadelsolimagenes/vistaParque.jpeg",
    thumb: "imagenes/puertadelsolimagenes/vistaParque.jpeg",
    alt:   "Vista al parque"
  },
  {
    src:   "imagenes/puertadelsolimagenes/vistaParqueLateral.jpeg",
    thumb: "imagenes/puertadelsolimagenes/vistaParqueLateral.jpeg",
    alt:   "Vista lateral al parque"
  },
  {
    src:   "imagenes/puertadelsolimagenes/livingroom.jpeg",
    thumb: "imagenes/puertadelsolimagenes/livingroom.jpeg",
    alt:   "Sala de estar"
  },
  {
    src:   "imagenes/puertadelsolimagenes/livingroom2ndfloor1.png",
    thumb: "imagenes/puertadelsolimagenes/livingroom2ndfloor1.png",
    alt:   "Sala segundo piso"
  },
  {
    src:   "imagenes/puertadelsolimagenes/salaset1.jpeg",
    thumb: "imagenes/puertadelsolimagenes/salaset1.jpeg",
    alt:   "Sala"
  },
  {
    src:   "imagenes/puertadelsolimagenes/bedroomimg.jpeg",
    thumb: "imagenes/puertadelsolimagenes/bedroomimg.jpeg",
    alt:   "Dormitorio"
  },
  {
    src:   "imagenes/puertadelsolimagenes/mainroom2img.png",
    thumb: "imagenes/puertadelsolimagenes/mainroom2img.png",
    alt:   "Habitacion principal"
  },
  {
    src:   "imagenes/puertadelsolimagenes/jacuzzi.jpeg",
    thumb: "imagenes/puertadelsolimagenes/jacuzzi.jpeg",
    alt:   "Jacuzzi"
  },
  {
    src:   "imagenes/puertadelsolimagenes/bathPrincipal.jpeg",
    thumb: "imagenes/puertadelsolimagenes/bathPrincipal.jpeg",
    alt:   "Bano principal"
  },
  {
    src:   "imagenes/puertadelsolimagenes/poolimg.jpeg",
    thumb: "imagenes/puertadelsolimagenes/poolimg.jpeg",
    alt:   "Piscina"
  }
];

  let current = 0;

  const mainImg  = document.getElementById('mainImg');
  const counter  = document.getElementById('imgCounter');
  const thumbsEl = document.getElementById('thumbnails');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const mainWrap = document.getElementById('mainWrap');
  const lbClose  = document.getElementById('lbClose');
  const lbPrev   = document.getElementById('lbPrev');
  const lbNext   = document.getElementById('lbNext');

if (mainImg && counter && thumbsEl && lightbox && lbImg && prevBtn && nextBtn && mainWrap && lbClose && lbPrev && lbNext) {

  function buildThumbs() {
    thumbsEl.innerHTML = '';
    images.forEach((img, i) => {
      const div = document.createElement('div');
      div.className = 'thumb' + (i === 0 ? ' active' : '');
      div.innerHTML = `<img src="${img.thumb}" alt="${img.alt}" loading="lazy"/>`;
      div.addEventListener('click', () => switchTo(i));
      thumbsEl.appendChild(div);
    });
  }

  function switchTo(idx) {
    if (idx === current) return;
    current = (idx + images.length) % images.length;

    mainImg.classList.add('fade-out');
    setTimeout(() => {
      mainImg.src = images[current].src;
      mainImg.alt = images[current].alt;
      mainImg.classList.remove('fade-out');
      mainImg.classList.add('fade-in');
      setTimeout(() => mainImg.classList.remove('fade-in'), 400);
    }, 250);

    counter.textContent = `${current + 1} / ${images.length}`;
    document.querySelectorAll('.thumb').forEach((t, i) => t.classList.toggle('active', i === current));
    document.querySelectorAll('.thumb')[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    lbImg.src = images[current].src;
  }

  prevBtn.addEventListener('click', () => switchTo(current - 1));
  nextBtn.addEventListener('click', () => switchTo(current + 1));

  mainWrap.addEventListener('click', (e) => {
    if (e.target.closest('.img-nav')) return;
    lbImg.src = images[current].src;
    lightbox.classList.add('open');
  });

  lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); switchTo(current - 1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); switchTo(current + 1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  switchTo(current - 1);
    if (e.key === 'ArrowRight') switchTo(current + 1);
    if (e.key === 'Escape')     lightbox.classList.remove('open');
  });

 // AFTER
buildThumbs();
mainImg.src   = images[0].src;
mainImg.alt   = images[0].alt;
lbImg.src     = images[0].src;
counter.textContent = `1 / ${images.length}`;
}




