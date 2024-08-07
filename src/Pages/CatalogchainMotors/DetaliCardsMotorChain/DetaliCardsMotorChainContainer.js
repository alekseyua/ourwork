import React, { Component } from 'react'
import DetaliCardsMotorChain from './DetaliCardsMotorChain'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../../HOC/WithRouter'
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { ACTION_GET_ONE_MOTOR_CARD } from '../../../store/chain-motors/chain-motors';

export class DetaliCardsMotorChainContainer extends Component {
  componentDidMount() {
      this.props.dispatch(ACTION_GET_ONE_MOTOR_CARD,{
          id: this.props?.stateNavigate?.card?.id ?? getLocaleStore('idOneCardChainMotor')
        });
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Китайские двигатели",
      pathBackButton: () =>
        this.handlerChangeScreen({
          path: getLocaleStore("catalogChainMotors"),
        }),
    });
    if (this.props.stateNavigate?.card?.id)
      setLocaleStore("idOneCardChainMotor", this.props.stateNavigate?.card?.id);
  }
  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };
  render() {
    console.log("dataOneMotorChain = ", this.props.dataOneMotorChain);
    return <DetaliCardsMotorChain 
        card={this.props.dataOneMotorChain}
        dispatch={this.props.dispatch}
    />;
  }
}

export default connectStoreon( 
    'dataOneMotorChain',
   WithRouter( DetaliCardsMotorChainContainer)
)