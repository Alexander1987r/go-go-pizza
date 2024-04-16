import { getData } from "./data.js";
import { renderPizzas } from "./renderPizza.js";
import { changeFirstUpperCase } from "./util.js";
//функция создания
const createToppings=(enName,ruName)=>{
  const toppingsItem=document.createElement('li');
  toppingsItem.classList.add('toppings__item');
  toppingsItem.innerHTML=`
  <input class="toppings__checkbox" type="checkbox" name="topping" id="${enName}" value="${enName}">
  <label for="${enName}" class="toppings__label">
  ${changeFirstUpperCase(ruName)}
  </label>
  `;
  return toppingsItem;
}

//функция вывода топпингов
export const renderToppings=async()=>{
  const topping=await getData('https://amused-ripple-clove.glitch.me/api/toppings');
  //деструктурируем
  const {en:enToppings,ru:ruToppings}=topping;


  //найдем список топпингов
  const toppingsList=document.querySelector('.toppings__list');
  toppingsList.innerHTML='';

  enToppings.forEach((enName,i)=>{
    toppingsList.appendChild(createToppings(enName,ruToppings[i]));
  });
  //сформируем кнопку RESET
  const toppingsItem=document.createElement('li');
  toppingsItem.classList.add('toppings__item');
  toppingsItem.classList.add('toppings__item_button');
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
   renderPizzas(checkedToppingsArray);
   if(checkedToppingsArray.length > 0){
    toppingsList.append(toppingsItem);
   } else {
      toppingsItem.remove();
   }

  //повесим прослушиватель по клику
  toppingsButton.addEventListener('click',clearForm);
  });
  //функция очистки формы,удаления кнопки сброса ,обработчика
  const clearForm=()=>{
    toppingsItem.remove();
    toppingsForm.reset();
    renderPizzas();
    toppingsButton.removeEventListener('click',clearForm);
  }
}