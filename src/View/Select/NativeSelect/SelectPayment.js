import React, { useEffect, useState } from 'react';
import classNames from 'classnames';


import styleSelect from './styles/select.module.scss';
import BlackStyle from './styles/blackStyle.module.scss';

import { arrowDown } from '../../../images';
import Icon from '../../Icon/Icon';


const SelectPayment = ({
  className,
  disable = false,
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
  styleIcon = {},
  name,
  showDiscount,
  ...props
}) => {
  /**
   * @param {
   *  onClick - возращает значение по элементу option
   * onClick={(e) => {
   *     const value = e.target.getAttribute('value');
   *   }}
   *  option - [
   *  {
   *    title: 'title',
   *    value: 'value'
   *  }
   * ]
   *  id: num - чтобы открывались уникально
   *  placeholder - текст в initial титуле
   *  
   * } @values
   * @return 
   */


  const [active, setActive] = useState(false)
  const [textPlaceholder, setTextPlaceholder] = useState({
    text: placeholder,
    image: '',
    icon: ''
  });

  const handlerClick = (e) => {
    // if(!e?.target?.value) return
    const textItem = e.target.getAttribute('name');
    // const textItem = e.target.value;
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
    [styleSelect['select__disable']]: disable,
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
      if (!disable && value) setTextPlaceholder({
        text: placeholder,
        image: '',
        icon: ''
      })
    }, 3000)
  }, [disable])

  useEffect(() => {
    const handleClickLayout = (e) => {
      const element = e.target;
      element.getAttribute('name') === `select-${id}` && !active ? setActive(true) : setActive(false)
    }
    document.addEventListener('click', handleClickLayout)
    return () => document.removeEventListener('click', handleClickLayout)
  }, [])

  return (
    <div
      className={styleSelect['select__container']}
      style={style}
    >
      <label
        className={styleSelect['select__label']}
      >{label}</label>
      <div
        name={`select-${id}`}
        className={customClassName}
        onClick={handlerChangeList}
      >
        <span>
          {
            textPlaceholder?.image ?
              <Icon image={textPlaceholder.image} width={15} height={15} />
              : null
          }
        </span>
        <span>
          {<span dangerouslySetInnerHTML={{ __html: textPlaceholder.text }}></span>}
        </span>
        {
          textPlaceholder.icon ?
            <Icon image={textPlaceholder.icon} width={15} height={15} />
            : null
        }
        <div
          className={classNames({
            [styleSelect['select__option-container']]: true,
            [styleSelect['select__option-container--active']]: active
          })
          }
        >

          {
            options.map((el, i) => {
              const { title, title_price, title_old_price, value, className, ...elData } = el;
              return (
                <span
                  key={i}
                  value={value}
                  name={`${title}  ${title_price} ₽`}
                  data-key_value={el?.key_value}
                  data-image={el.image}
                  data-icon={el.icon}
                  onClick={handlerClick}
                  className={styleSelect["select__option-item"]}
                  {...elData}
                >
                  <div>
                    <Icon image={el.image} width={15} height={15} />
                    {title} {title_price}
                    {"₽ "}
                    <span>
                      {showDiscount && title_old_price
                        ? `${title_old_price}₽`
                        : null}
                    </span>
                  </div>
                </span>
              );
            })
          }
        </div >
      </div>

      <Icon
        className={classNames({
          [styleSelect['select__icon']]: true,
          [styleSelect['select__icon--active']]: active
        })
        }
        slot="suffix"
        id={'droppown-select'}
        image={arrowDown}
        width={10}
        height={10}
        invert={0}
        style={styleIcon}


      />
      {
        helptext ?
          helptext
          : null
      }
    </div>
  );
};

export default React.memo(SelectPayment);
