
const loader=document.createElement('div');
loader.classList.add('loader');

const loadeSpinner=document.createElement('div');
loadeSpinner.classList.add('loader__spinner');

loader.appendChild(loadeSpinner);

export const showLoader=()=>{
 document.body.append(loader);
}


export const hideLoader=()=>{
  loader.remove();
 }

