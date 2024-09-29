import { openURl } from "./helpers";
import { getLocaleStore, setLocaleStore, setSessionStore } from "./utils";
import {
  LAST_PATH_FEEDBACK,
  LASTURL,
  MAKE_REQUEST_MENU,
  MAKE_REQUEST_OWN_REQUEST,
  MAKE_REQUEST_RESPAIR,
  MAKE_REQUEST_SPARE,
  MAKE_REQUEST_TRANSPORT,
  MAKE_REQUEST_TRUCK,
  MAKE_REQUEST_UNIT,
  REITING_CREATE,
  REITING_FULL_INFO,
  REITING_MENU,
  REITING_WARRANT_ADMIN,
  REITING_WARRANT_MEMBER,
  ROOT,
  LAST_PATH_DETAIL_CARD,
  LAST_PATH_MY_FAVORITE_CARDS,
  LAST_PATH_SEND_REVIEW,
  INCOMING_REQUEST_MENU,
  INCOMING_REQUEST_UNIT_SPARE,
  INCOMING_REQUEST_TRANSPORT,
  INCOMING_REQUEST_RESPAIR,
  LAST_PATH_HOW_TO_SETUP,
  INCOMING_REQUEST_TRUCK,
  LAST_PATH_OWN_REQUEST,
  LAST_PATH_FULL_INFO,
  FEEDBACK_GET_MANY_FOR_IDEA,
  FEEDBACK,
  PREVURL,

  CURRENT_PATH_TO_FULL_INFO,
  CAR_SALE,
  MAKE_REQUEST_OWN_EDIT_REQUEST,
  CHAIN_MOTORS,
} from "./config";
import ViewsImage from "../View/ViewsImage";
import { ACTION_OPEN_MODAL } from "../store/helpers/helpers-store";

export const getNumberSpace = (num) => {
  let numInjectSpace = "";
  let newNum = num.toString();
  switch (newNum.length) {
    case 4:
      numInjectSpace = newNum.slice(0, 1) + " " + newNum.slice(1);
      return numInjectSpace;
    case 5:
      numInjectSpace = newNum.slice(0, 2) + " " + newNum.slice(2);
      return numInjectSpace;
    case 6:
      numInjectSpace = newNum.slice(0, 3) + " " + newNum.slice(3);
      return numInjectSpace;
    case 7:
      numInjectSpace =
        newNum.slice(0, 1) + " " + newNum.slice(1, 4) + " " + newNum.slice(4);
      return numInjectSpace;
    case 8:
      numInjectSpace =
        newNum.slice(0, 2) + " " + newNum.slice(2, 5) + " " + newNum.slice(5);
      return numInjectSpace;
    case 9:
      numInjectSpace =
        newNum.slice(0, 3) + " " + newNum.slice(3, 6) + " " + newNum.slice(6);
      return numInjectSpace;
    case 10:
      numInjectSpace =
        newNum.slice(0, 1) +
        " " +
        newNum.slice(1, 4) +
        " " +
        newNum.slice(4, 7) +
        " " +
        newNum.slice(7);
      return numInjectSpace;
    default:
      return num;
  }
};

export const openModalImage = (images, dispatch, fullscreen = false) => {
  dispatch(ACTION_OPEN_MODAL, {
    show: true,
    hideIcon: true,
    fullscreen: fullscreen,
    content: <ViewsImage images={images} fullscreen={fullscreen} />,
  });
};
export const openModalContent = (content, dispatch, fullscreen = false) => {
  dispatch(ACTION_OPEN_MODAL, {
    show: true,
    hideIcon: true,
    fullscreen: fullscreen,
    content: content,
  });
};

export const rundomId = () => Math.random() * 1000000000;

export const delay = async (time) =>
  await new Promise((resolve) => setTimeout(resolve, time));
export const funcDelay = (func, time) => {
  if (typeof func === "function") {
    const timer = setTimeout(() => {
      func();
      return clearTimeout(timer);
    }, time);
  }
};

export async function saveLastPast(pathname) {
  await delay(300);
  setLocaleStore(
    PREVURL,
    getLocaleStore(LASTURL) ? getLocaleStore(LASTURL) : "/"
  );
  await delay(400);
  setLocaleStore(LASTURL, pathname);
  return false;
}

