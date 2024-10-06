import React, { Component } from 'react'
import Header from '../../View/Header/Header'
import WithRouter from '../../HOC/WithRouter'
import { connectStoreon } from 'storeon/react'
import LangContainer from '../Lang/LangContainer';
import { ACTION_SET_BUTTON_HEADER_LANG } from '../../store/helpers/helpers-store';

class HeaderComponent extends Component {

  componentDidMount() {
    this.props.tg.onEvent("viewportChanged", (event) => {
      if (!event.isStateStable) {
        this.props.tg.expand();
      }
    });
    this.props.dispatch(ACTION_SET_BUTTON_HEADER_LANG, {
      isVisible: true,
      Element: LangContainer,
    });
  }

  render() {
    return (
      <Header
        isFocus={this.props.isFocus}
        isBlur={this.props.isBlur}
        textHeader={this.props.textHeader}
        headerLang={this.props.headerLang}
        buttonHeaderAction={this.props.buttonHeaderAction}
        handlerChangeScreen={this.props.handlerChangeScreen}
      />
    );
  }
}

export default connectStoreon(
  'tg',
  'isFocus',
  'textHeader',
  'headerLang',
  'buttonHeaderAction',
  WithRouter(HeaderComponent)
)