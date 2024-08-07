import React from 'react';
import styles from './styles/block.module.scss';

export default function WrapTitleDescBlockOpacity({children, style={}}) {
  return (
    <div
      className={styles['block__title-desc']}
      style={style}
    >{children}</div>
  )
}
