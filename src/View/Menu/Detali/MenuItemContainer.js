import React from 'react'
import styles from '../styles/menu-slider.module.scss';

export default function MenuItemContainer({ children, style = {}, onClick, addClass='main-menu__item-container' }) {
  return (
    <div
      onClick={onClick}
      className={styles[addClass]}
      style={{                
        ...style,
      }}
    >{children}</div>
  )
}
