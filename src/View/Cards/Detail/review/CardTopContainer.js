import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardTopContainer({children, onClick=()=>{}}) {
  return (
    <div
      onClick={onClick}
      className={styles['top-card__container']}
    >{children}</div>
  )
}
