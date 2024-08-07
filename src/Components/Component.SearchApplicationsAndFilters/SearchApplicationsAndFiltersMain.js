import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react'
import SearchAndFilterAdvert from '../SearchSection/SearchAndFilterAdvert'
import WithRouter from '../../HOC/WithRouter'
import { ACTION_GET_LIST_CARDS_MARKET } from '../../store/marketplace/marketplace'
import { ACTION_SET_FILTER_INTO_MARKET } from '../../store/marketplace/filtermarketplace/filtermarketplace'
import { MARKETPLACE_FILTER } from '../../helpers/config'

class SearchApplicationsAndFiltersMain extends PureComponent {

  handlerChangeFilters = ({ key = null, value = null, id = null }) => this.props.dispatch(ACTION_SET_FILTER_INTO_MARKET, { key, id, value })

  handlerTextSearch = (text, callback) => this.props.dispatch(ACTION_GET_LIST_CARDS_MARKET, {page: 1, callback}); // page: 1 что бы искало с первой страницы

  changeScreen = ({path}) => this.props.navigate(path);

  handlerFiltersOpen = (status = true, param) => this.changeScreen({path: MARKETPLACE_FILTER});

  render() {
    return (
      <SearchAndFilterAdvert
        option={this.props.optionMP}
        countFilters={0}
        isUpblock={this.props.isUpblock}
        countFavorite={this.props.favoriteMPCards.count}
        textInputSearch={this.props.textInputMarketSearch}
        handlerTextSearch={this.handlerTextSearch}
        handlerFiltersOpen={this.handlerFiltersOpen}
        listOptionsLowHigh={this.props.listOptionsLowHighMP}
        handlerChangeFilters={this.handlerChangeFilters}
      />
    )
  }
}

export default connectStoreon(
  'optionMP',
  'favoriteMPCards',
  'listOptionsLowHighMP',
  'textInputMarketSearch',
  WithRouter(SearchApplicationsAndFiltersMain)
)