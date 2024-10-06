import React from "react";
import { useTranslation } from "react-i18next";

const withTranslationCostom = (Component) => {
    return (props) => {
        const { t, i18n } = useTranslation();
        // переводим тексты

    return (
      <Component
        {...props}
        i18n={i18n} // передаем i18n.t в props компонента
        t={t}
      />
    );
  };
};

export default withTranslationCostom;
