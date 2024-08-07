import e from "cors";
import {
  activeButtonBootomForConfirm,
  checkCurrentCityInListCitys,
  handlerWarningInfoMessageResponse,
  serialaizerEditCard,
  smoothTop,
} from "../../../helpers/helpers";
import {
  API_ENGINES_MARKET,
  API_ENGINES_GET_ONE_CARD_MP,
  API_OPTIONS_LIST_ENGINES,
  listItemsCreateMarketCard,
  API_ENGINES_DELETE_IMAGE_FROM_CARD_MARKET,
  MARKETPLACE_OWN_CARDS,
  API_ENGINES_CHANGE_ONE_CARD_MARKET,
  DEFAULT_PAGE_SIZE_MARKET,
} from "../../../helpers/config";
import {
  ACTION_OPEN_MODAL,
  ACTION_SET_CONTROLL_BUTTON,
  ACTION_SET_CONTROLL_BUTTON_NULL,
} from "../../helpers/helpers-store";
import { getLocaleStore } from "../../../helpers/utils";
import {
  ACTION_DELETE,
  ACTION_GET,
  _INIT,
  postApi,
} from "../../api-store/getpage";

export const ACTION_SET_SELECT_INTO_STORE_MARKET = "setStoreCardMarket";
export const ACTION_SET_VALUES_INTO_STORE_MARKET = "setStoreOptionCardMarket";
export const ACTION_SET_VALUES_INTO_STORE_MARKET_NULL =
  "setStoreOptionCardMPNull";
export const ACTION_RESET_DATA_CARD = "dataResetCardMarket";
export const ACTION_SET_AMOUNT_SELECT_OPTIONS = "setCountOptionMPSave";
export const ACTION_GET_LIST_OPTIONS_MARKET = "getListOptionsMarketPlace";
export const ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE =
  "changeListOptionsMarketPlace";
export const ACTION_GET_DATA_CARD_MARKET = "getDataCardMarket";
export const ACTION_SET_CARD_DATA_MARKET = "setCardDataMarket";
export const ACTION_SET_CARD_DATA_MARKET_NULL = "setCardDataMarketNull";
export const ACTION_DELETE_IMAGE_FROM_CARD_MARKET = "deleteImageMarket";

// export const ACTION_CHANGE_DATA_CARD_MARKET_INTO_STORE = 'changeDataCardMarketPlace';
export const ACTION_SEND_DATA_CARD_MARKET = "sendDataCardMarketPlace";
export const ACTION_CHANGE_DATA_CARD_MARKET = "changeDataCardMarketPlace";

