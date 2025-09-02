<!-- 메인 배너 종횡  -->

window.addEventListener('DOMContentLoaded', function () {
  const imgs = document.querySelectorAll('.banner-anim');
  if (imgs.length < 3) return; // 안전장치

  // ------ 설정값 ------
  // 반응형을 원하면 imgWidth = banner.offsetWidth 로 두세요.
  const banner = document.querySelector('.swiper');
  const getImgWidth = () => banner ? banner.offsetWidth : 1920;
  let imgWidth = getImgWidth();

  const expandDuration = 500;   // 애니메이션 시간(ms)
  const delayBetween   = 4000;    // 배너 사이 간격(ms)

  // 리사이즈 시에도 자연스럽게
  window.addEventListener('resize', () => {
    imgWidth = getImgWidth();
  });

  // ------ 유틸리티 ------
  function disableTransition(el) {
    el.style.transition = 'none';
    void el.offsetWidth; // 강제 리플로우로 transition:none 적용 확정
  }
  function enableTransition(el) {
    el.style.transition =
      `left ${expandDuration}ms cubic-bezier(0.4,0,0.2,1), ` +
      `width ${expandDuration}ms cubic-bezier(0.4,0,0.2,1)`;
    void el.offsetWidth; // 적용 확정
  }
  function enableTransitionAll(list) {
    list.forEach(enableTransition);
  }
  function disableTransitionAll(list) {
    list.forEach(disableTransition);
  }

  // 모든 배너 초기화(transition OFF 상태에서 즉시 세팅)
  function resetAll(visibleIndex = 0) {
    disableTransitionAll(imgs);
    imgs.forEach((img, i) => {
      img.style.left = '0px';
      img.style.width = '0px';
      img.style.visibility = (i === visibleIndex) ? 'visible' : 'hidden';
      img.style.zIndex = String(2 + i);
    });
    void banner?.offsetWidth; // 스타일 확정
  }

  // ------ 시퀀스 1: 1→2→3 (좌→우) ------
  function expandLeftToRight(index) {
    if (index === 0) {
      // 루프 첫 진입: 초기화는 transition OFF로, 이후 ON으로 전환
      resetAll(0);
      requestAnimationFrame(() => {
        enableTransitionAll(imgs);
      });
    }

    if (index >= imgs.length) {
      // 1세트 끝 → 1번 우→좌 시퀀스로
      setTimeout(() => expandRightToLeft(), delayBetween);
      return;
    }

    // 현재 배너 펼치기 (좌→우)
    const el = imgs[index];
    el.style.visibility = 'visible';
    el.style.left = '0px';
    el.style.width = imgWidth + 'px';
    el.style.zIndex = String(2 + index);

    setTimeout(() => {
      expandLeftToRight(index + 1);
    }, expandDuration + delayBetween);
  }

  // ------ 시퀀스 2: 1번 (우→좌) ------
  function expandRightToLeft() {
    // 순간 초기화(transition OFF) : 1번만 보이게 하고 오른쪽 바깥으로 이동 준비
    disableTransitionAll(imgs);
    imgs.forEach((img, i) => {
      img.style.width = '0px';
      img.style.left = '0px';
      img.style.visibility = (i === 0) ? 'visible' : 'hidden';
    });
    imgs[0].style.left = imgWidth + 'px'; // 오른쪽 밖으로 점프
    imgs[0].style.width = '0px';
    imgs[0].style.zIndex = '10';
    void banner?.offsetWidth;

    // 다음 프레임에 transition ON 후 실제 애니메이션 시작
    setTimeout(() => {
      enableTransition(imgs[0]);
      imgs[0].style.left = '0px';
      imgs[0].style.width = imgWidth + 'px';

      setTimeout(() => {
        expandLeftToRightFrom2();
      }, expandDuration + delayBetween);
    }, delayBetween);
  }

  // ------ 시퀀스 3: 2→3 (좌→우) ------
  function expandLeftToRightFrom2() {
    // 초기화(transition OFF)
    disableTransition(imgs[1]);
    disableTransition(imgs[2]);

    imgs[0].style.visibility = 'hidden';
    imgs[1].style.visibility = 'visible';
    imgs[2].style.visibility = 'visible';

    imgs[1].style.left = '0px';
    imgs[1].style.width = '0px';
    imgs[1].style.zIndex = '11';

    imgs[2].style.left = '0px';
    imgs[2].style.width = '0px';
    imgs[2].style.zIndex = '12';

    void banner?.offsetWidth;

    // transition ON 후 2→3 순차 확장
    requestAnimationFrame(() => {
      enableTransition(imgs[1]);
      enableTransition(imgs[2]);

      setTimeout(() => {
        imgs[1].style.width = imgWidth + 'px';

        setTimeout(() => {
          imgs[2].style.width = imgWidth + 'px';

          // 한 세트 완료 → 다시 1→2→3 좌→우 루프 재시작
          setTimeout(() => expandLeftToRight(0), expandDuration + delayBetween);
        }, expandDuration + delayBetween);
      }, delayBetween);
    });
  }

  // ------ 루프 시작 ------
  expandLeftToRight(0);
});

 
<!-- prev 페이드 -->

