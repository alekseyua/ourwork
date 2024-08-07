import React from 'react'
import styleSelect from './styles/styleselect.module.scss'
import OptionsSelect from './OptionsSelect';
export default function OptionsSelectContainerCommon({ options = [],
    handlerClick,  style }) {
  return (
    <div
      className={styleSelect["select__option-container-common"]}
      data-type={"container-option"}
      style={{
        ...style,
      }}
    >
      <OptionsSelect
        options = {options}
        handlerClick = {handlerClick}
      />
    </div>
  );
}
