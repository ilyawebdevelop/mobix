import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import "./modules/bootstrap.bundle.min.js";
import "./modules/fslightbox.js";
import "../../node_modules/aos/dist/aos.js";
import './components.js';

import marker from '../img/icons/marker.svg'

flsFunctions.isWebp();

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar, Controller } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar, Controller]);

// Инициализация слайдера stocksSlider
const stocksSlider = document.querySelector('.stocksSlider');
var mySwiperStocks = new Swiper(stocksSlider, {
  slidesPerView: 3,
  speed: 800,
  spaceBetween: 0,
  centeredSlides: true,
  allowTouchMove: false,
  navigation: {
    nextEl: document.querySelector('.stocks .sliderNavArrowNext'),
    prevEl: document.querySelector('.stocks .sliderNavArrowPrev'),
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      allowTouchMove: true,
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// Инициализация слайдера stocksDescrSlider
const stocksDescrSlider = document.querySelector('.stocksDescrSlider');
var mySwiperStocksDescr = new Swiper(stocksDescrSlider, {
  slidesPerView: 1,
  speed: 800,
  spaceBetween: 0,
  allowTouchMove: false,
});

mySwiperStocks.controller.control = mySwiperStocksDescr;
mySwiperStocksDescr.controller.control = mySwiperStocks;

// Инициализация слайдера catsSlider
const catsSlider = document.querySelector('.catsSlider');
var mySwiperCats = new Swiper(catsSlider, {
  slidesPerView: 3,
  speed: 800,
  spaceBetween: 0,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3,
    },
  },
});

// Инициализация слайдера brandsSlider
const brandsSlider = document.querySelector('.brandsSlider');
var mySwiperBrands = new Swiper(brandsSlider, {
  slidesPerView: 5,
  speed: 800,
  spaceBetween: 0,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 5,
    },
  },
});

// Burger
const btnMenu = document.querySelector('#toggle');
const menu = document.querySelector('.headerNavMobile');
const bodyEl = document.querySelector('body');
const closeMenu = document.querySelector('.headerNavMobileClose');

const toggleMenu = function () {
  menu.classList.toggle('active');
}
const toggleBurger = function () {
  btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
  bodyEl.classList.toggle('hidden');
}

btnMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
});
closeMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
});

$(".filterItem.has-child").on("click", function (e) {
  if ($(this).hasClass("active")) {
    $(this).removeClass('active');
    $(this).find('.filterSubItem').slideUp();
  } else {
    $(".filterItem").each(function () {
      $(this).removeClass('active');
      $(this).find('.filterSubItem').slideUp();
    });
    $(this).find('.filterSubItem').slideDown();
    $(this).addClass('active');
  }
});

let mapEl = document.getElementById('map');
if (mapEl) {
  ymaps.ready(init);
  function init() {
    // Создание карты.

    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [45.05492, 38.970875],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    });
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
    myMap.events.add('click', function () {
      myMap.behaviors.enable('scrollZoom');
      myMap.behaviors.enable('drag');
    });

    document.addEventListener('click', function (e) {
      const target = e.target;

      const its_map = target == mapEl || mapEl.contains(target);

      if (!its_map) {
        myMap.behaviors.disable('scrollZoom');
        myMap.behaviors.disable('drag');
      }
    });

    myMap.geoObjects

      .add(new ymaps.Placemark([45.05492, 38.970875], {
        balloonContent: '<strong>г.Москва</strong>'
      }, {
        iconLayout: 'default#image',
        iconImageClipRect: [[0, 0], [40, 45]],
        iconImageHref: marker,
        iconImageSize: [41, 41],

      }));
  }
}