window.addEventListener('DOMContentLoaded', function() {
  const imgs = [
    document.querySelector('.prev01'),
    document.querySelector('.prev02'),
    document.querySelector('.prev03'),
    document.querySelector('.prev04')
  ];
  const fadeDuration = 2000; // 1초 페이드
  const interval = 4000;     // 4초 간격

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
  const sideInfo = document.querySelector('.side_info');
  const miniBox  = document.querySelector('.mini_box');
  const closeBtn = document.querySelector('.close_btn'); 
  const hook     = document.querySelector('.hook');

  if (!sideInfo || !miniBox || !closeBtn) return;

  // 미니박스 클릭 → 패널 열기 + 미니박스 숨김
  miniBox.addEventListener('click', function() {
    sideInfo.style.display = 'block';
    hook.style.display = 'block';
    // 리플로우 강제해서 transition이 먹도록
    void sideInfo.offsetWidth;

    sideInfo.classList.add('open');
    hook.classList.add('open');
    miniBox.style.display = 'none';
  });
 
  // 닫기 버튼 클릭 → 패널 닫기 + 미니박스 다시 보이기
  closeBtn.addEventListener('click', function() {
    sideInfo.classList.remove('open'); 
    hook.classList.remove('open'); 

    sideInfo.addEventListener('transitionend', function onEnd(e) {
      if (e.propertyName !== 'transform') return; 
      sideInfo.removeEventListener('transitionend', onEnd);

      sideInfo.style.display = 'none';
      hook.style.display = 'none';
      miniBox.style.display = 'block';
    });
  });
});




<!-- 쇼핑 나우 -->  




  document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
gsap.from('.shopping_now .title_a, .shopping_now .desc, .shopping_now .more-info', {
    y: 20,
    opacity: 0,
    ease: "sine.out",
    duration: 1,  
    stagger: 0.5 , //  1. 순차적으로 실행  1=1s  0. 동시 
    scrollTrigger: {
      trigger: '.shopping_now',
      start: 'top 90%',
      toggleActions: 'play none none '
    }
  });
});
  


<!-- 신세계 나우  -->        


document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.shin_now .title_a,  .gal_pop .image-box1, .gal_pop .image-box2, .gal_pop .image-box3, gal_pop .image-box4', {
    y: 20,
    opacity: 0,
    ease: "power3.out",
    duration: 2,        
    stagger: 0.3, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.shin_now',
      start: 'top 90%',
      toggleActions: 'play none none none'  
    }
  });
});
 



<!-- 아트 갤러리  -->  

