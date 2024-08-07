import React from 'react'
import styles from './styles/error-message.module.scss';

export default function ErrorMessage({
  style={},
  children,
}) {
  return (
    <div
      className={styles['error__container']}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  )
}
