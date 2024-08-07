import React, { Component } from 'react'
import CardIncominRequestCountry from '../../View/Cards/IncomingRequest/CardIncominRequestCountry'

export default class CardFilterCountryContainer extends Component {
  render() {
    return (
      this.props.listCards
        .map((item, i) => {
          return <CardIncominRequestCountry
            key={i}
            card={item}
            {...this.props}
          />
        })
    )
    
  }
}
