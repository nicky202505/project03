let hSwiper;   // 가로(Horizontal) 슬라이더
/**
 * 단독 가로슬라이더 (vertical swiper와 연동 코드 제거)
 **/
hSwiper = new Swiper('.horizontals', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },  
  on: {
    reachEnd:function ()  {
      hSwiper.canNext = true;           
      console.log("가로 마지막", hSwiper.canNext) ;    
    }, 
    transitionEnd : function(){
      console.log("슬라이더 이동 끝", hSwiper.isEnd);   
    },  
    reachBeginning : function () {
      hSwiper.canPrev = true ; 
    }
  }
});
