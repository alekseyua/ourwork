import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { myRequest } from '../../../images';
import RespairRequest from './RespairRequest';
import { MAKE_REQUEST_MENU, MAKE_REQUEST_OWN_REQUEST } from '../../../helpers/config';
import { ACTION_GET_LIST_COUNTRY, ACTION_SET_VALUE_UNIT_SPARE, ACTION_SET_VALUE_UNIT_SPARE_NULL } from '../../../store/requests/requests';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';

class RespairRequestComponent extends Component {
  state = {
    type: "respair",
    sub_type: "country-text",
  };

  componentDidMount() {
    this.props.dispatch(ACTION_GET_LIST_COUNTRY);

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "ЗАПРОС НА РЕМОНТ",
      pathBackButton: () =>
        this.handlerChangeScreen({ path: MAKE_REQUEST_MENU }),
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () =>
            this.handlerChangeScreen({ path: MAKE_REQUEST_OWN_REQUEST }),
          iconLeft: myRequest,
          styleIconsLeft: { height: 12 },
          title: "Мои запросы",
          className: "button__controll--roze",
        },
      ],
    });
  }

  handlerChangeScreen = ({ path }) => this.props.navigate(path);

  handlerChangeDataValues = (values) =>
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE, {
      type: this.state.type,
      sub_type: this.state.sub_type,
      ...values,
    });
  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE_NULL);
  }
  render() {
    return (
      <RespairRequest
        listCountries={this.props.listCountries}
        dispatch={this.props.dispatch}
        handlerChangeDataValues={this.handlerChangeDataValues}
        listSectionTabs={this.state.listSectionTabs}
        action_tab={this.state.action_tab}
      />
    );
  }
}
export default connectStoreon(
  'listCountries',
  WithRouter(RespairRequestComponent)
);