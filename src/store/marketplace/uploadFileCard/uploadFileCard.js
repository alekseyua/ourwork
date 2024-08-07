import { handlerWarningInfoMessageResponse, smoothTop } from "../../../helpers/helpers";
import { API_ENGINES_ADD_FILE_CARDS_MP, API_ENGINES_ADD_URL_CARDS_MP, API_ENGINES_MARKET_DELETE_FILE, API_ENGINES_MARKET_DELETE_LINK, API_ENGINES_MARKET_GET_STATUS, MARKETPLACE_MAIN, rateRestriction } from "../../../helpers/config";
import { ACTION_DELETE, ACTION_GET, _INIT, postApi } from "../../api-store/getpage";
import { ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON } from "../../helpers/helpers-store";
import { funcDelay } from "../../../helpers/const";
import axios from "axios";


export const ACTION_SET_PERCENT_LOADING_FILE = 'setPercentage*';
export const ACTION_SET_PERCENT_LOADING_FILE_NULL = 'setPercentage*';
export const ACTION_SET_INFO_VALUES_INTO_STORE_FILE_MARKET = 'setStoreValuesStatusFilesMarket*';
export const ACTION_SET_VALUE_INTO_STORE_FILE_MARKET = 'setValueIntoStoreValuesFilesMarket*';
export const ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET = 'getStatusLoadingMarket*';
export const ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL = 'setValueIntoStoreValuesFilesMarketNull*';
export const ACTION_DELETE_FILE_MARKET = 'deleteMarketFile*';
export const ACTION_DELETE_LINK_MARKET = 'deleteMarketLink*';
export const ACTION_SEND_FILE_LINK_MARKET = 'sendFileMarket*';

