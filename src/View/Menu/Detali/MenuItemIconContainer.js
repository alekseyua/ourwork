import React from 'react'
import styles from '../styles/menu-slider.module.scss';
import classNames from 'classnames';

export default function MenuItemIconContainer({ 
  children, 
  height = '42px',
  onClick= () => {},
  style = {},
  width = '42px',
  active,
}) {

  const className = classNames({
    [styles['main-menu__item-icon-container']]:true,
    [styles['main-menu__item-icon-container--active']]:active,

  })

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: width,
        height: height,
        ...style
      }}
    >{children}</div>
  )
}
