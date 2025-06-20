const burger = document.querySelector('.burger');
const nav    = document.querySelector('.nav-links');
const body   = document.body;

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');   // fait coulisser le menu
  body.classList.toggle('nav-open');    // bloque / débloque le scroll général
});
