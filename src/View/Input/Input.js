import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles/input.module.scss';
import Icon from '../Icon/Icon';
import { delay, rundomId } from '../../helpers/const';
import { autoFocusFormInput, removeFocusFormInput } from '../../helpers/utils';
import { useStoreon } from 'storeon/react';
import OptionsSelectContainerSearch from '../OptionsSelect/OptionsSelectContainerSearch';
import useClickInside from '../../HOC/useClickInside';
import useClickOutside from '../../HOC/useClickOutside';
import Label from '../Label/Label';
import Offset from '../Offset';
import PhoneInput from 'react-phone-number-input/input';

const Input = ({
  id,
  icon,
  type = "text",
  name,
  style = {},
  label,
  height = 20,
  value,
  mode='input',
  onBlur = () => {},
  onFocus = () => {},
  onClick = () => {},
  variant,
  disabled = false,
  children,
  inputRef = null,
  onChange,
  helptext,
  addClass,
  className,
  isUpblock,
  multiline = false,
  maxLength = 60,
  autoFocus,
  styleIcon = {},
  iconRight,
  eventInput,
  placeholder,
  distationtop = 0,
  autocomplete = "off",
  stylehelptext = {},
  styleIconRight = {},
  styleLabel,
  topFormInput = 0,
  isInteractive,
  widthFormInput,
  isUpblockDesktop,
  listResultInteractiveSearch,
  handlerClickOptions = () => {},
  onClickInside = () => {},
  onClickOutside = () => {},

  ...props
}) => {
  const [isFocuse, setIsFocuse] = useState(false);
  
  const clickRef = React.useRef();
  useClickInside(clickRef, (e) => {
    onClickInside(e);

  });
  useClickOutside(clickRef, (e) => {
    onClickOutside(e);
  });
  const { dispatch } = useStoreon();
  const idInput = id ?? rundomId();
  const handlerOnBlur = (e) => {
    onBlur(e);
    setIsFocuse(false);
  };
  const handlerOnFocus = (e) => {
    onFocus(e);
    setIsFocuse(true);
  };
  return (
    <>
      {/* {label && (
        <label
          id={id ? `label${id}` : rundomId()}
          style={{
            position: "relative",
            transition: `height 0.4s ease 0s`,
          }}
          className={styles["input__label"]}
        >
          {label}
        </label>
      )} */}
      {label && (
        // <span className={styles['textarea__label']} >{label}</span>
        <Label
          style={{
            filter: isFocuse ? `blur(0)` : `blur(var(--filter-blur))`,
            ...styleLabel,
          }}
        >
          {label}
        </Label>
      )}
      {label && <Offset mb={7} />}
      <div
        className={classNames({
          [styles["input__wrapper"]]: true,
          [styles[className]]: !!className,
          [addClass]: !!addClass,
        })}
        data-type={"wrap-input"}
        style={{
          height: height,
          pointerEvents: "none",
          ...style,
        }}
      >
        {icon && (
          <Icon
            invert={0}
           src={icon}
            width={14}
            height={14}
            mt={17}
            ml={10}
            style={{
              pointerEvents: "none",
              ...styleIcon,
            }}
          />
        )}
        {mode === "input" ? (
          <input
            disabled={disabled}
            id={idInput}
            autoComplete={autocomplete}
            ref={clickRef}
            type={type}
            data-type={"input"}
            distationtop={distationtop}
            autoFocus={null}
            style={{
              transform: icon
                ? "translate(-43%, -45%)"
                : placeholder
                ? "translate(-53%, -45%)"
                : "translate(-48%, -45%)",
              height: "100%",
              width: icon ? "97%" : "90%",
            }}
            onClick={(e) => onClick(e)}
            // onKeyPress={handleKeyPress}
            onKeyDown={(ev) => {
              eventInput && eventInput(ev);
              ev.key === "Enter" && ev.target.blur();
            }}
            onBlur={async (e) => {
              handlerOnBlur(e);
              await delay(200);
              removeFocusFormInput(e, dispatch, isUpblock, isUpblockDesktop);
            }}
            onFocus={(e) => {
              try {
                autoFocusFormInput(
                  e,
                  dispatch,
                  isUpblock,
                  isUpblockDesktop,
                  widthFormInput,
                  topFormInput
                );
                handlerOnFocus(e);
              } catch (error) {
                console.log(error);
              }
            }}
            // onBlur={onBlur}
            className={styles["input__input"]}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              try {
                onChange(e);
              } catch (error) {
                console.log(error);
              }
            }}
            name={name}
          />
        ) : mode === "phone" ? (
          <div>
            <PhoneInput
              disabled={disabled}
              id={idInput}
              autoComplete={autocomplete}
              ref={clickRef}
              type={type}
              data-type={"input"}
              distationtop={distationtop}
              autoFocus={null}
              placeholder={placeholder ?? "+7 (000) 000-00-00"}
              value={value}
              className={styles["input__input-phone"]}
              onClick={(e) => onClick(e)}
              onKeyDown={(ev) => {
                eventInput && eventInput(ev);
                ev.key === "Enter" && ev.target.blur();
              }}
              onBlur={async (e) => {
                handlerOnBlur(e);
                await delay(200);
                removeFocusFormInput(e, dispatch, isUpblock, isUpblockDesktop);
              }}
              onFocus={(e) => {
                autoFocusFormInput(
                  e,
                  dispatch,
                  isUpblock,
                  isUpblockDesktop,
                  widthFormInput,
                  topFormInput
                );
                handlerOnFocus(e);
              }}
              onChange={(e) => onChange(e)}
              name={name ?? "phone"}
            />
          </div>
        ) : null}
        {iconRight && (
          <Icon
            invert={0}
           src={iconRight}
            style={{
              right: 0,
              position: "absolute",
              ...styleIconRight,
            }}
            mt={18}
            mr={18}
          />
        )}
        {children}
        {helptext ? (
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: 0,
              ...stylehelptext,
            }}
          >
            {helptext}
          </div>
        ) : null}
        {isInteractive && listResultInteractiveSearch.length ? (
          <OptionsSelectContainerSearch
            options={listResultInteractiveSearch}
            handlerClick={(e) =>
              handlerClickOptions(e, () =>
                removeFocusFormInput(
                  { target: document.querySelector(`#${idInput}`) },
                  dispatch,
                  isUpblock,
                  isUpblockDesktop
                )
              )
            }
            style={{
              pointerEvents: "all",
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default Input;