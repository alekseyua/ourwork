import { useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";
import { getListOption } from "../../../helpers/helpers";
import styles from './styles/option-select.module.scss';


const OptionSelect = ({
  pt = 0,
  pb = 0,
  pl = 11,
  pr = 5,
  mt,
  mb,
  ml,
  mr,
  id,
  data = [],
  name = "select",
  onBlur = () => {},
  enabled = true,
  onChange,
  helptext = "",
  placeholder,
  stylehelptext = {},
  clearValue,
}) => {
  let [offsetTop, setOffsetTop] = useState(false);
  const selectRef = useRef(null)

  const handlerIsOpenMenu = (status) => {
    if (status) {
     return setOffsetTop(true)
    }
    setOffsetTop(false)
  }
  
  useEffect(() => {
    if (clearValue) {
      selectRef.current.setValue({label: placeholder})
    }
  }, [clearValue]);

  return (
    <div
      // style={styles.container}
      className={
        offsetTop
          ? styles["option-select__container--offset-top"]
          : styles["option-select__container"]
      }
    >
      <ReactSelect
        classNamePrefix="react-select"
        options={getListOption(data)}
        hideSelectedOptions={true} // убераем выбраные опции из списка
        isDisabled={!enabled}
        menuPlacement={"auto"}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        maxMenuHeight={400}
        ref={selectRef}
        onMenuOpen={(e) => handlerIsOpenMenu(true)}
        onMenuClose={(e) => handlerIsOpenMenu(false)}

        // unstyled={true}
        // menuShouldBlockScroll={true}
      />
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
    </div>
  );
};

export default OptionSelect;