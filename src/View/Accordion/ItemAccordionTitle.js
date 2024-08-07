import React from 'react'
import styles from './styles/accordion.module.scss'

export default function ItemAccordionTitle({children, style}) {
  return (
    <div
      className={styles['accordion__item-title']}
      style={style}
    >{children}</div>
  )
}
