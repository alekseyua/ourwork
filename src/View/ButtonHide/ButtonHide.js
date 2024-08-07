import React from 'react'
import styles from './styles/btn_hide.module.scss'
import Button from '../Button/Button';
import { arrowDown, hide_eye, show_eye } from '../../images';
export default function ButtonHide({ onClick = () => {}, isShow}) {
  return (
    <Button
      onClick={() => onClick()}
      type={'button'}
      className={styles["btn_hide__button"]}
      // iconRight={isShow ? hide_eye : show_eye}
      iconRight={ arrowDown}
      styleIconsRight={{
        // filter: "invert(1)",
        left: 10,
        // width: 45,
        // height: 45,
        width: 10,
        height: 10,
        transform: `rotate(${isShow? 0 : 180}deg)`,
        transition: `all .4s`
      }}
    >
      {isShow ? "скрыть" : "показать"}
    </Button>
  );
}
