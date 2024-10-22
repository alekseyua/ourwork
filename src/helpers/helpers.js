import React from "react";
import { compare, delay, funcDelay } from "./const";
import { checkEmptyDataObject, isAndroid, isIos } from "./utils";
import { ACTION_CLOSE_MODAL, ACTION_OPEN_MODAL } from "../store/helpers/helpers-store";
import { ACTION_DISMISS_PHONE_NUMBER } from "../store/access/access";
const tg = window.Telegram.WebApp;

export const changeStateBackButton = async () => {
  try {
    if (window.location.pathname === "/") {
      console.log("root hide button");
      tg.BackButton.hide();
      return false;
    }
    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
      const timerShow = setTimeout(() => {
        tg.BackButton.show();
        return () => clearTimeout(timerShow)
      }, 150)
      return true
    } else {
      tg.BackButton.show();      
      return true
    }
  } catch (error) {
    const err = new Error('Error changeStateBackButton');
    throw `${err} ${error}`;
  }
}

export const serialaizerMyProfilesMenu = data => {
  try {
    const res = data.reduce((acum, cur, index, array) => {
      acum = [...acum, { ...cur, name: cur?.value ?? cur?.name, id: `${cur.id}`, slug: cur?.action?.replace('/', '') ?? cur.slug }]
      return acum;
    }, []);
    return res
  } catch (error) {
    const err = new Error('Error serialaizerMyProfilesMenu');
    throw `${err} ${error}`;
  }
}
export const serialaizerEditCard = data => {
  try {
    let newData = {};
    for(let key in data){
      let res = {[key]: data[key]};
    if( key === 'user_data') res = { phone: data[key].user_phone_number };
      newData = {
        ...newData,
        ...res,
      }
    }
    return newData;
  } catch (error) {
    const err = new Error('Error serialaizerEditCard');
    throw `${err} ${error}`;
  }
}
export const serialaizerFiltersMenu = data => {
  try {
    const res = data.reduce((acum, cur, index, array) => {
      acum = [...acum, { ...cur, name: cur?.value ?? cur?.name, id: `${cur.send_type}-${index}`, slug: cur.send_type?.replace('/', '') ?? cur.slug }]
      return acum;
    }, []);
    return res
  } catch (error) {
    const err = new Error('Error serialaizerFiltersMenu');
    throw `${err} ${error}`;
  }
}

export const serialaizerInfoMenu = data => {
  try {
    const res = data.reduce((acum, cur, index, array) => {
      acum = [...acum, { ...cur, name: cur?.value ?? cur?.name, id: `${cur.send_type}-${index}`, slug: cur.send_type?.replace('/', '') ?? cur.slug }]
      return acum;
    }, []);
    return res
  } catch (error) {
    const err = new Error('Error serialaizerInfoMenu');
    throw `${err} ${error}`;
  }
}

export const getWidthScreen = (width) => {
  if (width >= 1600) {
    return 1100
  } else if (width > 1200 && width < 1600) {
    return 1000
  } else if (width > 800 && width < 1200) {
    return 800
  } else {
    return width
  }
}


/**
 *
 * @param {values data form} values
 * @param {action form} action
 * @param {callback data from request} callback
 * @returns
 */
