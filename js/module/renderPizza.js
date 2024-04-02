import { getData } from "./data.js";
import { showLoader ,hideLoader} from "./loader.js";
//функция создания карточки
const createCard=(elem)=>{
  const card=document.createElement('article');
  card.classList.add('card');
  card.innerHTML=`
  <h3 class="card__title">
  ${elem.name.ru[0].toUpperCase()}${elem.name.ru.slice(1)}
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


const get= async()=>{
  showLoader();
  return await fetch('https://amused-ripple-clove.glitch.me/api/products')
  .then((response)=>{
   if(response.ok){
     return response.json();
    }
    throw new Error('Failed you fetch pizza products');
   })
  .then((data)=>{
   return data;
  })
  .catch((error)=>{
   console.error(`Error fetching pizza products:${error}`);
   return [];
 })
 .finally(()=>{
  hideLoader();
 });

}
//функция вывода карточек
export const renderPizzas=async(toppings)=>{


  /*
   const pizzas =await getData(`https://amused-ripple-clove.glitch.me/api/products${toppings ? `?toppings=${toppings}`: ''}`);
   console.log('Массив с сервера',pizzas);
  */

  const pizzas=await get();
  console.log(pizzas);
  //найдем список пицц
  const pizzaList=document.querySelector('.pizza__list');
  pizzaList.innerHTML='';
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
}