import React from 'react'
import styles from '../styles/navigaton.module.scss'

export default function WrapContainerNavigationMyApplication({children, style={}}) {
  return (
    <div
      className={styles['navigation__my-application-container']}
      style={style}
    >{children}</div>
  )
}
