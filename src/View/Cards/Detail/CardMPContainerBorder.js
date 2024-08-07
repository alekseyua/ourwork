import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainerBorder = ({ children, style }) => {
  return (
    <div
    className={styles['cardmp__container-border']}
    style={{
      ...style
    }}
  >
    {children}
    </div>
  )
}

export default CardMPContainerBorder;