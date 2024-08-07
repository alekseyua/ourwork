import React from 'react'
import styles from './styles/accordion.module.scss'

export default function ItemAccordionContainerTitle({children, style={}, ...props}) {
  return (
    <div
      className={ styles['accordion__item-container-title'] }
      style={ style }
      { ...props }
    >{ children }</div>
  )
}
