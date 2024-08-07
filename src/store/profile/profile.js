import { activeButtonBootomForConfirm, getOptionsPayment, getOptionsPaymentPeriod, handlerWarningInfoMessageResponse, openOnlyURl } from "../../helpers/helpers"
import { API_CHANGE_PROFILE, API_GET_CONTEXT_PROFILE, API_GET_PAYMENT_URL, API_GET_PROFILE_DATA, API_UNSUBSCRIBE_AUTO_PAYMENT, PROFILE_MENU } from "../../helpers/config"
import { checkEmptyDataObject, getLocaleStore, isAndroid, isIos } from "../../helpers/utils"
import { ACTION_GET, _INIT, ACTION_POST, CLOSE_WEBVIEW } from "../api-store/getpage"
import { ACTION_CLOSE_MODAL, ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON } from "../helpers/helpers-store"
import { delay } from "../../helpers/const"

export const ACTION_SET_INFO_PROFILE = 'setInfoProfile';
export const ACTION_SET_DATA_FOR_CHANGE_PROFILE = 'setDageForChangeProfile';
export const ACTION_SET_DATA_FOR_CHANGE_PROFILE_NULL = 'setDageForChangeProfileNull';
export const ACTION_SAVE_DATA_INTO_STORE_PROFILE = 'saveDataProfile';
export const ACTION_CHANGE_DATA_PROFILE = 'changeAnketData';
export const ACTION_SET_STATUS_AUTOPAYMENT = 'setStatusAutopaymentProfileUser';
export const ACTION_SET_DESCRIPTION_PROFILE = 'setDescriptionProfileUser';
export const ACTION_SET_LIST_DESCRIPTION_ACCESS_PROFILE = 'setListDescriptionAccessPayment';
export const ACTION_SET_LIST_OPTIONS_PROFILE = 'setListOptionsPayment';
export const ACTION_GET_DATA_PROFILE = 'getProfileData';
export const ACTION_SET_DATA_FOR_SUBSCRIBE = 'setDataForSubscribe';
export const ACTION_SET_CONTROLL_BUTTON_FOR_SUBSCRIBE = 'setControllButtonSubscribe';
export const ACTION_CHANGE_DATA_SUBSCRIBE = 'changeSubscribeProfile';
export const ACTION_GET_DATA_INFO_PROFILE = 'getProfileInfoData';
export const ACTION_UNSUBSCRIBE_AUTOPAYMENT = 'unsubscribeAutopaymnet';
export const ACTION_SET_SHOW_DISCONT = 'showDiscont';

