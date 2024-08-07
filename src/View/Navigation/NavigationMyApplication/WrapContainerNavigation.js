import React from 'react'
import styles from '../styles/navigaton.module.scss'

export default function WrapContainerNavigation({children, style={}}) {
  return (
    <div
      className={styles['navigation__container']}
      style={style}
    >{children}</div>
  )
}
