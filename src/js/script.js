$(document).ready(function () {
   $('.carousel__inner').slick({
      speed: 400,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/arrow_prev.svg" alt="prev" /></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/arrow_next.svg" alt="next" /></button>',
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               dots: true,
               arrows: false
            }
         }
      ],

   });
});