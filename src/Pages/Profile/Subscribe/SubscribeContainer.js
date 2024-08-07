import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react'
import Subscribe from './Subscribe';
import WithRouter from '../../../HOC/WithRouter';
import { LASTURL, PROFILE_MENU } from '../../../helpers/config';
import { ACTION_CHANGE_DATA_SUBSCRIBE, ACTION_GET_DATA_PROFILE, ACTION_SET_CONTROLL_BUTTON_FOR_SUBSCRIBE, ACTION_SET_DATA_FOR_SUBSCRIBE } from '../../../store/profile/profile';
import { setLocaleStore } from '../../../helpers/utils';

class SubscribeContainer extends PureComponent {
  state = {
    headerTitleSelectAccess: ['Выберите доступ'],
    headerTitlePeriodSubscribe: ['Срок подписки'],
    headerTitleMethodPayment: ['Способ оплаты'],
    isLoading: false,
    listSection: this.props.listDescriptionAccessPayment,   
    listDescriptionAccessPaymentCurrent: [],
    headerTitleInfoAboutProduct: ['Информация о подписке'],
  }

  componentDidMount() {

    this.props.dispatch(ACTION_GET_DATA_PROFILE);
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Подписка',
      pathBackButton: PROFILE_MENU,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDescriptionAccessPayment !== this.props.listDescriptionAccessPayment) {
      this.setState( state => ({
        ...state,
        // listDescriptionAccessPaymentCurrent: this.props.listDescriptionAccessPayment.full_access?.info.description,
        listSection: this.props.listDescriptionAccessPayment
      }))
    }
  }
 

  handlerChangeSection = (e, type) => {
    e.preventDefault()

    this.setState( state => ({
      ...state,
      listSection: this.state.listSection.map(el => type === el.type ? { ...el, active: true } : { ...el, active: false })
    }))
    console.log({type})
    this.handlerSetData({ key: 'access', value: type })
  }

  handlerChangeScreen = () => this.props.navigate(PROFILE_MENU);
  
  callback = () => {
    setLocaleStore(LASTURL, PROFILE_MENU)
  };
  handlerApplyPayment = event => {
    event.preventDefault();
    this.setState(state=>({
      ...state,
      isLoading: true
    }))
    this.props.dispatch(ACTION_SET_CONTROLL_BUTTON_FOR_SUBSCRIBE, false);
    this.props.dispatch(ACTION_CHANGE_DATA_SUBSCRIBE, {callback: this.callback});
  }

  handlerSetData = ({ key, value }) => this.props.dispatch(ACTION_SET_DATA_FOR_SUBSCRIBE, { [key]: value })


  render() {
      console.log('this.state.listSection = ', this.props.dataSubscribe )
    return (
      <Subscribe
        isLoading={this.state.isLoading}
        listSection={this.state.listSection}
        showDiscount={this.props.showDiscount}
        dataSubscribe={this.props.dataSubscribe}
        handlerSetData={this.handlerSetData}
        listOptionsPayment={this.props.listOptionsPayment}
        handlerApplyPayment={this.handlerApplyPayment}
        handlerChangeScreen={this.handlerChangeScreen}
        handlerChangeSection={this.handlerChangeSection}
        handlerChangeSubscribe={this.handlerChangeSubscribe}
        headerTitleSelectAccess={this.state.headerTitleSelectAccess}
        controllButtonSubscribe={this.props.controllButtonSubscribe}
        headerTitleMethodPayment={this.state.headerTitleMethodPayment}
        headerTitlePeriodSubscribe={this.state.headerTitlePeriodSubscribe}
        headerTitleInfoAboutProduct={this.state.headerTitleInfoAboutProduct}
        listDescriptionAccessPaymentCurrent={
          this.state.listDescriptionAccessPaymentCurrent
        }
      />
    );
  }
}

export default connectStoreon(
  "showDiscount",
  "dataSubscribe",
  "listOptionsPayment",
  "controllButtonSubscribe",
  "listDescriptionAccessPayment",

  WithRouter(SubscribeContainer)
);