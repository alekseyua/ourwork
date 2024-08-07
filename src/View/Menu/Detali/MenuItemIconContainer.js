import React from 'react'
import styles from '../styles/menu-slider.module.scss';

export default function MenuItemIconContainer({ 
  children, 
  height = '42px',
  onClick= () => {},
  style = {},
  width = '42px',
}) {
  return (
    <div
      onClick={onClick}
      className={styles['main-menu__item-icon-container']}
      style={{
        width: width,
        height: height,
        ...style
      }}
    >{children}</div>
  )
}
