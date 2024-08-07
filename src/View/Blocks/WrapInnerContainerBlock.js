import React, { useId } from 'react';
import styles from './styles/block.module.scss';

export default function WrapInnerContainerBlock({children, style={}, onClick = () => {}, id }) {
  return (
    <div  
      id={ id ?? useId() }
      onClick={onClick}
      className={styles['block__container-inner-block']}
      style={style}
    >{children}</div>
  )
}
