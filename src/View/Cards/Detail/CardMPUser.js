import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPUser = ({ children, style={} }) => {

  return (
    <div
      className={styles['cardmp__user']}
      style={style}
    >
      { children }
    </div>
  )
}

export default CardMPUser;