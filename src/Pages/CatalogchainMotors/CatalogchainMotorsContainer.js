import React, { Component } from 'react'
import CatalogchainMotors from './CatalogchainMotors'
import { ROOT } from '../../helpers/config';
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import { ACTION_GET_LIST_MOTORS_CARS } from '../../store/chain-motors/chain-motors';

export class CatalogchainMotorsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(ACTION_GET_LIST_MOTORS_CARS);
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Китайские двигатели",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }),
    });
  }
  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };
  changePagination = ({page}) => {
    this.props.dispatch(ACTION_GET_LIST_MOTORS_CARS, { page });
  };
  render() {
    return (
      <CatalogchainMotors
        dataCards={this.props.dataMotorsChain}
        changePagination={this.changePagination}
      />
    );
  }
}

export default connectStoreon( 
    'dataMotorsChain',

    WithRouter(CatalogchainMotorsContainer)
)