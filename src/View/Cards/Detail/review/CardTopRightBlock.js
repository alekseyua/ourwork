import React from 'react';
import styles from '../../styles/top.module.scss';

export default function CardTopRightBlock({children}) {
  return (
    <div
      className={styles['top-card__right-block']}
    >{children}</div>
  )
}
