import React from 'react'
import styles from '../styles/banner.module.scss';
export default function BannerContainer({children}) {
  return (
    <div
      className={styles['banner__container']}
    >{children}</div>
  )
}
