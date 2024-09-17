import React from 'react'
import styles from './styles/accordion.module.scss'

export default function ItemAccordionDescription({children, style={}, isOpen}) {
  return (
    <div
      className={styles['accordion__item-description']}
      style={{
        height: isOpen? '100%' : '0',
        visibility: isOpen? 'visible' : 'hidden',
        opacity: isOpen? 1 : 0,
        marginTop: isOpen? 10 : 0,
        transition: 'all .15s ease-in-out',
        color: 'var(--text-color-opacity)',
        'font-family': 'var(--font-family-default)',
        'font-weight': '400',
        'font-size': '12px',
        'pointer-events': 'none',
        'line-height': '18px',
        'font-style': 'normal',
        ...style
      }}
    >{children}</div>
  )
}
