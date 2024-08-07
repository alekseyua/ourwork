import React, { useRef } from 'react';
import styles from './Default.module.scss';
import addClassStyle from './add-class-checkbox.module.scss';
import classNames from 'classnames';

const variantEnum = {
  default: 'default',
  large: 'large',
  light: 'light',
  switch: 'switch',
  autopayment: 'auto-payment',
};

const getVariantStyleCheckbox = (variant = variantEnum.default) => {
  switch (variant) {
    case variantEnum.large:
      return styles['checkbox__large'];
    case variantEnum.switch:
      return styles['checkbox__switch'];
    case variantEnum.light:
      return styles['checkbox__light'];
    case variantEnum.autopayment:
      return styles['checkbox__auto-payment'];
    default:
      return styles['checkbox__input'];
  }
};

/**
 * 
 * @param {
 *  @!!!!   работает только на -----onChange----- !!!!!!!!
 * classNameLabel - класс для label
 * className - класс для CheckBox
 * 
 * } param0 
 * @returns checked 
 */


const CheckBox = ({
  classNameLabel,
  helpTextStyle = {},
  colorField = false,
  className,
  addClass,
  onChange,
  disabled = false,
  children,
  helptext,
  variant,
  checked,
  value,
  label,
  style = {},
  name,
  id,
  ...props
}) => {
  //todo: чтоб не светился ошибками сделаю мега костыль не бейте пж
  const refCheck = useRef(null);

  const handlerOnChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onChange(refCheck.current)
  }

  if (!checked) {
    checked = false
  } else {
    checked = true
  }

  const classNameCustom = classNames({
    [styles['type-checkbox']]: true,
    [getVariantStyleCheckbox(variant)]: true,
  });

  const classNameLabelCheckBox = classNames({
    [styles['checkbox__label']]: true,
    [classNameLabel]: !!classNameLabel
  })
  return (
    <div
      className={classNames({
        [styles['checkbox__container']]: true,
        [className]: !!className,
        [addClassStyle[addClass]]: !!addClass
      })
      }
      style={style}
      onClick={handlerOnChange}
    >
      {
        colorField ? (
          <span style={{ backgroundColor: colorField }} className={styles['color-field__icon']}></span>
        ) : null
      }
      <input
        key={name}
        onChange={() => { }} //чтобы не ругался реакт
        ref={refCheck}
        type={'checkbox'}
        className={classNameCustom}
        disabled={disabled}
        checked={checked}
        label={label}
        name={name}//iAgreeDataProcessing   ----- name="check" 
        id={id}
        style={{
          pointerEvents: disabled ? 'none' : 'all',
        }}
        value={value}
        {...props}
      />
      <label
        htmlFor={id}
        className={classNameLabelCheckBox}
      >
        <span></span>
        <span>
          {label}
        </span>
      </label>

      {
        helptext ?
          <span
            style={{
              paddingLeft: 27,
              left: -20,
              pointerEvents: disabled ? 'none' : 'all',
              color: `var(--text-color)`,
              position: 'relative',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '18px',
              fontFamily: 'HelveticaNeue',
              ...helpTextStyle
            }}>{helptext}</span>
          : null
      }
      {children}

    </div>
  );
};

export default React.memo(CheckBox);
