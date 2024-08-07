import React from 'react';
import Raiting from './RaitingView/Raiting';

const RaitingContainer = ({
  disabled,
  onChange = () => { },
  getSymbol,
  max,
  gap,
  value,
  label,
  onBlur,
  reverse,
  helptext,
  readonly,
  styleStar,
  precision,
  stylehelptext,
  countRaiting,
  sizeStarWidth,
  backgroundFone,
  sizeStarHeight,
  isBorderDigital,
}) => {


  return (
    <Raiting
      max={max}
      gap={gap}
      label={label}
      onBlur={onBlur}
      reverse={reverse}
      readonly={readonly}
      disabled={disabled}
      onChange={onChange}
      helptext={helptext}
      styleStar={styleStar}
      precision={precision}
      ActiveStar={value}
      countRaiting={countRaiting}
      stylehelptext={stylehelptext}
      sizeStarWidth={sizeStarWidth}
      backgroundFone={backgroundFone}
      sizeStarHeight={sizeStarHeight}
      isBorderDigital={isBorderDigital}
    />
  );
};

export default React.memo(RaitingContainer);
