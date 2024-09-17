import React from "react";
import styles from "./styles/lang.module.scss";
import ReactSelect from "react-select";

const Control = ({ children, ...props }) => (
  <div className={styles["lang__control-lang"]}>
    {children}
  </div>
);



const LangView = ({ langList, handlerLang }) => {
console.log({...langList})
  return (
    <div className={styles["lang__lang-container"]}>
      { langList.filter((el) => el.isActive)[0] &&
        <ReactSelect
        options={langList}
        defaultValue={langList.filter((el) => el.isActive)[0]}
        components={{ Control }}
        onMenuOpen={() =>
          document.documentElement.style.setProperty(
            "--header-overflow",
            "reset"
          )
        }
        onMenuClose={() =>
          document.documentElement.style.setProperty(
            "--header-overflow",
            "hidden"
          )
        }
        onChange={handlerLang}
        hideSelectedOptions={true}
      />
    }
    </div>
  );
};

export default LangView;
