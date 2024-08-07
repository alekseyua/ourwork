import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardTopDecorBlock({children, style={}}) {
  return (
    <div
      className={styles['top-card__decor-block']}
      style={style}
    >{children}</div>
  )
}
