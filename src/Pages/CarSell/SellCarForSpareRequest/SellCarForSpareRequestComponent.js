import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { ROOT } from '../../../helpers/config';
import { SET_DATA_CAR_SALE, SET_DATA_CAR_SALE_SPARE } from '../../../store/car-sale/carSale';
import SellCarForSpareRequest from './SellCarForSpareRequest';
import { ACTION_GET_LIST_BRANDS, ACTION_GET_NEW_LIST_DATA } from '../../../store/requests/requests';

class SellCarForSpareRequestComponent extends Component {
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "sell_car_for_spare",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }),
    });
    this.props.dispatch(ACTION_GET_LIST_BRANDS);
  }

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };

  handlerChangeDataValues = (values) =>
    this.props.dispatch(SET_DATA_CAR_SALE_SPARE, { ...values });

  handlerChangeData = (changeData) =>
    this.props.dispatch(ACTION_GET_NEW_LIST_DATA, { ...changeData });

  render() {
    console.log(this.props.listBrands);
    return (
      <SellCarForSpareRequest
        dispatch={this.props.dispatch}
        dataRequst={this.props.listBrands}
        handlerChangeDataValues={this.handlerChangeDataValues}
        handlerChangeData={this.handlerChangeData}
      />
    );
  }
}

export default connectStoreon(
  "listBrands",
  WithRouter(SellCarForSpareRequestComponent));