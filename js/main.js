//обьявления функции открытия топпингов
const getToppingsToggle=()=>{
  //тогл выбора топпинга
  const toppingsButton=document.querySelector('.toppings__button');
  //список топпинига
  const toppingsList=document.querySelector('.toppings__list');
  toppingsButton.addEventListener('click',()=>{
 if(!toppingsList.classList.contains('toppings__list_show')){
    toppingsList.classList.add('toppings__list_show');
    toppingsButton.classList.add('toppings__button_active');
  } else {
    toppingsList.classList.remove('toppings__list_show');
    toppingsButton.classList.remove('toppings__button_active');
 };
  });
}

const renderPizzas=()=>{
  
}

//обьявление функции инициализации
const init=()=>{
  getToppingsToggle();

  renderPizzas();
}

//вызов функции инициализации
init();