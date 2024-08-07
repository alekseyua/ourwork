import { handlerWarningInfoMessageResponse } from "../../../helpers/helpers"
import { API_GET_CATEGORY } from "../../../helpers/config"
import { setLocaleStore, setSessionStore } from "../../../helpers/utils"
import { ACTION_GET, _INIT } from "../../api-store/getpage"
import { ACTION_SET_AMOUNT_SELECT_OPTIONS } from "../createCardMarketPlace/createCardMarketPlace"
import { ACTION_GET_LIST_CARDS_MARKET, ACTION_RESET_CURRENT_PAGE_MARKET, ACTION_RESET_TEXT_SEARCH_MARKET_CARDS } from "../marketplace"

export const ACTION_LIST_OPTIONS_MARKET = 'getListOptionsMP*';
export const ACTION_SET_OPTIONS_MARKET = 'setOptionMP*';
export const ACTION_RESET_OPTIONS_MARKET = 'setResetOptionMP*';
export const ACTION_SET_FILTER_INTO_MARKET = 'changeListOptionsMP'; // устанавливает фильтра
export const ACTION_RESET_FILTER_INTO_MARKET = 'resetListOptionsMP'; // обнуляем фильтра
export const ACTION_SET_LIST_OPTIONS_MARKET_AUTO = 'setListOptionsMPAuto*';
export const ACTION_SET_LIST_OPTIONS_MARKET_COUNTRY = 'setListOptionsMPCountry*';
export const ACTION_SET_LIST_OPTIONS_MARKET_CATEGORY = 'setListOptionsMPCategory*';
export const ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY = 'getListOptionsCategoryMP*';

