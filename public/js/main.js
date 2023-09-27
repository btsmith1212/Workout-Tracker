// navbar stuff
const burgerIcon = document.querySelector('#burger');
const burgerMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  burgerMenu.classList.toggle('is-active');
});

// activates burger items