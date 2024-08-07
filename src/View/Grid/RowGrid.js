import React from 'react'
import styles from './styles/grid.module.scss'

export default function RowGrid({
  children,
  countRow = 1
}) {
  return (
    <div
      className={styles['grid__row']}
      style={{
        gridTemplateRows: `reteat(${countRow}, 1fr)`
      }}
    >{children}</div>
  )
}
