import { CREATE_CAR_SALE, ROOT } from "../../helpers/config";
import { activeButtonBootomForConfirm, handlerWarningInfoMessageResponse } from "../../helpers/helpers";
import { docSuccess } from "../../images";
import { ACTION_POST, _INIT } from "../api-store/getpage"
import { ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON, ACTION_SET_CONTROLL_BUTTON_NULL } from "../helpers/helpers-store";


export const SET_DATA_CAR_SALE = 'setDataCarSale';
export const SET_DATA_CAR_SALE_NULL = 'setDataCarSaleNull';
export const SEND_DATA_CAR_SALE = 'sendDataCarSale';

export const carSale = store => {
    const initDataCarSale = {
        text: '',
        image: [],
    }
    store.on(_INIT, ()=>({dataCarSale: initDataCarSale}));
    store.on(SET_DATA_CAR_SALE_NULL, ({dataCarSale}, data) => ({dataCarSale: initDataCarSale}))
    store.on(SET_DATA_CAR_SALE, ({dataCarSale}, data,{dispatch}) => {
        
        let newValues = {
            ...dataCarSale,
            ...data
          }
          const isActiveButton = activeButtonBootomForConfirm({ ...newValues }, 'sell-car');
          if (isActiveButton) {
            dispatch(ACTION_SET_CONTROLL_BUTTON, {
              isActive: true,
              name: 'Создать',
              action: () => {
                dispatch(SEND_DATA_CAR_SALE, { ...newValues })
                dispatch(SET_DATA_CAR_SALE_NULL)
                return dispatch(ACTION_SET_CONTROLL_BUTTON_NULL)
              }
            })
          }else{
            dispatch(ACTION_SET_CONTROLL_BUTTON, {
              isActive: false,
            })
          }
        return ({dataCarSale: {...newValues}})
    });
    store.on(SEND_DATA_CAR_SALE, ({dataCarSale}, data, {dispatch}) => {
        const params = {
            url: CREATE_CAR_SALE,
            dataRequst: (res) => {
                const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
                if (isWarning) return;
                if (typeof data?.callback === 'function') data.callback();
                dispatch(ACTION_OPEN_MODAL, {
                  show: res?.info?.status,
                  content: res?.info?.message,
                  contentBtn: 'Ок',
                  error: !res?.info?.status,
                  path: ROOT,
                  icon: docSuccess
                })
        
              },
            ...dataCarSale,

        }
        return dispatch(ACTION_POST, params)
    });
    
}