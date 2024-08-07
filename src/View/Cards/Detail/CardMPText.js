import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPText = ({ children, style={} }) => {

  return (
    <div
      className={styles['cardmp__text']}
      style={style}
    >
      { children }
    </div>
  )
}

export default CardMPText;