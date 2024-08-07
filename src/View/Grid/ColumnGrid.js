import React from 'react'
import styles from './styles/grid.module.scss'

export default function ColumnGrid({
  children,
  countColumn = 1,
  style = {},
}) {
  return (
    <div
      className={styles['grid__column']}
      style={{
        gridTemplateColumns: `repeat(${countColumn}, 1fr)`,
        ...style,
      }}
    >{children}</div>
  )
}
