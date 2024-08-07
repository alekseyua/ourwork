import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardItemDescription({children}) {
  return (
    <div
      className={styles['application__item-description']}
    >{children}</div>
  )
}
