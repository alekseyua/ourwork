import React, { Component } from 'react'
import InfoContainerBorder from '../../View/InfoBlock/InfoContainerBorder'
import InfoIconBlock from '../../View/InfoBlock/InfoIconBlock'
import Icon from '../../View/Icon/Icon'
import { attention, help } from '../../images'
import InfoTextBlock from '../../View/InfoBlock/InfoTextBlock'

export default class InfoBlockContainer extends Component {
  render() {
    return (
      <InfoContainerBorder
        style={{
          padding: '12px 12px 12px',
          ...this.props?.style ?? {}
        }}
      >
        <InfoIconBlock>
          <Icon
            width={14}
            height={14}
           src={attention}
          />
        </InfoIconBlock>
        <InfoTextBlock
          style={{
            ...this.props?.styleText ?? {}
          }}
        >
          {this.props.message}
          {this.props.children? this.props.children : null}
        </InfoTextBlock>
      </InfoContainerBorder>
    )
  }
}