export const filtermarketplace = store => {

  const initOptionMP = {
    brand: null,        // Brand(id)
    city: null,         // City (id)
    country: null,
    model: null,        // Model(id)
    generation: null,   // Generation (id)
    count: 0,
    lowHigh: null,
    category: null,
    price_from: null,
    price_to: null,
    q:'',
  }
  const initCountOptionMPSave = 0;
  const initOptionMPSave = {
    brand: null,        // Brand(id)
    city: null,         // City (id)
    country: null,
    model: null,        // Model(id)
    generation: null,   // Generation (id)
    count: 0,
    lowHigh: null,
    category: null,
    price_from: null,
    price_to: null,
    q:'',
  }
  store.on(_INIT, () => ({ countOptionMPSave: initCountOptionMPSave }))
  store.on(ACTION_SET_AMOUNT_SELECT_OPTIONS, ({ _ }, data) => ({ countOptionMPSave: Object.values(data).filter(el => el !== null).filter(el => el !== '0').filter(el => el !== 0).length }))

  store.on(_INIT, () => ({ optionMP: initOptionMPSave }))
  store.on(ACTION_RESET_OPTIONS_MARKET, ({ _ }, data) => ({ optionMP: { ...initOptionMPSave } }))
  store.on(ACTION_SET_OPTIONS_MARKET, ({ _ }, data, { dispatch }) => {
    dispatch(ACTION_SET_AMOUNT_SELECT_OPTIONS, data)
    return { optionMP: data }
  })
  const initListOptionsMPAuto = {
    brands: [],
    models: [],
    generations: [],
  }
  store.on(_INIT, () => ({ listOptionsMPAuto: initListOptionsMPAuto }))
  store.on(ACTION_SET_LIST_OPTIONS_MARKET_AUTO, ({ _ }, data) => ({ listOptionsMPAuto: data }))

  const initListOptionsMPCountry = {
    countrys: [],
    citys: [],
  }
  store.on(_INIT, () => ({ listOptionsMPCountry: initListOptionsMPCountry }))
  store.on(ACTION_SET_LIST_OPTIONS_MARKET_COUNTRY, ({ _ }, data) => ({ listOptionsMPCountry: data }))

  const initListOptionsLowHighMP = {
    lowHigh: [
      {
        id: 3,
        name: 'Самые новые',
        key: 'all'
      },
      {
        id: 1,
        name: 'Цена (по убыванию)',
        key: 'order_by_low_price'
      },
      {
        id: 2,
        name: 'Цена (по возрастанию)',
        key: 'order_by_high_price'
      }]
  }
  store.on(_INIT, () => ({ listOptionsLowHighMP: initListOptionsLowHighMP }))

  const initListOptionsMPCategory = [];
  store.on(_INIT, () => ({ listOptionsMPCategory: initListOptionsMPCategory }))
  store.on(ACTION_SET_LIST_OPTIONS_MARKET_CATEGORY, ({ _ }, data) => ({ listOptionsMPCategory: [...data] }))

  store.on(ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY, (_, data = {}, { dispatch }) => {
    let url = API_GET_CATEGORY;
    let params = {
      url: url,
      dataRequst: res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if(typeof data?.callback === 'function') data?.callback();
        dispatch(ACTION_SET_LIST_OPTIONS_MARKET_CATEGORY, res.categories);
        return true
      },
      ...data
    }
    dispatch(ACTION_GET, params)
  })

  // фильтра с выподающим списком
  store.on(ACTION_LIST_OPTIONS_MARKET, ({ listOptionsMPAuto, listOptionsMPCountry, optionMP }, data, { dispatch }) => {
    setSessionStore('savePlaceLastLocationOpenCardMarket', true)

    const key = data?.key;
    const id = data?.id;
    const { callback } = data;
    let url = `/api_engines/get_${key}/`;
    let params = {
      url: url,
      setIsLoading: status => { },
      dataRequst: res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
          console.log("сюда leu ", key);
        setSessionStore("isFilterMarket", true);

        if (key === 'brands' || key === 'models' || key === 'generations') {
          dispatch(ACTION_SET_LIST_OPTIONS_MARKET_AUTO, { ...listOptionsMPAuto, [key]: res[key]?.slice(), });
          // callback()
          if (key === 'models') {
            dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, brand: id, 'model': null, 'generation': null });
            return dispatch(ACTION_GET_LIST_CARDS_MARKET, { ...optionMP, brand: id, 'model': null, 'generation': null, callback })
          }
          if (key === 'generations') {
            dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, 'model': id, 'generation': null });
            return dispatch(ACTION_GET_LIST_CARDS_MARKET, { ...optionMP, 'model': id, 'generation': null, callback })
          }
        } else if (key === 'countrys' || key === 'citys') {
          dispatch(ACTION_SET_LIST_OPTIONS_MARKET_COUNTRY, { ...listOptionsMPCountry, [key]: res[key]?.slice() });
          
          // callback()
          if (key === 'citys' && id !== null) {
            dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, country: id, city: null })
            return dispatch(ACTION_GET_LIST_CARDS_MARKET, { ...optionMP, country: id,city: null, callback })
          }
        } else {
          console.log('сюда не должен поподать')
        }
        return true
      }
    }
    
    if (id) {
      if (key === 'models') {
        console.log('1')
        dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
        params = { ...params, brand_id: id }
      }
      if (key === 'generations') {
        console.log('2')
        dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
        params = { ...params, model_id: id }
      }
      if (key === 'citys') {
        console.log('3')
        dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
        params = { ...params, country_id: id }
      }
    }
    dispatch(ACTION_GET, params)
  })

  store.on(ACTION_RESET_FILTER_INTO_MARKET, ({ _ }, data, { dispatch }) => {
    // пропишим условия когда не сбрасываем фильтра
    // 1) когда заходим в детали карточки что бы вернутся назад
    // 2) когда нужно внести правки в фильтра
    // 3) сброс номера страницы когда меняем фильтр
    setSessionStore("isFilterMarket", false);
    dispatch(ACTION_SET_OPTIONS_MARKET, initOptionMP)
    dispatch(ACTION_SET_AMOUNT_SELECT_OPTIONS, initOptionMP) 
    dispatch(ACTION_RESET_TEXT_SEARCH_MARKET_CARDS);
    dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
    // и тут же получаем новый список карточек по умолчанию ??????????????????????????
    if (data?.callback) {
      const params = { callback: data.callback };
      dispatch(ACTION_GET_LIST_CARDS_MARKET, params);
    }
    // dispatch(ACTION_GET_LIST_CARDS_MARKET)
    console.log('common reset filters')
    setSessionStore('savePlaceLastLocationOpenCardMarket')// обнуляем в хранилище
    return
  });

  store.on(ACTION_SET_FILTER_INTO_MARKET, ({ optionMP }, data, { dispatch }) => {
    dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
    const key = data?.key;
    const value = data?.value;
    const id = data?.id;
      let params = {};
    setSessionStore("isFilterMarket", true);
      
      if (!(id === null || id === undefined)) {
        
        params = {
          ...params,
          ...optionMP, 
          [key]: id
        }
        dispatch(ACTION_SET_OPTIONS_MARKET, params);// нужно проверить возможно внизу лучше
        if (key === 'order_by_high_price') {
          dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, lowHigh: 'order_by_high_price', 'order_by_high_price':true,'order_by_low_price': null, optinsFastFilter: value })
          params = {...params,'order_by_low_price': null}
        } else if (key === 'order_by_low_price') {
          dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, lowHigh: 'order_by_low_price','order_by_high_price':null,'order_by_low_price': true, optinsFastFilter: value })
          params = {...params,'order_by_high_price':null}
        }else{
          if (key === 'all') {
            dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, lowHigh: null, optinsFastFilter: value, 'order_by_high_price':null,'order_by_low_price': null })
          } 
          params = {...params,'order_by_high_price':null,'order_by_low_price': null, lowHigh: null}
        }
        
      }else{
        if (key === 'generation' || key === 'city' || key === 'category') {
          params = { ...params, [key]: value}
          dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, [key]: value })
        }        
      }
      if (data?.callback) params = { ...params, callback: data.callback }
      dispatch(ACTION_GET_LIST_CARDS_MARKET, params)
  })

}