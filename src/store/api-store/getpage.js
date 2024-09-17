import Api from "../../api";
import { delay } from "../../helpers/const";
import { debounceRequest, getLocaleStore, initDataParamsPost, initDataParamsPostOrGet, tgProgressShowOrHide } from "../../helpers/utils";
import { ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON } from "../helpers/helpers-store";


export const _INIT = '@init';
export const ACTION_GET = 'get';
export const ACTION_POST = 'post';
export const ACTION_DELETE = 'delete';
export const CLOSE_WEBVIEW = 'close_webview';

export const deleteData = async (url, params = {}) => {
  try {
    tgProgressShowOrHide()
    const fdParams = initDataParamsPost(params)
    const res = await Api.delete(url, fdParams);
    return res;
  } catch (error) {
    tgProgressShowOrHide()
    throw error
  }
};

export const requestPost = async (url, params = {}) => {
  let percent = 0;
  try {
    const config = {
      onUploadProgress: (progressEvent) => {
        try {
          const { loaded, total } = progressEvent;
          percent = Math.floor((loaded * 100) / total)
        } catch (error) {
          const err = new Error('error download file')
          throw `${err} \n ${error}`
        }
      },
    }
    tgProgressShowOrHide();
    const fd = initDataParamsPost(params);
    const res = await Api.post(url, fd, config);
    tgProgressShowOrHide();
    return res;
  } catch (error) {
    const err = !percent ? new Error(`Image abort loading ${percent}%`) : new Error(``)
    tgProgressShowOrHide();
    throw `${err} \n ${error}`
  }
};

let counter = 0;

export const getDataPage = async (url, params = {}, dispatch, controller = null) => {
  if((!getLocaleStore('user_id') || getLocaleStore('user_id') === undefined) && !url.includes('/get_user/')){
    console.log({url})
    await delay(100);
    console.log('getLocaleStore(user_id)', counter++)
    return getDataPage(url, params, dispatch, controller)
  }
  counter = 0
  tgProgressShowOrHide();
  const copyParams = initDataParamsPostOrGet(params);
  const res = await Api.get(url, copyParams, controller);
  tgProgressShowOrHide();
  copyParams?.blogger_code && dispatch('setCodeBlogger', copyParams?.start_param);
  return res;
};

let isLoadFile = true;
export const postApi = async (url, params, config = {}) => {
  try {
    const fd = initDataParamsPost(params);
    setTimeout(() => {
      isLoadFile = true;
    }, 1000)
    if (!isLoadFile) {
      throw new Error('second requests...')
    };
    isLoadFile = false;
    const res = await Api.post(url, fd, config);
    return res;
  } catch (error) {
    throw error;
  }
}

export const getPage = store => {
  // --------------------------------------------------------------------------------------
  store.on(ACTION_GET, async ({ controllButton }, data, { dispatch }) => {
    try {
      let newData = { ...data };
      delete newData["url"];
      delete newData["controllerSearchMP"];
      if (data?.blockButtonDisabled) {
        dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: true });
      } else {
        dispatch(ACTION_SET_CONTROLL_BUTTON, {
          isActive: controllButton.isActive,
          isFetch: true,
        });
      }
      if (data?.blockButtonActive) {
        dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: true });
      } else {
        dispatch(ACTION_SET_CONTROLL_BUTTON, {
          isActive: controllButton.isActive,
          isFetch: true,
        });
      }

      if (!data.url) return;
      if (!debounceRequest(data)) return;

      const result = await getDataPage(
        data.url,
        newData,
        dispatch,
        data?.abortController
      );
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: false });
      data.dataRequst(result);
    } catch (error) {
      if (typeof error === "string") {
        if (error.includes("Network Error")) {
          return dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content:
              "Проблемы с подключением к серверу. \n Проверьте соединение с интернетом и попробуйте снова",
            contentBtn: "Ок",
            error: true,
          });
        }
      }
      data?.dataRequst && data?.dataRequst(error);
    }
  });

  store.on(ACTION_POST, async ({ _ }, data, { dispatch }) => {
    try {
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: false, isFetch: true });
      const newData = { ...data };
      if (!debounceRequest(data)) return;
      const result = await requestPost(data.url, newData);
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: false });
      if (result?.info?.status && typeof data?.setFieldValue === "function") {
        const arrKey = ["text", "brand_id", "model_id", "generation_id", "period_text", "period", "bank", "bank_text"];
        for (let key of arrKey) {
          data?.setFieldValue(key, "");
        }
      }
      data?.dataRequst && data?.dataRequst(result);
    } catch (error) {
      console.log({ error })
      if (typeof error === 'string') {
        if (error.includes('Network Error')) {
          return dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: 'Проблемы с подключением к серверу. \n Проверьте соединение с интернетом и попробуйте снова',
            contentBtn: 'Ок',
            error: true,
          })
        }
      }
      // throw err;
    }
  }
  );

  store.on(ACTION_DELETE, async ({ _ }, data, { dispatch }) => {
    try {
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: false, isFetch: true });

      let newData = { ...data };
      delete newData["url"];
      if (!data.url) return;
      if (!debounceRequest(data)) return;
      const result = await deleteData(data.url, newData, dispatch);
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: false });

      data.dataRequst(result);
    } catch (error) {
      if (typeof error === 'string') {
        if (error.includes('Network Error')) {
          return dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: 'Проблемы с подключением к серверу. \n Проверьте соединение с интернетом и попробуйте снова',
            contentBtn: 'Ок',
            error: true,
          })
        }
      }
      data.dataRequst(error);
    }
  });

  store.on(CLOSE_WEBVIEW, ({tg})=>{
    console.log('close webapp telegram')
    tg.close()
  })
};
