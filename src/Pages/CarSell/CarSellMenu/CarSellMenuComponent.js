import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import CarSellMenu from './CarSellMenu';
import WithRouter from '../../../HOC/WithRouter';
import { isAndroid, isIos } from '../../../helpers/utils';
import { menuCarSell, ROOT } from '../../../helpers/config';
import { openOnlyURl, openURl } from '../../../helpers/helpers';
import i18n from '../../../lang/i18n';

class CarSellMenuComponent extends Component {

  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "adv",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }), //ROOT,
    });
  }

  handlerChangeScreen = ({ path }) => {
    if(path.includes('http')) return openOnlyURl(path)
    this.props.navigate(path);
  }

  render() {
    return (
      <CarSellMenu
        listMenu={menuCarSell}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}
export default connectStoreon(
  WithRouter(CarSellMenuComponent)
);