import React from 'react'
import styles from '../styles/menu-slider.module.scss';

export default function WrapMenuContainer({ children, style = {} }) {
  return (
    <div
      className={styles['main-menu__container-wrap']}
      style={style}
    >{children}</div>
  )
}
