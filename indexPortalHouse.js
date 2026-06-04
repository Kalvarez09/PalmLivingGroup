const images = [
  {
    src:   "imagenes/portaldelbosque/casaPortal.png",
    thumb: "imagenes/portaldelbosque/casaPortal.png",
    alt:   "Vista exterior"
  },
  {
    src:   "imagenes/portaldelbosque/parkingPortal.png",
    thumb: "imagenes/portaldelbosque/parkingPortal.png",
    alt:   "Parking"
  },
  {
    src:   "imagenes/portaldelbosque/salaPortal.png",
    thumb: "imagenes/portaldelbosque/salaPortal.png",
    alt:   "Sala de Portal"
  },
  {
    src:   "imagenes/portaldelbosque/salaCocina.png",
    thumb: "imagenes/portaldelbosque/salaCocina.png",
    alt:   "Sala con Cocina"
    
  },

  {
    src:   "imagenes/portaldelbosque/salaGradas.png",
    thumb: "imagenes/portaldelbosque/salaGradas.png",
    alt:   "Sala con Gradas"

  },

  {
    src:   "imagenes/portaldelbosque/jardin.png",
    thumb: "imagenes/portaldelbosque/jardin.png",
    alt:   "jardin"

  },

  {
    src:   "imagenes/gradas.png",
    thumb: "imagenes/gradas.png",
    alt:   "Gradas"
    
  },


  {

    src:   "imagenes/portaldelbosque/cuarto.png",
    thumb: "imagenes/portaldelbosque/cuarto.png",
    alt:   "Cuarto 1"

  },

  

  {
    src:   "imagenes/portaldelbosque/bath1.png",
    thumb: "imagenes/portaldelbosque/bath1.png",
    alt:   "Bath1"
    
  },


  {
    src:   "imagenes/portaldelbosque/walkClos.png",
    thumb: "imagenes/portaldelbosque/walkClos.png",
    alt:   "Walking Closet"
    
  },

  {
    src:   "imagenes/portaldelbosque/cuarto2.png",
    thumb: "imagenes/portaldelbosque/cuarto2.png",
    alt:   "Cuarto 2"
  },


  {

    src:   "imagenes/portaldelbosque/bath2.png",
    thumb: "imagenes/portaldelbosque/bath2.png",
    alt:   "Bath 2"



  },

  {

    src:   "imagenes/portaldelbosque/cuarto3.png",
    thumb: "imagenes/portaldelbosque/cuarto3.png",
    alt:   "Cuarto 3"



  },

  {

    src:   "imagenes/portaldelbosque/terraza1.png",
    thumb: "imagenes/portaldelbosque/terraza1.png",
    alt:   "Terraza 1"

  },

  {
    src: "imagenes/portaldelbosque/terraza2.png",
    thumb: "imagenes/portaldelbosque/terraza2.png",
    alt: "Terraza 2"
  },

  {
    src: "imagenes/portaldelbosque/terraza3.png",
    thumb: "imagenes/portaldelbosque/terraza3.png",
    alt: "Terraza 3"
  },

  {
    src: "imagenes/portaldelbosque/vista.png",
    thumb: "imagenes/portaldelbosque/vista.png",
    alt: "Vista"
  },

  {
    src: "imagenes/portaldelbosque/areasocial.png",
    thumb: "imagenes/portaldelbosque/areasocial.png",
    alt: "Area Social 1"
  },


  {
    src: "imagenes/portaldelbosque/areasocial2.png",
    thumb: "imagenes/portaldelbosque/areasocial2.png",
    alt: "Area Social 2"

  },


  {
    src: "imagenes/portaldelbosque/areasocial3.png",
    thumb: "imagenes/portaldelbosque/areasocial3.png",
    alt: "Area Social 3"
  },

  {
    src: "imagenes/portaldelbosque/areasocial4.png",
    thumb: "imagenes/portaldelbosque/areasocial4.png",
    alt: "Area Social 4"
  }
];

  let current = 0;

  const mainImg  = document.getElementById('mainImg');
  const counter  = document.getElementById('imgCounter');
  const thumbsEl = document.getElementById('thumbnails');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');

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

  document.getElementById('prevBtn').addEventListener('click', () => switchTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => switchTo(current + 1));

  document.getElementById('mainWrap').addEventListener('click', (e) => {
    if (e.target.closest('.img-nav')) return;
    lbImg.src = images[current].src;
    lightbox.classList.add('open');
  });

  document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('open'));
  document.getElementById('lbPrev').addEventListener('click', (e) => { e.stopPropagation(); switchTo(current - 1); });
  document.getElementById('lbNext').addEventListener('click', (e) => { e.stopPropagation(); switchTo(current + 1); });
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




