import React from 'react';
import styles from './styles/block.module.scss';

export default function WrapRowGrid({children, style={}}) {
  return (
    <div
      className={styles['block__container--row-grid']}
      style={style}
    >{children}</div>
  )
}
