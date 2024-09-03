import React, { Component } from 'react'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import Icon from '../../View/Icon/Icon'
import LinkGoTo from '../../View/LinkGoTo/LinkGoTo'
import Offset from '../../View/Offset'

export default class MainFeedbackComponent extends Component {

  render() {

    return (
      <WrapContainer
      style={{
        // zIndex: -1,
        filter: `blur(var(--filter-blur))`,
      }}
      >
        {
          this.props.list.map(link => {

            return (
              <React.Fragment key={link.id}>
              <LinkGoTo
                position={link.position}
                url={link.url}
                fontSize={link.fontSize}
                color={link.color}
                style={{
                  alignItems: 'center',
                  fontWeight: 600,
                }}
              >
                <Icon
                 src={link.icon}
                  width={15}
                  height={15}
                  mr={5}
                  style={{ top: -2 }}
                  />
                {link.title}</LinkGoTo>
                <Offset mb={5} />
            </React.Fragment>
            )
          })
        }
      </WrapContainer>
    )
  }
}
