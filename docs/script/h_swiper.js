

window.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('.banner-anim');
  const imgWidth = 1920;
  const expandDuration = 1800;
  const delayBetween = 200; 

  function expandLeftToRight(index) { 
    
    if (index >= imgs.length) {
      setTimeout(() => expandRightToLeft(), delayBetween);
      return;
    }
    imgs[index].style.left = '0';
    imgs[index].style.width = imgWidth + 'px';
    imgs[index].style.zIndex = 2 + index;
    imgs[index].style.visibility = 'visible';
    setTimeout(() => {
      expandLeftToRight(index + 1);
    }, expandDuration + delayBetween);
  }

  function expandRightToLeft() {
    imgs.forEach((img, i) => {
      img.style.width = '0';
      img.style.left = '0';
      img.style.visibility = (i === 0) ? 'visible' : 'hidden';
    });
    imgs[0].style.left = imgWidth + 'px';
    imgs[0].style.width = '0';
    imgs[0].style.zIndex = 10;
    setTimeout(() => {
      imgs[0].style.transition = `left ${expandDuration}ms cubic-bezier(0.4,0,0.2,1), width ${expandDuration}ms cubic-bezier(0.4,0,0.2,1)`;
      imgs[0].style.left = '0';
      imgs[0].style.width = imgWidth + 'px';
      setTimeout(() => expandLeftToRightFrom2(), expandDuration + delayBetween);
    }, delayBetween);
  }

  function expandLeftToRightFrom2() {
    imgs[0].style.visibility = 'hidden';
    imgs[1].style.visibility = 'visible';
    imgs[2].style.visibility = 'visible';
    imgs[1].style.width = '0';
    imgs[2].style.width = '0';
    imgs[1].style.left = '0';
    imgs[2].style.left = '0';
    imgs[1].style.zIndex = 11;
    imgs[2].style.zIndex = 12;
    setTimeout(() => {
      imgs[1].style.width = imgWidth + 'px';
      setTimeout(() => {
        imgs[2].style.width = imgWidth + 'px';
        // 무한 반복: 다시 expandLeftToRight(0) 호출
        setTimeout(() => expandLeftToRight(0), expandDuration + delayBetween);
      }, expandDuration + delayBetween);
    }, delayBetween);
  }

  // 최초 시작
  expandLeftToRight(0);
});

 


window.addEventListener('DOMContentLoaded', function() {
  const imgs = [
    document.querySelector('.prev01'),
    document.querySelector('.prev02'),
    document.querySelector('.prev03')
  ];
  const fadeDuration = 1000; // 1초 페이드
  const interval = 2000;     // 4초 간격

  imgs.forEach(img => {
    img.style.opacity = '0.5';
    img.style.transition = `opacity ${fadeDuration}ms`;
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
  });

  let current = 0;
  function showSlide(idx) {
    imgs.forEach((img, i) => {
      img.style.zIndex = (i === idx) ? 2 : 1;
      img.style.opacity = (i === idx) ? '0.5' : '0';
    });
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % imgs.length;
    showSlide(current);
  }, interval);
});



document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.gal-swiper .image-box, .gal-swiper .image-box-3, .gal-swiper .image-box-4, .gal-swiper .image-box-5', {
    y: 40,
    opacity: 0,
    ease: "sine.out",
    duration: 2,  
    stagger: 1, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.shin_now',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});


 

document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.art_box .playbox,  .art_box .image, .art_box .image-8, .art_box .imagebox, .art_box .image-9', {
    y: 40,
    opacity: 0,
    ease: "sine.out", 
    duration: 2,  
    stagger: 0, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.art_box',
      start: 'top 80%',
      toggleActions: 'play none none none none none '
    }
  });
});

