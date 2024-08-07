import React from "react";
import styles from '../styles/cardmp.module.scss'

const CardMPContainerOpacity = ({ children, style }) => {
  return (
    <div
      className={styles['cardmp__container-opacity']}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default CardMPContainerOpacity;