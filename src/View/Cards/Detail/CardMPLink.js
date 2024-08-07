import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPLink = ({ children, style={}, onClick }) => {

  return (
    <div
      className={styles['cardmp__user-link']}
      style={style}
      onClick={onClick}
    >
      { children }
    </div>
  )
}

export default CardMPLink;