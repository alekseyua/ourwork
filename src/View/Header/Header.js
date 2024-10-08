import React from "react";
import classNames from "classnames";
import styles from './styles/header.module.scss';
import Button from "../Button/Button";
import WrapContainer from "../WrapContainer/WrapContainer";
import i18n from "../../lang/i18n";

const Header = ({
  isBlur,
  isFocus,
  textHeader,
  buttonHeaderAction,
  headerLang,
}) => {
  return (
    <header
      className={"main-context-header"}
      style={
        {
          // top: isFocus? -60 : 0
        }
      }
    >
      <WrapContainer
        style={{
          filter: isBlur ? "blur(5px)" : "blur(0px)",
        }}
      >
        <div
          className={classNames({
            [styles["header__wrap-discription"]]: true,
          })}
        >
          <div className={styles["header__wrap-container-heaider"]}>
            <p className={styles["header__title"]}>
              {!!textHeader &&
                i18n.t(textHeader)[0].toUpperCase() +
                  i18n.t(textHeader)?.slice(1).toLowerCase()}
            </p>
            {buttonHeaderAction.isVisible && (
              <div className={styles["header__action"]}>
                {buttonHeaderAction.buttons.map((button, i) => {
                  return (
                    <Button
                      addClass={button.className} //{'button__controll--red'}
                      iconLeft={button?.iconLeft}
                      style={button?.style ?? {}}
                      styleIconsLeft={button?.styleIconsLeft}
                      styleIconsRight={button?.styleIconsRight}
                      onClick={button.action}
                      iconRight={button?.iconRight}
                      key={i}
                    >
                      <p>{button.title}</p>
                    </Button>
                  );
                })}
              </div>
            )}

            {headerLang.isVisible ? <headerLang.Element /> : null}
          </div>
        </div>
      </WrapContainer>
    </header>
  );
};

export default Header;


