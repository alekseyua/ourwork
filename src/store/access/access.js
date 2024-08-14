import { API_DISMISS, GET_DATA_ACCESS, MARKETPLACE_EDIT_OWN_CARD, REITING_FULL_INFO } from "../../helpers/config";
import { handlerAccessResponse, handlerSharePhone } from "../../helpers/helpers";
import { setLocaleStore } from "../../helpers/utils";
import { ACTION_GET, ACTION_POST, _INIT } from "../api-store/getpage"

export const ACTION_SET_DATA_ACCESS = 'setDataAccess';
export const ACTION_GET_ACCESSES = 'getDataAccess';
export const ACTION_DISMISS_PHONE_NUMBER = 'dismiss';

export const access = store => {
  const initAccess = {};
  store.on(_INIT, () => ({ access: initAccess }));

  store.on(ACTION_SET_DATA_ACCESS, (_, data) => ({ access: { ...data } }))

  store.on(ACTION_DISMISS_PHONE_NUMBER, ({ access }, data, { dispatch }) => {
    const params = {
      url: API_DISMISS,
    };
    dispatch(ACTION_POST, params)
  });

  store.on(ACTION_GET_ACCESSES, async ({ _ }, data, { dispatch }) => {
    let urlPage = window.location.pathname;
    if(urlPage.includes(MARKETPLACE_EDIT_OWN_CARD + '/')) urlPage = MARKETPLACE_EDIT_OWN_CARD;
    if(urlPage.includes(REITING_FULL_INFO + '/')) urlPage = REITING_FULL_INFO;

    const params = {
      url: GET_DATA_ACCESS,
      page_url: urlPage,
      dataRequst: res => {

        const isWarning = handlerAccessResponse(res, dispatch);
        if (isWarning) return;
        // handlerSharePhone(res, dispatch);
        setLocaleStore('user_id',res.id)
        dispatch(ACTION_SET_DATA_ACCESS, res)
      }
    }
    dispatch(ACTION_GET,params)
  })
}