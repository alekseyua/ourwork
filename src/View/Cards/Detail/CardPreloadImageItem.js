import React from 'react'
import styles from '../styles/application.module.scss'
export default function CardPreloadImageItem({children, ...props}) {
  return (
    <div
      
      className={styles['application__item-preload-images']}
    >{children}</div>
  )
}
