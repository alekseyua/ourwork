import { API_DISMISS, GET_DATA_ACCESS } from "../../helpers/config";
import { handlerAccessResponse} from "../../helpers/helpers";
import { setLocaleStore } from "../../helpers/utils";
import { ACTION_GET, ACTION_POST, _INIT } from "../api-store/getpage"
import { ACTION_SET_CURRENT_LANG } from "../lang/langStore";

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
    const params = {
      url: GET_DATA_ACCESS,
      page_url: urlPage,
      dataRequst: res => {

        const isWarning = handlerAccessResponse(res, dispatch);
        if (isWarning) return;
        // handlerSharePhone(res, dispatch);
        setLocaleStore('user_id',res.id)
        dispatch(ACTION_SET_CURRENT_LANG, {language_code: res.language_code, initLang: true});
        dispatch(ACTION_SET_DATA_ACCESS, res)
      }
    }
    dispatch(ACTION_GET,params)
  })
}