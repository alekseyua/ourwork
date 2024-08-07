import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardContainerTitle({children}) {
  return (
    <div
      className={styles['application__container-title']}
    >{children}</div>
  )
}
