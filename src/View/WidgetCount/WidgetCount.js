import React from 'react'
import styles from './styles/widget.module.scss'

export default function WidgetCount({children}) {
  return (
    <div
      className={styles['widget__container']}    
    >{children}</div>
  )
}
