import React from 'react'
import styles from '../styles/grid.module.scss'
export default function WrapGrid({children, style={}}) {
  return (
    <div
      className={styles['grid__wrap-container']}
      style={style}
    >{children}</div>
  )
}
