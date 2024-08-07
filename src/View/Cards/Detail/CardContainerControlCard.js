import React from 'react'
import styles from '../styles/application.module.scss';

export default function CardContainerControlCard({children, style={}}) {
  return (
    <div
      className={styles['application__container-control-card']}
      style={style}
    >{children}</div>
  )
}
