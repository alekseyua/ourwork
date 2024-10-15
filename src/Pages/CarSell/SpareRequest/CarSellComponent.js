import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import CarSell from './CarSell';
import { CAR_SALE_MENU, ROOT } from '../../../helpers/config';
import { SET_DATA_CAR_SALE } from '../../../store/car-sale/carSale';

class CarSellComponent extends Component {
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Разместить авто на продажу",
      pathBackButton: () => this.handlerChangeScreen({ path: CAR_SALE_MENU }),
    });
  }

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path)
  }
  
  handlerChangeDataValues = values => this.props.dispatch(SET_DATA_CAR_SALE, { ...values });

  render() {
    return (
      <CarSell
        dispatch={this.props.dispatch}
        handlerChangeDataValues={this.handlerChangeDataValues}
      />
    )
  }
}

export default connectStoreon( 
  WithRouter(CarSellComponent)
);