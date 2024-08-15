import { getOptions, setDataButtonBottonTrigger } from "./helpers";
import { SELF_ID_TELEGRAM, USERNAME } from "./config";
import { delay, funcDelay, testId } from "./const";
import { ACTION_SET_CONTROLL_BUTTON } from "../store/helpers/helpers-store";
const tg = window.Telegram.WebApp;

export const isAndroid = () => {
  return tg.platform.toLowerCase() === "android";
};
export const isIos = () => {
  return tg.platform.toLowerCase() === "ios";
};

export const isElectron = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  // if ( process.env.NODE_ENV === 'development' && !(userAgent.indexOf(' electron/') !== -1) ) return true;
  return userAgent.indexOf(" electron/") !== -1;
};

export const isAuth = () => {
  const pathname = window.location.href;
  return (
    pathname.split("/").includes("auth") ||
    pathname.split("/").includes("auth#")
  );
};

export const isLinux = () => {
  const platform = navigator.platform.toLowerCase();
  return platform.indexOf("linux") !== -1;
};

export const isSession = () => {
  if (getLocaleStore(USERNAME) && getLocaleStore("auth_code")) return true;
  return false;
};

export const tgProgressShowOrHide = () => {
  if (!tg.MainButton.isProgressVisible) {
    tg.MainButton.showProgress();
    tg.MainButton.disable();
    return;
  }
  tg.MainButton.hideProgress();
  setDataButtonBottonTrigger({ status: false });
  return;
};

export function changeDimentionheight(startHeight) {
  const heightScreen = window.visualViewport.height;
  if (heightScreen < 700) {
    const handlerResize = (event) => {
      // console.log(heightScreen);
    };
    document.addEventListener("resize", handlerResize);
  }
  return startHeight;
}

export const initDataParamsPost = (params) => {
  const fd = new FormData();
  let chatId = tg?.initDataUnsafe;
  const user = chatId?.user;
  const telegram_id = chatId?.user?.id ?? testId;
  const first_name = user?.first_name;
  const last_name = user?.last_name;
  const username = user?.username;
  const user_id = getLocaleStore('user_id');

  user_id !== undefined && fd.set("user_id", user_id);
  telegram_id !== undefined && fd.set("telegram_id", telegram_id);
  first_name !== undefined && fd.set("first_name", first_name);
  last_name !== undefined && fd.set("last_name", last_name);
  username !== undefined && fd.set(USERNAME, username);
  const listExcept = [
    "image_urls",
    "optionsCountries",
    "optionsCountries",
    "setFieldValue",
    "image_urls",
    "url",
    "current_tab",
    "optionsCities",
    "activeCity",
    "urlMarket",
    "sub_type",
    "edit",
  ];
  for (let key in params) {
    if (key === "urlMarket") {
      fd.append(`url`, params[key]);
    } else if (key === "file") {
      for (const file in params[key]) {
        fd.append(`${key}`, params[key][file]);
      }
    } else if (key === "image") {
      // || key === 'image_urls' - уточнить нужно ли
      for (const file in params[key]) {
        fd.append(`${key}`, params[key][file].url);
      }
    } else if (
      typeof params[key] === "object" &&
      Array.isArray(params[key]) &&
      !listExcept.includes(key)
    ) {
      // || key === 'image_urls' - уточнить нужно ли
      for (let id of params[key]) {
        if(typeof id === 'object' && Object.keys(id).length){
          delete id['model_name']
          delete id['generation_name']
          fd.append(`${key}[]`, JSON.stringify(id));
        }else{
          fd.append(`${key}[]`, id);
        }
      }
    } else {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === "" ||
        (typeof params[key] === "object" && params[key]?.length) ||
        typeof params[key] === "function" ||
        listExcept.includes(key)
      ) {
      } else {
        fd.set(`${key}`, params[key]);
      }
    }
  }

  return fd;
};

const initSizeHeight = document.documentElement.clientHeight;
export const isChangeSizeHeight = (callback) => {
  if (isAndroid() || isIos()) {
    const timer = setTimeout(() => {
      if (initSizeHeight !== document.documentElement.clientHeight) {
        callback();
      }
      return () => clearTimeout(timer);
    }, 1000);
  }
};

function funcIsUpBlock(elem, widthFormInput, topFormInput) {
  document.querySelector("body").style.setProperty("overflow", "hidden");
  document.querySelector("input").style.setProperty("pointer-events", `all`);

  document.documentElement.style.setProperty("--z-index-wrap", `-1`);
  document.documentElement.style.setProperty("--z-index-element-link", `-1`);
  document.documentElement.style.setProperty("--filter-blur", `2px`);
  document.documentElement.style.setProperty("--pointer-events", `none`);

  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "filter",
    `blur(-1px)`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "background-color",
    `var(--background-color)`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "--padding-container",
    `0 20px`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "position",
    `fixed`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty("top", topFormInput + `px`);
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "z-index",
    `99999`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty("width",widthFormInput);
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "border-radius",
    `15px`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "filter",
    `unset`
  );
  // elem.target.parentNode.parentNode.parentNode.style.setProperty(
  //   "transform",
  //   "translate(-2px, 0px)"
  // );
}