export const activeButtonBootomForConfirm = (
  values,
  action,
  callback = () => {},
  status_user,
) => {
  const checkValueCondition = (values, tg, action) => {

    switch (action) {
      case "sell-car":
        return values.text && values.image.length;
      case "sell-car-spare":
        return !!(
          values.text &&
          values?.brand_id &&
          values?.model_id &&
          values?.generation_id 
        );
      case "edit-card":
        return (
          !checkEmptyDataObject(values) &&
          typeof values.city_id === "number" &&
          values.city_id
        );
      // case "edit_mp_card":
      //   return (values.title || values.country_id || values.city_id || values.brand_id || values.model_id || values.generation_id || values.price || values.oem || values.condition || values.count || values.description || values.phone || values.address || values.image.length) ;
      case "create-card":
        // console.log({values})
        return (
          values.country_id &&
          typeof values.city_id === "number" &&
          values.city_id &&
          values.brand_id &&
          values.model_id &&
          values.generation_id &&
          values.price &&
          // && values.oem && values.condition &&values.count && values.description
          values.phone &&
          values.address &&
          values.image.length > 0
        );
      case "country-text":
        return !!(
          typeof values.city_id === "number" &&
          values.city_id &&
          values.text
        );
      case "change_file":
        return (
          values.text &&
          values.generation_id &&
          values.brand_id &&
          values.model_id &&
          values.image.length
        );
      case "add_mp_file":
        return values.file?.length || values.url;
      case "change_file-text":
        return values.text && values.image.length;
      case "username":
        return values.username;
      case "searchReview":
        return values.value;
      case "review":
        return !!(values.text && !!values.rating && values.username);
      case "search":
        return values.generation_id && values.brand_id && values.model_id;
      case "text":
        return !!values.text;
      case "unit_spare":
        if (status_user === 1){
          return !!(
            !!values?.text?.length &&
            values?.brand_id &&
            values?.phone_number
          );
        }
          return !!(
            !!values?.text?.length &&
            values?.brand_id
          );
      case "edit_unit":
        const status_edit_unit =
          !!values?.text?.length ||
          values?.generation_id ||
          values?.image?.length ||
          values?.delete_request_images?.length;
        return status_edit_unit;
      case "edit_spare":
        const status_edit_spare =
          !!values?.text?.length ||
          values?.generation_id ||
          values?.image?.length ||
          values?.delete_request_images?.length;
        return status_edit_spare;
      default:
        return false;
    }
  };
  return checkValueCondition(values, tg, action);
};

export const getOptions = (data) => {
  let options = [];
  if (Array.isArray(data) && data.length) {
    data.map((el) => {
      return options.push({
        title: el.name,
        value: el.id || "",
        image: el?.image || "",
      });
    });
  }
  return options;
};
export const getOptionsFiltersMP = (data) => {
  let options = [];
  if (Array.isArray(data) && data.length) {
    data.map((el) => {
      return options.push({
        title: el.name,
        value: el.id || "",
        ...el,
      });
    });
  }
  return options;
};


export const getListActiveSelects = ({ list, filters, types, typePage, isAutoLoad = false }) => {
  let newList = { ...filters };
  for (let type of types) {

    const res = list.reduce((acc, cur) => {
      if (cur['status_' + type]) acc = [...acc, cur.id]
      return acc
    }, []);

    if (isAutoLoad) {
      for (let key in filters) {
        if (key.includes(typePage) && key.includes(type)) {
          newList = {
            ...newList,
            [key]: [...res, ...filters[key]]
          }
        }
      }
    } else {
      for (let key in filters) {
        if (key.includes(typePage) && key.includes(type)) {
          newList = {
            ...newList,
            [key]: res
          }
        }
      }
    }
  }
  return newList;
}

let maxAmountPosition = 0;
export async function gotoPointScroll(position){
  // возврат на место с которого провалились'
  if (!position) {
    maxAmountPosition = 0;
    return;
  }
  console.log({ maxAmountPosition });
  if (maxAmountPosition === 2) {
    maxAmountPosition = 0;
    return;
  }
  if (+position === +window.scrollY) return;
    maxAmountPosition = maxAmountPosition + 1;
    window.scrollTo(0, position);
    await delay(50)
    gotoPointScroll(position);
} 

export function unicArrayFilters (arr){
  let unicArr = arr.reduce((acc, cur, index, array) => {
    if(acc.map[cur.id]) return acc;
    acc.map[cur.id] = true;
    acc.unicArr.push(cur)
    return acc;
  },{
    map: {},
    unicArr: []
  }).unicArr;
  return unicArr;
}

