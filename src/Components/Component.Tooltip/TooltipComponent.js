import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react';
import Tooltip from '../../View/Tooltip/Tooltip';
import WrapInnerContainerBlock from '../../View/Blocks/WrapInnerContainerBlock';


class TooltipComponent extends PureComponent {
  tooltipRef = React.createRef(null);
  state = {
    style: {
      bottom: 0,
      left: '-100%',
      opacity: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      width: 0
    }
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isShow !== prevProps.isShow) {
      if (this.props.isShow) {

        if (this.tooltipRef?.current?.getBoundingClientRect().left > 140) {
          //   // document.documentElement.style.setProperty('--toptool-right', `0px`)
          this.setState(state => ({
            style: {
              ...state,
              left: '-130px',
              opacity: 1,
              pointerEvents: 'all',
              visibility: 'visible',
              width: '150px'
            }
          }))
        } else {
          this.setState(state => ({
            style: {
              ...state,
              opacity: 1,
              left: 0,
              pointerEvents: 'all',
              visibility: 'visible',
              width: '150px'
            }
          }))

        }
      } else {
        this.setState(state => ({
          style: {
            ...state,
            opacity: 0,
            pointerEvents: 'none',
            visibility: 'hidden',
            width: 0
          }
        }))
      }
    }
  }

  render() {
    return (
      <WrapInnerContainerBlock
        onClick={this.props?.onClick && this.props?.onClick}
        id={this.props.id}
      >
        { this.props.children }

        {this.props?.isShow && 
        <Tooltip        
          tooltipRef={this.tooltipRef}
          message={this.props.message}
          style={{
            ...this.state.style
          }}
        />}
      </WrapInnerContainerBlock>
    )
  }
}

export default connectStoreon(
  '',

  TooltipComponent
)



