const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const body = document.body;
const navbar = document.querySelector('.navbar');

// --- Menu burger toggle ---
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-active');

  if (isOpen) {
    // Bloque le scroll SANS jump
    const scrollY = window.scrollY || window.pageYOffset;
    body.style.top = `-${scrollY}px`;
    body.dataset.scrollY = scrollY;
    body.classList.add('noscroll');
    navbar.classList.add('freeze-navbar');
  } else {
    // Débloque, remet à la position d'avant
    const scrollY = body.dataset.scrollY || 0;
    body.classList.remove('noscroll');
    navbar.classList.remove('freeze-navbar');
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY));
    delete body.dataset.scrollY;
  }
});

// --- Quand tu cliques sur un lien du menu, tout redevient clean ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    body.classList.remove('noscroll');
    navbar.classList.remove('freeze-navbar');

    // Remet la page à la bonne position
    const scrollY = body.dataset.scrollY || 0;
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY));
    delete body.dataset.scrollY;
  });
});
