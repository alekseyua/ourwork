import React from "react";
import styles from './styles/preloader.module.scss'
const WrapContainerPreloader = ({ children, style={} }) => {

  return (
    <div className={styles['preload__wrap-container']} 
      style={style}
    >
      {children}     
    </div>
  )
}

export default WrapContainerPreloader;