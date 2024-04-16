import { getToppingsToggle } from "./module/openToppings.js";
import { renderPizzas } from "./module/renderPizza.js";
import { renderToppings } from "./module/renderToppings.js";
import { modalController } from "./module/modal.js";
import { modalCartController } from "./module/renderCart.js";

/*
 //альтернативный способ извлечения данных с сервера по METHED
const getPizzas=async ()=>{
  try{
    const response=await fetch('https://amused-ripple-clove.glitch.me/api/products');
    if(!response.ok){
      throw new Error('Failed you fetch pizza products');
    }
    const data = await response.json();
    return data;
  } catch (error){
    console.error(`${error}`);
  }
}
//
const renderPizzas= async()=>{
  const pizzas=await getPizzas();
  console.log('Array Pizzas',pizzas);
}
*/
/*
 //альтернативная функция создания карточки
const createCard=(tagName,className,text)=>{
  const element=document.createElement(tagName);
  element.classList.add(className);
  if(text) {
    element.textContent=text;
  }
  return element;
}
*/




//обьявление функции инициализации
const init=()=>{
  getToppingsToggle();
  renderToppings();
  renderPizzas();
  modalController(
    {
      modal:'.modal-cart',
      btnOpen:'.navigation__button',
      btnClose:'.modal__close',
      cbOpen(){
        modalCartController();
      }
    }
  );
  modalController(
    {
      modal:'.modal-cart',
      btnOpen:'.hero__button',
      btnClose:'.modal__close',
      cbOpen(){
        modalCartController();
      }
    }
  );
}

//вызов функции инициализации
init();
