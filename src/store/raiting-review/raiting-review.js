import {
  activeButtonBootomForConfirm,
  getOptions,
  handlerWarningInfoMessageResponse,
} from "../../helpers/helpers";
import {
  API_CREATE_RAITING,
  API_GET_ALL_GARANT_MEMBERS,
  API_GET_ALL_RAITINGS,
  API_GET_USER_FEEDBACK,
  API_GET_USER_FULL_DETAIL_INFO,
  API_GET_USER_RAITING,
  API_GET_LIST_CITIES_WARRANT_MEMBER,
  API_TOP_RAITING,
  DEFAULT_PAGE_SIZE,
  ID_USER_FOR_REVIEW,
  LAST_PATH_SEND_REVIEW,
  API_GET_CITY_MEMBERS,
  USERNAME,
  API_CREATE_UPDATE_REPLY_RAITING,
  TYPE_REVIEW,
  API_GET_USER_FEEDBACK_RECIEVE,
  API_GET_USER_FEEDBACK_LEFT,
  API_DELETE_USER_FEEDBACK_LEFT,
  LASTURL,
  PREVURL,
} from "../../helpers/config";
import {
  getLocaleStore,
  getSessionStore,
  setLocaleStore,
} from "../../helpers/utils";
import { chatCheck } from "../../images";
import { ACTION_GET, _INIT, ACTION_POST, ACTION_DELETE } from "../api-store/getpage";
import {
  ACTION_OPEN_MODAL,
  ACTION_SET_CONTROLL_BUTTON,
} from "../helpers/helpers-store";

export const ACTION_SET_SEARCH_TEXT_FILTER = "setSearchTextReview";
export const ACTION_GET_SEARCH_TEXT_REVIEW = "getSearchTextReview";
export const ACTION_GET_TOP_REVIEW = "getTopReview";
export const ACTION_GET_ALL_RAITING_AND_REVIEW = "getListAllRaitingAndReview";
export const ACTION_SET_MESSAGE_ERROR = "setSearchTextReviewError";
export const ACTION_SET_MESSAGE_ERROR_NULL = "setSearchTextReviewErrorNull";
export const ACTION_SET_RAITING_AND_REVIEW = "setRaitingAndReview";
export const ACTION_SET_RAITING_AND_REVIEW_NULL = "setRaitingAndReviewNull";
export const ACTION_SET_INFO_ABOUT_REIVEW = "setInfoAboutUserReview";
export const ACTION_GET_REVIEWS_FOR_FULL_INFO_USER = "getReviewsForFullInfoUser";
export const ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE = "getReviewsForFullInfoUserRecieve";
export const ACTION_DELETE_REVIEWS = "delReviews";
export const ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW =
  "setInfoAboutUserListReview";
export const ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW_NULL =
  "ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW_NULL";
export const ACTION_GET_FULL_INFO_USER = "getFullInfoUser";
export const ACTION_SET_VALUES_REVIEW = "setValuesReview";
export const ACTION_SET_VALUES_REVIEW_NULL = "setValuesReviewNull";
export const ACTION_CREATE_RAITING = "createRaitingApi";
export const ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS =
  "setListCardsForWarrantlyMemners";
export const ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS =
  "getListCardsForWarrantlyMemners";
export const ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS =
  "getAllListCardsForWarrantlyMemners";
export const ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS_NULL =
  "setListCardsForWarrantlyMemnersNull";
export const ACTION_SET_LIST_CITIES_WARRANTLY_MEMBERS =
  "setListCitiesWarrantlyMembers";
export const ACTION_GET_LIST_CITIES_WARRANTLY_MEMBERS =
  "getListCitiesWarrantlyForMembers";
export const ACTION_SEND_FEEDBACK_MY_REVIEW = "SEND_FEEDBACK_MY_REVIEW";
export const ACTION_SET_FEEDBACK_MY_REVIEW_STORE =
  "SET_FEEDBACK_MY_REVIEW_STORE";
export const ACTION_SET_FEEDBACK_MY_REVIEW_STORE_NULL =
  "SET_FEEDBACK_MY_REVIEW_STORE_NULL";

