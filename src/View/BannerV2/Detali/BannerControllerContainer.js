import React from 'react'
import styles from '../styles/banner.module.scss';

export default function BannerControllerContainer({children}) {
  return (
    <div
      className={styles['banner__container-controller']}
    >{children}</div>
  )
}
