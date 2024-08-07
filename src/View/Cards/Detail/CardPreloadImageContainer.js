import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardPreloadImageContainer({children}) {
  return (
    <div
      className={styles['application__container-preload-images']}
    >{children}</div>
  )
}
