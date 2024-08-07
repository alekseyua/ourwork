import React from 'react'
import styles from './styles/accordion.module.scss'

export default function WrapContainerAccordion({children, style}) {
  return (
    <div
      className={styles['accordion__container']}
      style={style}
    >{children}</div>
  )
}
