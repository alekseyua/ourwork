import React from 'react';
import classNames from 'classnames';

import example from './styles/example.module.scss';
import Disabled from './styles/disabled.module.scss';
import activeStyle from './styles/active.module.scss';
import styles from './styles/icons.module.scss';
import styleAddClass from './styles/addClass.module.scss';

import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';


/**
 * 
 * @param {
 * size - стилизируем размер кнопки
 * disabled - делаем активную и не активную кнопку
 * hasFocus - 
 * full - закрашеная или пустая
 * circle - 
 * pill - 
 * outline - 
 * variant - передаём вариант стиля кнопки
 * className - задаваемый стиль кнопке из вне
 * addClass - добавляем названия класса 
 * href - используем Link для навигации
 * target - в связке вместе с href для открытия на новой странице
 * onClickIcon - навешиваем событие на иконку
 * classNameIcon - стилизауи
 * } 
 * @returns 
 */
const Button = ({
  id,
  size,
  type,
  full,
  pill,
  href,
  form,
  value,
  circle,
  active,
  target,
  variant,
  outline,
  onClick,
  hasFocus,
  disabled = false,
  iconLeft,
  children,
  addClass,
  dataintro,
  iconRight,
  className,
  styleIconsRight,
  styleIconsLeft,
  datanoClick,
  onClickIcon,
  classNameIcon,
  style,
  helptext,
  ...props
}) => {

  const getVariantStyleBtn = (variant) => {
    switch (variant) {
      case 'example':
        return example['example'];
      default:
        return example['examp']
    }
  }

  const classes = {
    [`button`]: true,
    [`button--${size}`]: !!size,
    [Disabled[`button--disabled`]]: disabled,
    [`button--focused`]: hasFocus,
    [`button--full`]: full,
    [`button--circle`]: circle,
    [`button--pill`]: pill,
    [`button--outline`]: outline,
    [activeStyle['button-blue__container']]: true,
    [activeStyle['button-blue__container--active']]: !!active,

  };

  const customClassName = classNames({
    [getVariantStyleBtn(variant)]: variant !== 'none',
    [className]: !!className,
    [styleAddClass[addClass]]: !!addClass,
    ...classes
  });
  return (
    <>
      {disabled ?
        (
          !href ?
            <button
              style={style}
              form={form}
              type={type}
              id={id}
              value={value}
              className={customClassName}
              datanoclick={datanoClick}
              disabled={disabled}
              {...props}
            >
              {iconLeft ? <Icon slot="icon-right" className={styles[classNameIcon]} style={{ marginRight: `10px`, ...styleIconsLeft }} onClick={onClickIcon} src={iconLeft} width={25} height={25} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={styles[classNameIcon]} style={{ marginLeftt: `10px`, ...styleIconsRight }} onClick={onClickIcon} src={iconRight} width={25} height={25} /> : null}
              {helptext ? helptext : null}
            </button>
            : <Link
              id={id}
              style={style}
              value={value}
              to='#'
              className={customClassName}
              disabled={disabled}
              datanoclick={datanoClick}
              {...props}
            >
              {children}
              {helptext ? helptext : null}
            </Link>
        ) : (
          !href ?
            <button
              id={id}
              form={form}
              type={type}
              style={style}
              value={value}
              onClick={onClick}
              className={customClassName}
              datanoclick={datanoClick}
              {...props}
            >
              {iconLeft ? <Icon slot="icon-right" className={styles[classNameIcon]} style={{ ...styleIconsLeft }} onClick={onClickIcon}src={iconLeft} width={25} height={25} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={styles[classNameIcon]} style={{ ...styleIconsRight }} onClick={onClickIcon}src={iconRight} width={25} height={25} /> : null}
              {helptext ? helptext : null}

            </button>
            : <Link
              style={style}
              id={id}
              value={value}
              to={`${href}`}
              target={target}
              datanoclick={datanoClick}
              onClick={onClick}
              className={customClassName}
              rel="noopener noreferrer"
              {...props}
            >
              {iconLeft ? <Icon slot="icon-right" className={styles[classNameIcon]} style={{ ...styleIconsLeft }} onClick={onClickIcon}src={iconLeft} width={25} height={25} /> : null}
              {children}
              {iconRight ? <Icon slot="icon-left" className={styles[classNameIcon]} style={{ ...styleIconsRight }} onClick={onClickIcon}src={iconRight} width={25} height={25} /> : null}
              {helptext ? helptext : null}
            </Link>
        )}
    </>
  );
};

export default Button;
