import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import Requests from './Requests';
import { arrowRight, myRequest } from '../../images';
import Button from '../../View/Button/Button';
import { MAKE_REQUEST_OWN_REQUEST, MARKETPLACE_MAIN, ROOT, menuRequests } from '../../helpers/config';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';
import { isAndroid, isIos } from '../../helpers/utils';

class RequestsComponent extends Component {


  componentDidMount() {
    
    if(!isAndroid() && !isIos()) document.documentElement.style.setProperty('--hight-scrollbar', '10px')

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "create_request",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }), //ROOT,
    });
  }


  componentWillUnmount(){
    document.documentElement.style.setProperty('--hight-scrollbar', '0px')
  }

  handlerChangeScreen = ({ path }) => this.props.navigate(path);

  render() {
    return (
      <Requests
        listMenu={menuRequests}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}
export default connectStoreon(
  WithRouter(RequestsComponent)
);