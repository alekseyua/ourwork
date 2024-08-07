import React, { Component } from 'react'
import CardIncominRequest from '../../View/Cards/IncomingRequest/CardIncominRequest'

export default class CardFilterListTruckTransport extends Component {

  render() {
    return (
      this.props.listCards
        .filter(el => !el?.isHide)
        .map((item, i) => {
          return <CardIncominRequest
            key={i}
            card={item}
            {...this.props}
          />
        })
    )
  }
}
