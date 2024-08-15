import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import CarSellMenu from './CarSellMenu';
import WithRouter from '../../../HOC/WithRouter';
import { isAndroid, isIos } from '../../../helpers/utils';
import { menuCarSell, ROOT } from '../../../helpers/config';
import { openOnlyURl, openURl } from '../../../helpers/helpers';

class CarSellMenuComponent extends Component {

  componentDidMount() {
    
    if(!isAndroid() && !isIos()) document.documentElement.style.setProperty('--hight-scrollbar', '10px')

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Продать авто',
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT })//ROOT,       
    });
  }


  componentWillUnmount(){
    document.documentElement.style.setProperty('--hight-scrollbar', '0px')
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