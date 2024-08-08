import React from "react";
import styles from './styles/footer.module.scss';
import Icon from "../../View/Icon/Icon";
import WrapContainerFooterMenu from "../../View/Footer/WrapContainerFooterMenu";
import WrapItemFooterMenu from "../../View/Footer/WrapItemFooterMenu";
import BadgeFavoriteMenu from "../../View/Badges/BadgeFavoriteMenu/BadgeFavoriteMenu";

const Footer = ({
  style = {},
  isBlur,
  idPage,
  isFavorite,
  listMenuFooter,
  statusLoadingData,
  handlerChangeScreen,
}) => {
  console.log(listMenuFooter)
  return (
    <footer
      style={{
        display: "block",
        position: "fixed",
        bottom: 0,
        zIndex: 999,
      }}
    >
      <div
        className={styles["footer__menu-wrap--bottom"]}
        style={{
          ...style,
          padding: 0,
          filter: isBlur ? "blur(5px)" : "blur(0px)",
        }}
      >
        {listMenuFooter.length ? (
          <WrapContainerFooterMenu>
            {listMenuFooter
              ?.filter((item) => item.isFooter)
              .map((el, index) => {
                return (
                  <WrapItemFooterMenu
                    key={`footer-${index}`}
                    style={{
                      opacity: el.isActive ? 1 : 0.5,
                    }}
                    isFavorite={isFavorite}
                    onClick={() => handlerChangeScreen({ path: el.slug })}
                    // onClick={() => !statusLoadingData && handlerChangeScreen({ path: el.slug })}
                  >
                    <Icon
                      image={el.image}
                      height={20}
                      width={20}
                      // addClass={
                        // idPage === +el.id
                        // ? "icon__bg-roze-38-checked-footer"
                        // : "icon__bg-dark-red"
                      // }
                    />
                    <span className={styles["footer__menu-bottom-title"]}>{el.text}</span>
                    {isFavorite && el.id === 3 ? <BadgeFavoriteMenu /> : null}
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