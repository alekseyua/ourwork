import React from 'react';
import styles from './styles/block.module.scss';

export default function WrapIconBlock({children, style={}}) {
  return (
    <div
      className={styles['block__container--icon']}
      style={style}
    >{children}</div>
  )
}
