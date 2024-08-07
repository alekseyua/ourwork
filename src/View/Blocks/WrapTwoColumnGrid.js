import React from 'react';
import styles from './styles/block.module.scss';

export default function WrapTwoColumnGrid({children, style={}, onClick=()=>{}}) {
  return (
    <div
      className={styles['block__container--two-column']}
      style={style}
      onClick={onClick}
    >{children}</div>
  )
}
