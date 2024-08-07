import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardContainerItemTitle({children, style={}}) {
  return (
    <div
      style={style}
      className={styles['application__container-item-title']}
    >{children}</div>
  )
}
