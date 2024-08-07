import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainerRow = ({ children, style = {}, catalog }) => {

  return (
    <div
      className={styles[catalog ? 'cardmp__location-catalog' : 'cardmp__location']}
      style={style}
    >
      {children}
    </div>
  )
}

export default CardMPContainerRow;