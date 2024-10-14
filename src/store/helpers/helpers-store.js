import { _INIT } from "../api-store/getpage";

export const ACTION_SET_BUTTON_HEADER_ACTION = "setButtonHeaderAction";
export const ACTION_SET_BUTTON_HEADER_ACTION_NULL = "setButtonHeaderActionNull";
export const ACTION_SET_BUTTON_HEADER_LANG = "setButtonLangAction";
export const ACTION_SET_BUTTON_HEADER_LANG_NULL = "setButtonHeaderLangNull";
export const ACTION_OPEN_MODAL = "openModal";
export const ACTION_CLOSE_MODAL = "closeModal";

export const ACTION_CHECK_VALIDATE = "setCheckValidate";
export const ACTION_CHECK_VALIDATE_NULL = "setCheckValidateNull";
export const ACTION_SET_CONTROLL_BUTTON = "setControllButton";
export const ACTION_SET_CONTROLL_BUTTON_NULL = "setControllButtonHide";
export const ACTION_SET_TEXT_HEADER = "setTextHeader";
export const ACTION_SET_BLOCK_SCROLL = "setBlockScroll";
export const ACTION_SET_BLUR = "setBlur";
export const ACTION_RESET_TEXT_SEARCH_INTERACTIVE = "setTextInputSearchInteractiveNull";
export const ACTION_SET_TEXT_SEARCH_INTERACTIVE = "setTextInputSearchInteractive";

export const helpers = (store) => {


  store.on(_INIT, () => ({ textInpputInteractive: "" }));
  store.on(ACTION_RESET_TEXT_SEARCH_INTERACTIVE, (_, data) => ({
    textInputInteractive: ""
  }));
  store.on(ACTION_SET_TEXT_SEARCH_INTERACTIVE, ({ _ }, data, { dispatch }) => {
    return { textInputInteractive: data.q };
  });


  store.on(_INIT, () => ({ isBlur: false }));
  store.on(ACTION_SET_BLUR, (_, data) => ({ isBlur: data }));

  store.on(_INIT, () => ({ isFocus: false }));
  store.on("setFocus", (_, data) => ({ isFocus: data }));
  store.on("setIsFocus", (_, data, { dispatch }) => {
    return dispatch("setFocus", data);
  });

  store.on(_INIT, () => ({ tg: window.Telegram.WebApp }));

  store.on(_INIT, () => ({ isChangeHeight: 0 }));
  store.on("setChangeHeight", (_, data) => ({ isChangeHeight: data }));
  store.on("getChangeHeight", ({ tg }, data, { dispatch }) => {
    const height = tg.viewportHeight;
    const initHeight = window.innerHeight;
    let size = initHeight - height;

    dispatch("setChangeHeight", data);
  });

  const initControllButton = {
    show: false,
    icon: null,
    type: "submit",
    title: "применить",
    isFetch: false,
    action: () => false,
    addClass: "button__apply--dark-blue",
    isActive: false,
    typeButton: "static",
    buttonForm: () => false,
  };
  store.on(_INIT, () => ({ controllButton: initControllButton }));
  store.on(ACTION_SET_CONTROLL_BUTTON, ({ controllButton }, obj) => ({
    controllButton: { ...controllButton, ...obj },
  }));
  store.on(ACTION_SET_CONTROLL_BUTTON_NULL, ({ controllButton }, obj) => ({
    controllButton: { ...controllButton, isActive: false },
  }));

  store.on(_INIT, () => ({ checkValidate: false }));
  store.on(ACTION_CHECK_VALIDATE_NULL, (_, data) => ({ checkValidate: false }));
  store.on(ACTION_CHECK_VALIDATE, (_, data) => ({ checkValidate: data }));

  store.on(_INIT, () => ({ textHeader: "" }));
  store.on(ACTION_SET_TEXT_HEADER, ({ _ }, obj) => ({ textHeader: obj }));
  const initButtonHeaderAction = {
    isVisible: false,
    Element: () => '<></>',
  };
  store.on(_INIT, () => ({ buttonHeaderAction: initButtonHeaderAction }));
  store.on(ACTION_SET_BUTTON_HEADER_ACTION_NULL, () => ({
    buttonHeaderAction: initButtonHeaderAction,
  }));
  store.on(ACTION_SET_BUTTON_HEADER_ACTION, ({ buttonHeaderAction }, obj) => {
    return { buttonHeaderAction: { ...buttonHeaderAction, ...obj } };
  });
 
  const initLang = {
    isVisible: false,
    buttons: [],
  };
  store.on(_INIT, () => ({ headerLang: initLang }));
  store.on(ACTION_SET_BUTTON_HEADER_LANG_NULL, () => ({
    headerLang: initLang,
  }));
  store.on(ACTION_SET_BUTTON_HEADER_LANG, ({ headerLang }, obj) => {
    return { headerLang: { ...headerLang, ...obj } };
  });
 
  store.on(_INIT, () => ({
    modal: {
      show: false,
      content: null,
      state: {},
    },
  }));
  store.on(ACTION_OPEN_MODAL, (_, obj) => {
    // document.querySelector("body").setAttribute("style", "overflow:hidden");
    return { modal: { ...obj } };
  });

  store.on(ACTION_CLOSE_MODAL, (_, obj) => {
    // document.querySelector("body").setAttribute("style", "overflow:scroll");
    return {
      modal: {
        ...obj,
        show: false,
        content: null,
        state: {},
        hideIcon: true,
      },
    };
  });
};
