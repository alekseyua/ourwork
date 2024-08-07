import React from 'react'
import styleSelect from './styles/styleselect.module.scss'
import OptionsSelect from './OptionsSelect';
export default function OptionsSelectContainerSearch({ options = [], handlerClick, style }) {
  console.log({options})
  return (
    <div
      className={styleSelect["select__option-container"]}
      data-type={"container-option"}
      style={{
        ...style,
      }}
    >
      <OptionsSelect options={options} handlerClick={handlerClick} />
    </div>
  );
}
