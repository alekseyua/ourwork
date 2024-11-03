import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import Requests from './Requests';
import { ROOT, menuRequests } from '../../helpers/config';

class RequestsComponent extends Component {


  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "create_request",
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT }), //ROOT,
    });
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