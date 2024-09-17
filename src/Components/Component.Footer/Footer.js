import React from "react";
import styles from './styles/footer.module.scss';
import Icon from "../../View/Icon/Icon";
import WrapContainerFooterMenu from "../../View/Footer/WrapContainerFooterMenu";
import WrapItemFooterMenu from "../../View/Footer/WrapItemFooterMenu";

const Footer = ({
  style = {},
  isBlur,
  idPage,
  isFavorite,
  listMenuFooter,
  statusLoadingData,
  handlerChangeScreen,
}) => {
  return (
    <footer
      style={{
        display: "block",
        zIndex: 999,
      }}
    >
      <div
        className={styles["footer__menu-wrap--bottom"]}
        style={{
          ...style,
          filter: isBlur ? "blur(5px)" : "blur(0px)",
        }}
      >
        {listMenuFooter.length ? (
          <WrapContainerFooterMenu>
            {listMenuFooter
              ?.filter((item) => item.isFooter)
              .map((el, index) => {
  console.log(window.location.href.includes(el.slug), );
    console.log(window.location.pathname, ' === ', el.slug);

                return (
                  <WrapItemFooterMenu
                    key={`footer-${index}`}
                    style={{
                      opacity: el.isActive ? 1 : 0.5,
                    }}
                    isFavorite={isFavorite}
                    onClick={() => handlerChangeScreen({ path: el.slug })}
                  >
                    <Icon src={el.image} height={20} width={20} />
                    <span
                      className={
                        window.location.pathname === el.slug
                          ? styles["footer__menu-bottom-title--active"]
                          : styles["footer__menu-bottom-title"]
                      }
                    >
                      {el.text}
                    </span>
                  </WrapItemFooterMenu>
                );
              })}
            {/* <ButtonElectron /> */}
          </WrapContainerFooterMenu>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;