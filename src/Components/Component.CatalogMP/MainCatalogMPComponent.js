import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import MainCatalogMarketPlace from '../../View/CatalogMarketPlace/MainCatalogMarketPlace';
import { getSessionStore, setLocaleStore, setSessionStore } from '../../helpers/utils';
import { ACTION_GET_LIST_CARDS_MARKET, ACTION_GET_LIST_MY_CARDS_MARKET } from '../../store/marketplace/marketplace';
import { funcDelay } from '../../helpers/const';

class MainCatalogMPComponent extends PureComponent {
  state = {
    isLoading: true,
    isLoadingPagination: false,
  }

  componentDidMount() {
    setLocaleStore('lastPathForFiltersMarket', this.props.pathname)
    document.documentElement.style.setProperty('--placeholder-size', '14px');
    setLocaleStore('lastPathForDetailCardMarket', this.props.pathname)
    this.props.dispatch(ACTION_GET_LIST_MY_CARDS_MARKET, { filter_by_favorite: true })
    // let params = { callback: this.callback };
    this.setState(state=> ({
      ...state,
      isLoadingPagination: true
    }))
    let params = { callback: this.callbackPaggination };
    this.props.dispatch(ACTION_GET_LIST_CARDS_MARKET, params)
  }

  componentWillUnmount(){
    setSessionStore('savePlaceLastLocationOpenCardMarket')// обнуляем в хранилище
    document.documentElement.style.setProperty('--placeholder-size', '12px');
  }

  callback = () => {
    this.setState({
      isLoading: false
    })
  }

  callbackPaggination = () =>{
    funcDelay(()=>this.setState(state=> ({
      ...state,
      isLoadingPagination: false
    })),400)
  }
  changePagination = ({ page }) => {
    this.setState(state=> ({
      ...state,
      isLoadingPagination: true
    }))
    this.props.dispatch(ACTION_GET_LIST_CARDS_MARKET, { page, callback: this.callbackPaggination })
  }

  render() {

    return (
      <MainCatalogMarketPlace
        isUpblock={this.props.isUpblock}
        listCards={this.props.mainListMP}
        dispatch={this.props.dispatch}
        textSearch={this.props.textInputMarketSearch}
        isLoading={this.state.isLoading}
        isLoadingPagination={this.state.isLoadingPagination}
        countFilters={this.props.countOptionMPSave}
        isLoadingAuto={this.props.mainListMPIsLoading}
        countFavorite={this.props.favoriteMPCards.count}
        changePagination={this.changePagination}
        distationtopSearch={this.props.distationtopSearch}
      />
    )
  }
}

export default connectStoreon(
  'mainListMP',
  'favoriteMPCards',
  'countOptionMPSave',
  'mainListMPIsLoading',
  'textInputMarketSearch',
  WithRouter(MainCatalogMPComponent));
