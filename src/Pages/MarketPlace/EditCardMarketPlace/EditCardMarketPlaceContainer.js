import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { getLocaleStore } from '../../../helpers/utils';
import { MARKETPLACE_MAIN, MARKETPLACE_OWN_CARDS, listItemsCreateMarketCardNew } from '../../../helpers/config';
import { getOptionsFiltersMP } from '../../../helpers/helpers';
import { delay } from '../../../helpers/const';
import { ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, ACTION_DELETE_IMAGE_FROM_CARD_MARKET, ACTION_GET_DATA_CARD_MARKET, ACTION_GET_LIST_OPTIONS_MARKET, ACTION_RESET_DATA_CARD, ACTION_SET_VALUES_INTO_STORE_MARKET_NULL } from '../../../store/marketplace/createCardMarketPlace/createCardMarketPlace';
import { ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY } from '../../../store/marketplace/filtermarketplace/filtermarketplace';
import MarketCardTabs from '../../../View/CreteCardMarket/MarketCardTabs';

class EditCardMarketPlaceContainer extends PureComponent {
  state = {
    listDataForInput: listItemsCreateMarketCardNew,
    sequenceList: ['add-files', 'common-info', 'aggrigate', 'own-info'],
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
    action_tab: 'part_1',
    isLoading: true,
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
    this.handlerChangeScreen({ path: MARKETPLACE_MAIN }); 
  }

  componentDidMount() {
    const loadStartData = async () => {
      this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET_CATEGORY, { blockButtonActive: false, callback: ()=>{
        this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET, { key: 'countrys', blockButtonActive: false, callback: async ()=>{
          await delay(500)
          this.props.dispatch(ACTION_GET_LIST_OPTIONS_MARKET, { key: 'brands', blockButtonActive: false, callback: ()=>{
            this.props.dispatch(ACTION_GET_DATA_CARD_MARKET, { engine_id: getLocaleStore('id_card_mp'), type: 'edit', blockButtonActive: false, callback: this.callback})
          } })
        } })
      } })
    }
    loadStartData();


    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Редактировать объявление',
      pathBackButton: MARKETPLACE_OWN_CARDS
    });
  }
  handlerChangeScreen = ({ url, path, id, username }) => {    
    if (path) {
      this.props.navigate(path)
      return
    }
  }

  componentWillUnmount() {
    this.props.dispatch(ACTION_RESET_DATA_CARD)
    this.props.dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET_NULL)
  }
  handlerChangeOptionsData = ({ key, value = null }) => this.props.dispatch(ACTION_CHANGE_DATA_OPTIONS_MARKET_INTO_STORE, {key,value, action: 'edit-card'});
  handlerDeleteImage = ({ id, callback }) => this.props.dispatch(ACTION_DELETE_IMAGE_FROM_CARD_MARKET, { engine_image_id: id, callback })

  render() {
    // console.log({loading: this.state.isLoading})
    return (
      <MarketCardTabs
        isEdit
        citys={this.props.storeCardMP?.citys?.length ? getOptionsFiltersMP(this.props.storeCardMP.citys) : []}
        brands={getOptionsFiltersMP(this.props.storeCardMP?.brands.length ? this.props.storeCardMP?.brands : [])}
        values={this.props.storeOptionCardMP}
        countrys={getOptionsFiltersMP(this.props.storeCardMP.countrys)}
        models={getOptionsFiltersMP(this.props.storeCardMP?.models.length ? this.props.storeCardMP?.models : [])}
        listOptions={this.props.storeCardMP}
        generations={getOptionsFiltersMP(this.props.storeCardMP?.generations.length ? this.props.storeCardMP?.generations : [])}
        list={this.state.listDataForInput}
        listOptionsCategory={getOptionsFiltersMP(this.props.listOptionsMPCategory)}
        handlerVirtualClick={this.handlerSendData}
        handlerChangeOptionsData={this.handlerChangeOptionsData}
        handlerDeleteImage={this.handlerDeleteImage}
        handlerChangeSection={this.handlerChangeSection}
        listSectionTabs={this.state.listSectionTabs}
        action_tab={this.state.action_tab}
      />
    )
  }
}

export default connectStoreon(
  'tg',
  'cardData',
  'storeCardMP',
  'storeOptionCardMP',
  'listOptionsMPCategory',
  WithRouter(EditCardMarketPlaceContainer)
);