export const getMarkPage = ({ pathname }) => {
  document.querySelector("body").style.setProperty("overflow", "auto");
  document.documentElement.style.setProperty("--filter-blur", `unset`);
  document.documentElement.style.setProperty("--margin-bottom-isselect",`35px`);

  switch (pathname) {
    case ROOT:
      break;
    // {/* **********************ФИЛЬТРЫ -> Входящие заявки ****************** */}
    case INCOMING_REQUEST_UNIT_SPARE:
      break;
    // {/* *****************РЕЙТИНГ И ОТЗЫВЫ*********************** */}
    case REITING_MENU:
      setLocaleStore("itemMenu", 9);
      break;
    case REITING_CREATE:
      setLocaleStore("itemMenu", 9);
      break;
    // {/* *****************СОЗДАТЬ ЗАПРОС*********************** */}
    case MAKE_REQUEST_MENU:
      setLocaleStore("itemMenu", 2);
      break;
    case MAKE_REQUEST_UNIT:
      setLocaleStore("itemMenu", 2);
      break;
    case MAKE_REQUEST_SPARE:
      setLocaleStore("itemMenu", 2);
      break;
    case CAR_SALE:
      setLocaleStore("itemMenu", 2);
      break;

    default:
  }
};

export const initButtomApply = ({ action, dispatch, pathname, tg }) => {
  dispatch(action, { show: false, typeButton: "fixed" });
  dispatch(action, { show: false, typeButton: "static" });
  switch (pathname) {
    case ROOT:
      break;
    // {/* **********************ФИЛЬТРЫ -> Входящие заявки ****************** */}
    case INCOMING_REQUEST_UNIT_SPARE:
      dispatch(action, {
        isActive: false,
        isFetch: false,
        typeButton: "fixed",
        show: true,
        addClass: "button__apply--full-red",
        title: "Применить",
      });
      break;    
    // {/* *****************РЕЙТИНГ И ОТЗЫВЫ*********************** */}
    case REITING_CREATE:
      dispatch(action, {
        isActive: false,
        isFetch: false,
        typeButton: "static",
        addClass: "button__apply--dark-blue",
        show: true,
        title: "Оставить отзыв",
      });
      break;    
    // {/* *****************СОЗДАТЬ ЗАПРОС*********************** */}
    case MAKE_REQUEST_UNIT:
      dispatch(action, {
        isActive: false,
        isFetch: false,
        typeButton: "static",
        addClass: "button__apply--dark-blue",
        show: true,
        title: "Опубликовать запрос",
      });
      break;
    case MAKE_REQUEST_SPARE:
      dispatch(action, {
        isActive: false,
        isFetch: false,
        typeButton: "static",
        addClass: "button__apply--dark-blue",
        show: true,
        title: "Опубликовать запрос",
      });
      break;
    // case MAKE_REQUEST_OWN_EDIT_REQUEST:
    //   dispatch(action, {
    //     isActive: false,
    //     isFetch: false,
    //     typeButton: "static",
    //     addClass: "button__apply--dark-blue",
    //     show: true,
    //     title: "Редактировать запрос",
    //   });
    //   break;
        /* *****************продажа авто*********************** */
    case CAR_SALE:
      dispatch(action, {
        isActive: false,
        isFetch: false,
        typeButton: "static",
        addClass: "button__apply--dark-blue",
        show: true,
        title: "Создать",
      });
      break;

    default:     
      break;
  }
};

export async function controllerHeaderBand({
  currentTextHandlerBand,
  pathBackButton,
  dispatch,
  navigate,
  state = {},
}) {}

export const compare = (v, v2) => {
  const parts1 = String(v).split(".");
  const parts2 = String(v2).split(".");
  if (+parts1[0] !== +parts2[0]) {
    return +parts1[0] > +parts2[0];
  }
  if (+parts1[1] !== +parts2[1]) {
    return +parts1[1] > +parts2[1];
  }
};

export const color = {
  bgc__blue: "#3b87fb", //- синий
  bgc__red: "#ff0000", //- красный
  bgc__green: "#38de57", //- зелёный
  bgc__yellow: "#fcf96e", //- желтый
  bgc__white: "#ffffff", //- белый
  bgc__black: "#c3c3c3", //- белый
};
// ввод телефона показуем только с id
export const statusAgreeShowPhone = 4;

