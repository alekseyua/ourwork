import React from 'react';
import styles from './styles/block.module.scss';
import { v4 } from 'uuid';

export default function WrapContainerBlock({children, keyId = v4(), style={}}) {
  return (
    <div
      key={keyId}
      className={styles['block__container-block']}
      style={style}
    >{children}</div>
  )
}
