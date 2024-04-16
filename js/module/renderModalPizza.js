import { changeFirstUpperCase,getElement,getInputRadio,getLabel } from "./util.js";
import { cartControl } from "./cartControl.js";

export const renderModalPizza=({id,name,price,toppings,images})=>{
  console.log(id,name,price,toppings,images);
 //меню модального окна
 const modalWrapper=document.querySelector('.modal__wrapper');
 modalWrapper.innerHTML='';

 let size=Object.keys(price)[0];

 //заголовок
 const modalTitle=getElement('h2','modal__title',`${changeFirstUpperCase(name.ru)}`);

 //picture
 const picture=getElement('picture','modal__picture');

 //source
 const source=getElement('source');
 source.srcset=images[1];
 source.type='image/webp';

 //img
 const image=getElement('img','modal__image');
 image.src=images[0];
 image.alt='фото пицци с грибами';
 image.width='180';
 image.heigth='180';

 picture.append(source,image);

 //content
 const content=getElement('p','modal__text');
 content.classList.add('content');
 //span
 const contentText=getElement('span','content__text', `${changeFirstUpperCase(toppings.ru)}`);

 //цена
 const contentPrice=getElement('span','content__price','fdg');

 //слеш
 const contentSlash=document.createElement('span');
 contentSlash.textContent='/';

 //размер
 const contentSize=getElement('span','content__size',);

 content.append(contentText,contentPrice,contentSlash,contentSize);
  //функция
  const updatePrice=()=>{
  const selectedSizeInput=modalForm.querySelector('input[name="size"]:checked');
  size=selectedSizeInput.value;
  contentPrice.textContent=`${price[size]} ₽`;
  contentSize.textContent=`${parseInt(size)} см`;
 }
 //form
 const modalForm=getElement('form','modal__form');
 modalForm.id=id;

 //fieldset
 const fieldsetCrust=getElement('fieldset','modal__form-field');
 fieldsetCrust.classList.add('field');

 //input
 const thickInput=getInputRadio('input','field__input','thick','crust','thick');
 //label
 const thickLabel=getLabel('label','field__label','thick' ,'Пышное тесто');

 //input
 const thinInput=getInputRadio('input','field__input','thin','crust','thin');
 thinInput.checked='true';
 //label
 const thinLabel=getLabel('label','field__label','thin' ,'Тонкое тесто');

 fieldsetCrust.append(thickInput,thickLabel,thinInput,thinLabel);


 //fieldset
 const fieldsetSize=getElement('fieldset','modal__form-field');
 fieldsetSize.classList.add('field');

 const sizeInputs=Object.keys(price).map((size)=>{
  return getInputRadio('input','field__input',size,'size',size);
});
sizeInputs[0].checked=true;

sizeInputs.forEach((item)=>{
  const label= getLabel('label','field__label',item.id,`${parseInt(item.value)} см`);
  item.addEventListener('change',updatePrice);
  fieldsetSize.append(item,label);
});

//тогл отправки
const modalFormSubmit=getElement('button','modal__form-submit','В корзину');

//тогл закрытия
const modalСlose=getElement('button','modal__close');
modalСlose.innerHTML=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="#C1AB91"/>
<rect x="4" y="4.60181" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60181)" fill="#C1AB91"/>
</svg>`;

modalForm.append(fieldsetCrust,fieldsetSize,modalFormSubmit);
modalWrapper.append(modalTitle,picture,content,modalForm,modalСlose);
updatePrice();
let timerId=-1;
//отправка
modalForm.addEventListener('submit',(evt)=>{
 evt.preventDefault();
 const formData=new FormData(modalForm);
 //
 const product={
  cartId:crypto.randomUUID(),
  id:id,
  crust:formData.get('crust'),
  size:formData.get('size'),
 }
 console.log(product);
 cartControl.addCart(product);
 modalFormSubmit.disabled=true;
 modalFormSubmit.textContent='Добавлено';

 timerId=setTimeout(()=>{
  modalFormSubmit.disabled=false;
  modalFormSubmit.textContent='В корзину';
 },3000);
});

modalForm.addEventListener('change',()=>{
  clearTimeout();
  modalFormSubmit.disabled=false;
  modalFormSubmit.textContent='В корзину';
});
}