const getID = () => {
  let urlSearchParams = window.location.search;
  const newParams = new URLSearchParams(urlSearchParams);
  if (newParams.get("task") === "oplata" || newParams.get("task") === "anketa")
    return newParams.get("id") && newParams.get("id").split("#")[0];
  if (process.env.NODE_ENV === "development")
    return process.env.REACT_APP_ID_USER;
  return null;
};

const getIDForPM = () => {
  let urlSearchParams = window.location.search;
  const newParams = new URLSearchParams(urlSearchParams);
  if (newParams.get("task") === "infopm")
    return newParams.get("id") && newParams.get("id").split("#")[0];
  if (process.env.NODE_ENV === "development")
    return process.env.REACT_APP_ID_USER;
  return null;
};

export const testId = getID();
export const user_id_pm = getIDForPM();

export const queryRedirect = (url) => {
  const newUrl = new URL(url);
  if (newUrl.search.includes("task=anketa")) return true;
  return false;
};
export const queryRedirecBotAppAnketa = (url) => {
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  if (pathname === "/anketa-bot-app") return true;
  return false;
};

export const queryRedirectOplata = (url) => {
  const newUrl = new URL(url);
  if (newUrl.search.includes("task=oplata")) return true;
  return false;
};

export const linkRedirectBotApp = (url, hash) => {
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  if (pathname === "/unit-bot-app") return true;
  return false;
};

export const botAbserver = async (
  id = null,
  formData = null,
  url = "",
  response = null,
  todo = ""
) => {
  const tester = ["1797304609", "1033806475"];
  for (let key in tester) {
    await fetch(`https://api.telegram.org/bot6101299118:AAG9TZ43uIO9z9nBn_ZjlspEK7VUjuy9l70/sendMessage?chat_id=${
      tester[key]
    }&parse_mode=html&title=DataRequest&text=
      ${JSON.stringify({
        todo,
        formData,
        id_telegram: id,
        url,
        response,
      })}
      `);
  }
};

export const linkRedirectBotAppAnketa = (url, hash) => {
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  if (pathname === "/anketa-bot-app") return true;
  return false;
};
let statusRedirect = false;
export const linkRedirectEmirate = (pathname, hash) => {
  if (
    (pathname === "/emirate_join" || pathname === "/emirate_join/") &&
    !statusRedirect
  ) {
    statusRedirect = true;
    return true;
  }
  return false;
};

export const linkRedirectBotAppPM = (url, hash) => {
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  if (pathname === "/information_pm/") return true; // pathname === '/information_pm' ||
  return false;
};

export const redirectPages = async ({ url, navigate, dispatch }) => {
  const newUrl = new URL(url);
  const pathname = newUrl.pathname;
  
  switch (pathname) {
    case "":
    break
    default:
      const timer = setTimeout(() => {
        navigate(getLocaleStore(LASTURL));
        return () => clearTimeout(timer);
      }, 50);
  }
};

// https:// bot-auto-razbor.vercel.app/?fake=false&task=anketa&id=1797304609

//https://t.me/js_js_js_js_bot/app_anket?startapp=YOnZboIphDajzATNFLtRUyXcqgeCsd&startApp=YOnZboIphDajzATNFLtRUyXcqgeCsd

