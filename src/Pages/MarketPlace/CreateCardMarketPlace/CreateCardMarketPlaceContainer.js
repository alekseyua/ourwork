import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { getLocaleStore } from '../../../helpers/utils';
import { getOptionsFiltersMP } from '../../../helpers/helpers';
import { LAST_PATH_CREATE_ADV, listItemsCreateMarketCardNew } from '../../../helpers/config';
import { delay } from '../../../helpers/const';
import { ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, ACTION_GET_LIST_OPTIONS_MARKET, ACTION_SET_VALUES_INTO_STORE_MARKET_NULL } from '../../../store/marketplace/createCardMarketPlace/createCardMarketPlace';
import { ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY } from '../../../store/marketplace/filtermarketplace/filtermarketplace';
import MarketCardTabs from '../../../View/CreteCardMarket/MarketCardTabs';

class CreateCardMarketPlaceContainer extends PureComponent {

  state = {
    listDataForInput: listItemsCreateMarketCardNew,
    sequenceList: ['common-info', 'aggrigate', 'own-info', 'add-files'],
    listSectionTabs: [
      {
        "tab_name": 'Информация',
        "id": 0,
        "title_description": "",
        "type": "part_1",
        "active": true,
      },
      {
        "tab_name": "Применимость",
        "id": 1,
        "title_description": "",
        "type": "part_2",
        "active": false,
      },
      {
        "tab_name": "Подробности",
        "id": 2,
        "title_description": "",
        "type": "part_3",
        "active": false,
      },
      {
        "tab_name": "Фото",
        "id": 4,
        "title_description": "",
        "type": "part_5",
        "active": false,
      },
    ],
    action_tab: 'part_1'
  }

  handlerChangeSection = (e, type) => {
    e.preventDefault()
    this.setState( state => ({
      ...state,
      listSectionTabs: this.state.listSectionTabs.map(el => type === el.type ? { ...el, active: true } : { ...el, active: false }),
      action_tab: type
    }))
  }


    callback = () => {
    this.setState(state => ({
      ...state,
      isLoading: false
    }))
  }

  componentDidMount() {
    const loadStartData = async () => {
      this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY, { blockButtonActive: false, callback: ()=>{
        this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET, { key: 'countrys', blockButtonActive: false, callback: async ()=>{
          await delay(500)
          this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET, { key: 'brands', blockButtonActive: false, callback: this.callback
          })

        } })
      } })
    }
    loadStartData();

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Создание объявления',
      pathBackButton: getLocaleStore(LAST_PATH_CREATE_ADV),
    });
  }
  
  componentWillUnmount() {
    this.props.dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, { key: null, value: null })
    this.props.dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET_NULL)
  }
  
  handlerChangeOptionsData = ({ key, value = null, type }) => this.props.dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, { key, value, action: 'create-card', type });

  render() {
    return (
      <MarketCardTabs
        citys={this.props.storeCardMP?.citys?.length ? getOptionsFiltersMP(this.props.storeCardMP.citys) : []}
        brands={getOptionsFiltersMP(this.props.storeCardMP?.brands.length ? this.props.storeCardMP?.brands : [])}
        values={this.props.storeOptionCardMP}
        countrys={getOptionsFiltersMP(this.props.storeCardMP.countrys)}
        models={getOptionsFiltersMP(this.props.storeCardMP?.models.length ? this.props.storeCardMP?.models : [])}
        listOptions={this.props.storeCardMP}
        generations={getOptionsFiltersMP(this.props.storeCardMP?.generations.length ? this.props.storeCardMP?.generations : [])}
        sequenceList={this.state.sequenceList}
        list={this.state.listDataForInput}
        listOptionsCategory={getOptionsFiltersMP(this.props.listOptionsMPCategory)}
        handlerVirtualClick={this.handlerSendData}
        handlerChangeOptionsData={this.handlerChangeOptionsData}

        handlerChangeSection={this.handlerChangeSection}
        listSectionTabs={this.state.listSectionTabs}
        action_tab={this.state.action_tab}
      />
    )
  }
}

export default connectStoreon(
  'tg',
  'storeCardMP',
  'storeOptionCardMP',
  'listOptionsMPCategory',

  WithRouter(CreateCardMarketPlaceContainer)
);