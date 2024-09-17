import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ua",
  resources: {
    ru: {
      translation: {
        filters: "Фильтра",
        create_request: "Создать запрос",
        // translations for Russian
      },
    },
    ua: {
      translation: {
        filters: "Фільтра",
        create_request: "Створити запит",
        // translations for Ukrainian
      },
    },
  },

  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;