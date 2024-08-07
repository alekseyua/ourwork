import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPCharacteristicSubTitle = ({ children, style = {},styleText = {}, title='' }) => {

  return (
    <div
      className={styles['cardmp__characteristic-sub-title-container']}
      style={style}
    >
      {
        title && 
        <p
          className={styles['cardmp__characteristic-sub-title']}
          style={styleText}
        >
          {title}
        </p>
      }
      {children}
    </div>
  )
}

export default CardMPCharacteristicSubTitle;