import React from 'react'
import styles from './styles/footermenu.module.scss'

export default function WrapContainerFooterMenu({style={}, children}) {
  return (
    <div
      className={styles['footer-menu__container']}
      style={{
        ...style
      }}
    >{children}</div>
  )
}