let tempFullValue = [];
let idItems = [];
function mergeValues(data){
  // console.log({data})
  const newData = data.reduce((acc,cur, index, arr) => {
    if(!acc.tempFullValue.length)  {
      acc = {
        ...acc,
        idItems: [...acc.idItems, cur.id],
        tempFullValue: [...acc.tempFullValue, cur]
      }
      return acc
    }
    
    if(!acc.idItems.includes(cur.id)){
      acc = {
        ...acc,
        idItems: [...acc.idItems, cur.id],
        tempFullValue: [...acc.tempFullValue, cur]
      }
    }else{
      acc = {
        ...acc,
        tempFullValue: acc.tempFullValue.map((el) => (el.id === cur.id ? cur : el)),
      };
    }
    
    return acc;
  },{
    idItems,
    tempFullValue
  });
  tempFullValue = newData.tempFullValue;
  idItems = newData.idItems;
  return newData.tempFullValue;
}
export const serialaizersFullFilters = (arr, curFilters) => {
  let options = [];
  if (Array.isArray(arr.results) && arr.results.length) {
    arr.results.map((el) => {
      let status = {};
      if (el?.brand_id) {
        status = {
          status_unit: {
            status: curFilters.unit_models.includes(el.id)
              ? curFilters.unit_models.includes(el.id)
              : el.status_unit.status,
          },
          status_spare: {
            status: curFilters.spare_models.includes(el.id)
              ? curFilters.spare_models.includes(el.id)
              : el.status_spare.status,
          },
        };
      } else if (el?.model_id) {
        status = {
          status_unit: {
            status: curFilters.unit_generations.includes(el.id)
              ? curFilters.unit_generations.includes(el.id)
              : el.status_unit.status,
          },
          status_spare: {
            status: curFilters.spare_generations.includes(el.id)
              ? curFilters.spare_generations.includes(el.id)
              : el.status_spare.status,
          },
        };
      } else {
        status = {
          status_unit: {
            status: curFilters.unit_brands.includes(el.id)
              ? curFilters.unit_brands.includes(el.id)
              : el.status_unit.status,
          },
          status_spare: {
            status: curFilters.spare_brands.includes(el.id)
              ? curFilters.spare_brands.includes(el.id)
              : el.status_spare.status,
          },
        };
      }

      return options.push({
        ...el,
        name: el.name.replace("1_Все", "Выбрать все"),
        status_unit: {
          ...el.status_unit,
          status: status.status_unit.status,
        },
        status_spare: {
          ...el.status_spare,
          status: status.status_spare.status,
        },
      });
    });
  }
  return {
    ...arr,
    results: mergeValues(options),
  };
};
export const serialaizersFilters = (arr, curFilters) => {
  let options = [];
  if (Array.isArray(arr.results) && arr.results.length) {
    arr.results
      .map((el) => {
        let status = {}
        if(el?.brand_id) {
            status = {
              "status_unit": {
                "status": curFilters.unit_models.includes(el.id)? curFilters.unit_models.includes(el.id) : el.status_unit.status ,
              },
              "status_spare": {
                "status": curFilters.spare_models.includes(el.id)? curFilters.spare_models.includes(el.id) : el.status_spare.status,
              }
            }
          }else if(el?.model_id) {
            status = {
              "status_unit": {
                "status": curFilters.unit_generations.includes(el.id)? curFilters.unit_generations.includes(el.id) : el.status_unit.status ,
              },
              "status_spare": {
                "status": curFilters.spare_generations.includes(el.id)? curFilters.spare_generations.includes(el.id) : el.status_spare.status,
              }
            }
          }else{
            status = {
              "status_unit": {
                "status": curFilters.unit_brands.includes(el.id)? curFilters.unit_brands.includes(el.id) : el.status_unit.status ,
              },
              "status_spare": {
                "status": curFilters.spare_brands.includes(el.id)? curFilters.spare_brands.includes(el.id) : el.status_spare.status,
              }
            }
          }

        return options.push({
            ...el,
            name: el.name.replace("1_Все", "Выбрать все"),
            "status_unit": {
              ...el.status_unit,
              "status": status.status_unit.status ,
            },
            "status_spare": {
              ...el.status_spare,
              "status":  status.status_spare.status,
            }
          })
        });
  }
  return {
    ...arr,
    results: options
  };
};

export const getOptionsListPhone = (data) => {

  let options = [];
  if (Array.isArray(data) && data.length) {
    data.map((el) => {
      return options.push({
        title: el,
        value: el || "",
        image: el?.image || "",
        key_value: el?.key_value,
      });
    });
  }
  return options;
};
export const getOptionsPayment = (data) => {
  let options = [];
  if (Array.isArray(data) && data.length) {
    data.map((el) => {
      return options.push({
        title: el.value,
        value: el.value || "",
        image: el?.image || "",
        key_value: el.key_value,
      });
    });
  }
  return options;
};
export const getOptionsPaymentPeriod = (data, access) => {
  let options = [];
  if (Array.isArray(data) && data.length) {
    data.map((el) => {
      console.log({el})
      return options.push({
        title_price: el.price_discount,
        title_old_price: el.price_full,
        title: el.period_name,
        value: el.period_key || "",
        image: el?.image || "",
        key_value: el.period_value,
      });
    });
  }
  return options;
};

export const getCookie = (name) => {
  try {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  } catch (e) {
    return null;
  }
};
export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/;";
};