function funcRemoveIsUpBlock(elem) {
  document.documentElement.style.setProperty("--filter-blur", `unset`);
  document.documentElement.style.setProperty("--pointer-events", `all`);

  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "filter",
    `unset`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "background-color",
    `transparent`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "--padding-container",
    `0`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "position",
    `relative`
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty("top", null);
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "z-index",
    null
  );
  elem.target.parentNode.parentNode.parentNode.style.setProperty("width", null);
  elem.target.parentNode.parentNode.parentNode.style.setProperty("left", null);
  elem.target.parentNode.parentNode.parentNode.style.setProperty(
    "transform",
    "translate(0px, 0px)"
  );
  document.documentElement.style.setProperty("--z-index-wrap", `1`);
  document.documentElement.style.setProperty("--z-index-element-link", `99`);
  // console.log("remove complate", 'funcRemoveIsUpBlock');
}

export const autoFocusFormInput = async (
  elem,
  dispatch,
  isUpblock = false,
  isUpblockDesktop = false,
  widthFormInput = `100%`,
  topFormInput = 0,
) => {
  if (isAndroid() || isIos()) {
    if (isUpblock) {
      funcIsUpBlock(elem, widthFormInput, topFormInput);
    } else {
      funcDelay(
        () =>
          document.querySelector("body").style.setProperty("overflow", "auto"),
        500
      );
    }
  } else {
    if (isUpblockDesktop) {
      funcIsUpBlock(elem, widthFormInput, topFormInput);
    }
  }
};

export const removeFocusFormInput = (
  elem,
  dispatch,
  isUpblock = false,
  isUpblockDesktop = false
) => {
  // console.log('remove focus form Input')
  document.querySelector("body").style.setProperty("overflow", "auto");
  document.documentElement.style.setProperty("--pointer-events", `all`);
  document.documentElement.style.setProperty(
    "--gridTemplateColtumnSearchFavorie",
    `85% 15%`
  );
  if (
    elem?.target?.nextSibling?.getAttribute("data-type") === "container-option"
  ) {
    // console.log("there has interactive menu", elem);
    // console.log(elem?.target?.nextSibling);
    return funcDelay(() => funcRemoveIsUpBlock(elem), 200);
  }

  if (isAndroid() || isIos()) {
    if (isUpblock) {
      funcRemoveIsUpBlock(
        elem,
        dispatch,
        (isUpblock = false),
        (isUpblockDesktop = false)
      );
    }
  } else {
    if (isUpblockDesktop) {
      // console.log("remove focus form Input --- isUpblockDesktop");
      // document.querySelector("[data-type='container-option']").style.setProperty("display", "none");

      funcRemoveIsUpBlock(
        elem,
        dispatch,
        (isUpblock = false),
        (isUpblockDesktop = false)
      );
    }
  }
};

async function smoothScroll(step) {
  if (window.pageXOffset !== 0) {
    return smoothScroll(step);
  }
  let newStep = 0;
  if (step === 0) return;
  if (step < 0) {
    newStep = newStep - 1;
    step = step + 1;
  } else {
    newStep = newStep + 1;
    step = step - 1;
  }
  window.scrollBy(0, newStep);
  await delay(1);
  return smoothScroll(step);
}

let check = "";
export function debounceRequest(data) {
  const stringParams = JSON.stringify(data);
  const timerTimeout = setTimeout(() => {
    check = "";
    return () => clearTimeout(timerTimeout);
  }, 1000);
  if (check === stringParams) return false;
  check = stringParams;
  return true;
}

export function checkAccess(menu, access) {
  let newMenu = [];
  if (Object.keys(access).length) {
    for (let menuKey of menu) {
      let { type } = menuKey;
      if (Object.keys(access).includes(type)) {
        newMenu = [
          ...newMenu,
          {
            ...menuKey,
            isActive: access[type].access,
          },
        ];
      } else {
        newMenu = [
          ...newMenu,
          {
            ...menuKey,
          },
        ];
      }
    }
  } else {
    newMenu = menu;
  }
  return newMenu;
}

export function resetDataForm(reset, data) {
  for (let elem of data) {
    reset([elem.key], elem.value);
  }
}

export function checkErrorForm(errors, data) {
  let obj = {};
  for (let { key } of data) {
    obj = { ...obj, [key]: errors?.key };
  }
  return !checkEmptyDataObject(obj);
}

