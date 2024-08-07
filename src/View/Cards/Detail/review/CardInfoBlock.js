import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardInfoBlock({children, style={}, onClick=()=>false}) {
  return (
    <div
    onClick={onClick}
      className={styles['top-card__info-block']}
      style={style}
    >{children}</div>
  )
}
