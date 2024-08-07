import React, { PureComponent } from 'react'
import RaitingAndReviewWarrantlyForMembers from './RaitingAndReviewWarrantlyForMembers'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { cloud } from '../../../images';
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { REITING_FULL_INFO, ID_TELEGRAM_USER, REITING_CREATE, REITING_MENU, CITY_ID_FOR_WARANTLY_MEMBER } from '../../../helpers/config';
import { openOnlyURl } from '../../../helpers/helpers';
import { ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS, ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, ACTION_GET_LIST_CITIES_WARRANTLY_MEMBERS, ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS } from '../../../store/raiting-review/raiting-review';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';
import { delay } from '../../../helpers/const';

class RaitingAndReviewWarrantlyForMembersComponent extends PureComponent {

  state = {
    isLoadingCards: !!!this.props.listCardsForWarrantlyMemners.count,
    isLoading: true,
  }

  callback = async () => {
    this.setState(state=>({
      ...state,
      isLoading: false,
    }))
    await delay(1000)
    console.log('repeat false')
    this.setState((state) => ({
      ...state,
      isLoading: false,
    }));
  }
  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Гаранты–участники',
      pathBackButton: REITING_MENU,
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: REITING_CREATE }),
          iconLeft: cloud,
          styleIconsLeft: { height: 12 },
          title: 'Оставить отзыв',
          className: 'button__controll--red'
        },
      ]
    });

    this.props.dispatch(ACTION_GET_LIST_CITIES_WARRANTLY_MEMBERS, {
      callback: ()=>{
        if (getLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER)) {
              this.props.dispatch(ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, { city_id: getLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER), callback: this.callback });
            } else {
              this.props.dispatch(ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS, {callback: this.callback});
            }
      },
    });
  }



  // componentDidUpdate(prevProps, prevState) {

  //   if (prevProps.listCardsForWarrantlyMemners.results !== this.props.listCardsForWarrantlyMemners.results) {
  //     this.setState(state =>({
  //       ...state,
  //       isLoadingCards: false,
  //     }));
  //   }

  // }

  componentWillUnmount() {
    setLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER, '');
    this.props.dispatch(ACTION_SET_LIST_CARDS_FOR_WARRANTLY_MEMBERS);
  }

  handlerChangeScreen = ({ url, path, id, username }) => {
    if (username) setLocaleStore('username_review_full', username);
    if (id) {
      setLocaleStore(ID_TELEGRAM_USER, id)
      this.props.navigate(REITING_FULL_INFO+ '/' + id)
      return console.log({ id })
    }
    if (url) return openOnlyURl(url);
    this.props.navigate(path)
  }

  handlerSelect = value => {
    console.log("request 1 ... ", value);
    if(value === '') return;

    this.setState((state) => ({
      ...state,
      isLoading: true,
      isLoadingCards: true
    }));

    if (+value === 0) {
      console.log('request 2 ... ')
      setLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER, null)
      this.props.dispatch(ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS, {callback: this.callback})
      // return this.props.dispatch('setSelectCityForWarrantlyMemners', '');
      return;
    }
    console.log('request 3 ... ')
    // this.props.dispatch('setSelectCityForWarrantlyMemners', value);
    setLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER, value)
    this.props.dispatch(ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, { city_id: value, callback: this.callback });

  }

  changePagination = ({ page }) => {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    if (getLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER)) {
      return this.props.dispatch(ACTION_GET_LIST_CARDS_FOR_WARRANTLY_MEMBERS, { city_id: getLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER), page, callback: this.callback });
    }
    this.props.dispatch(ACTION_GET_ALL_LIST_CARDS_FOR_WARRANTLY_MEMBERS, { page, callback: this.callback });
  }

  render() {
    // console.log('loading .,.. ', this.state.isLoading)
    return (
      <RaitingAndReviewWarrantlyForMembers
        isLoadingCards={this.state.isLoadingCards}
        isLoading={this.state.isLoading}
        selectCity={getLocaleStore(CITY_ID_FOR_WARANTLY_MEMBER)}
        listCities={this.props.listCitiesWarrantlyForMembers}
        handlerSelect={this.handlerSelect}
        listCardsForWarrantlyMemners={this.props.listCardsForWarrantlyMemners}
        changePagination={this.changePagination}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}


export default connectStoreon(
  'listCardsForWarrantlyMemners',
  'listCitiesWarrantlyForMembers',

  WithRouter(RaitingAndReviewWarrantlyForMembersComponent)
)