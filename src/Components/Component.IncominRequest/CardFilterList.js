import React, { Component } from 'react'
import CardFilterUnitSpare from '../../View/Cards/IncomingRequest/CardFilterUnitSpare'

export default class CardFilterListContainer extends Component {

  render() {
    return (
      this.props.listCards
        .filter(el => !el?.isHide)
        .map((item, i) => {
          return <CardFilterUnitSpare
            key={i}
            card={item}
            {...this.props}
          />
        })
    )
  }
}
