const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const body = document.body;
const navbar = document.querySelector('.navbar');

// 🔒 Active/désactive le menu burger et le blocage du scroll
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-active');

  // 💡 Fix Safari qui fait "sauter" la page en position: fixed
  if (isOpen) {
    const scrollY = window.scrollY || window.pageYOffset;
    body.style.top = `-${scrollY}px`;
    body.dataset.scrollY = scrollY;
  } else {
    const scrollY = body.dataset.scrollY || 0;
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY));
    delete body.dataset.scrollY;
  }

  body.classList.toggle('noscroll', isOpen);
  navbar.classList.toggle('freeze-navbar', isOpen);
});

// ✅ Ferme proprement le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    body.classList.remove('noscroll');
    navbar.classList.remove('freeze-navbar');

    // 🔁 Restaure le scroll proprement
    const scrollY = body.dataset.scrollY || 0;
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY));
    delete body.dataset.scrollY;
  });
});
