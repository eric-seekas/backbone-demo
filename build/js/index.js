'use strict';

/* global Framework7 myApp:true*/

var myApp = new Framework7();
var mySwiper = myApp.swiper('.swiper-container', {
  speed: 400,
  width: window.innerWidth
});
mySwiper.stopAutoplay();