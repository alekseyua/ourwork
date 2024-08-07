import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPTitle = ({ children, style={} }) => {

  return (
    <div
      className={styles['cardmp__title']}
      style={style}
    >
      { children }
    </div>
  )
}

export default CardMPTitle;