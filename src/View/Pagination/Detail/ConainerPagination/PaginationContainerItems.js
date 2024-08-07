import React from 'react'
import styles from './styles/pagination.module.scss';

export default function PaginationContainerItems({children, style={}}) {
  return (
    <div
      className={styles['pagination__container-items']}
      style={style}
    >{children}</div>
  )
}
