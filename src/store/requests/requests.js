import { activeButtonBootomForConfirm, getOptions, handlerWarningInfoMessageResponse } from "../../helpers/helpers";
import { API_CREATE_REQUEST_V2, API_DELETE_IMAGE_FROM_REQUEST, API_DELETE_REQUEST, API_DUBLICATE_REQUEST, API_GET_CARS, API_GET_CARS_BRANDS, API_GET_CARS_GENEGATIONS, API_GET_CARS_MODELS, API_GET_COUNTRIES, API_GET_REQUEST_BY_TYPE, API_UPDATE_REQUEST, DEFAULT_PAGE_SIZE, MAKE_REQUEST_MENU } from "../../helpers/config";
import { contentCopy, docSuccess } from "../../images";
import { ACTION_GET, ACTION_POST, _INIT } from "../api-store/getpage";
import { ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON, ACTION_SET_CONTROLL_BUTTON_NULL } from "../helpers/helpers-store";


export const ACTION_GET_LIST_BRANDS = 'getListBrands';
export const ACTION_GET_NEW_LIST_DATA = 'getChangeAggregateRequests';
export const ACTION_SET_LIST_BRANDS = 'setListBrands';
export const ACTION_SET_MY_APPLICATION = 'setPageMyApplication';
export const ACTION_SET_VALUE_UNIT_SPARE = 'setValuesUnitSpare';
export const ACTION_SET_VALUE_UNIT_SPARE_NULL = 'setValuesUnitSpareNull';
export const ACTION_APPLY_AGGREGATE_REQUEST = 'applyAggregateRequests';
export const ACTION_APPLY_UPDATE_REQUEST = 'applyUpdateRequests';
export const ACTION_SET_LIST_MY_APPliCATION = 'setListMyApplication';
export const ACTION_GET_LIST_MY_APPliCATION = 'getListMyApplication';
export const ACTION_SET_LIST_COUNTRY = 'setListCountries';
export const ACTION_GET_LIST_COUNTRY = 'getListCountries';
export const ACTION_APPLY_ACTION_INTO_MY_APPLICATION = 'applyActionIntoMyApplication';
export const ACTION_DELETE_IMAGE_FROM_REQUEST = "deleteImageReqest";
export const ACTION_GET_PREPARE_PRODUTS = "getPrepare";
export const ACTION_SET_LIST_PREPARE_PRODUCTS = "setPrepare";
export const ACTION_RESET_LIST_PREPARE_PRODUCTS = "resetPrepare";

