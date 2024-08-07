import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardApplicationContainer({children}) {
  return (
    <div
      className={styles['application__container']}
    >{children}</div>
  )
}
