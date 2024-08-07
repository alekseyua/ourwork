import {
  gotoPointScroll,
  handlerWarningInfoMessageResponse,
  serialaizersFilters,
  serialaizersFullFilters,
  setDataButtonBottonTrigger,
  unicArrayFilters,
} from "../../helpers/helpers";
import {
  API_GET_FILTER,
  API_SET_FILTER,
  DEFAULT_PAGE_SIZE_INCOMING_REQUEST,
} from "../../helpers/config";
import {
  getListPagination,
  getLocaleStore,
  getSessionStore,
  setSessionStore,
} from "../../helpers/utils";
import { ACTION_GET, _INIT, ACTION_POST } from "../api-store/getpage";
import {
  ACTION_OPEN_MODAL,
  ACTION_SET_CONTROLL_BUTTON,
} from "../helpers/helpers-store";
import { ACTION_SET_MESSAGE_ERROR } from "../raiting-review/raiting-review";
import { delay, funcDelay } from "../../helpers/const";

export const SET_TEXT_SEARCH_INCOMING_FILTERS_TEXT =
  "setTextsearchIncominFilters";
export const SET_SEARCH_INTO_INCOMING_FILTERS_NULL =
  "setTextsearchIncominFiltersNull";
export const GET_TEXT_SEARCH_INCOMING_FILTERS = "searchIncominFilters";

export const ACTION_GET_LIST_FILTERS_BY_TYPE = "getListFiltersByType";
export const ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS =
  "setToggleCurrentTabFilters";
export const ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_NULL =
  "setToggleCurrentTabFiltersNull";
export const ACTION_SET_TOGGLE_CURRENT_TAB_LIST = "setToggleCurrentTabList";
export const ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_SERVICE =
  "setToggleCurrentTabFiltersService";
export const ACTION_SET_PREV_PAGE_FILTER = "setPrevPageBrandFilter";
export const ACTION_SET_CURRENT_PAGE_FILTER = "setCurrentPageBrandFilter";
export const ACTION_SET_LIST_CARDS_BY_TYPE_FILTER = "setListCardsByType";
export const ACTION_SET_LIST_CARDS_BY_TYPE_FILTER_NULL =
  "setListCardsByTypeNull";
export const ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER =
  "setListCardsByService";
export const ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER_NULL =
  "setListCardsByServiceNull";
export const ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER =
  "setValueInListOfSelectedFilters";
export const ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL =
  "setValueInListOfSelectedFiltersNull";
export const ACTION_SEND_LIST_SELECT_FILTERS_BY_TYPE = "sendListFiltersByType";
export const ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD = "setResultSelectCard";
export const ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD =
  "setResSelectCardCountry";
export const ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD_NULL =
  "setResSelectCardCountryNull";
export const ACTION_SET_TEMP_FILTER_SERVICE = "setTempIncominFilterService";
export const ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE =
  "saveListFiltersByType";
export const ACTION_SET_TEXT_SEARCH_FILTER_SERVICE =
  "setTextsearchIncominFiltersService";

