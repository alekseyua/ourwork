import React, { Component, createRef, useRef } from 'react'
import { isAndroid, isIos } from '../../helpers/utils';

export default class MenuSliderContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      maxRateScroll: null,    
      currentPosition: 0,
      stepOffset: 0,
    }
  }
  
  render() {
    return (
      <React.Fragment
      >
        {React.cloneElement(this.props.children, {
          ...this.props,
        })}
      </React.Fragment>
    );
  }
}
