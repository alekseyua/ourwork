import { handlerWarningInfoMessageResponse } from "../../helpers/helpers";
import { ACTION_GET, _INIT, ACTION_POST } from "../api-store/getpage";
import {
  ACTION_SET_MESSAGE_ERROR,
  ACTION_SET_MESSAGE_ERROR_NULL,
} from "../raiting-review/raiting-review";
import { ACTION_SET_OPTIONS_MARKET } from "./filtermarketplace/filtermarketplace";
import { setLocaleStore, setSessionStore } from "../../helpers/utils";
import { funcDelay } from "../../helpers/const";

export const ACTION_SET_SEARCH_OWN_CARDS = "setSearchMyMPText";
export const ACTION_GET_LIST_OWN_CARDS = "getMyListMarketPlace";

export const ACTION_GET_LIST_CARDS_MARKET = "getListMarketPlace";
export const ACTION_GET_LIST_MY_CARDS_MARKET = "getListMarketPlaceFavorite*";
export const ACTION_SET_LIST_CARDS_MARKET = "setMainListMarket*";

export const ACTION_SET_TEXT_SEARCH_MARKET_CARDS = "setTextInputMarketSearch";
export const ACTION_RESET_TEXT_SEARCH_MARKET_CARDS = "setTextInputMarketSearchNull";

export const ACTION_SET_CURRENT_PAGE_MARKET = "setCurrentPageMarket";
export const ACTION_RESET_CURRENT_PAGE_MARKET = "resetCurrentPageMarket";

