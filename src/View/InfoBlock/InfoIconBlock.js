import React from 'react'
import styles from './styles/info.module.scss'

export default function InfoIconBlock({children}) {
  return (
    <div
        className={styles['info__block-icon']}
    >{children}</div>
  )
}
