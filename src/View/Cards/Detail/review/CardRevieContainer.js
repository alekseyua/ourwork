import React from 'react';
import styles from '../../styles/review.module.scss';

export default function CardRevieContainer({children, onClick=()=>{}}) {
  return (
    <div
      className={styles['card-review__container']}
      onClick={onClick}
    >{children}</div>
  )
}
