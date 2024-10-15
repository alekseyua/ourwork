import React from "react";
import WrapContainer from "../../View/WrapContainer/WrapContainer";
import Input from '../../View/Input/Input';
import { search, settingRedRotation } from "../../images";
import WithSearch from "../../HOC/WithSearch";
import { v4 } from 'uuid';
import IconSvg from "../../View/Icon/IconSvg";

const SearchComponent = ({
  name,
  mode,
  style = {},
  value,
  onBlur,
  onFocus,
  message,
  disabled,
  helptext,
  styleWrap,
  isUpblock,
  isLoading,
  eventInput,
  isIconLeft,
  enteredText = "",
  placeholder = "find_dot",
  setTextSearch,
  stylehelptext,
  onClickInside,
  onClickOutside,
  isUpblockDesktop,
  handlerClickOptions = () => {},
  styleHelpTextSearch = {},
  listResultInteractiveSearch = [],
}) => {
  // console.log({ value, enteredText });
  return (
    <React.Fragment>
      <WrapContainer
        style={{
          ...style,
          ...styleWrap,
        }}
      >
        <Input
          disabled={disabled}
          value={enteredText}
          placeholder={value ?? placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          isUpblock={isUpblock}
          isUpblockDesktop={isUpblockDesktop}
          widthFormInput={`calc(100% - 43px)`}
          topFormInput={"70"}
          height={42}
          mode={mode}
          name={name ?? "q"}
          onClickInside={onClickInside}
          onClickOutside={onClickOutside}
          style={{
            zIndex: 10,
            border: message && `1px solid var(--background-color-button-red)`,
            ...style,
          }}
          styleIcon={{
            minWidth: 22,
            marginTop: 5,
            right: 5,
          }}
          id={`search-` + v4()}
          icon={isIconLeft ? search : null}
          eventInput={eventInput}
          onChange={(e) => {
            const value = e.target.value;
            setTextSearch(value, e);
          }}
          helptext={helptext}
          stylehelptext={stylehelptext}
          isInteractive
          listResultInteractiveSearch={
            listResultInteractiveSearch.length && listResultInteractiveSearch
          }
          handlerClickOptions={handlerClickOptions}
        />
        {isLoading ? (
          <IconSvg
            src={settingRedRotation}
            className="loading__rotation"
            style={{
              position: "absolute",
              right: 10,
              top: 15,
              zIndex: 999,
            }}
          />
        ) : null}
        {message ? (
          <div
            style={{
              position: "absolute",
              top: 47,
              textAlign: "end",
              color: "var(--text-color-red)",
              left: 10,
              zIndex: 9,
              // transition: `top .5s`,
              ...styleHelpTextSearch,
            }}
          >
            {message}
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: 3,
              zIndex: 9,
              transition: `top .5s`,
            }}
          ></div>
        )}
      </WrapContainer>
    </React.Fragment>
  );
};

export default WithSearch(SearchComponent);