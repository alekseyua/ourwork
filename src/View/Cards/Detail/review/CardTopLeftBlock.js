import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardTopLeftBlock({children}) {
  return (
    <div
      className={styles['top-card__left-block']}
    >{children}</div>
  )
}