export const removeCookie = (name) => {
  const CookiesDelete = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const names = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = names + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie =
        names + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  };
  CookiesDelete(name);
};

export const rus_to_latin = (str) => {

  var ru = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya',
    'ъ': 'ie', 'ь': '', 'й': 'i'
  }, n_str = [];

  for (var i = 0; i < str.length; ++i) {
    n_str.push(
      ru[str[i]]
      || ru[str[i].toLowerCase()] == undefined && str[i]
      || ru[str[i].toLowerCase()].replace(/^(.)/, function (match) { return match.toUpperCase() })
    );
  }

  return n_str.join('');
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export const getTitleFilters = (id, options) => {
  if (id === null || id === '') return null;
  if(!isNumeric(id)){
    const res = options && options.filter(el => el.value === id)
    return res[0]?.title;
  }
  const res = options && options.filter(el => +el.id === +id)
  if (res.length) return res[0]?.title;
  return null;
}

export const exclusion = (path) => {

  switch (path) {
    case '':
    return ;
    default:
      return true
  }
}

export const handlerWarningInfoMessageResponse = (dataResponse, dispatch) => {
  if (dataResponse?.error) {
    return false
  }
  if ( 
    dataResponse?.info?.status !== undefined &&
    !dataResponse?.info?.status
  ) {
    dispatch(ACTION_OPEN_MODAL, {
      show: !dataResponse?.info?.status,
      content: dataResponse?.info?.message,
      contentBtn: 'Ок',
      error: !dataResponse?.info?.status,
      path: dataResponse.redirect_status && dataResponse.redirect_url
    })
    // smoothTop();
    return true;
  }
  return false
}
export const handlerAccessResponse = (response, dispatch) => {
  if (response?.error) return false
  const {page_current} = response;
  if (page_current?.show_popup) {
    dispatch(ACTION_OPEN_MODAL, {
      show: page_current?.show_popup,
      content: page_current?.popup_data?.message,
      contentBtn: 'Ок',
      error: !page_current?.show_popup,
      path: page_current.redirect_status && page_current.redirect_data.url
    })
    // smoothTop();
  }
}
export const handlerSharePhone = (response, dispatch) => {

  if (response?.error) return false
  const { status_phone_popup } = response;
  if (status_phone_popup?.show_phone_popup) {
    dispatch(ACTION_OPEN_MODAL, {
      show: status_phone_popup?.show_phone_popup,
      content: status_phone_popup?.text_phone_popup,
      contentBtn: "apply_action",
      contentCancelBtn: "Больше не показывать",
      hideIcon: true,
      actionClickOk: () => {
        openModalShareAuthData(dispatch);
      },
      actionCancelOk: () => {
        dispatch(ACTION_DISMISS_PHONE_NUMBER);
      },
      // error: !status_phone_popup?.show_popup,
    });
    // smoothTop();
  }
}

let tempText = '';
const debounceText = text => {
  if (text === tempText) return;
  tempText = text;
  return text;
}
export const unicalTextForSearch = (text, minWord = 0) => {
  const newText = debounceText(text);
  tempText = "";
  if (newText && newText.length > minWord) {
    return text;
  } else {
    if (text.length === 0 && newText === '') {
      return ''
    }
  }
  return '';
}


export const debounceNew = (fn, timeDelay = 1000) => {
  let fnTimer;
  return (...args) => {
    clearTimeout(fnTimer);
    fnTimer = setTimeout(() => fn(...args), timeDelay);
  };
};

export const goToNavigate = (url, text, dispatch, navigate) => {
  const callback = (status = false, link) => {
    if (!!status) {
      return navigate(link)
    }
    return false;
  }
  dispatch(ACTION_OPEN_MODAL, {
    show: true,
    content: text ?? "Это важно",
    contentBtn: "Ок",
    actionClickOk: (e) => callback(e, url),
    contentCancelBtn: "calncel",
    error: false,
  });
}

export const openModalShareAuthData = (dispatch) => {
  // const callback = (status) => {
    const callbackContact = (status) => {
      if (status) tg.close()
    }

    // if (status) {
      if (compare(tg.version, "6.9")) {
        tg.requestContact(callbackContact)
      } else {
        dispatch(ACTION_CLOSE_MODAL)
        const timer = setTimeout(() => {
          dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: `На данный момент эта функция поддерживается с версии "6.9", у Вас ${tg.version}. Зайдите в ruuum бота(старая версия), нажмите /start и оставьте свой номер телефона`,
            contentBtn: "Оставить через бота",
            actionClickOk: (e) => alert('where redirect?'),
            contentCancelBtn: "calncel",
            actionCancelOk: (e) => dispatch(ACTION_CLOSE_MODAL),
            error: false,
          });
          return () => clearTimeout(timer)
        }, 100)
      }
}

