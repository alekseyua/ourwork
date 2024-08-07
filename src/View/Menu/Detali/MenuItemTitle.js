import React from 'react'
import styles from '../styles/menu-slider.module.scss';
export default function MenuItemTitle({ children, style = {} }) {
  return (
    <div
      className={styles['main-menu__item-title']}
      style={style}
    >{children}</div>
  )
}