export const marketplace = (store) => {
  let controllerAbort;
  store.on(_INIT, () => ({ textInputMarketSearch: "" }));
  store.on(ACTION_RESET_TEXT_SEARCH_MARKET_CARDS, (_, data) => ({ textInputMarketSearch: "", }));
  store.on(
    ACTION_SET_TEXT_SEARCH_MARKET_CARDS,
    ({ optionMP }, data, { dispatch }) => {
      setSessionStore("savePlaceLastLocationOpenCardMarket", true);
      dispatch(ACTION_RESET_CURRENT_PAGE_MARKET);
      dispatch(ACTION_SET_OPTIONS_MARKET, { ...optionMP, q: data.q });
      return { textInputMarketSearch: data.q };
    }
  );
  
  store.on(
    ACTION_SET_SEARCH_OWN_CARDS,
    ({ textInputMarketSearch }, data, { dispatch }) => {
      dispatch(ACTION_GET_LIST_OWN_CARDS, {
        q: textInputMarketSearch,
        callback: data?.callback,
      });
    }
  );

  const initMarketCurrentPage = 1;
  store.on(_INIT, () => ({ marketCurrentPage: initMarketCurrentPage }));
  store.on(ACTION_SET_CURRENT_PAGE_MARKET, ({ _ }, data) => ({
    marketCurrentPage: data,
  }));
  store.on(ACTION_RESET_CURRENT_PAGE_MARKET, ({ _ }, data) => ({
    marketCurrentPage: initMarketCurrentPage,
  }));

  let controllerSearch = null;

  store.on(ACTION_GET_LIST_OWN_CARDS, async ({ textInputMarketSearch }, data, { dispatch }) => {
    controllerSearch && controllerSearch?.abort();
    controllerSearch = new AbortController();
    const page = data?.page ?? 1;
    const params = {
      url: API_GET_LIST_MY_CARDS_MARKETPLACE,
      // my_ads: true,
      page: page,
      page_size: DEFAULT_PAGE_SIZE_MARKET,
      abortController: controllerSearch,
      ...data,
      dataRequst: (res) => {
        dispatch(ACTION_SET_CURRENT_PAGE_MARKET, data?.page ?? 1);
        if (res === undefined) return;
        if (!res.count && textInputMarketSearch.length) {
          dispatch(
            ACTION_SET_MESSAGE_ERROR,
            "По Вашему запросу ничего не найдено"
          );
        } else {
          dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
        }
        if (typeof data?.callback === "function") data.callback();
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        return dispatch(ACTION_SET_CARDS_MY_MARKET, res);
      },
    };
    dispatch(ACTION_GET, params)
  })

  const initMainListMP = {
    count: 0,
    results: [],
    current_page: 1,
  };

  store.on(_INIT, () => ({ mainListMP: initMainListMP }));
  store.on(ACTION_SET_LIST_CARDS_MARKET, ({ _ }, data) => ({
    mainListMP: { ...data },
  }));

  const initMainListMPIsLoading = false;
  store.on(_INIT, () => ({ mainListMPIsLoading: initMainListMPIsLoading }));
  store.on("setMainListMPIsLoading", ({ _ }, data) => ({
    mainListMPIsLoading: data,
  }));
  store.on(
    "getListMarketPlaceDownloadAutoPagination",
    ({ mainListMP, optionMP }, data, { dispatch }) => {
      dispatch("setMainListMPIsLoading", true);
      const page = data?.page;
      const pageSize = data?.page_size;
      let params = {
        url: API_ENGINES_MARKET,
        page: page ?? process.env.REACT_APP_DEFAULT_PAGE,
        page_size: pageSize ?? DEFAULT_PAGE_SIZE_MARKET,
        ...data,
        setIsLoading: (status) => {
          dispatch("setMainListMPIsLoading", status);
        },
        dataRequst: (res) => {
          if (res.result === undefined) return;
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;

          data?.callback && data?.callback(true);
          return dispatch(ACTION_SET_LIST_CARDS_MARKET, {
            ...mainListMP,
            ...res.result,
            count: res.result.count,
            results: [...mainListMP.results, ...res.result.results],
          });
        },
      };
      params = { ...params };
      delete params["count"];
      dispatch(ACTION_GET, params);
    }
  );

  const initFavoriteMPIsLoading = {
    loading: false,
  };
  store.on(_INIT, () => ({ favoriteMPIsLoading: initFavoriteMPIsLoading }));
  store.on("setFavoriteMPIsLoading", ({ _ }, data) => ({
    favoriteMPIsLoading: data,
  }));

  const initFavoriteMP = {
    count: 0,
    results: [],
    current_page: 1,
  };
  store.on(_INIT, () => ({ favoriteMPCards: initFavoriteMP }));
  store.on("setFavoriteMP", ({ _ }, data) => ({
    favoriteMPCards: { ...data },
  }));

  store.on(_INIT, () => ({
    storeMP: {
      isLoading: {
        loadingMainList: false,
        loadingFavoriteList: false,
        loadingFilters: false,
      },
      mainList: {
        count: 0,
        results: [],
        current_page: 1,
      },

      favoriteMPCards: {
        // delete
        count: 0,
        results: [],
        current_page: 1,
      },

      filters: {
        listOptions: {
          brands: [],
          models: [],
          generations: [],
          countrys: [],
          lowHigh: [
            {
              id: 1,
              name: "Цена (по возрастанию)",
              key: "order_by_low_price",
            },
            {
              id: 2,
              name: "Цена (по убыванию)",
              key: "order_by_high_price",
            },
          ],
        },
        option: {
          brands: null, // Brand(id)
          citys: null, // City (id)
          countrys: null,
          models: null, // Model(id)
          generations: null, // Generation (id)
          count: 0,
          lowHigh: "order_by_low_price",
        },
      },
      optionsAddCards: {
        listOptions: {
          countrys: [],

          brands: [],
          models: [],
          generations: [],

          types: [],
        },
        option: {
          countrys: null,
          citys: null, // City (id)

          brands: null, // Brand(id)
          models: null, // Model(id)
          generations: null, // Generation (id)

          type: null,

          price: 0,
          oem: "",
          condition: "",
          count: 1,
          description: "",
          phone: "",
          address: "",
          image_urls: [],
          uploadImages: [],
        },
      },
    },
  }));

  store.on("setStateMP", ({ _ }, data) => ({ storeMP: { ...data } }));

  store.on(
    "removeFavoriteMPCards",
    ({ favoriteMPCards }, data, { dispatch }) => {
      const params = {
        url: API_ENGINES_ADD_FAVORITE,
        engine_id: data.id_card,
        status: !data.status,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;

          return dispatch("setFavoriteMP", {
            ...favoriteMPCards,
            count: favoriteMPCards.count - 1,
            results: favoriteMPCards.results.filter(
              (el) => +el.id !== +data.id_card
            ),
          });
        },

        redirectTo: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(dispatch);
          if (isWarning) return;
        },
      };
      dispatch(ACTION_POST, params);
    }
  );

  store.on(
    "togglefavoriteMPCards",
    (
      { storeMP, myMarketplace, mainListMP, favoriteMPCards },
      data,
      { dispatch }
    ) => {
      const params = {
        url: API_ENGINES_ADD_FAVORITE,
        engine_id: data.id_card,
        status: !data.status,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          dispatch(ACTION_SET_LIST_CARDS_MARKET, {
            ...mainListMP,
            results:
              mainListMP.results &&
              mainListMP.results.map((el) =>
                el.id === data.id_card
                  ? { ...el, is_favorite: !data.status }
                  : el
              ),
          });

          dispatch(ACTION_SET_CARDS_MY_MARKET, {
            ...myMarketplace,
            results:
              myMarketplace?.results &&
              myMarketplace.results.map((el) =>
                el.id === data.id_card
                  ? { ...el, is_favorite: !data.status }
                  : el
              ),
          });

          dispatch("setFavoriteMP", {
            ...favoriteMPCards,
            results: [
              ...favoriteMPCards.results.map((el) =>
                el.id === data.id_card
                  ? { ...el, is_favorite: !data.status }
                  : el
              ),
            ],
          });
          dispatch("setStateMP", {
            ...storeMP,
            mainList: {
              ...storeMP.mainList,
              results: storeMP.mainList.results.map((el) =>
                el.id === data.id_card
                  ? { ...el, is_favorite: !data.status }
                  : el
              ),
            },
          });
          dispatch(ACTION_GET_LIST_MY_CARDS_MARKET, {
            filter_by_favorite: true,
          });
          if (typeof data?.callback === "function") data?.callback();
          return;
        },
        redirectTo: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(dispatch);
          if (isWarning) return;
        },
      };
      dispatch(ACTION_POST, params);
    }
  );

  // *******************************************************************************

  store.on(_INIT, () => ({ callbackSearch: () => {} }));
  store.on("setCallabckSearch", (_, data) => ({ callbackSearch: data }));

  store.on(
    ACTION_GET_LIST_CARDS_MARKET,
    async (
      {
        mainListMP,
        marketCurrentPage,
        callbackSearch,
        textInputMarketSearch = "",
        optionMP,
      },
      data,
      { dispatch }
    ) => {
      try {
        // getLocaleStore(MARKET_PAGE_CATALOG)
        // setLocaleStore(MARKET_PAGE_CATALOG, page)
        //
        controllerAbort && controllerAbort?.abort();
        controllerAbort = new AbortController();
        const page = data?.page;
        dispatch(ACTION_SET_AMOUNT_SELECT_OPTIONS, optionMP);
        let params = {
          url: API_ENGINES_MARKET,
          page: page ?? marketCurrentPage ?? 1,
          q: textInputMarketSearch,
          page_size: DEFAULT_PAGE_SIZE_MARKET,
          abortController: controllerAbort,
          dataRequst: (res) => {
            console.log("%cREQUEST DATA MARKETPLACE GOOD DISPATCH ", "color:yellow");
            setLocaleStore("loadDataMarket", false);
            // document.querySelector('#search-1') && document.querySelector('#search-1').blur() // удаляет фокус с поиска
            if (res === undefined) return;
            const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
            if (isWarning) return;
            if (typeof callbackSearch === "function") callbackSearch();
            // data?.q && goToUp();
            dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
            if (textInputMarketSearch.length) {
              if (!res.count) {
                funcDelay(
                  () =>
                    dispatch(
                      ACTION_SET_MESSAGE_ERROR,
                      "По Вашему запросу ничего не найдено"
                    ),
                  300
                );
              } else {
                dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
              }
            }
            if (typeof data?.callback === "function") data.callback();
            page && dispatch(ACTION_SET_CURRENT_PAGE_MARKET, page);
            return dispatch(ACTION_SET_LIST_CARDS_MARKET, {
              ...mainListMP,
              ...res,
            });
          },
          ...optionMP,
          ...data,
        };

        delete params["count"];
        delete params["optinsFastFilter"];
        delete params["all"];
        console.log("%cREQUEST DATA MARKETPLACE 1", "color:green");
        setLocaleStore('loadDataMarket', true)
        dispatch(ACTION_GET, params);
      } catch (error) {
        console.log({ error });
      }
    }
  );

  let controllerAbortMyCard = null;
  store.on(ACTION_GET_LIST_MY_CARDS_MARKET, (_, data, { dispatch }) => {
    controllerAbortMyCard && controllerAbortMyCard?.abort();
    controllerAbortMyCard = new AbortController();

    const page = data?.page;
    const pageSize = data?.page_size;
    let params = {
      url: API_ENGINES_MARKET,
      page: page ?? 1,
      abortController: controllerAbortMyCard,
      page_size: pageSize ?? DEFAULT_PAGE_SIZE_MARKET,
      dataRequst: (res) => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        return dispatch("setFavoriteMP", res);
      },
      ...data,
    };
    dispatch(ACTION_GET, params);
  });
};
