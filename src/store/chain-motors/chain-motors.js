import { API_GET_CARDS_MOTORS, API_GET_ONE_CARD_MOTOR, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_MARKET } from "../../helpers/config";
import { handlerWarningInfoMessageResponse } from "../../helpers/helpers";
import { setSessionStore } from "../../helpers/utils";
import { ACTION_GET, _INIT } from "../api-store/getpage"

export const ACTION_GET_LIST_MOTORS_CARS = 'get-list-motors';
export const ACTION_SET_DATA_MOTORS_CHAIN = "set-list-motors";

export const ACTION_GET_ONE_MOTOR_CARD = 'get-one-motor';
export const ACTION_SET_DATA_ONE_MOTOR_CHAIN = "set-one-motor";

export const chainMotors = store => {
    const initMotorsChain = {};
    // get data catalog chain motor
    store.on(_INIT, ()=> ({dataMotorsChain: initMotorsChain}))
    store.on(ACTION_SET_DATA_MOTORS_CHAIN, ({_},data)=>({dataMotorsChain: data}))
    store.on(ACTION_GET_LIST_MOTORS_CARS, ({_}, data, {dispatch}) => {
        const params = {
          url: API_GET_CARDS_MOTORS,
          page: data?.page ?? 1,
          page_size: DEFAULT_PAGE_SIZE_MARKET,
          dataRequst: (res) => {
            setSessionStore("loadDataChainMotor", false);
            const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
            if (isWarning) return;
            if (typeof data?.callback === "function") data.callback();
            dispatch(ACTION_SET_DATA_MOTORS_CHAIN, res);
          },
        };
        setSessionStore("loadDataChainMotor", true);
        dispatch(ACTION_GET, params)
    });
    // get info one card chain motor
    store.on(_INIT, ()=> ({dataOneMotorChain: initMotorsChain}))
    store.on(ACTION_SET_DATA_ONE_MOTOR_CHAIN, ({ _ }, data) => ({
      dataOneMotorChain: data,
    }));
    store.on(ACTION_GET_ONE_MOTOR_CARD, ({ _ }, data, { dispatch }) => {
      const params = {
        url: API_GET_ONE_CARD_MOTOR,
        card_id: data.id,
        dataRequst: (res) => {
          const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
          if (isWarning) return;
          if (typeof data?.callback === "function") data.callback();
          dispatch(ACTION_SET_DATA_ONE_MOTOR_CHAIN, res);
        },
      };
      dispatch(ACTION_GET, params);
    });

}