const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const body = document.body;
const navbar = document.querySelector('.navbar'); // on cible la navbar

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  body.classList.toggle('noscroll');
  navbar.classList.toggle('freeze-navbar'); // bloque la navbar pendant le menu
});

// Quand on clique sur un lien du menu, on referme tout propre
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-active');
    body.classList.remove('noscroll');
    navbar.classList.remove('freeze-navbar');
  });
});
