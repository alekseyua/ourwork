import React from 'react'
import Main from './Main'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import { mainMenuInit } from '../../helpers/config';
import { openOnlyURl } from '../../helpers/helpers';
import { checkAccess } from '../../helpers/utils';

class MainComponent extends React.PureComponent {

  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "main_menu",
    });
  }

  handlerChangeScreen = ({ path }) => {
    if (path.includes('http')) {
      return openOnlyURl(path)
    }
    this.props.navigate(path);
  }

  render() {
    return (
      <Main
        mainMenu={checkAccess(mainMenuInit, this.props.access)}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}

export default connectStoreon(
  'access',
  WithRouter(MainComponent));