export const uploadFileCard = store => {

  const initPercentageAddFileMP = 0
  store.on(_INIT, () => ({ percentageAddFileMP: initPercentageAddFileMP }))
  store.on(ACTION_SET_PERCENT_LOADING_FILE, ({ _ }, data) => ({ percentageAddFileMP: data }))
  store.on(ACTION_SET_PERCENT_LOADING_FILE_NULL, ({ _ }, data) => ({ percentageAddFileMP: initPercentageAddFileMP }))
  // --------------------------------------------------------------------------------------------------------
  const initStoreValuesFilesMarket = {
    urlMarket: '',
    file: [],
    id: 999999,
  }
  const initStoreValuesStatusFilesMarket = {
    urlMarket: '',
    file: [],
    idFiles: null,
    status_upload: true,
    type: null,
    file_name: '',
    cards_count: 0,
  }
  store.on(_INIT, () => ({ storeValuesStatusFilesMarket: initStoreValuesStatusFilesMarket }))

  store.on(ACTION_SET_INFO_VALUES_INTO_STORE_FILE_MARKET, (_, data) => ({ storeValuesStatusFilesMarket: { ...data } }))

  store.on(_INIT, () => ({ storeValuesFilesMarket: initStoreValuesFilesMarket }))
  store.on(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL, () => ({ storeValuesFilesMarket: initStoreValuesFilesMarket }))
  store.on(ACTION_DELETE_FILE_MARKET, (_, data, { dispatch }) => {
    const { id } = data;
    const params = {
      url: API_ENGINES_MARKET_DELETE_FILE,
      file_id: +id,
      dataRequst: async res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if(typeof data.callback === 'function') data.callback();
        if (res?.info?.status !== undefined && res?.info?.status) {
          let options = {
            show: res?.info?.status,
            content: res?.info?.message,
            contentBtn: 'Ок',
            error: !res?.info?.status,
            actionClickOk: () => setTimeout(() => smoothTop(), 300)
          }
          if (data?.path) options = { ...options, path: data?.path }
          dispatch(ACTION_OPEN_MODAL, options)
          return true;
        }
      }
    }
    dispatch(ACTION_DELETE, params)
  });
  store.on(ACTION_DELETE_LINK_MARKET, (_, data, { dispatch }) => {
    const { id } = data;
    const params = {
      url: API_ENGINES_MARKET_DELETE_LINK,
      url_id: +id,
      dataRequst: async res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if(typeof data.callback === 'function') data.callback();
        if (res?.info?.status !== undefined && res?.info?.status) {
          let options = {
            show: res?.info?.status,
            content: res?.info?.message,
            contentBtn: 'Ок',
            error: !res?.info?.status,
            actionClickOk: () => setTimeout(() => smoothTop(), 300)
          }
          if (data?.path) options = { ...options, path: data?.path }
          dispatch(ACTION_OPEN_MODAL, options)
          return true;
        }
      }
    }
    dispatch(ACTION_DELETE, params)
  });

  store.on(ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET, (_, data, { dispatch }) => {

    const params = {
      url: API_ENGINES_MARKET_GET_STATUS,
      dataRequst: async res => {
        if (res === undefined) return;
        const file_name = res.url_data.url ? res.url_data.url.split('/').pop() : res.file_data.file_name;
        return dispatch(ACTION_SET_INFO_VALUES_INTO_STORE_FILE_MARKET, {
          urlMarket: res?.url_data?.url ?? res?.file_data?.file_name,
          file: res?.file_data?.file_name ? [{ url: res?.file_data?.file_name }] : [],
          id: res?.url_data?.url_id ? 1 : res?.file_data?.file_id ? 0 : 999999,
          idFiles: res?.url_data?.url_id ? res?.url_data?.url_id : res?.file_data?.file_id,
          file_name: file_name,
          status_upload: res?.status_upload,
          type: res?.url_data?.url ? 'link' : res?.file_data?.file_id ? 'file' : null,
          cards_count_file: res?.file_data?.cards_count ,
          cards_count_link: res?.url_data?.cards_count,
        })
      }
    }

    dispatch(ACTION_GET, params)
  })

  store.on(_INIT, ()=>({testSize: {
    file: null,
    link: null
  }}))
  store.on('setTestSize', (_, data,)=>({testSize: data}))
  store.on("setDataStoreLinkFile", ({storeValuesFilesMarket}, data) => ({
    storeValuesFilesMarket: { ...storeValuesFilesMarket, ...data },
  }));
  store.on(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET, async ({ storeValuesFilesMarket }, data, { dispatch }) => {
    let isActive = false
    const textRestriction = `Превышен размер в ${rateRestriction/1000000} mb`;
    if (data.urlMarket){
      try {
        const test_url = new URL(data.urlMarket);
        const result = await axios({
          url: test_url,
          responseType: "stream",
        });
        console.log({ header: result.headers['content-length'] });
        dispatch("setTestSize",{
          file: null,
          link: result.headers['content-length']
        });
        if (result.headers["content-length"] > rateRestriction){
          dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: textRestriction,
          });
          return
        }
      } catch (error) {
        dispatch("setTestSize",{
          file: null,
          link: error.message
        });
        console.log({error})
      }
    }
    
    if (data.file && data.file.length){
      try {
        dispatch("setTestSize",{
          file: data.file[0].url.size,
          link: null
        });
        if (data.file[0].url.size > rateRestriction) {
          dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: textRestriction,
          });
          return;
        }
      } catch (error) {
        dispatch("setTestSize",{
          file: error.message,
          link: null
        });
        console.log({error})
      }
    }
    
    if (data?.urlMarket || data?.file?.length) {
        isActive = true;
    }
    dispatch(ACTION_SET_CONTROLL_BUTTON, {
      isActive: isActive,
      isShow: true,
      action: () => dispatch(ACTION_SEND_FILE_LINK_MARKET),
    })
    console.log({ data });

    return dispatch('setDataStoreLinkFile', data);
  })

  store.on(ACTION_SEND_FILE_LINK_MARKET, async ({ storeValuesFilesMarket, tg }, data, { dispatch }) => {
    try {
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: true, isActive: false })
      const url = storeValuesFilesMarket.urlMarket ? API_ENGINES_ADD_URL_CARDS_MP : API_ENGINES_ADD_FILE_CARDS_MP;
      let params = {};
      for (let key in storeValuesFilesMarket) {
        if (key === 'file') {
          for (let files of storeValuesFilesMarket[key]) {
            params = {
              ...params,
              [key]: { [key]: files.url }
            }
          }
        } else {
          params = {
            ...params,
            [key]: storeValuesFilesMarket[key]
          }
        }
      }
      let percent = 0;
      let prevPercent = 0;
      const config = {
        onUploadProgress: (progressEvent) => {
          let oldPercent = []
          const { loaded, total } = progressEvent;
          percent = Math.floor((loaded * 100) / total)
          console.log(`${loaded}kb of ${total}kb | ${percent}%`) // just to see whats happening in the console

          if (+percent <= 100) {
            console.log(oldPercent, ' < ', +percent)
            console.log(+Math.max(...oldPercent), ' < ', +percent)
            if (Math.max(...oldPercent) < +percent && +prevPercent < +percent) {
              oldPercent.push(+percent)
              prevPercent = +percent
              dispatch(ACTION_SET_PERCENT_LOADING_FILE, +percent) // hook to set the value of current level that needs to be passed to the progressbar
            }
          }
        },
      }

      tg.MainButton.showProgress();
      const res = await postApi(url, params, config)
      tg.MainButton.hideProgress();

      if (
        res?.info?.status !== undefined &&
        res?.info?.status
      ) {
        let options = {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: 'Ок',
          actionClickOk: () => {
            dispatch(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL);            
          },
          path: MARKETPLACE_MAIN,
          error: !res?.info?.status,
        }
        if (data?.path) options = { ...options, path: data?.path }
        dispatch(ACTION_OPEN_MODAL, options)
        smoothTop();
        return true;
      } else {
        let options = {
          show: !res?.info?.status,
          content: res?.info?.message,
          contentBtn: 'Ок',
          error: !res?.info?.status,
        }
        if (data?.path) options = { ...options, path: data?.path }
        dispatch(ACTION_OPEN_MODAL, options)
        smoothTop();
        return true;
      }
      // return res;
      // https://baz-on.ru/export/c2021/fa119/avito-planetazap96.xml
      // http://xn--51-6kca4bq1bn3g.xn--p1ai/uploads/33_RU5i9h/export/avito_stock_1.xml
      // https://spavto.com/xml_files/import_shop1.xml
      // http://vrazbornn.ru/uploads/64_2u6XWg/export/avito_1.xml

    } catch (error) {
      throw error;
    }
  })
}