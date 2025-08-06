// h_swiper.js

const swiper = new Swiper('.swiper.horizontals', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  allowTouchMove: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});

// 슬라이드 순서: 0(1번) → 1(2번) → 2(3번) → 1(2번) → 0(1번)
let sequence = [0, 1, 2, 1, 0];
let idx = 0;

function customSlide() {
  swiper.slideTo(sequence[idx], 1000, false);
  idx = (idx + 1) % sequence.length;
  setTimeout(customSlide, 3000);
}

// 최초 시작
customSlide();   