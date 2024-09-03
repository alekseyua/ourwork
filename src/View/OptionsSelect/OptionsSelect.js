import React from 'react'
import styleSelect from './styles/styleselect.module.scss'
import Icon from '../Icon/Icon';
export default function OptionsSelect({
    options = [],
    handlerClick, 
}) {
  return (
    <React.Fragment>
      {options.map((el, i) => {
        const { title, value, className, ...elData } = el;
        return (
          <span
            key={i}
            value={value}
            name={title}
            data-type={"option"}
            data-key_value={el?.key_value}
            data-image={el.image}
            data-icon={el.icon}
            onClick={handlerClick}
            className={styleSelect["select__option-item"]}
            style={{ zIndex: 99999, pointerEvents: "all" }}
            {...elData}
          >
            <Icon src={el.image} width={15} height={15} />
            {title}
          </span>
        );
      })}
    </React.Fragment>
  );
}
