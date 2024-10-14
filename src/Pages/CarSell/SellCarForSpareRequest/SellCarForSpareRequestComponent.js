import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { ROOT } from '../../../helpers/config';
import { SET_DATA_CAR_SALE } from '../../../store/car-sale/carSale';
import SellCarForSpareRequest from './SellCarForSpareRequest';

class SellCarForSpareRequestComponent extends Component {
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "sell_car_for_spare",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }),
    });
  }

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };

  handlerChangeDataValues = (values) =>
    this.props.dispatch(SET_DATA_CAR_SALE, { ...values });

  render() {
    return (
      <SellCarForSpareRequest
        dispatch={this.props.dispatch}
        handlerChangeDataValues={this.handlerChangeDataValues}
      />
    );
  }
}

export default connectStoreon(WithRouter(SellCarForSpareRequestComponent));