import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardTitleDescBlock({children, style={}}) {
  return (
    <div
      className={styles['top-card__desc-block-title']}
      style={style}
    >{children}</div>
  )
}