export const filtersIncominRequest = (store) => {
  store.on(_INIT, () => ({ toggleCurrentTabList: "brands" }));
  store.on(ACTION_SET_TOGGLE_CURRENT_TAB_LIST, (_, data) => ({
    toggleCurrentTabList: data,
  }));

  store.on(_INIT, () => ({ toggleCurrentTabFilters: 0 }));
  store.on(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_NULL, (_, data) => ({
    toggleCurrentTabFilters: 0,
  }));
  store.on(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS, (_, data) => ({
    toggleCurrentTabFilters: data,
  }));

  store.on(_INIT, () => ({ toggleCurrentTabFiltersService: 0 }));
  store.on(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_SERVICE, (_, data) => ({
    toggleCurrentTabFiltersService: data,
  }));

  const initListCardsByType = {
    count: 0,
    results: [],
    current_page: 1,
    unit_spare_0: {
      count: 0,
      results: [],
      current_page: 1,
    },
    unit_spare_1: {
      count: 0,
      results: [],
      current_page: 1,
    },
    unit_spare_2: {
      count: 0,
      results: [],
      current_page: 1,
    },

    truck_: {
      count: 0,
      results: [],
      current_page: 1,
    },
    transport_: {
      count: 0,
      results: [],
      current_page: 1,
    },
    respair_: {
      count: 0,
      results: [],
      current_page: 1,
    },
  };
  store.on(_INIT, () => ({ prevPageBrandFilter: 0 }));
  store.on(ACTION_SET_PREV_PAGE_FILTER, (_, data) => ({
    prevPageBrandFilter: data,
  }));

  store.on(_INIT, () => ({ currentPageBrandFilter: 1 }));
  store.on(ACTION_SET_CURRENT_PAGE_FILTER, (_, data) => ({
    currentPageBrandFilter: data,
  }));

  store.on(_INIT, () => ({ listCardsByType: initListCardsByType }));
  store.on(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, (_, data) => ({
    listCardsByType: { ...data },
  }));
  store.on(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER_NULL, (_, data) => ({
    listCardsByType: initListCardsByType,
  }));

  store.on(_INIT, () => ({ listCardsService: initListCardsByType }));
  store.on(ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER, (_, data) => ({
    listCardsService: { ...data },
  }));
  store.on(ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER_NULL, (_, data) => ({
    listCardsService: initListCardsByType,
  }));
  const initListSelectFilters = {
    unit_brands: [],
    spare_brands: [],
    unit_models: [],
    spare_models: [],
    unit_generations: [],
    spare_generations: [],
    countrys: [],
    citys: [],
    truck: [],
    transport: [],
  };
  const checkListIsValueSelectFilters = (data) => {
    let amountSelectElement = 0;
    for (let key in data) {
      if (!!data[key].length) {
        amountSelectElement = amountSelectElement + 1;
      }
    }
    if (!!amountSelectElement) return true;
    return false;
  };
  store.on(_INIT, () => ({ listOfSelectedFilters: initListSelectFilters }));
  store.on(
    ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL,
    (_, data, { dispatch }) => ({
      listOfSelectedFilters: { ...initListSelectFilters },
    })
  );
  store.on(
    ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER,
    ({ listOfSelectedFilters }, data, { dispatch }) => {
      let isActiveButton = false;
      let newSelectList = {};
      let checkKey2 = data.type;
      if (data?.type === "respair") {
        checkKey2 = data.sub_type;
      }

      for (let key in listOfSelectedFilters) {
        if (key.includes(data.sub_type) && key.includes(checkKey2)) {
          if (listOfSelectedFilters[key].includes(+data.id)) {
            newSelectList = {
              ...listOfSelectedFilters,
              [key]: listOfSelectedFilters[key].filter(
                (el) => +el !== +data.id
              ),
            };
          } else {
            newSelectList = {
              ...listOfSelectedFilters,
              [key]: [...listOfSelectedFilters[key], +data.id],
            };
          }
        }
      }
      let type_page = data.sub_type;

      if (data.sub_type === "unit") type_page = "unit_spare";
      if (data.sub_type === "spare") type_page = "unit_spare";
      if (data?.type === "respair") type_page = data?.type;

      const checkList = checkListIsValueSelectFilters({
        ...listOfSelectedFilters,
        ...newSelectList,
      });

      if (checkList) {
        isActiveButton = true;
      } else {
        isActiveButton = false;
      }
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: isActiveButton,
        action: () => {
          dispatch(ACTION_SEND_LIST_SELECT_FILTERS_BY_TYPE, {
            type: type_page,
            list: checkKey2,
          }); //, checked: data?.checked
        },
      });

      return { listOfSelectedFilters: newSelectList };
    }
  );
  store.on(_INIT, () => ({
    resSelectCard: {
      0: {
        image: "",
        name: "",
        count: 0,
      },
    },
  }));
  store.on(ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD, (_, data) => ({
    resSelectCard: { ...data },
  }));
  const initResSelectCardCountry = {
    0: {
      image: "",
      name: "",
      count: 0,
    },
  };
  store.on(_INIT, () => ({ resSelectCardCountry: initResSelectCardCountry }));
  store.on(
    ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD_NULL,
    (_, data) => ({ resSelectCardCountry: initResSelectCardCountry })
  );
  store.on(ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD, (_, data) => ({
    resSelectCardCountry: { ...data },
  }));

  store.on(_INIT, () => ({ textSearchIncominFilterService: "" }));
  store.on(_INIT, () => ({ tempIncominFilterService: {} }));
  store.on(ACTION_SET_TEMP_FILTER_SERVICE, (_, data) => ({
    tempIncominFilterService: { ...data },
  }));

  store.on(
    ACTION_SET_TEXT_SEARCH_FILTER_SERVICE,
    ({ tempIncominFilterService, callbackSearch }, data, { dispatch }) => {
      let newListCardsByType = {};
      let list = { ...tempIncominFilterService };
      newListCardsByType = {
        ...list,
        results: list.results.filter((el) =>
          el.name.toUpperCase().includes(data.q.toUpperCase())
        ),
      };
      if (typeof callbackSearch === "function") callbackSearch();
      dispatch(
        ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER,
        newListCardsByType
      );
      if (typeof data.callback === "function") data.ACTION_OPEN_MODALcallback();
      return { textSearchIncominFilterService: data.q };
    }
  );

  store.on(_INIT, () => ({ textSearchIncominFilter: "" }));
  store.on(SET_SEARCH_INTO_INCOMING_FILTERS_NULL, (_, data) => ({
    textSearchIncominFilter: "",
  }));
  store.on(SET_TEXT_SEARCH_INCOMING_FILTERS_TEXT, (_, data) => ({
    textSearchIncominFilter: data.q,
  }));

  let controllerAbortSearchFilter = null;
  store.on(
    GET_TEXT_SEARCH_INCOMING_FILTERS,
    (
      {
        toggleCurrentTabFilters,
        listCardsByType,
        textSearchIncominFilter,
        callbackSearch,
        resSelectCard,
      },
      data,
      { dispatch }
    ) => {
      controllerAbortSearchFilter && controllerAbortSearchFilter.abort();
      controllerAbortSearchFilter = new AbortController();
      const { url, text, callback } = data;
      if (url) {
        if (
          typeof textSearchIncominFilter === "string" &&
          textSearchIncominFilter.length !== 0
        ) {
          let params = {
            url,
            q: textSearchIncominFilter,
            page_size: 9999,
            type: data.list.slice(0, -1),
            abortController: controllerAbortSearchFilter,
            dataRequst: (res) => {
              if (res === undefined) return;
              const isWarning = handlerWarningInfoMessageResponse(
                res,
                dispatch
              );
              if (typeof callback === "function") callback();
              if (!res?.count) {
                dispatch(
                  ACTION_SET_MESSAGE_ERROR,
                  "По Вашему запросу ничего не найдено"
                );
              } else {
                dispatch(ACTION_SET_MESSAGE_ERROR, "");
              }
              dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
                ...res,
                ...listCardsByType,
                // ...newResults,
                // results: [...listCardsByType.results, ...newResults.results],
                [`${data.type}_${data.current_tab}`]: {
                  ...listCardsByType[`${data.type}_${data.current_tab}`],
                  ...res,
                  results: unicArrayFilters([...res.results]),
                },
              });
            },
          };
          dispatch(ACTION_GET, params);
        } else {
          dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
            type: data.type,
            page: 1,
            list: data.list,
            current_tab: toggleCurrentTabFilters,
          });
          if (typeof callback === "function") callback();
        }
      } else {
        const resSearch = [
          ...listCardsByType.results.map((el) =>
            el.name.toUpperCase().includes(text.toUpperCase())
              ? { ...el, isHide: false }
              : { ...el, isHide: true }
          ),
        ];
        dispatch(ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD, {
          ...resSelectCard,
          [toggleCurrentTabFilters]: {
            ...resSelectCard[toggleCurrentTabFilters],
            count: resSearch.filter((el) => !el?.isHide).length,
          },
        });
        dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
          ...listCardsByType,
          results: resSearch,
        });
        if (!resSearch.filter((el) => !el?.isHide).length) {
          dispatch(
            ACTION_SET_MESSAGE_ERROR,
            "По Вашему запросу ничего не найдено"
          );
        } else {
          dispatch(ACTION_SET_MESSAGE_ERROR, "");
        }
        if (typeof callback === "function") funcDelay(callback, 500);
      }
      //API_SEARCH_FILTER
    }
  );

  store.on(
    ACTION_GET_LIST_FILTERS_BY_TYPE,
    async (
      {
        currentPageBrandFilter,
        listCardsByType,
        listOfSelectedFilters,
        callbackSearch,
        resSelectCard,
        resSelectCardCountry,
      },
      data,
      { dispatch }
    ) => {
      let isActiveButton = false;
      if (+data.current_tab !== 0) {
        // dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER_NULL);
      }
      let params = {
        blockButtonDisabled: true,
        blockButtonActive: false,
        page_size: data?.page_size ?? DEFAULT_PAGE_SIZE_INCOMING_REQUEST,
        // page: data?.page ?? currentPageBrandFilter,
        page: data?.page ?? getSessionStore("currentPageFilters") ?? 1,
        url: API_GET_FILTER,
        abortController: data?.abortControllerFilter,
        dataRequst: (res) => {
          if (res === undefined) return;
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (typeof data?.callbackSearch === "function")
            data?.callbackSearch();
          const checkList = checkListIsValueSelectFilters({
            ...listOfSelectedFilters,
          });
          if (checkList) {
            isActiveButton = true;
          } else {
            isActiveButton = false;
          }
          dispatch(ACTION_SET_CONTROLL_BUTTON, {
            isActive: isActiveButton,
          });
          if (data.type === "unit_spare") {
            const newResults = serialaizersFilters(res, listOfSelectedFilters);
            dispatch(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS, data.current_tab);
            if (data.current_tab === 0) {
              const fullResults = serialaizersFullFilters(
                res,
                listOfSelectedFilters
              );
              if (data?.autoload) {
                dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
                  ...listCardsByType,
                  [`${data.type}_${data.current_tab}`]: {
                    ...listCardsByType[`${data.type}_${data.current_tab}`],
                    ...fullResults,
                    results: unicArrayFilters([
                      ...listCardsByType[`${data.type}_${data.current_tab}`]
                        .results,
                      ...fullResults.results,
                    ]),
                  },
                });
              } else {
                dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
                  ...listCardsByType,
                  [`${data.type}_${data.current_tab + 1}`]: {
                    count: 0,
                    results: [],
                    current_page: 1,
                  },
                  [`${data.type}_${data.current_tab}`]: {
                    ...listCardsByType[`${data.type}_${data.current_tab}`],
                    ...fullResults,
                    results: unicArrayFilters([...fullResults.results]),
                  },
                });
              }
            }
            if (data.current_tab === 1) {
              dispatch(ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD, {
                ...resSelectCard,
                [data.current_tab]: {
                  ...resSelectCard[data.current_tab],
                  count: res.count,
                },
              });
              dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
                ...listCardsByType,
                // ...newResults,
                [`${data.type}_${data.current_tab + 1}`]: {
                  count: 0,
                  results: [],
                  current_page: 1,
                },
                [`${data.type}_${data.current_tab}`]: {
                  ...listCardsByType[`${data.type}_${data.current_tab}`],
                  ...newResults,
                  results: unicArrayFilters([
                    // ...listCardsByType[`${data.type}_${data.current_tab}`]
                    //   .results,
                    ...newResults.results,
                  ]),
                },
              });
            }
            if (data.current_tab === 2) {
              dispatch(ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD, {
                ...resSelectCard,
                [data.current_tab]: {
                  ...resSelectCard[data.current_tab],
                  count: res.count,
                },
              });
              dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, {
                ...listCardsByType,
                ...newResults,
                [`${data.type}_${data.current_tab}`]: {
                  ...listCardsByType[`${data.type}_${data.current_tab}`],
                  ...newResults,
                  results: unicArrayFilters([
                    // ...listCardsByType[`${data.type}_${data.current_tab}`]
                    //   .results,
                    ...newResults.results,
                  ]),
                },
              });
            }
          }
          if (data.type === "truck") {
            dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, res);
          }
          if (data.type === "transport") {
            dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_FILTER, res);
          }
          if (data.type === "respair") {
            if (data.current_tab === 0) {
            }
            if (data.current_tab === 1) {
              dispatch(ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD, {
                ...resSelectCardCountry,
                [data.current_tab]: {
                  ...resSelectCardCountry[data.current_tab],
                  count: res.count,
                },
              });
            }
            dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER, res);
            dispatch(ACTION_SET_TEMP_FILTER_SERVICE, res);
          }
          if (typeof data?.callback === "function") data?.callback();
        },
        ...data,
      };

      if (data?.list === "models") {
        params = { ...params, brand_id: getLocaleStore("brands") }; //brands', 'models', 'generations
      }
      if (data?.list === "generations") {
        params = { ...params, model_id: getLocaleStore("models") };
      }
      if (data?.list === "citys") {
        params = { ...params, country_id: getLocaleStore("countrys") };
      }
      dispatch(ACTION_GET, params);
    }
  );

  store.on(
    ACTION_SEND_LIST_SELECT_FILTERS_BY_TYPE,
    (
      {
        listOfSelectedFilters,
        listCardsByType,
        toggleCurrentTabList,
        toggleCurrentTabFilters,
      },
      data,
      { dispatch }
    ) => {
      dispatch(ACTION_SET_TEXT_SEARCH_FILTER_SERVICE, { q: "" });
      let params = {
        url: API_SET_FILTER,
        dataRequst: (res) => {
          // dispatch(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_NULL);
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (res?.info?.status !== undefined && res?.info?.status) {
            let options = {
              show: res?.info?.status,
              content: res?.info?.message,
              contentBtn: "Ок",
              error: !res?.info?.status,
              actionClickOk: () => {
                const callback = () => {};

                setTimeout(() => {
                  let params = {
                    type: data.type,
                    list: toggleCurrentTabList,
                    page: 1,
                    current_tab: toggleCurrentTabFilters,
                    callback,
                    page_size:
                      data?.type === "respair"
                        ? 99999
                        : toggleCurrentTabFilters !== 0
                        ? 99999
                        : DEFAULT_PAGE_SIZE_INCOMING_REQUEST,
                  };
                  if (toggleCurrentTabFilters === 0) {
                    const amountPages = Math.round(
                      listCardsByType[`${data?.type}_0`].results.length /
                        DEFAULT_PAGE_SIZE_INCOMING_REQUEST
                    );
                    getListPagination({
                      action: ACTION_GET_LIST_FILTERS_BY_TYPE,
                      amountPages,
                      params,
                      dispatch,
                    });
                  } else {
                    dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, params);
                  }
                }, 300);
                dispatch(ACTION_SET_PREV_PAGE_FILTER, 0);
                dispatch(SET_SEARCH_INTO_INCOMING_FILTERS_NULL);
              },
            };
            if (data?.path) options = { ...options, path: data?.path };
            dispatch(ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL);
            dispatch(ACTION_OPEN_MODAL, options);
            return true;
          } else {
            dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
              type: data.type,
              list: toggleCurrentTabList,
              // list: data.list,
            });
          }
        },
        ...listOfSelectedFilters,
        ...data,
      };
      if (data.type === "truck" || data.type === "transport") {
        params = { ...params, type: data.type };
      }

      dispatch(ACTION_POST, params);
    }
  );

  store.on(
    ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE,
    ({ listCardsByType, listCardsService }, data, { dispatch }) => {
      let newListCardsByType = {};
      let list = {};
      let typeSaveData = "";
      let subType = "";
      if (data?.type === "respair") {
        list = listCardsService;
        typeSaveData = ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER;
        subType = data.sub_type + "s";
      } else {
        list = listCardsByType;
        typeSaveData = ACTION_SET_LIST_CARDS_BY_TYPE_FILTER;
        subType = data.sub_type;
      }
      if (data?.type_screen) {
        newListCardsByType = {
          ...list,
          [`${data.type_screen}_${data.current_tab}`]: {
            ...list[`${data.type_screen}_${data.current_tab}`],
            results: list[
              `${data.type_screen}_${data.current_tab}`
            ].results.reduce((acc, cur) => {
              let newCur = { ...cur };
              if (+data.id === cur.id) {
                newCur = {
                  ...newCur,
                  ["status_" + data.sub_type]: {
                    status: !data.checked,
                    can_change: newCur["status_" + data.sub_type].can_change,
                  },
                };
              }
              acc.push(newCur);
              return acc;
            }, []),
          },
        };
      } else {
        newListCardsByType = {
          ...list,
          results: list.results.reduce((acc, cur) => {
            let newCur = { ...cur };
            if (+data.id === cur.id) {
              newCur = {
                ...newCur,
                ["status_" + data.sub_type]: {
                  status: !data.checked,
                  can_change: newCur["status_" + data.sub_type].can_change,
                },
              };
            }
            acc.push(newCur);
            return acc;
          }, []),
        };
      }

      dispatch(typeSaveData, newListCardsByType);
      dispatch(ACTION_SET_TEMP_FILTER_SERVICE, newListCardsByType);
      dispatch(ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER, {
        id: data.id,
        sub_type: subType,
        type: data.type,
      });
    }
  );
};
