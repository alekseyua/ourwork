import React, { Component } from "react";
import { connectStoreon } from "storeon/react";
import WithRouter from "../../../HOC/WithRouter";
import { help } from "../../../images";
import IncomingRequestTransport from "./IncomingRequestTransport";
import {
  INCOMING_REQUEST_INFO_SETTING,
  INCOMING_REQUEST_MENU,
} from "../../../helpers/config";
import {
  ACTION_GET_LIST_FILTERS_BY_TYPE,
  ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE,
} from "../../../store/filters/filtersIncominRequest";
import { ACTION_SET_BUTTON_HEADER_ACTION } from "../../../store/helpers/helpers-store";

class IncomingRequestTransportComponent extends Component {
  state = {
    type: "transport",
    messages: ["Вы можете включить получение заявок на грузоперевозки."],
    toolTipAction: {
      isShow: false,
      id: null,
      message: "",
    },
  };
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Услуги по грузоперевозкам",
      pathBackButton: INCOMING_REQUEST_MENU,
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () =>
            this.handlerChangeScreen({ path: INCOMING_REQUEST_INFO_SETTING }),
          iconLeft: help,
          styleIconsLeft: { height: 12 },
          title: "Как настроить?",
          className: "button__orange-white",
        },
      ],
    });
    this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
      type: this.state.type,
      callback: this.callback,
    });
  }
  handlerChangeScreen = ({ path }) => {
    return this.props.navigate(path);
  };

  handlerSelectcardFilter = ({ id, sub_type, type, checked }) =>
    this.props.dispatch(ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE, {
      id,
      sub_type,
      type,
      checked,
    });

  render() {
    return (
      <IncomingRequestTransport
        message={this.state.messages[0]}
        type={this.state.type}
        listCards={this.props.listCardsByType}
        handlerSelectcardFilter={this.handlerSelectcardFilter}
        toolTipAction={this.state.toolTipAction}
      />
    );
  }
}

export default connectStoreon(
  "listCardsByType",

  WithRouter(IncomingRequestTransportComponent)
);
