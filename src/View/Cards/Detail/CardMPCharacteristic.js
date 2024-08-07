import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPCharacteristic = ({ children, style = {}, title }) => {

  return (
    <div
      className={styles['cardmp__characteristic']}
      style={style}
    >
      {
        title && 
        <p
          className={styles['cardmp__characteristic-title']}
        >
          {title}
        </p>
      }
      {children}
    </div>
  )
}

export default CardMPCharacteristic;