import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardDescBlock({ children, style = {} }) {
  return (
    <div
      className={styles['top-card__desc-block']}
      style={style}
    >{children}</div>
  )
}
