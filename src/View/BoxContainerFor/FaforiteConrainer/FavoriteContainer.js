import React from 'react'
import styles from '../styles/favorite.module.scss'
import classNames from 'classnames'

export default function FavoriteContainer({children, className, style = {}, onClick =()=>{}}) {
  return (
    <div
      onClick={onClick}
      className={classNames({
        [className]: !!className,
        [styles['favorite__wrap-conrainer']]: true,
      })}
      style={{...style}}
    >{children}</div>
  )
}