export const createCardMarketPlace = (store) => {
  const initMarket = {
    types: [],
    brands: [],
    models: [],
    countrys: [],
    generations: [],
  };
  store.on(_INIT, () => ({ storeCardMP: initMarket }));
  store.on(ACTION_SET_SELECT_INTO_STORE_MARKET, ({ _ }, data) => ({
    storeCardMP: { ...data },
  }));

  const initOptionCardMP = {
    id: null,
    title: "",
    country_id: "",
    city_id: "",
    brand_id: "",
    model_id: "",
    generation_id: "",
    category_id: "",
    price: "",
    oem: "",
    condition: "",
    count: "",
    description: "",
    phone: "",
    address: "",
    link: "",
    city_view: false,
    city: "",
    brand: "",
    model: "",
    generation: "",
    image_urls: [], // ????
    image: [],
    user_data: {},
    is_favorite: false,
  };
  const initDataCard = {
    title: "",
    country_id: "",
    city_id: "",
    brand_id: "",
    model_id: "",
    generation_id: "",
    category_id: "",
    price: "",
    oem: "",
    condition: "",
    count: "",
    description: "",
    phone: "",
    address: "",
    link: "",
    image: [],
  };
  const initCountOptionMPSave = 0;

  store.on(_INIT, () => ({ cardData: {} }));
  store.on(ACTION_SET_CARD_DATA_MARKET_NULL, () => ({ cardData: {} }));
  store.on(ACTION_SET_CARD_DATA_MARKET, ({ cardData }, data, { dispatch }) => {
    let params = { ...cardData, ...data };
    return { cardData: params };
  });
  store.on(_INIT, () => ({ storeOptionCardMP: initOptionCardMP }));
  store.on(ACTION_SET_VALUES_INTO_STORE_MARKET_NULL, () => ({
    storeOptionCardMP: initOptionCardMP,
  }));
  store.on(
    ACTION_SET_VALUES_INTO_STORE_MARKET,
    ({ storeOptionCardMP }, data) => ({
      storeOptionCardMP: { ...storeOptionCardMP, ...data },
    })
  );
  store.on(ACTION_RESET_DATA_CARD, (_, data, { dispatch }) =>
    dispatch(ACTION_SET_AMOUNT_SELECT_OPTIONS, initCountOptionMPSave)
  );
  store.on(
    ACTION_GET_LIST_OPTIONS_MARKET,
    async ({ storeCardMP }, data, { dispatch }) => {
      try {
        const key = data?.key;
        const id = data?.id;
        // const brand_id = data?.brand_id;
        let url = `${API_OPTIONS_LIST_ENGINES}${key}/`;
        let params = {
          url: url,
          setIsLoading: (status) => {},
          dataRequst: (res) => {
            if (res === undefined) return;
            const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
            if (isWarning) return;
            if (typeof data?.callback === "function") data.callback();
            return dispatch(ACTION_SET_SELECT_INTO_STORE_MARKET, {
              ...storeCardMP,
              [key]: res[key]?.slice(),
            });
          },
          ...data,
        };

        if (id) {
          if (key === "models") {
            params = { ...params, brand_id: id };
          }
          if (key === "generations") {
            params = { ...params, model_id: id };
          }
          if (key === "citys") {
            params = { ...params, country_id: id };
          }
        }

        dispatch(ACTION_GET, params);
      } catch (err) {
        throw err;
      }
    }
  );
  store.on(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE,
    ({ storeOptionCardMP, storeCardMP }, data, { dispatch }) => {
      const key = data?.key;
      const value = data?.value;
      const type = data?.type;
      // if(key === 'city_id'){
      //   if(!+value) return
      // }
      // price don`t be zero
      if(key === 'price' && value === "0"){
        console.log(key, 'Error zero', value)
      }
      if (key === null) {
        for (let typeq of listItemsCreateMarketCard) {
          let clearElements = {};
          if (type === typeq.type) {
            for (let key of typeq.section) {
              clearElements = {
                ...clearElements,
                [key.key]: initDataCard[key.key],
              };
            }
            return dispatch(ACTION_SET_CARD_DATA_MARKET, clearElements);
          }
        }
        dispatch(ACTION_SET_CARD_DATA_MARKET_NULL);
        return dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET_NULL);
      }

      let param = {};
      let getOptionslist = "";
      for (const key in storeOptionCardMP) {
        param = {
          ...param,
          [key]: storeOptionCardMP[key],
        };
      }

      if (key === "brand_id") {
        param = {
          ...param,
          model: null,
          generation: null,
          model_id: "",
          generation_id: "",
        };
        getOptionslist = "models";
      }
      if (key === "country_id") {
        param = { ...param, city: null, city_id: "" };
        getOptionslist = "citys";
      }
      if (key === "model_id") {
        param = { ...param, generation: null, generation_id: "" };
        getOptionslist = "generations";
      }

      dispatch(ACTION_SET_CARD_DATA_MARKET, { [key]: value });
      if (typeof value === "string" && value.length === 0) {
        return dispatch(ACTION_SET_CONTROLL_BUTTON, {
          isActive: false,
        });
      }
      param = {
        ...param,
        [key]: value,
      };
      const newData = { ...param };
      console.log({ city_id: param.city_id });
      delete newData["handlerSendData"];
      dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET, {
        ...storeOptionCardMP,
        ...newData,
      });

      const isActiveButton = activeButtonBootomForConfirm(
        { ...newData },
        data.action
      );
      if (isActiveButton) {
        console.log(
          "data?.action",
          data?.action,
          " - ",
          data?.action === "create-card"
        );
        dispatch(ACTION_SET_CONTROLL_BUTTON, {
          isActive: true,
          action: () => {
            if (data?.action === "edit-card") {
              dispatch(ACTION_SET_CONTROLL_BUTTON, {
                isFetch: true,
                isActive: false,
              });
              dispatch(ACTION_CHANGE_DATA_CARD_MARKET, {
                engine_id: getLocaleStore("id_card_mp"),
                path: MARKETPLACE_OWN_CARDS,
              });
            } else if (data?.action === "create-card") {
              dispatch(ACTION_SET_CONTROLL_BUTTON, {
                isFetch: true,
                isActive: false,
              });
              dispatch(ACTION_SEND_DATA_CARD_MARKET, {
                path: MARKETPLACE_OWN_CARDS,
              });
            }
          },
        });
      }
      if (getOptionslist) {
        dispatch(ACTION_GET_LIST_OPTIONS_MARKET, {
          key: getOptionslist,
          id: value,
        });
      }
    }
  );

  store.on(
    ACTION_CHANGE_DATA_CARD_MARKET,
    async ({ cardData }, data = {}, { dispatch }) => {
      try {
        const url = API_ENGINES_CHANGE_ONE_CARD_MARKET;
        const parms = {
          ...cardData,
          ...data,
        };
        const res = await postApi(url, parms);
        if (res?.info?.status !== undefined && res?.info?.status !== null) {
          let options = {
            show: res?.info?.status,
            content: res?.info?.message,
            contentBtn: "Ок",
            error: !res?.info?.status,
            actionClickOk: () => {
              setTimeout(() => smoothTop(), 300);
              dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, {
                key: null,
                value: null,
              });
              dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: false });
              return dispatch(ACTION_SET_CONTROLL_BUTTON_NULL);
            },
          };
          if (data?.path) options = { ...options, path: data?.path };
          dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, {
            key: null,
            value: null,
          });
          dispatch(ACTION_OPEN_MODAL, options);
        }
      } catch (error) {
        throw error;
      }
    }
  );
  store.on(
    ACTION_SEND_DATA_CARD_MARKET,
    async ({ cardData }, data = {}, { dispatch }) => {
      try {
        const url = API_ENGINES_MARKET;
        const parms = {
          ...cardData,
          ...data,
        };
        const res = await postApi(url, parms);
        if (res?.info?.status !== undefined && res?.info?.status) {
          let options = {
            show: res?.info?.status,
            content: res?.info?.message,
            contentBtn: "Ок",
            error: !res?.info?.status,
            actionClickOk: () => {
              setTimeout(() => smoothTop(), 300);
              dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, {
                key: null,
                value: null,
              });
              dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: false });
              return dispatch(ACTION_SET_CONTROLL_BUTTON_NULL);
            },
          };
          if (data?.path) options = { ...options, path: data?.path };
          dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, {
            key: null,
            value: null,
          });
          dispatch(ACTION_OPEN_MODAL, options);
        }
      } catch (error) {
        const text_error = "возникла сетевая ошибка, попробуйте позже";
        throw error;
      }
    }
  );

  store.on(ACTION_GET_DATA_CARD_MARKET, (_, data, { dispatch }) => {
    const page = data?.page;
    const pageSize = data?.page_size;

    const params = {
      url: API_ENGINES_GET_ONE_CARD_MP, //
      page: page ?? process.env.REACT_APP_DEFAULT_PAGE,
      page_size: pageSize ?? DEFAULT_PAGE_SIZE_MARKET,
      engine_id: data?.engine_id ?? getLocaleStore("id_card_mp") ?? undefined,
      ...data,
      dataRequst: (res) => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return data.callback();
        let newRes = res;
        if (data?.type === "edit") {
          newRes = serialaizerEditCard(res);
        }
        let newObj = {};
        for (const key in newRes) {
          if (initOptionCardMP.hasOwnProperty(key)) {
            newObj = { ...newObj, [key]: newRes[key] };
          }
        }
        dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET, newObj);
      },
    };
    dispatch(ACTION_GET, params);
  });
  store.on(ACTION_DELETE_IMAGE_FROM_CARD_MARKET, (_, data, { dispatch }) => {
    try {
      const params = {
        url: API_ENGINES_DELETE_IMAGE_FROM_CARD_MARKET,
        dataRequst: (res) => {
          if (res === undefined) return;
          if (typeof data?.callback === "function") data?.callback(res);
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (!isWarning)
            return dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET, {
              image_urls: res.image_urls,
            });
        },
        ...data,
      };
      dispatch(ACTION_DELETE, params);
      return;
    } catch (error) {
      console.log(error);
    }
  });
};
