//https://proxy-image-gz55.vercel.app/api/?url_image=

import axios from "axios";
import Api from ".";

export const loadImageHttp = async urlImage => {
  const url = 'https://proxy-image-gz55.vercel.app/api?url_image=';
  try {
    const res = await axios(`${url}${urlImage}`, {
      method: 'GET',
      // withCredentials: true,  
      // headers:{
      //   'Access-Control-Allow-Origin': '*'
      // }, 
      // crossorigin: true,    
      mode: 'cors',
    });

    return await res.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error('Operation canceled');
    }
  }
}