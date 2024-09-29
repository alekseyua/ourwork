import React from 'react'
import Main from './Main'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import { mainMenuInit } from '../../helpers/config';
import { openOnlyURl } from '../../helpers/helpers';
import { checkAccess } from '../../helpers/utils';
import { ACTION_SET_BUTTON_HEADER_LANG } from "../../store/helpers/helpers-store";
import LangContainer from '../../Components/Lang/LangContainer';
import i18n from '../../lang/i18n';

class MainComponent extends React.PureComponent {

  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: i18n.t("main_menu"),
    });
    this.props.dispatch(ACTION_SET_BUTTON_HEADER_LANG, {
      isVisible: true,
      Element: LangContainer,
    });
    window.performance.mark('mark_fully_loaded');
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