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
/*
 //альтернативный способ по METHED
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


//способ цепочками then
 const getPizzas= ()=>async()=>{
 return fetch('https://amused-ripple-clove.glitch.me/api/products')
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
})

}
const renderPizzas=async()=>{
  const pizzas=  getPizzas();
  console.log('Массив вытянутый  с базы данных',await pizzas());
}



//обьявление функции инициализации
const init=()=>{
  getToppingsToggle();

  renderPizzas();
}

//вызов функции инициализации
init();