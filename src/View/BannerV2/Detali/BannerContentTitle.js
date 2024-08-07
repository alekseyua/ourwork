import React from 'react'
import styles from '../styles/banner.module.scss';

export default function BannerContentTitle({children, style={}}) {
  return (
    <div
      className={styles['banner__content-title']}
      style={style}
    >{children}</div>
  )
}
