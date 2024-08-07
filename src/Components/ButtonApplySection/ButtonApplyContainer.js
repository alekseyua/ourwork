import React, { Component } from 'react'
import ButtonApplyStatic from '../../View/ButtonApply/ButtonApplyStatic'
import { connectStoreon } from 'storeon/react';
import ButtonApplyFixed from '../../View/ButtonApply/ButtonApplyFixed';
import WithTooltip from '../../HOC/WithTooltip';

class ButtonApplyContainer extends Component {


  render() {
    if (this.props.controllButton.typeButton === 'fixed') {
      return (
        <ButtonApplyFixed
          title={this.props.controllButton.title}
          show={this.props.controllButton.show}
          type={this.props.controllButton.type}
          icon={this.props.controllButton.icon}
          onClick={this.props.controllButton.action}
          isFetch={this.props.controllButton.isFetch}
          isActive={this.props.controllButton.isActive}
          addClass={this.props.controllButton.addClass}
          // handlerShowTooltip={this.props.handlerShowTooltip}
          buttonForm={this.props.controllButton?.buttonForm}
          formId={this.props.controllButton?.formId}
          />
          )
        }
        return (
          <ButtonApplyStatic
            isFocus={this.props.isFocus}
            formId={this.props.controllButton?.formId}
            title={this.props.controllButton.title}
            show={this.props.controllButton.show}
            type={this.props.controllButton.type}
            icon={this.props.controllButton.icon}
            isFetch={this.props.controllButton.isFetch}
            onClick={this.props.controllButton.action}
            addClass={this.props.controllButton.addClass}
            isActive={this.props.controllButton.isActive}
            // handlerShowTooltip={this.props.handlerShowTooltip}
            buttonForm={this.props.controllButton?.buttonForm} 
          />
        )
  }
}

export default connectStoreon(
  'isFocus',
  'controllButton',
  ButtonApplyContainer
);