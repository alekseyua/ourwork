import React from 'react'
import styles from '../styles/menu-slider.module.scss';

export default function MenuItemContainerIcons({ children, style = {} }) {
  return (
    <div
      className={styles['main-menu__item-container-icons']}
      style={style}
    >{children}</div>
  )
}
