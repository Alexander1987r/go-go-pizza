import { getData } from "./data.js";
import { renderToppings } from "./renderToppings.js";
import { modalController } from "./modal.js";
import { renderModalPizza } from "./renderModalPizza.js";

import { changeFirstUpperCase } from "./util.js";

const pizzaContainer=document.querySelector('.pizza__container');
//создадим тогл сброса
const btnReset=document.createElement('button');
btnReset.classList.add('pizza__reset');
btnReset.type='reset';
btnReset.textContent='Сбросить фильтр';
btnReset.setAttribute('form','toppings');


//функция создания карточки
const createCard=(elem)=>{
  const card=document.createElement('article');
  card.classList.add('card');
  card.innerHTML=`
  <h3 class="card__title">
  ${changeFirstUpperCase(elem.name.ru)}
  </h3>
  <picture class="card__picture">
  <source srcset="${elem.images[1]}" media="(min-width:768px)">
  <img class="card__image" src="${elem.images[0]}" alt="${elem.name.ru}" width="80" height="80">
  </picture>
  <p class="card__info">
    <b class="card__price">${elem.price['25cm']}</b>
    <span>/</span>
    <span class="card__size">25 см</span>
  </p>
  <button  class="card__button" type="button" data-id="${elem.id}" aria-label="Выбрать пиццу">
    Выбрать
  </button>
  `;
  return card;
}


//функция вывода карточек
export const renderPizzas=async(toppings)=>{
  const pizzas =await getData(`https://amused-ripple-clove.glitch.me/api/products${toppings ? `?toppings=${toppings}`: ''}`);
   console.log('Массив с сервера',pizzas);


   //найдем заголовок
   const pizzaTitle=document.querySelector('.pizza__title');

   //найдем список куда будем прокидывать пиццу
   const pizzaList=document.querySelector('.pizza__list');
   pizzaList.innerHTML='';

   if(pizzas.length){
    pizzaTitle.textContent='Пицца';
    pizzaTitle.classList.remove('pizza__title_not');
    btnReset.remove();
    pizzas.forEach((element) => {
      const {name}=element;
     //создаем Li
     const pizzaItem=document.createElement('li');
     pizzaItem.classList.add('pizza__item');

     //вызов функциb создания article и всей карточки
     const card=createCard(element);
     pizzaItem.appendChild(card);
     pizzaList.appendChild(pizzaItem);
    });

    modalController(
      {
        modal:'.modal-pizza',
        btnOpen:'.card__button',
        btnClose:'.modal__close',
        async cbOpen(btnOpen){
          const pizzaModal=await getData(`https://amused-ripple-clove.glitch.me/api/products/${btnOpen.dataset.id}`);
          renderModalPizza(pizzaModal);
        }
      }
    );
   } else {
    pizzaTitle.classList.add('pizza__title_not');
    pizzaTitle.textContent='Такой пиццы у нас нет :(';
    pizzaContainer.append(btnReset);
   }

}

btnReset.addEventListener('click',()=>{
  renderPizzas();
  document.querySelector('.form__button').remove();
  renderToppings();
});