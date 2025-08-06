    /* horizontal swiper */     
    let hSwiper = new Swiper('.swiper.horizontals', {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 30,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      allowTouchMove: false // 클릭이나 터치로 슬라이드 이동 불가
    });
  