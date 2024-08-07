import React from 'react'
import styles from './styles/info.module.scss'

export default function InfoContainer({ children }) {
  return (
    <div
      className={styles['info__container']}
    >{children}</div>
  )
}
