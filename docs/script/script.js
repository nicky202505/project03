<!-- 메인 배너 종횡  -->

// 메인 배너 종횡 (초기화/리셋 없이 무한 루프)
window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.swiper');
  const imgs   = Array.from(document.querySelectorAll('.banner-anim'));
  if (!banner || imgs.length < 3) return;

  // ------ 설정값 ------
  const expandDuration = 500;   // 애니메이션 시간(ms)
  const delayBetween   = 4000;  // 배너 사이 간격(ms)
  const easing         = 'cubic-bezier(0.4, 0, 0.2, 1)';

  // ------ 초기 스타일(한 번만) ------
  // scaleX로 펼치므로 가로는 100%, 위치는 겹치게 고정
  Object.assign(banner.style, { position: banner.style.position || 'relative' });
  imgs.forEach((el, i) => {
    Object.assign(el.style, {
      position: 'absolute',
      inset: '0',          // top:0; right:0; bottom:0; left:0;
      width: '100%',
      height: '100%',
      transform: 'scaleX(0)',
      transformOrigin: 'left center',
      visibility: 'hidden',
      zIndex: String(2 + i),
      willChange: 'transform, opacity'   
    });
  });

  // ------ 유틸 ------
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function expandLR(el) {
    el.style.transformOrigin = 'left center';
    el.style.visibility = 'visible';
    // 항상 같은 축척 애니메이션 → 중간 리셋 불필요
    const anim = el.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: expandDuration, easing, fill: 'both' }
    );
    return anim.finished;
  }

  function expandRL(el) {
    el.style.transformOrigin = 'right center';
    el.style.visibility = 'visible';
    const anim = el.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: expandDuration, easing, fill: 'both' }
    );
    return anim.finished;
  }

  // 다음 컷으로 넘어갈 때, 방금 재생한 컷은 감추어 겹침 최소화
  function hide(el) {
    // fill:'both'로 scaleX(1) 상태는 유지되지만, 가려 놓으면 깜빡임 없음
    el.style.visibility = 'hidden';
  }

  // ------ 메인 루프 ------
  // 요구 흐름: 1→2→3(좌→우) → 1(우→좌) → 2→3(좌→우) → 반복
  async function runLoop() {
    const [b1, b2, b3] = imgs;
    while (true) {
      // 1,2,3 좌→우
      await expandLR(b1); await sleep(delayBetween); hide(b1);
      await expandLR(b2); await sleep(delayBetween); hide(b2);
      await expandLR(b3); await sleep(delayBetween); hide(b3);

      // 1 우→좌
      await expandRL(b1); await sleep(delayBetween); hide(b1);

      // 2,3 좌→우
      await expandLR(b2); await sleep(delayBetween); hide(b2);
      await expandLR(b3); await sleep(delayBetween); hide(b3);
      // 자연 반복 (초기화 없음)
    }
  }

  // 반응형: scaleX 기반이라 별도 재계산 불필요(배너 폭이 변하면 자동 적응)
  // 그래도 강하게 보장하려면 아래 정도만:
  window.addEventListener('resize', () => {
    // 아무 것도 하지 않아도 됨. 필요한 경우 will-change 유지 정도만.
    imgs.forEach(el => (el.style.willChange = 'transform, opacity'));
  });

  runLoop();
});



 


<!-- prev 페이드 -->

window.addEventListener('DOMContentLoaded', function() {
  const imgs = [
    document.querySelector('.prev01'),
    document.querySelector('.prev02'),
    document.querySelector('.prev03'),
    document.querySelector('.prev04')
  ];
  const fadeDuration = 1000; // 1초 페이드
  const interval = 4000;     // 4초 간격

  imgs.forEach(img => {
    img.style.opacity = '1';
    img.style.transition = `opacity ${fadeDuration}ms`;
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
  });

  let current = 0;
  function showSlide(idx) {
    imgs.forEach((img, i) => {
      img.style.zIndex = (i === idx) ? 2 : 1;
      img.style.opacity = (i === idx) ? '1' : '0';
    });
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % imgs.length;
    showSlide(current);
  }, interval);
});


// 페이지가 로드되면 .more-info-2에 'hover' 클래스를 추가
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.more-info-2').forEach(function(el) {
    el.classList.add('hover');
  });
});  



window.addEventListener("load", () => {
  document.querySelectorAll(".vertical-line").forEach(el => {
    el.classList.add("active");
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



window.addEventListener('DOMContentLoaded', function(){
  const $rail  = $('.logo-rail');
  const $slick = $rail.find('.inline-slick');

  $slick.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 400,
    autoplay: false,          // 자동재생 꺼짐
    arrows: true,
    prevArrow: $rail.find('.prev'),
    nextArrow: $rail.find('.next'),
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  });
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
