import React from 'react'
import styles from './styles/footermenu.module.scss'

export default function WrapItemFooterMenu({style={}, children, onClick}) {
  return (
    <div
      className={styles['footer-menu__container-item']}
      onClick={onClick}
      style={{
        ...style
      }}
    >{children}</div>
  )
}
