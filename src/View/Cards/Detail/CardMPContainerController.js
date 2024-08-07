import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainerController = ({ children, style = {}, title }) => {

  return (
    <div
      className={styles['cardmp__control-container']}
      style={style}
    >
      {children}
    </div>
  )
}

export default CardMPContainerController;