export const profile = store => {

  const initProfileInfoData = {
    name: '',
    organization: '',
    city: '',
    address: '',
    phone: '',
    avito_prom: '',
    add_info: '',
  }
  const initDataProfileForChange = {}
  store.on(_INIT, () => ({ dataProfileForChange: initDataProfileForChange }))
  store.on(ACTION_SET_DATA_FOR_CHANGE_PROFILE_NULL, () => ({ dataProfileForChange: initDataProfileForChange }));
  store.on(_INIT, () => ({ profileInfoData: initProfileInfoData }))
  store.on(ACTION_SET_INFO_PROFILE, ({ _ }, data) => ({ profileInfoData: { ...data } }));
  store.on(ACTION_SET_DATA_FOR_CHANGE_PROFILE, ({ _ }, data) => ({ dataProfileForChange: { ...data } }));
  store.on(ACTION_SAVE_DATA_INTO_STORE_PROFILE, ({ profileInfoData, dataProfileForChange }, data, { dispatch }) => {
    const newData = {
      ...profileInfoData,
      ...data
    }
    let dataForSaveIntoStore = { ...dataProfileForChange }
    
    if(initProfileInfoData.hasOwnProperty(Object.keys(data)[0])){
      dataForSaveIntoStore = {...dataForSaveIntoStore, ...data}
    }
    if(!checkEmptyDataObject(dataForSaveIntoStore)){
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: true,
        action: () => dispatch(ACTION_CHANGE_DATA_PROFILE)
      })
    }else{
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: false,
      })
    }
      

    dispatch(ACTION_SET_INFO_PROFILE, newData) // for view
    dispatch(ACTION_SET_DATA_FOR_CHANGE_PROFILE, dataForSaveIntoStore) // for send server
  })

  store.on(ACTION_CHANGE_DATA_PROFILE, ({ dataProfileForChange }, data = {}, { dispatch }) => {
    dispatch(ACTION_SET_CONTROLL_BUTTON, {
      isFetch: true
    })
    const params = {
      url: API_CHANGE_PROFILE,
      ...dataProfileForChange,
      dataRequst: res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        dispatch(ACTION_OPEN_MODAL, {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: 'Ок',
          error: !res?.info?.status,
          path: PROFILE_MENU//getLocaleStore('prevUrl'),
        })
        dispatch(ACTION_SET_CONTROLL_BUTTON, {
          isActive: true
        })
      }
    }
    dispatch(ACTION_POST, params)
  })
  // *************************************************
  store.on(_INIT, () => ({ statusAutopaymentProfileUser: null }))
  store.on(_INIT, () => ({ descriptionProfileUser: {} }))
  store.on(_INIT, () => ({ listDescriptionAccessPayment: {} }))
  store.on(_INIT, () => ({
    listOptionsPayment: {
      optionsAccess: [],
      optionsPeriod: [],
      optionsBank: [],
    }
  }))
  store.on(_INIT, () => ({ showDiscount: false }));

  store.on(ACTION_SET_STATUS_AUTOPAYMENT, (_, data = {}) => ({ statusAutopaymentProfileUser: data }))
  store.on(ACTION_SET_DESCRIPTION_PROFILE, (_, data = {}) => ({ descriptionProfileUser: { ...data } }))
  store.on(ACTION_SET_LIST_DESCRIPTION_ACCESS_PROFILE, (_, data = []) => ({ listDescriptionAccessPayment: [ ...data ] }))
  store.on(ACTION_SET_LIST_OPTIONS_PROFILE, (_, data = {}) => ({ listOptionsPayment: { ...data } }));
  store.on(ACTION_SET_SHOW_DISCONT, (_, data = {}) => ({showDiscount: data}));

  store.on(ACTION_GET_DATA_PROFILE, (_, data = {}, { dispatch }) => {

    const params = {
      url: API_GET_CONTEXT_PROFILE,
      page_id: 31,
      dataRequst: res => {
        console.log(res.children.buttons[0].children)
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        dispatch(ACTION_SET_DATA_FOR_SUBSCRIBE, { 'access': res.children.buttons[0].children.add_message_list.filter(el => el.active)[0].type })        // нужно уточнить за статус авто платежа
        dispatch(ACTION_SET_SHOW_DISCONT, res.show_discount);
        dispatch(ACTION_SET_STATUS_AUTOPAYMENT, res.auto_payment)
        dispatch(ACTION_SET_DESCRIPTION_PROFILE, res.children.buttons[0].children.message)
        dispatch(ACTION_SET_LIST_DESCRIPTION_ACCESS_PROFILE, [ ...res.children.buttons[0].children.add_message_list])
        dispatch(ACTION_SET_LIST_OPTIONS_PROFILE, {
          optionsAccess: getOptionsPayment(res?.children?.buttons[0]?.children?.drop_down_list_access),
          optionsBank: getOptionsPayment(res?.children?.buttons[0]?.children?.drop_down_list_bank),
          optionsPeriod: res?.children?.buttons[0]?.children?.drop_down_list_period,
          optionsPeriodList: res?.children?.buttons[0]?.children?.drop_down_list_period_market ?? [],
          // optionsPeriod: getOptionsPaymentPeriod(res?.children?.buttons[0]?.children?.drop_down_list_period, "full"),
        })
      },
      ...data,
    }
    dispatch(ACTION_GET, params)
  })

  // =========================================================================================================
  store.on(_INIT, () => ({ controllButtonSubscribe: false }))
  store.on(ACTION_SET_CONTROLL_BUTTON_FOR_SUBSCRIBE, (_, data = {}) => ({ controllButtonSubscribe: data }))
  store.on(ACTION_GET_DATA_INFO_PROFILE, (_, data = {}, { dispatch }) => {

    const params = {
      url: API_GET_PROFILE_DATA,
      page_id: 7,
      dataRequst: res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        // dispatch(ACTION_SET_INFO_PROFILE, res)
        dispatch(ACTION_SET_INFO_PROFILE, res)
      },
      ...data,
    }
    dispatch(ACTION_GET, params)
  })

  const initSubscribeData = {
    period: '',
    bank: '',
    auto_payment: true,
    access: '',

    period_text: '',
    bank_text: '',
    period: "",
  }
  store.on(_INIT, () => ({ dataSubscribe: initSubscribeData }));

  store.on(ACTION_UNSUBSCRIBE_AUTOPAYMENT, ({ dataSubscribe }, data, { dispatch }) => {
    const params = {
      url: API_UNSUBSCRIBE_AUTO_PAYMENT,
      setIsLoading: () => { },
      dataRequst: (res) => {
      },
    };
    return dispatch(ACTION_GET, params);
  })
  store.on(ACTION_SET_DATA_FOR_SUBSCRIBE, ({ dataSubscribe }, data, { dispatch }) => {
    if( Object.keys(data)[0]  === 'auto_payment' && !Object.values(data)[0]){
      dispatch(ACTION_UNSUBSCRIBE_AUTOPAYMENT)
    }
    let dataTemp = { ...dataSubscribe, ...data };
    if (data?.period) {
      dataTemp = { ...dataTemp, period: data.period, bank: '' }
    }
    if (data?.access && data?.access !== dataSubscribe.access) {
      dataTemp = { ...dataTemp, access: data.access, bank: '', period: '' }
    }
    const isActiveButton = activeButtonBootomForConfirm({ ...dataTemp }, 'payment');
    dispatch(ACTION_SET_CONTROLL_BUTTON_FOR_SUBSCRIBE, isActiveButton);
    return ({ dataSubscribe: { ...dataTemp } });
  });

  store.on(ACTION_CHANGE_DATA_SUBSCRIBE, async ({ dataSubscribe, tg }, data, { dispatch }) => {
    const params = {
      url: API_GET_PAYMENT_URL,
      dataRequst: async res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if (!!!res.url) {          
          return dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: <div>Оплаты временно закрыты в связи с тех работами на стороне банка. Ссылка для оплаты не была создана. Для оплаты свяжитесь с администратором <a href='https://t.me/admrazborov'>@admrazborov</a></div>,
            contentBtn: 'Ок',
            error: false,
            actionClickOk: (e) => dispatch(ACTION_CLOSE_MODAL),
          })
        }
        if(typeof data?.callback === 'function') data.callback();
        try {
          function redirectGotoWindow(url){

            window.location.assign(url);
            tg.BackButton?.hide();
          }
          if(isAndroid() || isIos()){
            await delay(300)
            res?.url && tg.openLink(res.url ) //||  redirectGotoWindow(res.url))
          }else{
            res?.url && (tg.openLink(res.url ))
          }
          //openOnlyURl(`${res.url}`, true, false); // 
          // res?.url && tg.openLink(res.url, {target: '_blank'}) //openOnlyURl(`${res.url}`, true, false); // 
        } catch (error) {
          console.log(error) 
        }
        await delay(700)
        if(isAndroid() || isIos()){
          dispatch(CLOSE_WEBVIEW)
        }
      },
      ...dataSubscribe,
    }
    dispatch(ACTION_POST, params);
  });


}