import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainer = ({ children, style }) => {
  return (
    <div
    className={styles['cardmp__container']}
    style={{
      ...style
    }}
  >
    {children}
    </div>
  )
}

export default CardMPContainer;