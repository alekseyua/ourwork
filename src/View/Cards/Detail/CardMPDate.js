import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPDate = ({ children, style={} }) => {

  return (
    <div
      className={styles['cardmp__time']}
      style={style}
    >
      { children }
    </div>
  )
}

export default CardMPDate;