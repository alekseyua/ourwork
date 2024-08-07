import React from "react";
import styles from './styles/preloader.module.scss'
const Preloader = ({ children, style }) => {

  return (
    <div className={styles['body-container-preload']} 
      style={style}
    >
      {children}
      <div className={styles['preloader-container']}>
        <div className={styles['preloader']}>
          <div className={styles['preloader-dots']}>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
            <div className={styles['dot']}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader;