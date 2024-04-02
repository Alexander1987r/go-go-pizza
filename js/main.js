import { getToppingsToggle } from "./module/openToppings.js";
import { renderPizzas } from "./module/renderPizza.js";
import { getData } from "./module/data.js";

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


//функция создания
const createToppings=(enName,ruName)=>{
  const toppingsItem=document.createElement('li');
  toppingsItem.classList.add('toppings__item');
  toppingsItem.innerHTML=`
  <input class="toppings__checkbox" type="checkbox" name="topping" id="${enName}" value="${enName}">
  <label for="${enName}" class="toppings__label">
  ${ruName[0].toUpperCase()}${ruName.slice(1)}
  </label>
  `;
  return toppingsItem;
}

//функция вывода топпингов
const renderToppings=async()=>{
  const topping=await getData('https://amused-ripple-clove.glitch.me/api/toppings');
  console.log('Топпинг с сервера',topping);
  //деструктурируем
  const {en:enToppings,ru:ruToppings}=topping;
  console.log(enToppings,ruToppings);

  //найдем список топпингов
  const toppingsList=document.querySelector('.toppings__list');
  toppingsList.innerHTML='';

  enToppings.forEach((enName,i)=>{
    toppingsList.appendChild(createToppings(enName,ruToppings[i]));
  });
  //сформируем кнопку RESET
  const toppingsItem=document.createElement('li');
  toppingsItem.classList.add('toppings__item');
  const toppingsButton=document.createElement('button');
  toppingsButton.classList.add('form__button');
  toppingsButton.type='reset';
  toppingsButton.textContent='Сбросить';
  toppingsItem.append(toppingsButton);

  //найдем форму
  const toppingsForm=document.querySelector('.toppings__form');
  toppingsForm.addEventListener('change',(evt)=>{
  const target=evt.target;
  const formData=new FormData(toppingsForm);
  //создадим массив
  const checkedToppingsArray=[];
  for(let [,value] of formData){
    checkedToppingsArray.push(value);
  }
  console.log(checkedToppingsArray);

   renderPizzas(checkedToppingsArray);


  });

}

//обьявление функции инициализации
const init=()=>{
  getToppingsToggle();
  renderToppings();
  renderPizzas();
}

//вызов функции инициализации
init();