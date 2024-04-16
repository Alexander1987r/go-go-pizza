//вспомогательная функция первой заглавной буквы
export const changeFirstUpperCase=(str)=>{
  return str[0].toUpperCase() + str.slice(1);
}

//вспомогательная функ. формирования HTML документа
export const getElement=(tagName,className,text)=>{
  const element=document.createElement(tagName);
  element.classList.add(className);
  if(text){
   element.textContent=text;
  }
  return element;
}
//вспомогательная функ. формирования радио кнопки
export const getInputRadio=(tagName,className,id,name,value)=>{
  const input=document.createElement(tagName);
  input.classList.add(className);
  input.type='radio';
  input.id=id;
  input.name=name;
  input.value=value;
  return input;
}
//вспомогательная функ. формирования label
export const getLabel=(tagName,className,forId,labelText)=>{
  const label=document.createElement(tagName);
  label.classList.add(className);
  label.htmlFor=forId;
  label.textContent=labelText;
  return label;
}