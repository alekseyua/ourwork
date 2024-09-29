import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources_ru from './lang-resource-ru.json';
import resources_ua from './lang-resource-ua.json';

i18n.use(initReactI18next).init({
  lng: "ua",
  resources: {
    ru: resources_ru,
    ua: resources_ua,
  },

  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;