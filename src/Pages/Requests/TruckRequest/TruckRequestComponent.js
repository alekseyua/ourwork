import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { myRequest } from '../../../images';
import TruckRequest from './TruckRequest';
import { MAKE_REQUEST_MENU, MAKE_REQUEST_OWN_REQUEST } from '../../../helpers/config';
import { ACTION_GET_LIST_BRANDS, ACTION_GET_NEW_LIST_DATA, ACTION_SET_VALUE_UNIT_SPARE, ACTION_SET_VALUE_UNIT_SPARE_NULL } from '../../../store/requests/requests';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';

class TruckRequestComponent extends Component {
  state = {
    type: "truck",
    sub_type: "text",
  };

  componentDidMount() {
    this.props.dispatch(ACTION_GET_LIST_BRANDS);

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Запрос на грузовые",
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

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };

  handlerChangeData = (changeData) => {
    this.props.dispatch(ACTION_GET_NEW_LIST_DATA, { ...changeData });
  };
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
      <TruckRequest
        dispatch={this.props.dispatch}
        handlerChangeDataValues={this.handlerChangeDataValues}
      />
    );
  }
}
export default connectStoreon(
  'listBrands',
  WithRouter(TruckRequestComponent)
);