document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.art_culture .title_a',   {
    y: 30,
    opacity: 0,
    ease: "power3.out",
    duration: 2,        
    stagger: 1, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.art_culture',
      start: 'top 80%',
      toggleActions: 'play none none none'  
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
 
  // playbox: 왼쪽(-1000px)에서 오른쪽(0px)으로 이동
  gsap.fromTo('.playbox',
    { left: '-1400px', opacity: '0'},
    {
      left: '-1000px', 
      opacity : '1', 
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.art_culture',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );





  
// artimg: 오른쪽(2000px)에서 왼쪽(1100px)으로 이동 (중간에서 100px 겹침) 

  gsap.fromTo('.artimg',
    { left: '1300px', opacity: '0'},
    {
      left: '1000px', 
      opacity : '1',     
      duration: 2, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.art_culture',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
});


// 브랜드 


document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.brand .title_a',   {
    y: 30,
    opacity: 0,
    ease: "power3.out",
    duration: 2,        
    stagger: 1, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.brand',
      start: 'top 80%',
      toggleActions: 'play none none none'  
    }
  });
});




// 여기부터 슬릭 슬라이드 //  

$(function(){
  const $track = $('.inline-slick');

  // 중복 초기화 방지
  if ($track.hasClass('slick-initialized')) $track.slick('unslick');

  $track.slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    speed: 300,
    arrows: true,
    prevArrow: $('.mid-arrow.prev'),
    nextArrow: $('.mid-arrow.next'),
    // 필요하면 반응형 추가
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } }
    ]
  });

  // 부모 너비가 0이었다가 표시되는 경우 대비
  setTimeout(()=> $track.slick('setPosition'), 0);  
});
 



// 매거진 

document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.magazin .title_a',   {
    y: 30,
    opacity: 0,
    ease: "power3.out",
    duration: 2,        
    stagger: 1, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.magazin',
      start: 'top 80%',
      toggleActions: 'play none none none'  
    }
  });
});  
  
document.addEventListener('DOMContentLoaded', function() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.mega_box .mega_01, .mega_box .mega_02, .mega_box .mega_03, .mega_box .mega_04', {
    y: 50,
    opacity: 0,
    ease: "power3.out",
    duration: 2,        
    stagger: 0.5, //  1. 순차적으로 실행  0. 동시 
    scrollTrigger: {
      trigger: '.mega_box',
      start: 'top 80%',
      toggleActions: 'play none none none'  
    }
  }); 
});

document.addEventListener('DOMContentLoaded', () => {
  const root  = document.querySelector('.swiper.horizontals');
  if (!root) return; // 안전 가드

  const mini  = root.querySelector('.mini_box');
  const side  = root.querySelector('.side_info');
  const hook  = root.querySelector('.hook');
  const close = root.querySelector('.close_btn');

  // ── Swiper 초기화 (있을 때만). root를 직접 넘겨 중복 초기화 방지
  let swiper = null;
  if (window.Swiper) {
    swiper = new Swiper(root, {
      // ★ 필요 옵션 채우세요
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      pagination: { el: root.querySelector('.swiper-pagination'), clickable: true }
    });
  }

  // ── 로딩 직후 mini_box는 보여두기(스타일 충돌 대비)
  if (mini) mini.style.display = 'block';

  // ── 열고/닫기
  const openPanel = () => {
    root.classList.add('is-open');
    if (side) side.setAttribute('aria-hidden', 'false');
    if (hook) hook.setAttribute('aria-hidden', 'false');
  };

  const closePanel = () => {
    root.classList.remove('is-open');
    if (side) side.setAttribute('aria-hidden', 'true');
    if (hook) hook.setAttribute('aria-hidden', 'true');
    if (mini) mini.focus(); // 접근성: 포커스 복귀
  };

  // ── 이벤트 바인딩
  if (mini) {
    mini.addEventListener('click', (e) => { e.preventDefault(); openPanel(); });
    mini.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(); }
    });
  }
  if (close) {
    close.addEventListener('click', (e) => { e.preventDefault(); closePanel(); });
  }

  // (선택) 패널 바깥 클릭 시 닫기
  // document.addEventListener('click', (e) => {
  //   const within = (side && side.contains(e.target)) ||
  //                  (mini && mini.contains(e.target)) ||
  //                  (hook && hook.contains(e.target));
  //   if (!within) closePanel();
  // });
});
