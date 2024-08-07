import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardInfoBlock({children, style={}}) {
  return (
    <div
      className={styles['top-card__info-block-top']}
      style={style}
    >{children}</div>
  )
}
