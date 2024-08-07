import React, { Component } from 'react'
import Header from '../../View/Header/Header'
import WithRouter from '../../HOC/WithRouter'
import { connectStoreon } from 'storeon/react'

class HeaderComponent extends Component {

  componentDidMount() {
    this.props.tg.onEvent('viewportChanged', (event) => {
      if (!event.isStateStable) {
        this.props.tg.expand()
      }
    });
  }

  render() {
    return (
      <Header
        isFocus={this.props.isFocus}
        isBlur={this.props.isBlur}
        textHeader={this.props.textHeader}
        buttonHeaderAction={this.props.buttonHeaderAction}
        handlerChangeScreen={this.props.handlerChangeScreen}
      />
    )
  }
}

export default connectStoreon(
  'tg',
  'isFocus',
  'textHeader',
  'buttonHeaderAction',
  WithRouter(HeaderComponent)
)