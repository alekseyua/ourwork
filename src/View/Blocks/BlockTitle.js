import React from 'react';
import styles from './styles/block.module.scss';

export default function BlockTitle({children, style={}}) {
  return (
    <div
      className={styles['block__title']}
      style={style}
    >{children}</div>
  )
}
