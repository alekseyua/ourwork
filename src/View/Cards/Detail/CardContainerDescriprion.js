import React from 'react'
import styles from '../styles/application.module.scss';

export default function CardContainerDescriprion({children}) {
  return (
    <div
      className={styles['application__container-description']}
    >{children}</div>
  )
}
