import React from 'react';
import styles from './styles/block.module.scss';

export default function WrapContainerBlockBorder({children, style={}, onClick=()=>{}}) {
  return (
    <div
      onClick={onClick}
      className={styles['block__container-block--border']}
      data-item={'block-item'}
      style={style}
    >{children}</div>
  )
}