export const raitingReview = (store) => {
  store.on(_INIT, () => ({
    textMyFeedbackStore: {
      id: null,
      text: "",
    },
  }));
  store.on(ACTION_SET_FEEDBACK_MY_REVIEW_STORE, (_, data) => ({
    textMyFeedbackStore: {
      id: data.id,
      text: data.text,
    },
  }));
  store.on(ACTION_DELETE_REVIEWS, (_, data, { dispatch }) => {
    const url = API_DELETE_USER_FEEDBACK_LEFT;
    const params = {
      url,
      feedback_id: data.id,
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        // chatCheck
        let options = {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: "Ок",
          error: !res?.info?.status,
          icon: chatCheck,
          actionClickOk: () => {
            dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE, {
              type: getSessionStore(TYPE_REVIEW),
              user_id: getLocaleStore(ID_USER_FOR_REVIEW),
            });
          }
        };
        if (data?.path) options = { ...options, path: data?.path };
        dispatch(ACTION_OPEN_MODAL, options);
        // dispatch(ACTION_SET_FEEDBACK_MY_REVIEW_STORE_NULL);
      },
    };
    dispatch(ACTION_DELETE, params);
  });
  store.on(ACTION_SET_FEEDBACK_MY_REVIEW_STORE_NULL, (_, data) => ({
    textMyFeedbackStore: {
      id: null,
      text: "",
    },
  }));
  store.on(
    ACTION_SEND_FEEDBACK_MY_REVIEW,
    ({ textMyFeedbackStore }, data, { dispatch }) => {
      if (!textMyFeedbackStore.text) {
        return dispatch(ACTION_OPEN_MODAL, {
          show: true,
          content: "Вы не ввели текст",
        });
      }
      const params = {
        text: textMyFeedbackStore.text,
        url: API_CREATE_UPDATE_REPLY_RAITING,
        feedback_id: data.id,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          // chatCheck
          let options = {
            show: res?.info?.status,
            content: res?.info?.message,
            contentBtn: "Ок",
            error: !res?.info?.status,
            icon: chatCheck,
          };
          if (data?.path) options = { ...options, path: data?.path };
          dispatch(ACTION_OPEN_MODAL, options);
          dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, {
            type: getSessionStore(TYPE_REVIEW),
            user_id: getLocaleStore(ID_USER_FOR_REVIEW),
          });
          dispatch(ACTION_SET_FEEDBACK_MY_REVIEW_STORE_NULL);
        },
      };
      dispatch(ACTION_POST, params);
    }
  );

  const initReiting = {
    username: "",
    text: "",
    rating: 0,
  };
  store.on(_INIT, () => ({
    valuesReview: { ...initReiting, username: getLocaleStore(USERNAME) },
  }));
  store.on(ACTION_SET_VALUES_REVIEW_NULL, (_, data) => ({
    valuesReview: initReiting,
  }));
  store.on(ACTION_SET_VALUES_REVIEW, ({ valuesReview }, data, { dispatch }) => {
    const newValuesStore = {
      ...valuesReview,
      username: getLocaleStore(USERNAME),
      recipient_id: getLocaleStore('recipient_id'),
      ...data,
    };
    const isActiveButton = activeButtonBootomForConfirm(
      { ...newValuesStore },
      "review"
    );
    if (isActiveButton) {
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: true,
        action: () => {
          dispatch(ACTION_CREATE_RAITING, {
            ...newValuesStore,
            path: getLocaleStore(PREVURL),
          });
        },
      });
    }
    return { valuesReview: { ...newValuesStore } };
  });

  store.on(ACTION_CREATE_RAITING, (_, data, { dispatch }) => {
    const params = {
      url: API_CREATE_RAITING,
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        // chatCheck
        let options = {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: "Ок",
          error: !res?.info?.status,
          icon: chatCheck,
        };
        if (data?.path) options = { ...options, path: data?.path };
        dispatch(ACTION_OPEN_MODAL, options);
        dispatch(ACTION_SET_VALUES_REVIEW_NULL);
      },
      ...data,
    };
    dispatch(ACTION_POST, params);
  });

  store.on(
    ACTION_GET_ALL_RAITING_AND_REVIEW,
    ({ callbackSearch }, data, { dispatch }) => {
      const params = {
        url: API_GET_ALL_RAITINGS,
        page_id: 6,
        page: data?.page ?? 1,
        page_size: DEFAULT_PAGE_SIZE,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (typeof callbackSearch === "function") callbackSearch();
          dispatch(ACTION_SET_RAITING_AND_REVIEW, res);
        },
      };
      dispatch(ACTION_GET, params);
    }
  );
  const initListRaitinAndReview = {
    count: 0,
    results: [],
  };
  store.on(_INIT, () => ({ listRaitingAndReview: initListRaitinAndReview }));
  store.on(ACTION_SET_RAITING_AND_REVIEW_NULL, () => ({
    listRaitingAndReview: initListRaitinAndReview,
  }));
  store.on(ACTION_SET_RAITING_AND_REVIEW, ({ callbackSearch }, data) => ({
    listRaitingAndReview: { ...data },
  }));

  store.on(_INIT, () => ({ textSearchReview: "" }));
  store.on(ACTION_SET_SEARCH_TEXT_FILTER, (_, data, { dispatch }) => {
    if (data.q === "") {
      dispatch(ACTION_SET_RAITING_AND_REVIEW_NULL);
      return { textSearchReview: data.q };
    }
    return { textSearchReview: data.q };
  });

  store.on(_INIT, () => ({ textSearchError: "" }));
  store.on(ACTION_SET_MESSAGE_ERROR_NULL, (_, data) => ({
    textSearchError: "",
  }));
  store.on(ACTION_SET_MESSAGE_ERROR, (_, data) => ({ textSearchError: data }));

  let controllerSearch = null;
  store.on(
    ACTION_GET_SEARCH_TEXT_REVIEW,
    ({ textSearchReview, callbackSearch }, data, { dispatch }) => {
      controllerSearch && controllerSearch?.abort();
      controllerSearch = new AbortController();
      const params = {
        page: data?.page ?? 1,
        page_size: DEFAULT_PAGE_SIZE,
        url: API_GET_USER_RAITING,
        username: textSearchReview,
        abortController: controllerSearch,
        dataRequst: (res) => {
          if (typeof callbackSearch === "function") callbackSearch();
          if (res === undefined) return;
          // костыль обхода окна уведомления( согласовать с беком)
          const resCopy = { ...res, info: { ...res.info, status: true } };
          const isWarning = handlerWarningInfoMessageResponse(
            resCopy,
            dispatch
          );

          if (textSearchReview.length && res?.info?.message) {
            dispatch(ACTION_SET_MESSAGE_ERROR, res?.info?.message ?? "");
            return dispatch(ACTION_SET_RAITING_AND_REVIEW_NULL);
          } else {
            dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
          }
          if (isWarning) {
          }
          console.log({ res });
          if(res.id){
            setLocaleStore("recipient_id", res.id);
            setLocaleStore("username", res.username);
          }
          console.log({data})
          if (data?.callback && typeof data?.callback === "function") data.callback();
          return dispatch(ACTION_SET_INFO_ABOUT_REIVEW, res);
        },
        ...data,
      };
      dispatch(ACTION_GET, params);
    }
  );

  store.on(_INIT, () => ({ infoAboutUserListReview: {} }));
  store.on(ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW_NULL, () => ({
    infoAboutUserListReview: {},
  }));
  store.on(ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW, (_, data) => ({
    infoAboutUserListReview: { ...data },
  }));

  store.on(_INIT, () => ({ infoAboutUserReview: {id: null} }));
  store.on(ACTION_SET_INFO_ABOUT_REIVEW, (_, data) => ({
    infoAboutUserReview: { ...data },
  }));

  store.on(
    ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE,
    (_, data, { dispatch }) => {
      const params = {
        url: API_GET_USER_FEEDBACK_RECIEVE,
        page_size: DEFAULT_PAGE_SIZE,
        dataRequst: (res) => {
          if (res === undefined) return;
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) {
          }
          dispatch(ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW, res);
        },
        ...data,
      };
      dispatch(ACTION_GET, params);
    }
  );
  store.on(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, (_, data, { dispatch }) => {
    const params = {
      url: API_GET_USER_FEEDBACK,
      page_size: DEFAULT_PAGE_SIZE,
      dataRequst: (res) => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) {
        }
        dispatch(ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW, res);
      },
      ...data,
    };
    dispatch(ACTION_GET, params);
  });

  store.on(ACTION_GET_FULL_INFO_USER, (_, data, { dispatch }) => {
    const params = {
      url: API_GET_USER_FULL_DETAIL_INFO,
      dataRequst: (res) => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) {
        }
        setLocaleStore(ID_USER_FOR_REVIEW, res.info.user_data.id);
        dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, {
          user_id: res.info.user_data.id,
          type: "good",
        });
        dispatch(ACTION_SET_INFO_ABOUT_REIVEW, res.info.user_data);
      },
      ...data,
    };
    dispatch(ACTION_GET, params);
  });
  const initListCardsForWarrantlyMemners = { count: 0, results: [] };
  store.on(_INIT, () => ({
    listCardsForWarrantlyMemners: initListCardsForWarrantlyMemners,
  }));
  store.on(ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, (_, data) => ({
    listCardsForWarrantlyMemners: { ...data },
  }));
  store.on(ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS_NULL, (_, data) => ({
    listCardsForWarrantlyMemners: initListCardsForWarrantlyMemners,
  }));
  store.on(
    ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS,
    (_, data, { dispatch }) => {
      let params = {
        url: API_GET_CITY_MEMBERS,
        page_size: DEFAULT_PAGE_SIZE,
        page: data?.page ?? 1,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (typeof data?.callback === "function") data.callback();
          // setDataRequestMembers(res)
          dispatch(ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, res);
        },
        ...data,
      };
      dispatch(ACTION_GET, params);
    }
  );

  store.on(
    ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS,
    (_, data, { dispatch }) => {
      let params = {
        url: API_GET_ALL_GARANT_MEMBERS,
        page_size: DEFAULT_PAGE_SIZE,
        page: data?.page ?? 1,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (typeof data?.callback === "function") data.callback();
          dispatch(ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, res);
        },
        ...data,
      };
      dispatch(ACTION_GET, params);
    }
  );

  store.on(_INIT, () => ({ listCitiesWarrantlyForMembers: [] }));
  store.on(ACTION_SET_LIST_CITIES_WARRANTLY_MEMBERS, (_, data) => ({
    listCitiesWarrantlyForMembers: [...data],
  }));
  store.on(
    ACTION_GET_LIST_CITIES_WARRANTLY_MEMBERS,
    (_, data, { dispatch }) => {
      const params = {
        url: API_GET_LIST_CITIES_WARRANT_MEMBER,
        page: 1,
        page_size: 30,
        dataRequst: (res) => {
          if(typeof data?.callback === 'function') data.callback();
          dispatch(ACTION_SET_LIST_CITIES_WARRANTLY_MEMBERS, getOptions(res));
        },
        ...data,
      };
      dispatch(ACTION_GET, params);
    }
  );
};
