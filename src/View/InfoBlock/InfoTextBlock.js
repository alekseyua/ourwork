import React from 'react'
import styles from './styles/info.module.scss'

export default function InfoTextBlock({children, style={}}) {
  return (
    <div
        className={styles['info__block-text']}
        style={style}
    >{children}</div>
  )
}
