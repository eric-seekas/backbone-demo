/* global Framework7 myApp:true*/

const myApp = new Framework7();
const mySwiper = myApp.swiper('.swiper-container', {
  speed: 400,
  width: window.innerWidth
});
mySwiper.stopAutoplay();