// https://t.me/zaprosovbot/blogger?startapp=YOnZboIphDajzATNFLtRUyXcqgeCsd&startApp=YOnZboIphDajzATNFLtRUyXcqgeCsd
{
  /**
   * https:// front.botrazbor.ru/emirate/
   * https:// bot-auto-razbor.vercel.app/emirate/
   */
}
{
  /**
   * https:// front.botrazbor.ru/anketa-bot-app/
   * https:// bot-auto-razbor.vercel.app/anketa-bot-app/
   */
  // local  /anketa-bot-app/#tgWebAppData=user%3D%257B%2522id%2522%253A1797304609%252C%2522first_name%2522%253A%2522Tt%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522al_dnp%2522%252C%2522language_code%2522%253A%2522en%2522%252C%2522allows_write_to_pm%2522%253Atrue%257D%26chat_instance%3D-7823084550996953719%26chat_type%3Dprivate%26auth_date%3D1700572909%26hash%3Def480f66587fce823fdabf45e0a5eba844a813c87db20acb31d67666b8dd445b&tgWebAppVersion=6.10&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22%2C%22button_color%22%3A%22%2350a8eb%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22header_bg_color%22%3A%22%23527da3%22%2C%22accent_text_color%22%3A%22%231c93e3%22%2C%22section_header_text_color%22%3A%22%233a95d5%22%2C%22subtitle_text_color%22%3A%22%2382868a%22%2C%22destructive_text_color%22%3A%22%23cc2929%22%7D
  //https:// front.botrazbor.ru/#tgWebAppData=query_id%3DAAEhsSBrAAAAACGxIGti2rNg%26user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26auth_date%3D1703157559%26hash%3Dc10a564d944e5130eb3d613f52eeb4b72650e26f7bb90525d2564071814d452e&tgWebAppVersion=6.10&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"section_bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"%2C"header_bg_color"%3A"%23527da3"%2C"accent_text_color"%3A"%231c93e3"%2C"section_header_text_color"%3A"%233a95d5"%2C"subtitle_text_color"%3A"%2382868a"%2C"destructive_text_color"%3A"%23cc2929"}
  //https:// front.botrazbor.ru/anketa-bot-app#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D5541659838154187720%26chat_type%3Dsender%26auth_date%3D1703158901%26hash%3Ddc59987166f863e76d77045a6df19c4907959e45ae1b67eb32924e36673fd750&tgWebAppVersion=6.10&tgWebAppPlatform=android&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"section_bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"%2C"header_bg_color"%3A"%23527da3"%2C"accent_text_color"%3A"%231c93e3"%2C"section_header_text_color"%3A"%233a95d5"%2C"subtitle_text_color"%3A"%2382868a"%2C"destructive_text_color"%3A"%23cc2929"}
}
// front.botrazbor.ru/zap_emirates/#tgWebAppData=query_id%3DAAEhsSBrAAAAACGxIGti2rNg%26user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26auth_date%3D1703157559%26hash%3Dc10a564d944e5130eb3d613f52eeb4b72650e26f7bb90525d2564071814d452e&tgWebAppVersion=6.10&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"section_bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"%2C"header_bg_color"%3A"%23527da3"%2C"accent_text_color"%3A"%231c93e3"%2C"section_header_text_color"%3A"%233a95d5"%2C"subtitle_text_color"%3A"%2382868a"%2C"destructive_text_color"%3A"%23cc2929"}
https: {
  /**
    при создании ссылки нужно указать url
    1) Выбираете бота 
    2) даём имя что бы понятно было к чему относится "information_pm"
    3) Краткое описание 
    4) изображение ссылки в размере 640px
    5) ссылка на бота
    для тестового   https:// bot-auto-razbor.vercel.app/information_pm/
    для продакшен   https:// front.botrazbor.ru/information_pm/
    
    последовательность важна
    1 -  user_id as Number
    2 - request_id as Number
    
    добавляем на что ссылаться 
    параметры для Android and Iphone   ?startapp=__ user_id(1)_request_info_id(2) ___&startApp=__ user_id(1)_request_info_id(2) ____
    параметры для Android and Iphone   ?startapp=1033806475_1033806475&startApp=1033806475_1033806475

        вот так выглядит готовая ссылка телеграмм     к ней добавляем         параметры с id кого нужно показать
    // https://t.me/js_js_js_js_bot/appPM                   +               /?startapp=1797304609&startApp=1797304609
    
    ниже готовая ссылка которую формирует телеграмм
    http://localhost:3000/information_pm/?tgWebAppStartParam=1797304609#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1797304609%26auth_date%3D1693496003%26hash%3D27fedfcde0e10394a7185a592c2eedf54e994f92473020a925b5693f119fd909&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={%22bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22%2C%22button_color%22%3A%22%2350a8eb%22%2C%22button_text_color%22%3A%22%23ffffff%22}
    http://localhost:3000/information_pm/?tgWebAppStartParam=1033806475_1033806475#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1797304609%26auth_date%3D1693496003%26hash%3D27fedfcde0e10394a7185a592c2eedf54e994f92473020a925b5693f119fd909&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={%22bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22%2C%22button_color%22%3A%22%2350a8eb%22%2C%22button_text_color%22%3A%22%23ffffff%22}
*/
}

