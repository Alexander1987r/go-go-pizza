//блокировка скролла
export const scrollController={
  scrollPosition:0,
  disabledScroll(){
    scrollController.scrollPosition=window.scrollY;
    document.body.style.cssText=`
      overflow:hidden;
      position:fixed;
      top:-${scrollController.scrollPosition}px;
      left:0;
      height:100vh;
      width:100vw;
      padding-right:${window.innerWidth - document.body.offsetWidth}px;
    `;
  },
  enabledScroll(){
    document.body.style.cssText='';
    window.scroll({top:scrollController.scrollPosition});
  },
};