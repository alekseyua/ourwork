import React from 'react'
import styles from './styles/pagination.module.scss';

export default function ContainerPagination({children, style={}}) {
  return (
    <div
      className={styles['pagination__container-wrap']}
      style={style}
    >{children}</div>
  )
}
