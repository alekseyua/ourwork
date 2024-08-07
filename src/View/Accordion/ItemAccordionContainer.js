import React from 'react'
import styles from './styles/accordion.module.scss'

export default function ItemAccordionContainer({
  children, 
  style={}, 
  
  onClick = ()=>{}, 
  ...props
}) {
  return (
    <div
      className={ styles['accordion__item-container'] }
      onClick={ onClick }
      style={ style }
      { ...props }
    >{ children }</div>
  )
}
