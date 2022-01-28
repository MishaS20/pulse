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
function removeClass(items, className) {
   items.forEach(item => item.classList.remove(className));
};

function addClass(items, idx, className) {
   items[idx].classList.add(className);
};

function toggleSlide(items) {
   function swapClass(removeNameClass, addNameClass, parentElement, idx) {
      parentElement.classList.remove(removeNameClass);
      let catalogList = parentElement.parentNode.children[idx];
      catalogList.classList.add(addNameClass);
   };

   items.forEach(function (item) {
      item.addEventListener("click", function (e) {
         e.preventDefault();
         let parentElement = item.parentNode;
         let classNameParent = parentElement.className;

         if (~classNameParent.indexOf('catalog-item__content_active')) {
            swapClass('catalog-item__content_active', 'catalog-item__list_active', parentElement, 1);
         } else {
            swapClass('catalog-item__list_active', 'catalog-item__content_active', parentElement, 0);
         }

      })
   })
};

function toggleTabs(tabs, tabsContent) {
   for (let i = 0; i < tabs.length; i++) {
      let currentTab = tabs[i];

      currentTab.addEventListener('click', function (e) {
         let clickTab = currentTab.getAttribute('data-tab');
         removeClass(tabs, 'catalog__tab_active');
         removeClass(tabsContent, 'catalog__content_active');
         addClass(tabs, clickTab, 'catalog__tab_active');
         addClass(tabsContent, clickTab, 'catalog__content_active');
      });
   }
};

const tabNavs = document.querySelectorAll('.catalog__tab');
const tabPanes = document.querySelectorAll('.catalog__content');
const catalogLinks = document.querySelectorAll('.catalog-item__link');


toggleSlide(catalogLinks);
toggleTabs(tabNavs, tabPanes);

//? Modal

const buttonsConsultaton = document.querySelectorAll('[data-modal="consultation"]'),
   buttonsOrder = document.querySelectorAll('.button_mini');

const blockOverlay = document.querySelector('.overlay'),
   modalClose = document.querySelectorAll('.modal__close'),
   modalConsultation = document.getElementById('consultation'),
   modalOrder = document.getElementById('order'),
   modalThanks = document.getElementById('thanks');

function showAndCloseModal(items, value, secondBlock, firstBlock = blockOverlay) {
   items.forEach(function (item) {
      item.addEventListener('click', function () {
         firstBlock.style.display = value;
         secondBlock.style.display = value;
      })
   });
}
showAndCloseModal(modalClose, "none", modalConsultation)
showAndCloseModal(buttonsConsultaton, 'block', modalConsultation,)
showAndCloseModal(buttonsOrder, 'block', modalOrder,)

$(document).ready(function () {

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
   validatForms("#consultation form");
   validatForms("#order  form");
   validatForms("#consultation-form");
})




