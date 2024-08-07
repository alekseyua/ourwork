import React from 'react'
import styles from '../styles/banner.module.scss';

export default function BannerContentContainer({children, onClick=()=>null}) {
  return (
    <div
    onClick={onClick}
      className={styles['banner__container-content']}
    >{children}</div>
  )
}
