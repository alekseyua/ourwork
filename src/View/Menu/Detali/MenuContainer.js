import React, { useEffect, useRef } from 'react'
import styles from '../styles/menu-slider.module.scss';
import classNames from 'classnames';
import { isAndroid, isIos } from '../../../helpers/utils';
export default function MenuContainer({addClass, children, style = {}, setMenuRef=()=>false }) {
  const divRef = useRef(null);
  useEffect(()=>{
    setMenuRef(divRef)
  }, [divRef])

  const className = classNames({
    [styles[addClass]]: addClass,
    [styles["main-menu__container"]]: true,
    [styles["main-menu__container--scroll"]]: !(isIos() || isAndroid()),

  });

  return (
    <div
      ref={divRef}
      className={className}
      style={style}
    >{children}</div>
  )
}
