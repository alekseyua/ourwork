import React from 'react';
import styles from './styles/tool-tip.module.scss';

export default function Tooltip({
  tooltipRef,
  style={},
  message,
}) {
  return (
    <div
      ref={tooltipRef}
      className={styles['tool-tip__container']}
      style={{
        ...style
      }}
    >{message}</div>
  )
}
 