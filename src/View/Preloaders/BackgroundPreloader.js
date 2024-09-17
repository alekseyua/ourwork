import React from "react";
import styles from './styles/preloader.module.scss'
import { loaderRotate } from "../../images";
import IconSvg from "../Icon/IconSvg";
const BackgroundPreloader = ({ children, style }) => {

  return (
    <div
      className={styles["preloader__container-background-preload"]}
      style={style}
    >
      <IconSvg
        className={"icon__rotation"}
        src={loaderRotate}
      />
    </div>
  );
}

export default BackgroundPreloader;