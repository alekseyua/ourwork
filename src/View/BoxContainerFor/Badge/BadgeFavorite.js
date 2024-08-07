import React from 'react'
import styles from '../styles/favorite.module.scss';

export default function BadgeFavorite({children}) {
  return (
    <div
      className={styles['favorite__badge-favorite']}
    >{children}</div>
  )
}
