import React from 'react'
import styles from './styles/info.module.scss'

export default function InfoContainerBorder({ children, style={}, }) {
  return (
    <div
      style={style}
      className={styles['info__container--border']}
    >{children}</div>
  )
}