export const openOnlyURl = (link, status = true, isClose = false, time = 500) => {
     if (link.includes("https://youtube")) {
       tg.openLink(link);

       return setTimeout(() => tg.close(), 400);
     }
  if (status) {
    if (isClose) setTimeout(() => tg.close(), time);
    if (isAndroid() || isIos()) {
      tg.openTelegramLink(`${link}`);
      return tg.close();
    }
    if (tg.platform === 'tdesktop') {
      tg.openTelegramLink(`${link}`);
      return
    }
    return window.open(link, '_blank');
  }
  return false;
}

export const openURl = (url, text, dispatch, hideIcon = false) => {
  const callback = (status = false, link) => {
    openOnlyURl(link, status);
  }
  dispatch(ACTION_OPEN_MODAL, {
    show: true,
    content: text,
    contentBtn: "Ок",
    actionClickOk: (e) => callback(e, url),
    contentCancelBtn: "calncel",
    error: false,
    hideIcon: hideIcon,
  });
}

export const goToUp = () => {
  
  // document.querySelector("body").style.setProperty("overflow", "hidden");
  document.querySelector(".goto") &&
  document.querySelector(".goto")?.scrollIntoView({ block: "start", behavior: "smooth" });
  // funcDelay(()=>document.querySelector("body").style.setProperty('overflow', 'auto'),300)
}

export const smoothTop = (ms = 350) =>funcDelay(goToUp(),ms);

export function getDataInfoUserFromArray(info) {
  if (typeof info === 'string') return info;
  return info.map((el, i) => <p key={i}>{el.name}</p>);
}

export function getDataInfoWhereWorkUser(info) {
  console.log(info)
  if (typeof info === 'string') return info;
  const newInfo = info.reduce((acc, cur) => {
    acc += `<a href="${cur.user_url}" target="__blank" style="color: var(--text-color)"> ${cur.user_profile_name}</a> `;
    return acc;
  }, '')

  return newInfo;
  // return info.map((el,i) => <span key={i}>{el.user_profile_name}</span>); 
}

export function checkCurrentCityInListCitys(city, citys, dispatch) {
  // console.log({city, citys });
  for(let {name, title, id, value} of citys){
    if (name?.trim() === city || title?.trim() === city){
      let res_id = id;
      if(id === undefined) res_id = value;
      return { city: true, id: res_id };
    }
  }
  return {city: false, id: null};
}

export default function restrictionLengthText(data, len, dispatch) {
  if (data.length > len) {
    dispatch(ACTION_OPEN_MODAL, {
      show: true,
      content: "Слишком длинное содержание текста, количество символов должно быть " + len,
      contentBtn: "Ок",
      actionClickOk: () => {
        return false;
      },
      error: true,
      icon: "",
    });
    return false;
  }else{
    return true;
  }
};

export function serializeFileList(files){
  let imageSet = [];
  for (const key in files) {
    const file = files[key];
    if (file.url instanceof File) {
      const objectUrl = URL.createObjectURL(file.url);
      let dataFile = {
        ...file,
        id: file.id,
        url: objectUrl,
      };
      imageSet.push(dataFile);
    } else {
      let dataFile = { ...file };
      imageSet.push(dataFile);
    }
  }
  return imageSet;
};

export function unicIteemsJoinArrays(arr1,arr2){
  let listUnicId = Array.from(
      new Set(
        [...arr1, ...serializeFileList(arr2)].map(
          (el) => el.id
        )
      )
  );
  return [
      ...arr1,
      ...serializeFileList(arr2),
    ].reduce((acc, cur, index, arr) => {
      if (listUnicId.includes(cur.id)) {
        listUnicId = listUnicId.filter((el) => el !== cur.id);
        acc = [...acc, cur];
      }
      return acc;
    }, []);
}



export const getListOption = (data) => {
  if (!Array.isArray(data)) return [{
    value: '',
    label: '',
    image: '',
  }];
  const newData = data.map((el) => ({
    value: el.value,
    label: el.title,
    image: el.image,
  }));
  return newData;
}