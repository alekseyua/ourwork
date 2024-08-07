import React from "react";
import styles from './styles/label.module.scss';

const Label = ({
    children,
    htmlFor,
    style,
    color,
    mt = 0
}) =>{
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
        {children}
      </label>
    );
}

export default Label;