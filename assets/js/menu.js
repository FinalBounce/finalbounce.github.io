
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const logo = document.querySelector('.logo-container');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
  if (logo) logo.classList.toggle('hide-logo');
});
