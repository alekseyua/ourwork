import React from "react";

import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import registrationServiceWorker from './registerSw';
import {RouterProvider} from "react-router-dom";
import { router } from './routers/routers';
import { StoreContext } from 'storeon/react';
import { store } from './store';
import ErrorHandler from "./Pages/ErrorHandler/ErrorHandler";
import { setSessionStore } from "./helpers/utils";
import { funcDelay } from "./helpers/const";
import i18n from "./lang/i18n";

const root = ReactDOM.createRoot(document.getElementById('root'));

if(!window.Telegram.WebApp.isExpanded){
  window.Telegram.WebApp.expand();
  funcDelay( () => setSessionStore('viewportStableHeight', window.Telegram.WebApp.viewportStableHeight), 1000)
}
const onTouchStart = (e) => {
  window.Telegram.WebApp.enableClosingConfirmation()
  // setTimeout(()=>{
  //   // document.querySelector('.goto').click()
  // },1000)
}

const onTouchMove = e => {
  if(!window.Telegram.WebApp.isExpanded){
    window.Telegram.WebApp.expand();
  }
}
document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false })
document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false })
window.onerror = (message, source, lineno, colno) => {
  // console.log({message})
  if( typeof message === 'string'){
    if( message.includes('ChunkLoadError')){
      return alert('Проблемы с подключением к серверу. \n Проверьте соединение с интернетом и попробуйте снова')
    }
  }
}
root.render(
  <ErrorHandler>
    <StoreContext.Provider value={store} > 
        <RouterProvider 
          router={router} 
        />
    </StoreContext.Provider>
  </ErrorHandler>
);

registrationServiceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https:// bit.ly/CRA-vitals
// reportWebVitals();
