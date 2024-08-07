import React, { Component, createRef, useRef } from 'react'
import { isAndroid, isIos } from '../../../helpers/utils';

export default class MenuSliderContainer extends Component {
  constructor(props){
    super(props)
    this.menuRef = createRef();
    this.state = {
      maxRateScroll: null,    
      currentPosition: 0,
      stepOffset: 0,
    }
  }
  componentDidMount(){
    if(!isAndroid() && !isIos()) document.documentElement.style.setProperty('--hight-scrollbar', '10px');

  }
 
  handlerMouseMove = event => {
    document.querySelector('body').style.setProperty('overflow', 'hidden')
  }
  handlerMouseOut = (event) => {
    event.stopPropagation()
    document.querySelector('body').style.setProperty('overflow', 'auto')
  }
  
  handlerScroll = (event) => {
    // console.log('scroll', event.target )
    // console.log('this.state.stepOffset = ', this.state.stepOffset )
    // console.log('this.state.currentPosition = ', this.state.currentPosition )

    document.querySelector('.menu-slider_main-menu__container__-2CtL').scrollLeft = this.state.stepOffset
    if(event.wheelDelta > 0 && this.state.stepOffset < this.state.currentPosition){
      this.setState(state=>({
        stepOffset: state.stepOffset + 25
      }))
    } else if(event.wheelDelta < 0 && this.state.stepOffset > 0){
      this.setState(state=>({
        stepOffset: state.stepOffset - 25
      }))
    }
  }
  
  componentDidUpdate(){
    this.state.maxRateScroll = this.menuRef?.current?.scrollWidth
    // if(!this.state.stepOffset) this.state.stepOffset = document.querySelector('.menu-slider_main-menu__container__-2CtL')?.scrollWidth - document.querySelector('.menu-slider_main-menu__container__-2CtL')?.offsetWidth
    if(!this.state.currentPosition) this.state.currentPosition = document.querySelector('.menu-slider_main-menu__container__-2CtL')?.scrollWidth - document.querySelector('.menu-slider_main-menu__container__-2CtL')?.offsetWidth
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').addEventListener('mouseenter', this.handlerMouseMove)
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').addEventListener('mouseleave', this.handlerMouseOut)
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').addEventListener('wheel', this.handlerScroll)
  }

  componentWillUnmount(){
    document.documentElement.style.setProperty('--hight-scrollbar', '0px')
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').removeEventListener('mouseenter', this.handlerMouseMove)
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').removeEventListener('mouseleave', this.handlerMouseOut)
    document.querySelector('.menu-slider_main-menu__container__-2CtL') && document.querySelector('.menu-slider_main-menu__container__-2CtL').removeEventListener('wheel', this.handlerScroll)
  }

  setMenuRef = el =>{
    this.menuRef = el;
  }

  render() {
    return (
      <React.Fragment
      // ref={ e => this.setMenuRef(e)}
      // data-test={'test'}
      >
        {React.cloneElement(this.props.children, {
          // menuRef:this.menuRef,
          // setMenuRef:this.setMenuRef,
          ...this.props,
        })}
      </React.Fragment>
    );
  }
}
