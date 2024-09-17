import { API_POST_CHANGE_LANG } from "../../helpers/config";
import i18n from "../../lang/i18n";
import { _INIT, ACTION_POST } from "../api-store/getpage";

export const ACTION_SET_CURRENT_LANG = 'set_current_lang';
export const ACTION_SET_LIST_LANG = 'set_list_lang';
export const ACTION_SET_CURRENT_LANG_NULL = 'set_current_lang_null';
export const ACTION_CHANGE_LANG = 'change_lang';

export const langStore = store => {
    const listLang = [
      {
        value: "ua",
        label: `🟦🟨`, // `🇺🇦`,
        isActive: false,
      },
      {
        value: "ru",
        label:  `⬜️🟦⬜️`, // `🇷🇺`,
        isActive: false,
      },
    ]

    store.on(_INIT, () => ({ listLang }));    
    store.on(_INIT, () => ({ currentLang: 'ru' }));

    store.on(ACTION_SET_CURRENT_LANG, (_, data, {dispatch}) => { 
        if (!data?.initLang)
          dispatch(ACTION_CHANGE_LANG, { language_code: data.language_code });
        i18n.changeLanguage(data.language_code);
        dispatch(ACTION_SET_LIST_LANG, {language_code: data.language_code});
        return { currentLang: data.language_code };
    });
    store.on(ACTION_SET_CURRENT_LANG_NULL, (_, data) => ({ currentLang: 'ua' }));
    
    store.on(ACTION_SET_LIST_LANG, ({ listLang, currentLang }, data, { dispatch }) => {
      return {
        listLang: listLang.map((el) =>
          el.value === data.language_code
            ? { ...el, isActive: true }
            : { ...el, isActive: false }
        ),
      };
    });

    store.on(ACTION_CHANGE_LANG, (_, data, { dispatch }) => {
      const params = {
        url: API_POST_CHANGE_LANG,
        language_code: data.language_code,
      };
      return dispatch(ACTION_POST, params);
    });
}