export const requests = store => {

  store.on(_INIT, () => ({}));

  store.on(_INIT, () => ({ pageMyApplication: {} }));
  store.on(ACTION_SET_MY_APPLICATION, ({ pageMyApplication = {} }, data) => ({ pageMyApplication: { ...pageMyApplication, ...data } }));


store.on(ACTION_DELETE_IMAGE_FROM_REQUEST, (_,data) => {
  const { id } = data;
  const params = {
    url: API_DELETE_IMAGE_FROM_REQUEST,
id,
  };
  console.log({params})
});

  // *****************************************************************************
  store.on(_INIT, () => ({ listBrands: [] }));
  store.on(ACTION_SET_LIST_BRANDS, (_, data) => ({ listBrands: [...data] }));
  store.on(ACTION_GET_LIST_BRANDS, (_, data = {}, { dispatch }) => {

    let params = {
      url:API_GET_CARS_BRANDS,
      page_id: 2,
      type: 'brand',
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if(typeof data?.callback === 'function') data.callback();
        console.log({res})
        dispatch(ACTION_SET_LIST_BRANDS, [...getOptions(res.results)]);
      },
      ...data,
    };
    dispatch(ACTION_GET, params);
  });

  store.on(ACTION_GET_NEW_LIST_DATA, (_, data, { dispatch }) => {
    console.log('get list')
    let url = '';
    switch (data.type) {
      case 'brand':
        url = API_GET_CARS_BRANDS
        break;
      case 'model':
        url = API_GET_CARS_MODELS
        break;
      case 'generation':        
        url = API_GET_CARS_GENEGATIONS
        break;
    
      default:
        break;
    }
    let params = {
      type: data.type,
      dataRequst: data.handlerChangeDataRequest,
      page_size:99999,
      url, 
    };
    if (data.brand_id) {
      params = {
        ...params,
        brand_id: data.brand_id,
      };
    }
    if (data.model_id) {
      params = {
        ...params,
        model_id: data.model_id,
      };
    }
    dispatch(ACTION_GET, params);
  });

  const initValuesAggrigateUnitsSpare = {

    model_id: "",
    generation_id: "",
  };

  store.on(_INIT, () => ({ valuesUnitSpare: initValuesAggrigateUnitsSpare }));
  store.on(ACTION_SET_VALUE_UNIT_SPARE_NULL, () => ({ valuesUnitSpare: initValuesAggrigateUnitsSpare }));
  store.on(ACTION_SET_VALUE_UNIT_SPARE, ({ valuesUnitSpare }, data, { dispatch }) => {
    const member = data?.member;
    let newValuesUnitSpare = {
      ...valuesUnitSpare,
      ...data
    }

    const isActiveButton = activeButtonBootomForConfirm({ ...newValuesUnitSpare }, data.sub_type, ()=>{}, member);
    if (isActiveButton) {
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: true,
        name: "public_request",
        action: () => {
          if (data?.edit) {
            dispatch(ACTION_APPLY_UPDATE_REQUEST, { ...newValuesUnitSpare });
          } else {
            dispatch(ACTION_APPLY_AGGREGATE_REQUEST, { ...newValuesUnitSpare });
          }
          dispatch(ACTION_SET_VALUE_UNIT_SPARE_NULL);
          return dispatch(ACTION_SET_CONTROLL_BUTTON_NULL);
        },
      });
    }else{
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: false,
      })
    }
    return ({ valuesUnitSpare: newValuesUnitSpare })
  });

  const initListPrepare = {
    count: 0,
    current_page: 0,
    results: [],
  };
  store.on(_INIT, () => ({
    listPrepare: initListPrepare,
  }));


  store.on(_INIT, () => ({ listCountries: [] }));
  store.on(ACTION_SET_LIST_COUNTRY, (_, data) => ({ listCountries: [...data] }));
  store.on(ACTION_GET_LIST_COUNTRY, ({ _ }, data = {}, { dispatch }) => {
    try {

      const params = {
        url: API_GET_COUNTRIES,//'/api_get_requests/',
        page: 1,
        page_size: DEFAULT_PAGE_SIZE,
        // setIsLoading: status => data?.isLoading(status),
        dataRequst: res => {
          if (res === undefined) return;
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          dispatch(ACTION_SET_LIST_COUNTRY, res)
        },
        ...data
      };
      dispatch(ACTION_GET, params)

    } catch (error) {
      console.log('erorr catch', error)
    }
  });

  store.on(_INIT, () => ({ listMyApplication: {} }));
  store.on(ACTION_SET_LIST_MY_APPliCATION, (_, data) => ({ listMyApplication: { ...data } }));

  store.on(ACTION_GET_LIST_MY_APPliCATION, ({ pageMyApplication }, data = {}, { dispatch }) => {
    const params = {
      url: API_GET_REQUEST_BY_TYPE,//'/api_get_requests/',
      page: pageMyApplication[data.type] ?? 1,
      page_size: DEFAULT_PAGE_SIZE,
      // setIsLoading: status => data?.isLoading(status),
      dataRequst: res => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        dispatch(ACTION_SET_MY_APPLICATION, {
          [data.type]: res.current_page
        })
        dispatch(ACTION_SET_LIST_MY_APPliCATION, res)
      },
      ...data
    };
    dispatch(ACTION_GET, params)

  });


  store.on(ACTION_APPLY_UPDATE_REQUEST, (_, data, { dispatch }) => {
    dispatch(ACTION_SET_CONTROLL_BUTTON, {
      isFetch: true
    })
    const params = {
      url: API_UPDATE_REQUEST,
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if (typeof data?.callback === 'function') data.callback();
        dispatch(ACTION_OPEN_MODAL, {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: 'Ок',
          error: !res?.info?.status,
          path: MAKE_REQUEST_MENU,
          icon: docSuccess
        })

      },
      ...data,
    };
    dispatch(ACTION_POST, params);
  });
  store.on(ACTION_APPLY_AGGREGATE_REQUEST, (_, data, { dispatch }) => {
    dispatch(ACTION_SET_CONTROLL_BUTTON, {
      isFetch: true
    })
    const params = {
      url: API_CREATE_REQUEST_V2,
      // url: API_CREATE_REQUEST,
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if (typeof data?.callback === "function") data.callback();
        dispatch(ACTION_OPEN_MODAL, {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: "Ок",
          error: !res?.info?.status,
          path: MAKE_REQUEST_MENU,
          icon: docSuccess,
        });
      },
      ...data,
    };
    dispatch(ACTION_POST, params);
  });

  store.on(ACTION_APPLY_ACTION_INTO_MY_APPLICATION, ({ pageMyApplication }, data, { dispatch }) => {
    const { action, id, type } = data;
    let params = {}
    switch (action) {
      case 'copy':
        params = { url: API_DUBLICATE_REQUEST, };
        break;
      case 'delete':
        params = { url: API_DELETE_REQUEST, }
        break;
      default: break;
    }
    params = {
      ...params,
      request_id: id,
      type,
      page: pageMyApplication[type] ?? 1,
      dataRequst: (res) => {
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        // const copyData = res?.slice();
        dispatch(ACTION_OPEN_MODAL, {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: 'Ок',
          error: !res?.info?.status,
          icon: contentCopy,
          actionClickOk: (e) => dispatch(ACTION_GET_LIST_MY_APPliCATION, { type })
        })
      },
    };
    dispatch(ACTION_GET, params);
  })




}