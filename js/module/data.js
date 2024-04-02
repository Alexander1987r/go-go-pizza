import { showLoader ,hideLoader} from "./loader.js";
/*
 // получение данных с сервера карточек способ цепочками then
export const getData=async (url)=>{
  showLoader();
  try{
    const response=await fetch('https://amused-ripple-clove.glitch.me/api/products');
    if(!response.ok){
      throw new Error('Failed you fetch pizza products');
    }
    const data = await response.json();
    return data;
  } catch (error){
    console.error(`Error fetching pizza products:${error}`);
    return [];
  } finally{
    hideLoader();
  }
}
*/



export const getData= async(url)=>{
  showLoader();
  return await fetch(url)
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
