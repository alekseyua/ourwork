import React, { useEffect, useState } from "react";
import {Modal, View, Pressable, Text, StyleSheet } from 'react-native-web';

import { Outlet } from "react-router-dom";
import Footer from "../../Components/Component.Footer/Footer";

import { useStoreon } from "storeon/react";
import Icon from "../../View/Icon/Icon";

import { funcDelay, redirectPages } from "../../helpers/const";
import { checkAccess, getLocaleStore, isAuth, isElectron, isIos, isLinux } from "../../helpers/utils";
import WithRouter from "../../HOC/WithRouter";
import { menuFooter} from "../../helpers/config";
import Offset from "../../View/Offset";
import HeaderComponent from "../../Components/Component.Header/HeaderComponent";
import { attentionError, done } from "../../images";
import ButtonApplyContainer from "../../Components/ButtonApplySection/ButtonApplyContainer";
import { ACTION_CLOSE_MODAL } from "../../store/helpers/helpers-store";
import WrapModalContext from "../../View/WrapContainer/WrapModalContext";


const Layout = ({
    navigate,
    pathname
}) => {
    const {
      modal,
      dispatch,
      access,
      isBlur,
      favoriteMPCards,
      controllButton,
    } = useStoreon(
      "modal",
      "tg",
      "access",
      "isBlur",
      "favoriteMPCards",
      "controllButton"
    );
    const [idPage, setIdPage] = useState(null)
    const closeModal = () => {
        dispatch(ACTION_CLOSE_MODAL)
    }

    useEffect(() => {
        const fullUrl = window.location.href;
        redirectPages({ url: fullUrl, navigate, dispatch });
    }, [])

    useEffect(() => {
        funcDelay(() =>{            
          setIdPage(+getLocaleStore('itemMenu'))
        }, 100)
    }, [pathname])

    const styles = StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: `#0000008c`,
        backdropFilter: `blur(5px)`,
      },
      modalView: {
        minWidth: 300,
        minHeight: 216,
        opacity: 1,
        backgroundColor: `var(--bg-block)`,
        margin: 20,
        borderRadius: 20,
        alignItems: "center",
        boxShadowColor: "#000",
        boxShadowOffset: {
          width: 0,
          height: 2,
        },
        boxShadowOpacity: 0.25,
        boxShadowRadius: 4,
        elevation: 5,
        overflowY: "overlay",
        maxHeight: "92%",
        zIndex: 999,
        // test: 'hz',
      },
      button: {
        paddingTop: 19,
        paddingBottom: 19,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 2,
        minWidth: `100%`,
        minHeight: 48,
        maxHeight: 48,
        border: `1px solid var(--border-color)`,
        borderRadius: 12,
        backgroundColor: `var(--background-color-mirage-blue)`,
      },
      buttonCloseCancel: {
        border: `1px solid var(--red-color)`,
      },
      textStyle: {
        color: `var(--text-color-white)`,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-family-default)",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
      },
      textStyleCancel: {
        color: `var(--text-color-white)`,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-family-default)",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "normal",
      },

      modalText: {
        fontFamily: "var(--font-family-default)",
        fontWeight: 500,
        width: "100%",
        fontSize: 17,
        lineHeight: 22,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        letterSpacing: "0px",
        justifyContent: "center",
      },
      containerBtn: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignSelf: "baseline",
      },
    });

    const handlerChangeScreen = ({ path, state = {} }) => {
        navigate(path, { state: state })
    }
    return (
      <React.Fragment>
        <div className={"container"}>
          <Modal
            style={{
              backdropFilter: `blur(5px)`,
              justifyContent: "center",
            }}
            animationType="slide"
            propagateSwipe={true}
            transparent={true}
            visible={modal.show}
            onRequestClose={() => {
              closeModal();
              modal.path &&
                navigate(modal.path, {
                  ...(modal?.state ?? {}),
                });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {!modal?.hideIcon ? (
                  <>
                    <Offset mb={42} />
                    <Icon
                     src={
                        modal?.icon
                          ? modal?.icon
                          : modal?.error
                          ? attentionError
                          : done
                      }
                      width={35}
                      height={35}
                      mb={15}
                    />
                  </>
                ) : (
                  <Offset mb={15} />
                )}

                <Text
                  style={[
                    styles.modalText,
                    {
                      color: modal?.error ? "#ff0000" : "var(--text-color)",
                    },
                  ]}
                >
                  <WrapModalContext>{modal.content ?? ""}</WrapModalContext>
                </Text>
                {!modal?.hideControll ? (
                  <WrapModalContext>
                    <View
                      style={[
                        styles.containerBtn,
                        {
                          width: modal?.contentCancelBtn ? "49%" : "100%",
                          alignItems: "center",
                        },
                      ]}
                    >
                      {modal?.contentCancelBtn ? (
                        <Pressable
                          style={[styles.button, styles.buttonCloseCancel]}
                          onPress={() => {
                            modal?.actionCancelOk && modal.actionCancelOk(true);
                            closeModal();
                          }}
                        >
                          <Text style={styles.textStyleCancel}>
                            {modal?.contentCancelBtn ?? "Отмена"}
                          </Text>
                        </Pressable>
                      ) : null}
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          modal?.path &&
                            navigate(modal.path, {
                              ...(modal?.state ?? {}),
                            });
                          modal?.actionClickOk && modal.actionClickOk(true);
                          closeModal();
                        }}
                      >
                        <Text style={styles.textStyle}>
                          {modal?.contentBtn ?? "Ок"}
                        </Text>
                      </Pressable>
                    </View>
                  </WrapModalContext>
                ) : null}
              </View>
            </View>
          </Modal>
            <HeaderComponent
              isBlur={isBlur}
              handlerChangeScreen={handlerChangeScreen}
            />
          <main className={"main-context"}>
 
            <span className="goto"></span>
            <React.Suspense fallback="loading...">
              <Outlet />
              <ButtonApplyContainer />
              <Offset mb={"var(--margin-bottom-isselect)"} />
            </React.Suspense>
          </main>
            <Footer
              isBlur={isBlur}
              idPage={idPage}
              listMenuFooter={checkAccess(menuFooter, access)}
              handlerChangeScreen={handlerChangeScreen}
              style={{ height: isIos()? 70 : 50, padding: isIos()? '0 15px 15px' : 0 }}
              isFavorite={!!favoriteMPCards?.count}
              statusLoadingData={controllButton.isFetch}
            />
        </div>
      </React.Fragment>
    );
}


export default WithRouter(Layout);