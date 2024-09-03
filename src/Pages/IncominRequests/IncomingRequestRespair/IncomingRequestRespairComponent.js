import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { help } from '../../../images';
import IncomingRequestRespair from './IncomingRequestRespair';
import { INCOMING_CURRENT_TAB_SERVICE, INCOMING_REQUEST_INFO_SETTING, INCOMING_REQUEST_MENU } from '../../../helpers/config';
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { ACTION_GET_LIST_FILTERS_BY_TYPE, ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE, ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER_NULL, ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD, ACTION_SET_TEXT_SEARCH_FILTER_SERVICE, ACTION_SET_TOGGLE_CURRENT_TAB_LIST, ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL } from '../../../store/filters/filtersIncominRequest';
import { ACTION_SET_BUTTON_HEADER_ACTION, ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';

class IncomingRequestRespairComponent extends Component {
  state = {
    type: 'respair',
    messages: ['Входящие заявки на ремонт авто. Выберите страну.', 'Входящие заявки на ремонт авто. Выберите Город'],
    massagesSelectCard: ['Найдено ', 'Найдено городов'],
    placeholderSearch: ['Выберите страну', 'Выберите город'],
    listTabs: ['countrys', 'citys'],
    toolTipAction: {
      isShow: false,
      id: null,
      message: ''
    },
    resSelectCard: {
      count: 0,
      results: [],
      current_page: 1,
    },
    loadingListData: true,
  }
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'На ремонт',
      pathBackButton: () => this.handlerChangeScreen({ action: -1, type: 'citys' }),
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: INCOMING_REQUEST_INFO_SETTING }),
          iconLeft: help,
          styleIconsLeft: { height: 12 },
          title: 'Как настроить?',
          className: 'button__orange-white'
        },
      ]
    });

    this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, { type: this.state.type, list: this.state.listTabs[getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0], callback: this.callback });
  }

  componentWillUnmount() {
    setLocaleStore(INCOMING_CURRENT_TAB_SERVICE, '')
  }

  callback = () => {
    this.setState(state => ({
      ...state,
      loadingListData: false,
    }))
  }
  handlerChangeScreen = ({ path, type, typePage, id, image_card = '', name_card = '', action }) => {
    this.props.dispatch(ACTION_SET_LIST_CARDS_BY_TYPE_SERVICE_FILTER_NULL);
    this.props.dispatch(ACTION_SET_TEXT_SEARCH_FILTER_SERVICE, { q: '' })
    this.props.dispatch(ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL)
    this.props.dispatch(ACTION_SET_CONTROLL_BUTTON, { isActive: false });
    this.setState(state => ({
      ...state,
      loadingListData: true,
    }))
    if (path) {
      return this.props.navigate(path)
    }
    if (action === -1 && +getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) === 0) {
      return this.props.navigate(INCOMING_REQUEST_MENU)
    }

    this.setState(state => ({
      ...state,
      urlForSearch: ''
    }))

    setLocaleStore(type, id)
    this.props.dispatch(ACTION_SET_RESULT_SELECT_FILTER_SERVICE_INTO_CARD, {
      ...this.props.resSelectCardCountry,
      [+getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) + action]: {
        name: name_card,
        image: image_card,
        count: 0
      }
    })

    this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
      type: this.state.type,
      current_tab: +getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) + action,
      list: this.state.listTabs[+getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) + action],
      page_size: 99999,
      page: 1,
      callback: this.callback,
    });

    setLocaleStore(INCOMING_CURRENT_TAB_SERVICE, +getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) + action)
  }

  handlerSelectItemFilter = ({ id, sub_type, type, checked }) => {
    
    this.props.dispatch(ACTION_SET_TOGGLE_CURRENT_TAB_LIST, this.state.listTabs[
        getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0
      ],
    );
    this.props.dispatch(ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE, { id, sub_type: this.state.listTabs[getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0].slice(0, -1), type, checked })
  };

  handlerTextSearch = (text, callback) => this.props.dispatch(ACTION_SET_TEXT_SEARCH_FILTER_SERVICE, { q: text, callback, sub_type: this.state.listTabs[getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0].slice(0, -1) });

  handlerShowTooltip = ({ action, id }) => {
    switch (action) {
      case 'disabled':
        this.setState(state => ({
          ...state,
          toolTipAction: {
            isShow: true,
            message: 'Внутренние фильтры по всем городам выставлены',
            id
          }
        }))
        break;
      default:
    }
    const timer = setTimeout(() => {
      this.setState(state => ({
        ...state,
        toolTipAction: {
          isShow: false,
          message: '',
          id: null
        }
      }))
      return () => clearTimeout(timer);
    }, 1500)
  }

  render() {
    console.log(this.props.textSearchIncominFilterService)
    return (
      <IncomingRequestRespair
        message={this.state.messages[getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0]}
        placeholderSearch={this.state.placeholderSearch[getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0]}
        massagesSelectCard={this.state.massagesSelectCard}
        listCards={this.props.listCardsService}
        currentTab={getLocaleStore(INCOMING_CURRENT_TAB_SERVICE) ?? 0}
        listTabs={this.state.listTabs}
        resSelectCardCountry={this.props.resSelectCardCountry}
        toolTipAction={this.state.toolTipAction}
        handlerShowTooltip={this.handlerShowTooltip}
        textInputSearch={this.props.textSearchIncominFilterService}
        type={this.state.type}
        loadingListData={this.state.loadingListData}
        handlerTextSearch={this.handlerTextSearch}
        handlerChangeScreen={this.handlerChangeScreen}
        handlerSelectItemFilter={this.handlerSelectItemFilter}

        comebackPrevFilters={this.handlerChangeScreen}
      />
    )
  }
}

export default connectStoreon(
  'listCardsService',
  'resSelectCardCountry',
  'textSearchIncominFilterService',
  'toggleCurrentTabFiltersService',


  'filtersListByTypeRespairService',

  WithRouter(IncomingRequestRespairComponent)
)