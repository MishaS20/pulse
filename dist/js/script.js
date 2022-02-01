window.addEventListener('DOMContentLoaded', () => {
   //* Slider
   const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      navPosition: 'bottom',
   });

   document.querySelector('.prev').addEventListener('click', function () {
      slider.goTo('prev');
   })

   document.querySelector('.next').addEventListener('click', function () {
      slider.goTo('next');
   })

   // !Tabs


   const tabNavs = document.querySelectorAll('.catalog__tab');
   const tabPanes = document.querySelectorAll('.catalog__content');
   const catalogLinks = document.querySelectorAll('.catalog-item__link');


   toggleCatalogItemsContent(catalogLinks);
   toggleTabs(tabNavs, tabPanes);

   function removeClass(items, className) {
      items.forEach(item => item.classList.remove(className));
   };

   function addClass(items, idx, className) {
      items[idx].classList.add(className);
   };

   function toggleActiveCatalogItems(idItem, removeClass, addClass, parentElement) {
      parentElement.classList.toggle(removeClass);
      parentElement.parentNode.children[idItem].classList.toggle(addClass);
   };

   function toggleCatalogItemsContent(items) {
      items.forEach(item => {
         item.addEventListener("click", function (e) {
            e.preventDefault();

            let parentElement = item.parentNode;
            let classParent = parentElement.className;

            if (~classParent.indexOf('catalog-item__content_active')) {
               toggleActiveCatalogItems(1, 'catalog-item__content_active', 'catalog-item__more_active', parentElement);
            } else {
               toggleActiveCatalogItems(0, 'catalog-item__more_active', 'catalog-item__content_active', parentElement);
            }

         })
      })
   };

   function toggleTabs(tabs, tabPanes) {
      tabs.forEach(item => {
         item.addEventListener('click', () => {
            let idClickTab = item.getAttribute('data-tab');

            removeClass(tabs, 'catalog__tab_active');
            removeClass(tabPanes, 'catalog__content_active');
            addClass(tabs, idClickTab, 'catalog__tab_active');
            addClass(tabPanes, idClickTab, 'catalog__content_active');
         });
      });
   };

   //? Modal

   const buttonsConsultaton = document.querySelectorAll('[data-modal="consultation"]'),
      buttonsOrder = document.querySelectorAll('.button_mini');

   const blockOverlay = document.querySelector('.overlay'),
      modalClose = document.querySelectorAll('.modal__close'),
      modalConsultation = document.getElementById('consultation'),
      modalOrder = document.getElementById('order');

   showAndCloseModal(modalClose, "none", modalConsultation);
   showAndCloseModal(buttonsConsultaton, 'block', modalConsultation,);
   showAndCloseModal(buttonsOrder, 'block', modalOrder,);

   function showAndCloseModal(items, value, secondBlock, firstBlock = blockOverlay) {
      items.forEach(item => {
         item.addEventListener('click', () => {
            firstBlock.style.display = value;
            secondBlock.style.display = value;
         })
      });
   };

   setTimeout(function () {
      let elem = document.createElement('iframe');
      elem.src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A0f5ea600988946ae7965c898b605b3458a79d5384877d0d5dd228652253c7827&amp;source=constructor';
      let ifram = document.querySelector('.footer');
      ifram.prepend(elem);
   }, 4000);

});

$(document).ready(function () {

   validatForms("#consultation form");
   validatForms("#order  form");
   validatForms("#consultation-form");

   function validatForms(form) {
      $(form).validate({
         rules: {
            name: {
               required: true,
               minlength: 2
            },
            phone: {
               required: true,
            },
            email: {
               required: true,
               email: true,
            }
         },
         messages: {
            name: {
               required: "Пожалуйста, введите свое имя",
               minlength: jQuery.validator.format("Введите минимум {0} символа!")
            },
            phone: {
               required: "Пожалуйста, введите свой номер телефона",
            },
            email: {
               required: "Пожалуйста, введите свою почту",
               email: "Неправильно введен адрес почты"
            }
         }
      })
   }


   $("input[name=phone]").mask("+7 (999) 999-99-99");

   $('form').submit(function (e) {
      e.preventDefault();

      if (!$(this).valid()) {
         return;
      }

      $.ajax({
         type: "POST",
         url: "mailer/smart.php",
         data: $(this).serialize()
      }).done(function () {
         $(this).find("input").val("");
         $('#consultation, #order').fadeOut();
         $('.overlay, #thanks').fadeIn('slow');
         $('form').trigger('reset');
      });

      return false;
   });


   //! Pageup
   $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
         $(".pageup").fadeIn();
      } else {
         $(".pageup").fadeOut();
      }
   });


   $("a[href^='#']").on('click', function (event) {

      if (this.hash !== "") {
         event.preventDefault();

         var hash = this.hash;

         $('html, body').animate({
            scrollTop: $(hash).offset().top
         }, 0, function () {

            window.location.hash = hash;
         });
      }
   });
})

var wow = new WOW(
   {
      mobile: false
   }
);
wow.init();