export const handlerChangeDataRequest = ({ setFieldValue, results, type }) => {
  let options = getOptions(results);

  if (type === "model") {
    setLocaleStore("optionsModel", JSON.stringify(options));
    return setFieldValue("optionsModel", options);
  }
  if (type === "generation") {    
    setLocaleStore("optionsGeneration", JSON.stringify(options));
    return setFieldValue("optionsGeneration", options);
  }
};

export function checkEmptyDataObject(object) {
  let status = true;
  for (let key in object) {
    if (object[key] !== undefined && object[key] !== null && object[key].length)
      status = false;
  }
  return status;
}

let n = 0;
export async function getListPagination({
  action,
  amountPages,
  params,
  dispatch,
}) {
  let callback = async () => {
    n = n +1;
    if (n !== +getSessionStore("currentPageFilters")) {
      dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: true });
    } else {
      n = 0;
      console.log('stop list requests')
     funcDelay(()=> dispatch(ACTION_SET_CONTROLL_BUTTON, { isFetch: false }),300);
    }
  };
  // console.log({ amountPages });
  // for (let i = amountPages; i > 0; i--) {
  params = { ...params, page: amountPages, callback };
  dispatch(action, params);
  // }

  amountPages = amountPages - 1;
  if (amountPages > 0) {
    return await getListPagination({
      action,
      amountPages,
      params,
      dispatch,
      callback,
    });
  }
  return;
}

export const initDataParamsPostOrGet = (params) => {
  let chatId = tg?.initDataUnsafe;
  const start_param = chatId?.start_param;
  let id_user_info;
  let id_request_info;

  if (start_param) {
    id_user_info = start_param.split("_")[0];
    id_request_info = start_param.split("_")[1];
  }
  const user = chatId?.user;
  const telegram_id =
    chatId?.user?.id ?? getLocaleStore(SELF_ID_TELEGRAM) ?? testId;
  setLocaleStore(SELF_ID_TELEGRAM, telegram_id);
  const first_name = user?.first_name;
  const last_name = user?.last_name;
  const username = user?.username;
  // const username = getLocaleStore(USERNAME)? getLocaleStore(USERNAME) : user?.username;
  const user_id = getLocaleStore('user_id');
  user_id !== undefined &&  (params = { ...params, "user_id": user_id});
  telegram_id !== undefined &&
    (params = { ...params, telegram_id: telegram_id });
  // first_name !== undefined && (params = { ...params, first_name: first_name });
  // last_name !== undefined && (params = { ...params, last_name: last_name });
  // username !== undefined && (params = { ...params, username: username });
  // start_param && (params = { ...params, blogger_code: start_param });
  // console.log({username})
  let newParams = {};
  // if (!!id_request_info) {
  //   newParams = { ...newParams, request_id: id_request_info };
  // }
  // if (!!id_user_info) {
  //   newParams = { ...newParams, id_user: id_user_info };
  // }

  // if (params?.user_id) {
  //   newParams = { ...newParams, user_id: params?.user_id };
  // }
  // delete params['lowHigh'];
  const listExcept = [
    "current_tab",
    "abortController",
    "blockButtonActive",
    "lowHigh",
    'blockButtonDisabled',
  ];
  for (let key in params) {
    if (
      params[key] === undefined ||
      params[key] === null ||
      params[key] === "" ||
      (typeof params[key] === "object" && params[key]?.length) ||
      typeof params[key] === "function" ||
      listExcept.includes(key)
    ) {
    } else {
      newParams = { ...newParams, [key]: params[key] };
    }
  }
  return newParams;
};

export const exceptionActions = () => {
  if (
    window.location.href.split("/").pop() === "information_pm" ||
    window.location.href.split("/").pop() === "button_create_rating"
  ) {
  } else {
    setLocaleStore("user_id", "");
  }
};

export function setLocaleStoreObj(data) {
  for (const key in data) {
    setLocaleStore(key, data[key]);
  }
}

export function getLocaleStore(key) {
  let res = window.localStorage.getItem(key);
  if (res === "null" || res === "") res = null;
  if (res === "undefined") res = undefined;
  if (res === "true") res = true;
  if (res === "false") res = false;
  return res;
}

export function setLocaleStore(key, value) {
  window.localStorage.setItem(key, value);
  return true;
}
export function setSessionStore(key, value) {
  window.sessionStorage.setItem(key, value);
  return true;
}
export function getSessionStore(key) {
  let res = window.sessionStorage.getItem(key);
  if (res === "null" || res === "") res = null;
  if (res === "undefined") res = undefined;
  if (res === "true") res = true;
  if (res === "false") res = false;
  return res;
}
