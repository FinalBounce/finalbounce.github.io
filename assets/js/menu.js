const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const body = document.body;
const navbar = document.querySelector('.navbar');

// 🔒 Active/désactive le menu burger et le blocage du scroll
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('nav-active');

  body.classList.toggle('noscroll', isOpen);
  navbar.classList.toggle('freeze-navbar', isOpen);
});

// ✅ Ferme proprement le menu quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    body.classList.remove('noscroll');
    navbar.classList.remove('freeze-navbar');
  });
});
