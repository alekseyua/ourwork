import React, { Component } from 'react'
import Lang from './Lang'
import { connectStoreon } from 'storeon/react';
import { ACTION_SET_CURRENT_LANG } from '../../store/lang/langStore';

export class LangContainer extends Component {

  handlerLang = ({value}) => {
    this.props.dispatch(ACTION_SET_CURRENT_LANG, { language_code: value });
  }


  render() {
    return (
      <Lang langList={this.props.listLang} handlerLang={this.handlerLang} />
    );
  }
}

export default connectStoreon("currentLang", "listLang", LangContainer);