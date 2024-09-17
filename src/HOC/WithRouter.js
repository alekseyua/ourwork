import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStoreon } from "storeon/react";
import {
  changeStateBackButton,
  smoothTop,
} from "../helpers/helpers";
import {
  initButtomApply,
  saveLastPast,
} from "../helpers/const";
import {
  ACTION_SET_BUTTON_HEADER_ACTION_NULL,
  ACTION_SET_CONTROLL_BUTTON,
  ACTION_SET_TEXT_HEADER,
} from "../store/helpers/helpers-store";
import { ACTION_GET_ACCESSES } from "../store/access/access";
export default function WithRouter(Component) {
  let propsData;
  return (props) => {
    const { tg, dispatch } = useStoreon("tg");
    const navigate = useNavigate();
    const { pathname, state } = useLocation();
    const backButton = tg.BackButton;

    const funBackButton = async function () {
      if (typeof propsData === "function") {
        return propsData();
      } else if (typeof propsData === "string") {
        return navigate(propsData);
      }
    };

    async function controllerHeaderBand({
      currentTextHandlerBand,
      pathBackButton,
      state = {},
    }) {
      currentTextHandlerBand &&
        dispatch(ACTION_SET_TEXT_HEADER, currentTextHandlerBand);
      currentTextHandlerBand && dispatch(ACTION_SET_BUTTON_HEADER_ACTION_NULL);
      propsData = pathBackButton;
      const status = await changeStateBackButton();
      status && backButton.onClick(funBackButton);
    }

    useEffect(() => {
      // Anything in here is fired on component mount.
      dispatch(ACTION_GET_ACCESSES);
      saveLastPast(pathname);

      initButtomApply({
        action: ACTION_SET_CONTROLL_BUTTON,
        dispatch,
        pathname,
        tg,
      });
      
      smoothTop();
      return () => {
        // Anything in here is fired on component unmount.
        backButton.offClick(funBackButton);
      };
    }, [pathname]);

    return (
      <Component
        {...props}
        navigate={navigate}
        controllerHeaderBand={controllerHeaderBand}
        stateNavigate={state}
        pathname={pathname}
      />
    );
  };
}
