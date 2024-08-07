import React, { useEffect, useRef } from 'react'
import styles from '../styles/menu-slider.module.scss';
export default function MenuContainer({ children, style = {}, setMenuRef=()=>false }) {
  const divRef = useRef(null);
  useEffect(()=>{
    setMenuRef(divRef)
  }, [divRef])
  return (
    <div
      ref={divRef}
      className={styles['main-menu__container']}
      style={style}
    >{children}</div>
  )
}
