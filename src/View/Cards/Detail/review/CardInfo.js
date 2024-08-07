import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardInfo({children, style={}}) {
  return (
    <div
      className={styles['top-card__info']}
      style={style}
    >{children}</div>
  )
}
