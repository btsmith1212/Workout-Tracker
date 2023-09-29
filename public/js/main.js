// navbar stuff
const burgerIcon = document.querySelector('#burger');
const burgerMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  burgerMenu.classList.toggle('is-active');
});

// activates burger items

// source: https://www.youtube.com/watch?v=qvn2SxGvyPs&list=PL4cUxeGkcC9iXItWKbaQxcyDT1u6E7a8a&index=5