import { handlerWarningInfoMessageResponse } from "../../helpers/helpers";
import { API_CREATE_REVIEW } from "../../helpers/config";
import { _INIT, ACTION_POST } from "../api-store/getpage";
import { ACTION_OPEN_MODAL, ACTION_SET_CONTROLL_BUTTON, ACTION_SET_CONTROLL_BUTTON_NULL } from "../helpers/helpers-store";
import { docSuccess } from "../../images";

export const ACTION_SET_INPUT_TEXT_FEEDBACK = 'setInputTextFeedback'
export const ACTION_SET_INPUT_TEXT_FEEDBACK_NULL = 'setInputTextFeedbackNULL'
export const ACTION_SEND_MESSAGE_FEEDBACK = 'sendMessageFeedback'


export const feedback = store => {
  // ****************************************************************************
  store.on(_INIT, () => ({ textInputFeedback: '' }));
  store.on(ACTION_SET_INPUT_TEXT_FEEDBACK_NULL, () => ({ textInputFeedback: '' }));
  store.on(ACTION_SET_INPUT_TEXT_FEEDBACK, (_, data, { dispatch }) => {
    if (data.length) {
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: true,
        action: () => {
          dispatch(ACTION_SET_CONTROLL_BUTTON_NULL)
          dispatch(ACTION_SEND_MESSAGE_FEEDBACK)
        }
      })
    } else {
      dispatch(ACTION_SET_CONTROLL_BUTTON, {
        isActive: false,
      })
    }
    return { textInputFeedback: data }
  })
  store.on(ACTION_SEND_MESSAGE_FEEDBACK, ({textInputFeedback}, data, { dispatch }) => {
    const params = {
      ...data,
      text: textInputFeedback,
      url: API_CREATE_REVIEW,
      dataRequst: (res) => {
        dispatch(ACTION_SET_INPUT_TEXT_FEEDBACK_NULL);
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;
        if (typeof data?.callback === "function") data.callback();
        dispatch(ACTION_OPEN_MODAL, {
          show: res?.info?.status,
          content: res?.info?.message,
          contentBtn: "Ок",
          error: !res?.info?.status,
          icon: docSuccess,
        });
      },
    };
    dispatch(ACTION_POST, params);
  })


}