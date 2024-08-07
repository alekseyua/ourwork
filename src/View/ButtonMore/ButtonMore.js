import React from 'react'
import styles from './styles/more.module.scss'
import Button from '../Button/Button';
import { arrowDown } from '../../images';
export default function ButtonMore({ onClick = () => {}, countCards = 0, currentPage }) {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        onClick(currentPage);
      }}
      className={styles["more__button"]}
      iconRight={arrowDown}
      styleIconsRight={{
        filter: "invert(1)",
        height: 10,
        left: 10,
      }}
      type="button"
    >
      {`Еще ${countCards - 4} совпадений`}
    </Button>
  );
}
