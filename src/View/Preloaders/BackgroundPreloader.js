import React from "react";
import styles from './styles/preloader.module.scss'
import Icon from "../Icon/Icon";
import { settingRed } from "../../images";
const BackgroundPreloader = ({ children, style }) => {

  return (
    <div
      className={styles["preloader__container-background-preload"]}
      style={style}
    >
      <Icon
        addClass={"icon__rotation"}
        image={settingRed}
        width={40}
        height={40}
      />
    </div>
  );
}

export default BackgroundPreloader;