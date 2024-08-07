import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardInfoBlockWrapDesc({children, style}) {
  return (
    <div
      className={styles['top-card__info-block-wrap-desc']}
      style={style}
    >{children}</div>
  )
}
