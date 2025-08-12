// 메인 배너 확장/수축 애니메이션 + 썸네일 페이드 + GSAP 스크롤 인 + (선택) Swiper 페이지네이션
document.addEventListener('DOMContentLoaded', function () {
  // ------------ 메인 배너 확장/수축 ------------
  const imgs = document.querySelectorAll('.banner-anim');
  const imgWidth = 1920;             // 레이아웃 기준 너비
  const expandDuration = 1800;       // ms
  const delayBetween = 400;          // ms

  // 초기 스타일 보정(transition 보장)
  imgs.forEach((img, i) => {
    img.style.visibility = 'hidden';
    img.style.width = '0px';
    img.style.left = '0px';
    img.style.zIndex = String(2 + i);
    img.style.transition = `left ${expandDuration}ms cubic-bezier(0.4,0,0.2,1), width ${expandDuration}ms cubic-bezier(0.4,0,0.2,1)`;
  });

  function expandLeftToRight(index) {
    if (index >= imgs.length) {
      setTimeout(() => expandRightToLeft(), delayBetween);
      return;
    }
    imgs[index].style.left = '0px';
    imgs[index].style.width = imgWidth + 'px';
    imgs[index].style.zIndex = 2 + index;
    imgs[index].style.visibility = 'visible';
    setTimeout(() => expandLeftToRight(index + 1), expandDuration + delayBetween);
  }

  function expandRightToLeft() {
    imgs.forEach((img, i) => {
      img.style.width = '0px';
      img.style.left = '0px';
      img.style.visibility = (i === 0) ? 'visible' : 'hidden';
    });
    imgs[0].style.left = imgWidth + 'px';
    imgs[0].style.width = '0px';
    imgs[0].style.zIndex = 10;

    setTimeout(() => {
      imgs[0].style.left = '0px';
      imgs[0].style.width = imgWidth + 'px';
      setTimeout(() => expandLeftToRightFrom2(), expandDuration + delayBetween);
    }, delayBetween);
  }

  function expandLeftToRightFrom2() {
    imgs[0].style.visibility = 'hidden';
    imgs[1].style.visibility = 'visible';
    imgs[2].style.visibility = 'visible';

    imgs[1].style.width = '0px';
    imgs[2].style.width = '0px';
    imgs[1].style.left = '0px';
    imgs[2].style.left = '0px';
    imgs[1].style.zIndex = 11;
    imgs[2].style.zIndex = 12;

    setTimeout(() => {
      imgs[1].style.width = imgWidth + 'px';
      setTimeout(() => {
        imgs[2].style.width = imgWidth + 'px';
        setTimeout(() => expandLeftToRight(0), expandDuration + delayBetween);
      }, expandDuration + delayBetween);
    }, delayBetween);
  }

  // 최초 시작
  if (imgs.length >= 3) expandLeftToRight(0);

  // ------------ 썸네일 프리뷰 페이드 ------------
  const thumbs = [
    document.querySelector('.prev01'),
    document.querySelector('.prev02'),
    document.querySelector('.prev03'),
  ].filter(Boolean);

  const fadeDuration = 1000;
  const interval = 4000;

  thumbs.forEach((img) => {
    img.style.opacity = '0';
    img.style.transition = `opacity ${fadeDuration}ms`;
  });

  let current = 0;
  function showThumb(idx) {
    thumbs.forEach((img, i) => {
      img.style.zIndex = (i === idx) ? 2 : 1;
      img.style.opacity = (i === idx) ? '0.5' : '0';
    });
  }
  if (thumbs.length) {
    showThumb(current);
    setInterval(() => {
      current = (current + 1) % thumbs.length;
      showThumb(current);
    }, interval);
  }

  // ------------ GSAP 스크롤 인 ------------
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.gal-swiper .image-box, .gal-swiper .image-box-3, .gal-swiper .image-box-4, .gal-swiper .image-box-5', {
      y: 40,
      opacity: 0,
      ease: "sine.out",
      duration: 1,
      stagger: 0,
      scrollTrigger: {
        trigger: '.shin_now',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // ------------ (옵션) Swiper 페이지네이션 활성화 ------------
  // 지금 구조에선 커스텀 애니메이션으로만 동작하지만,
  // 페이지네이션 점이나 드래그 대비를 위해 Swiper 인스턴스만 가볍게 켭니다.
  const swiperEl = document.querySelector('.swiper.horizontals');
  if (swiperEl && window.Swiper) {
    new Swiper(swiperEl, {
      slidesPerView: 1,
      allowTouchMove: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
      // 자동재생/루프는 커스텀 애니메이션과 충돌 가능성 있어 비활성
    });
  }
});
