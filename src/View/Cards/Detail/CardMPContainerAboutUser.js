import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainerAboutUser = ({ children, style = {}, title }) => {

  return (
    <div
      className={styles['cardmp__info-container-about-user']}
      style={style}
    >
      {children}
    </div>
  )
}

export default CardMPContainerAboutUser;