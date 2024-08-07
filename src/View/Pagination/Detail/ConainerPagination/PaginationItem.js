import React from 'react'
import styles from './styles/pagination.module.scss';

export default function PaginationItem({children, style={}, ...props}) {
  return (
    <div
      className={styles['pagination__item']}
      style={style}
      {...props}
    >{children}</div>
  )
}
