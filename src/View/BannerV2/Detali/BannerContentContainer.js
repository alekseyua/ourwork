import React from 'react'
import styles from '../styles/banner.module.scss';

export default function BannerContentContainer({children}) {
  return (
    <div
      className={styles['banner__container-content']}
    >{children}</div>
  )
}
