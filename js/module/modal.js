import { scrollController } from "./scroll.js";
//модульная секция модального окна
 export const modalController=({modal,btnOpen,btnClose,
  time='500', cbOpen=(btnOpen)=>{
  } })=>{
  //найдем модальное окно
  const modalPizza=document.querySelector(modal);
  //найдем тоглы открытия
  const cardButtons=document.querySelectorAll(btnOpen);

  //зададим стили модальному окну
  modalPizza.style.cssText=`
    display:flex;
    opacity:0;
    visibility:hidden;
    transition:opacity 500ms ease-in-out;
  `;
  //ф. закрытия модального окна
  const closeModal=(evt)=>{
    const target=evt.target;
    if( (target.closest(modal)) && (!target.closest('.modal__wrapper')) && (!target.closest('.modal-cart__main'))  || target.closest(btnClose) || evt.code === 'Escape'){
      modalPizza.style.opacity=0;
      setTimeout(()=>{
        modalPizza.style.visibility='hidden';
        scrollController.enabledScroll();
      },500);
    modalPizza.removeEventListener('click',closeModal);
    window.removeEventListener('keydown',closeModal);
    }
  }
  //ф. открытия модального окна
  const openModal=(btnOpenClass)=>{
    cbOpen(btnOpenClass.target);
    scrollController.disabledScroll();
    modalPizza.style.visibility='visible';
    modalPizza.style.opacity=1;
    modalPizza.addEventListener('click',closeModal);
    window.addEventListener('keydown',closeModal);
  }
  cardButtons.forEach((btns)=>{
    btns.addEventListener('click',openModal);
  });
}


