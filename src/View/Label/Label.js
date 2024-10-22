import React from "react";
import styles from './styles/label.module.scss';
import { useTranslation } from "react-i18next";

const Label = ({
    children,
    htmlFor,
    style,
    color,
    mt = 0
}) =>{
  const { t } = useTranslation()
    return (
      <label
        htmlFor={htmlFor}
        style={{
          marginTop: `${mt}px`,
          color: color,
          filter: `blur(var(--filter-blur))`,
          ...style,
        }}
        className={styles["label__conrainer"]}
      >
        {t(children)}
      </label>
    );
}

export default Label;