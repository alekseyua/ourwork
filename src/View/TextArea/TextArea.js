import classNames from "classnames";
import React, { useState } from "react";

import styles from "./style/textarea.module.scss";
import { rundomId } from "../../helpers/const";
import { useStoreon } from "storeon/react";
import { autoFocusFormInput, removeFocusFormInput } from "../../helpers/utils";
import Label from "../Label/Label";
import Offset from "../Offset";
import useClickInside from "../../HOC/useClickInside";
import useClickOutside from "../../HOC/useClickOutside";
import { useTranslation } from "react-i18next";

/**
 * @param {placeholder,
 *      className
 *      helptext
 *      label
 *      value
 *      name
 *      onChange
 *      onBlur
 * } param0
 * @returns
 *
 */

const TextArea = ({
  id,
  mb = 0,
  name,
  label,
  value,
  isUpblock,
  isUpblockDesktop,
  style = {},
  onBlur = () => {},
  height,
  onFocus = () => {},
  onChange = () => {},
  helptext,
  disabled,
  addClass,
  maxLength = 1500,
  className,
  styleLabel,
  placeholder,
  topFormInput = 0,
  widthFormInput = "calc(100vw - 38px)",
  stylehelptext,
  onClickInside = () => {},
  onClickOutside = () => {},
}) => {
  const {t} = useTranslation()
  const { dispatch } = useStoreon();
  const [isFocuse, setIsFocuse] = useState(false);
  const clickRef = React.useRef();
  useClickInside(clickRef, (e) => {
    onClickInside(e);
  });
  useClickOutside(clickRef, (e) => {
    onClickOutside(e);
  });
  const styleTextarea = classNames({
    [addClass]: !!addClass,
    [styles["textarea__container"]]: true,
    [styles[className]]: !!className,
  });

  const handlerOnBlur = (e) => {
    onBlur(e);
    setIsFocuse(false);
  };
  const handlerOnFocus = (e) => {
    onFocus(e);
    setIsFocuse(true);
  };

  return (
    <React.Fragment>
      <div
        id={"text-aria"}
        style={{
          position: "relative",
          transition: `height 0.8s ease 0s`,
        }}
      ></div>
      {label && (
        // <span className={styles['textarea__label']} >{label}</span>
        <Label
          style={{
            filter: isFocuse ? `unset` : `blur(var(--filter-blur))`,
            ...styleLabel,
          }}
        >
          {t(label)}
        </Label>
      )}
      {label && <Offset mb={10} />}
      <div
        className={styleTextarea}
        style={{
          pointerEvents: disabled ? "none" : "all",
          filter: isFocuse ? `unset` : `blur(var(--filter-blur))`,

          ...style,
        }}
      >
        <textarea
          id={id ?? rundomId()}
          className={styles["textarea__textarea"]}
          placeholder={t(placeholder)}
          value={value}
          name={name}
          ref={clickRef}
          onChange={(e) => {
            try {
              onChange(e);
            } catch (error) {
              throw error;
            }
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
          onBlur={(e) => {
            handlerOnBlur(e);
            removeFocusFormInput(e, dispatch, isUpblock, isUpblockDesktop);
          }}
          style={{
            height: height ? `${height}px` : "none",
            backgroundColor: "transparent",
            color: `var(--text-color-blue)`,
          }}
        />
      </div>
      <div
        id={"text-aria"}
        style={{
          position: "relative",
          transition: `height 0.8s ease 0s`,
        }}
      >
        {helptext ? (
          <span
            className={styles["textarea__help-text"]}
            style={{
              position: "absolute",
              bottom: -18,
              left: 0,
              filter: isFocuse ? `blur(0)` : `blur(var(--filter-blur))`,

              ...stylehelptext,
            }}
          >
            {helptext}
          </span>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default TextArea;
