import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPPrice = ({ children, style={},catalog }) => {

  return (
    <div
      className={styles[catalog? 'cardmp__price-catalog' : 'cardmp__price']}
      style={style}
    >
      { children }
    </div>
  )
}

export default CardMPPrice;