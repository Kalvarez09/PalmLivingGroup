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
    src:   "imagenes/puertadelsolimagenes/yellowHouse - Copy.jpeg",
    thumb: "imagenes/puertadelsolimagenes/yellowHouse - Copy.jpeg",
    alt:   "Vista exterior"
  },
  {
    src:   "imagenes/puertadelsolimagenes/backimgpuertadelsolhouse.jpeg",
    thumb: "imagenes/puertadelsolimagenes/backimgpuertadelsolhouse.jpeg",
    alt:   "Vista trasera"
  },
  {
    src:   "imagenes/puertadelsolimagenes/backimgpuertadelsol.jpeg",
    thumb: "imagenes/puertadelsolimagenes/backimgpuertadelsol.jpeg",
    alt:   "Fachada principal"
  },
  {
    src:   "imagenes/puertadelsolimagenes/backyard.png",
    thumb: "imagenes/puertadelsolimagenes/backyard.png",
    alt:   "Backyard"
    
  },

  {
    src:   "imagenes/puertadelsolimagenes/livingroom.jpeg",
    thumb: "imagenes/puertadelsolimagenes/livingroom.jpeg",
    alt:   "Sala de estar"

  },

  {
    src:   "imagenes/puertadelsolimagenes/bathroom.png",
    thumb: "imagenes/puertadelsolimagenes/bathroom.png",
    alt:   "bathroom"

  },

  {
    src:   "imagenes/puertadelsolimagenes/bedroomimg.jpeg",
    thumb: "imagenes/puertadelsolimagenes/bedroomimg.jpeg",
    alt:   "Dormitorio"
    
  },


  {

    src:   "imagenes/puertadelsolimagenes/mainroom2img.png",
    thumb: "imagenes/puertadelsolimagenes/mainroom2img.png",
    alt:   "Main Room 2"

  },

  

  {
    src:   "imagenes/puertadelsolimagenes/room2.png",
    thumb: "imagenes/puertadelsolimagenes/room2.png",
    alt:   "Room 2"
    
  },


  {
    src:   "imagenes/puertadelsolimagenes/room3.png",
    thumb: "imagenes/puertadelsolimagenes/room3.png",
    alt:   "Room 3"
    
  },

  {
    src:   "imagenes/puertadelsolimagenes/livingroom2ndfloor.png",
    thumb: "imagenes/puertadelsolimagenes/livingroom2ndfloor.png",
    alt:   "Livingroom 1"
  },


  {

    src:   "imagenes/puertadelsolimagenes/livingroom2ndfloor1.png",
    thumb: "imagenes/puertadelsolimagenes/livingroom2ndfloor1.png",
    alt:   "Livingroom 2"



  },

  {

    src:   "imagenes/puertadelsolimagenes/livingroom2ndfloor3.png",
    thumb: "imagenes/puertadelsolimagenes/livingroom2ndfloor3.png",
    alt:   "Livingroom 3"



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




