import React from 'react'
import styles from './styles/grid.module.scss'

export default function ContainerGrid({
  children,
}) {
  return (
    <div
      className={styles['grid__container']}      
    >{children}</div>
  )
}
