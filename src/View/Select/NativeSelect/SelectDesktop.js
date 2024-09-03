import React, { useEffect, useState } from 'react';
import classNames from 'classnames';


import styleSelect from './styles/select.module.scss';
import BlackStyle from './styles/blackStyle.module.scss';
import Icon from '../../Icon/Icon';
import { arrowDown } from '../../../images';
import OptionsSelectContainerCommon from '../../OptionsSelect/OptionsSelectContainerCommon';

/**
 * 
 * @param {
 * options:{
 *    title: 'text',
 *    value: 'value'
 * }
 * } param0 
 * @returns 
 */
const SelectDesktop = ({
  className,
  disabled = false,
  addClass,
  label = "",
  id = 1,
  placeholder,
  options = [],
  selectSettings,
  variant,
  children,
  helptext = null,
  onClick = () => { },
  value,
  style,
  ...props
}) => {
  const [active, setActive] = useState(false)
  const [textPlaceholder, setTextPlaceholder] = useState({
    text: placeholder,
    image: '',
    icon: ''
  });

  const handlerClick = (e) => {
    const textItem = e.target.getAttribute('name');
    const textIcon = e.target.getAttribute('data-icon');
    const textImage = e.target.getAttribute('data-image');
    setTextPlaceholder({
      text: textItem,
      image: textImage ? textImage : '',
      icon: textIcon ? textIcon : ''
    })
    onClick(e)
  }

  const variantEnum = {
    default: 'default',
    black: 'black',
  };

  const getVariantStyleSelect = (variant = variantEnum.default) => {
    switch (variant) {
      case 'select-theme__black-full':
        return BlackStyle['select__btn'];
      case 'select-feedback':
        return styleSelect['select-feedback']
      default:
        return styleSelect['select'];
    }
  };

  const customClassName = classNames({
    [styleSelect['select__body']]: true,
    [styleSelect['select__body--active']]: active,
    [styleSelect['select__disable']]: disabled,
    [styleSelect[getVariantStyleSelect(variant)]]: !!variant,
    [styleSelect[className]]: !!className,
    [styleSelect[addClass]]: !!addClass,

  });

  const handlerChangeList = () => {
    setActive(c => !c)
  }

  useEffect(() => {
    if (!!!value) setTextPlaceholder({
      text: placeholder,
      image: '',
      icon: ''
    })
  }, [value])

  useEffect(() => {
    setTimeout(() => {
      if (!disabled && value) setTextPlaceholder({
        text: placeholder,
        image: '',
        icon: ''
      })
    }, 3000)
  }, [disabled])

  useEffect(() => {
    const handleClickLayout = (e) => {
      const element = e.target;
      element.getAttribute('name') === `select-${id}` && !active ? setActive(true) : setActive(false)
    }
    document.addEventListener('click', handleClickLayout)
    return () => document.removeEventListener('click', handleClickLayout)
  }, [])

  return (
    <div className={styleSelect["select__container"]} style={style}>
      <label className={styleSelect["select__label"]}>{label}</label>
      <div
        name={`select-${id}`}
        className={customClassName}
        onClick={handlerChangeList}
      >
        <span>
          {textPlaceholder.image ? (
            <Icon src={textPlaceholder.image} width={15} height={15} />
          ) : null}
        </span>
        <span>{textPlaceholder.text}</span>
        {textPlaceholder.icon ? (
          <Icon src={textPlaceholder.icon} width={15} height={15} />
        ) : null}
        <div
          className={classNames({
            [styleSelect["select__option-container"]]: true,
            [styleSelect["select__option-container--active"]]: active,
          })}
        >
          {options.length ? (
            <OptionsSelectContainerCommon
              options={options}
              handlerClick={handlerClick}
            />
          ) : null}
        </div>
      </div>

      <Icon
        className={classNames({
          [styleSelect["select__icon"]]: true,
          [styleSelect["select__icon--active"]]: active,
        })}
        slot="suffix"
        id={"droppown-select"}
       src={arrowDown}
        width={10}
        height={10}
        invert={0}
      />
      {helptext ? helptext : null}
    </div>
  );
};

export default React.memo(SelectDesktop);
