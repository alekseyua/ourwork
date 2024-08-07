import React from 'react'
import Filters from "./Filters";
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import { ACTION_SET_BLUR } from '../../store/helpers/helpers-store';
import { ACTION_SET_FILTER_INTO_MARKET, ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY, ACTION_LIST_OPTIONS_MARKET, ACTION_RESET_FILTER_INTO_MARKET } from '../../store/marketplace/filtermarketplace/filtermarketplace';
import { ACTION_GET_LIST_CARDS_MARKET } from '../../store/marketplace/marketplace';
import { getLocaleStore, setSessionStore } from '../../helpers/utils';
import { LAST_PATH_FILTER_MARKET } from '../../helpers/config';
import { funcDelay } from '../../helpers/const';

class FiltersContainer extends React.PureComponent {
  state = {
    isLoading: true,
    heightBlockInput: 40,
  }

  callback = () => {
    this.setState(state => ({
      ...state,
      isLoading: false
    }))
  }
  componentDidMount() {
    document.documentElement.style.setProperty('--main-margin-top', 0)
    funcDelay(() => document.documentElement.style.setProperty('--margin-bottom-isselect', 0),200)

    this.props.controllerHeaderBand({
      pathBackButton: () => this.handlerChangeScreen({path: getLocaleStore(LAST_PATH_FILTER_MARKET)})
    }); 

    this.props.dispatch(ACTION_SET_BLUR, true)
    this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY)
    this.getOptionsDropDownList('countrys')
    this.getOptionsDropDownList('brands')
    this.callback();

    const heightScreen = window.visualViewport.height;
      console.log(heightScreen)
      if(heightScreen < 770 ) {
        this.setState(state => ({
          ...state,
          heightBlockInput: heightScreen/20.5
        }))
      }
  }

  componentWillUnmount(){
    document.documentElement.style.setProperty('--main-margin-top', '57px')
    document.documentElement.style.setProperty('--margin-bottom-isselect', '35px')


    this.props.dispatch(ACTION_SET_BLUR, false);
    window.removeEventListener('resize', this.handlerResize)
  }
  
  getOptionsDropDownList = (key, id = null) => this.props.dispatch(ACTION_LIST_OPTIONS_MARKET, { key, id, callback: this.callback })

  handlerResetFilters = () => {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    this.props.dispatch(ACTION_RESET_FILTER_INTO_MARKET, {callback: this.callback})
  }

  handlerChangeFilters = ({ key = null, value = null, id = null }) => {
    this.setState(state => ({
      ...state,
      isLoading: true
    }))

    let getOptionslist = ''
    console.log("key : ", key);

    if (key === 'brand') {
      getOptionslist = 'models'
    }
    if (key === 'country') {
      getOptionslist = 'citys'
    }
    if (key === 'model') {
      getOptionslist = 'generations'
    }
    if (getOptionslist) {
      this.getOptionsDropDownList(getOptionslist, value)
    } else {
      this.props.dispatch(ACTION_SET_FILTER_INTO_MARKET, { key, id, value, callback: this.callback })
    }
  }

  handlerChangeScreen = ({path}) => this.props.navigate(path)

  handlerShowFilters = (isShow = true) => {
    if (!isShow) {     
      this.callback()
      return this.handlerChangeScreen({path: getLocaleStore(LAST_PATH_FILTER_MARKET)});
    }
    this.props.dispatch(ACTION_GET_LIST_CARDS_MARKET, { callback: this.callback }) // получаем список карточек
  }

  render() {
    return (
      <Filters
        option={this.props.optionMP}
        isLoading={this.state.isLoading}
        countCards={this.props.mainListMP.count}
        listOptionsAuto={this.props.listOptionsMPAuto}
        handlerShowFilters={this.handlerShowFilters}
        listOptionsCountry={this.props.listOptionsMPCountry}
        listOptionsLowHigh={this.props.listOptionsLowHighMP}
        listOptionsCategory={this.props.listOptionsMPCategory}
        handlerChangeFilters={this.handlerChangeFilters}
        handlerResetFilters={this.handlerResetFilters}

        heightBlockInput={this.state.heightBlockInput}
      />
    )
  }
}
export default connectStoreon(
  'tg',
  'optionMP',
  'mainListMP',
  'listOptionsMPAuto',
  'listOptionsMPCountry',
  'listOptionsLowHighMP',
  'listOptionsMPCategory',
  WithRouter(FiltersContainer))