{
  /**

    при создании ссылки на Эмираты нужно указать url
    1) Выбираете бота 
    2) даём имя что бы понятно было к чему относится "emirate"
    3) Краткое описание 
    4) изображение ссылки в размере 640px
    5) ссылка на бота
    для тестового   https:// bot-auto-razbor.vercel.app/emirate/
    для продакшен   https:// front.botrazbor.ru/emirate/

    последовательность важна
    1 -  bloger_id as Number
    2 - request_id as Number
    
    добавляем на что ссылаться 
    параметры для Android and Iphone   ?startapp=bloger_id&startApp=bloger_id
    пример параметры для Android and Iphone   ?startapp=1033806475&startApp=1033806475

        http://localhost:3000/emirate/?tgWebAppStartParam=1033806475#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1033806475%26auth_date%3D1693496003%26hash%3D27fedfcde0e10394a7185a592c2eedf54e994f92473020a925b5693f119fd909&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={%22bg_color%22%3A%22%23ffffff%22%2C%22secondary_bg_color%22%3A%22%23f0f0f0%22%2C%22text_color%22%3A%22%23222222%22%2C%22hint_color%22%3A%22%23a8a8a8%22%2C%22link_color%22%3A%22%232678b6%22%2C%22button_color%22%3A%22%2350a8eb%22%2C%22button_text_color%22%3A%22%23ffffff%22}

*/
}

// {
//     bloger code
//     https:// bot-auto-razbor.vercel.app/anketa-bot-app/?tgWebAppStartParam=YOnZboIphDajzATNFLtRUyXcqgeCsd#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D3092470628042781161%26chat_type%3Dchannel%26start_param%3DYOnZboIphDajzATNFLtRUyXcqgeCsd%26auth_date%3D1703156557%26hash%3D20c1aa92598abf3563825c54c6e18c0eabd53289327c9b97a21a96fdedf89e66&tgWebAppVersion=6.10&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"section_bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"%2C"header_bg_color"%3A"%23527da3"%2C"accent_text_color"%3A"%231c93e3"%2C"section_header_text_color"%3A"%233a95d5"%2C"subtitle_text_color"%3A"%2382868a"%2C"destructive_text_color"%3A"%23cc2929"}
// }

//?startapp=461670529_20909&startApp=461670529_20909
//https:// bot-auto-razbor.vercel.app/information_pm/?tgWebAppStartParam=461670529_20909#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1033806475%26auth_date%3D1693496003%26hash%3D27fedfcde0e10394a7185a592c2eedf54e994f92473020a925b5693f119fd909&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"}

// /information_pm/?tgWebAppStartParam=1033806475,user#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1033806475%26auth_date%3D1693496003%26hash%3D27fedfcde0e10394a7185a592c2eedf54e994f92473020a925b5693f119fd909&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"}

// https:// bot-auto-razbor.vercel.app/information_pm/?tgWebAppStartParam=1033806475_1111111111#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D-802254495446828911%26chat_type%3Dsender%26start_param%3D1033806475_1111111111%26auth_date%3D1693569702%26hash%3Df25898c12eecf3e6c8a070772ebafe69ae68a942fce6a0c6ff386d19205f2770&tgWebAppVersion=6.7&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"}

// https:// bot-auto-razbor.vercel.app/information_pm/?tgWebAppStartParam=461670529_20909#tgWebAppData=user%3D%7B%22id%22%3A1797304609%2C%22first_name%22%3A%22Tt%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22al_dnp%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D%26chat_instance%3D6490283048394398704%26chat_type%3Dprivate%26start_param%3D461670529_20909%26auth_date%3D1694959628%26hash%3D5d0e3d7a4bc92c28dcb98569f67cf423b8ea689d614a005911a0519e61ab3038&tgWebAppVersion=6.9&tgWebAppPlatform=android&tgWebAppBotInline=1&tgWebAppThemeParams={"bg_color"%3A"%23ffffff"%2C"secondary_bg_color"%3A"%23f0f0f0"%2C"text_color"%3A"%23222222"%2C"hint_color"%3A"%23a8a8a8"%2C"link_color"%3A"%232678b6"%2C"button_color"%3A"%2350a8eb"%2C"button_text_color"%3A"%23ffffff"}
