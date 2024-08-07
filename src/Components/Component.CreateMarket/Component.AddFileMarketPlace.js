import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import { LAST_PATH_CREATE_ADV, MARKETPLACE_MAIN, MARKET_CURRENT_TAB_ADD_CARDS, menuMarketInnerCreateCard } from '../../helpers/config';
import { getLocaleStore, setLocaleStore } from '../../helpers/utils';
import NotiiceComponent from '../ModalSection/NotiiceComponent';
import AddFileMarkerPlaceSection from '../../Pages/MarketPlace/AddFileMarketPlace/AddFileMarkerPlaceSection';
import { ACTION_OPEN_MODAL, ACTION_SET_TEXT_HEADER } from '../../store/helpers/helpers-store';
import { ACTION_DELETE_FILE_MARKET, ACTION_DELETE_LINK_MARKET, ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET, ACTION_SET_PERCENT_LOADING_FILE_NULL, ACTION_SET_VALUE_INTO_STORE_FILE_MARKET, ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL } from '../../store/marketplace/uploadFileCard/uploadFileCard';

class AddFileMarketPlaceComponent extends PureComponent {

  state = {

    listTitle: {
      'file': 'Загрузить файлом / ссылкой',
      'link': 'Загрузить файлом / ссылкой',
      'file-link': 'Загрузить файлом / ссылкой',
      'hand': 'Создание объявления',
    },
    listMenu: [],
    currentInputId: getLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS),
    isMark:[],
    data: {
      file: [],
      link: '',
    },
    isStatusSetData: false,
    isFocus: false,
    loadingPreviewImage: []
  }

  componentDidMount() {
    this.props.dispatch(ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET)

    this.props.controllerHeaderBand({
      currentTextHandlerBand: this.state.listTitle[getLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS)],
      pathBackButton: getLocaleStore(LAST_PATH_CREATE_ADV),
    });
    this.setState(state => ({
      ...state,
      listMenu: [...menuMarketInnerCreateCard],
      // listMenu: [...menuMarketInnerCreateCard.filter(el => el.tab === (getLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS) === 'file-link' ? 'file-link' : 'file')), ...menuMarketInnerCreateCard.filter(el => +el.id === 2)],
      isMark: !this.props.storeValuesStatusFilesMarket.status_upload ? [0,1] :  []
    }));
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.storeValuesStatusFilesMarket.id !== this.props.storeValuesStatusFilesMarket.id){
      this.setState(state=>({
        ...state,
        // isMark: this.props.storeValuesStatusFilesMarket ? [this.props.storeValuesFilesMarket.id] : [0,1]
        isMark: !this.props.storeValuesStatusFilesMarket.status_upload ? [0,1] :  []
      }))
    }
  }

  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_PERCENT_LOADING_FILE_NULL)
    this.props.dispatch(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL)
  }

  handlerChangeData = ({ key, value }) => {
    let id = getLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS) === 'file' ? 0 : 1;

    if (key === 'urlMarket' && value !== '') {
      id = 999999;
      setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS, 'link')
      this.props.controllerHeaderBand({
        currentTextHandlerBand: this.state.listTitle['link'],
        pathBackButton: getLocaleStore(LAST_PATH_CREATE_ADV),
      });
    }else if (key === 'file' && value.length) {
      setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS, 'file')
      this.props.controllerHeaderBand({
        currentTextHandlerBand: this.state.listTitle['file'],
        pathBackButton: getLocaleStore(LAST_PATH_CREATE_ADV),
      });
      id = 999999;
    }else{
      setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS, 'file-link')
      this.props.controllerHeaderBand({
        currentTextHandlerBand: this.state.listTitle['file-link'],
        pathBackButton: getLocaleStore(LAST_PATH_CREATE_ADV),
      });
    }
    this.props.dispatch(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET, { [key]: value, id })
  }
  
  handlerScreen = ({ path, tab, state }) => {
    this.props.dispatch(ACTION_SET_VALUE_INTO_STORE_FILE_MARKET_NULL)
    this.setState(state=>({
      ...state,
      // isMark: this.props.storeValuesStatusFilesMarket ? [this.props.storeValuesFilesMarket.id] : [0,1]
      isMark: !this.props.storeValuesStatusFilesMarket?.status_upload ?[0,1] :  []
    }))
    if (path === 'modal') {
      this.props.dispatch(ACTION_OPEN_MODAL, {
        show: true, // 
        //
        content: <NotiiceComponent message={
          state.tab === 'file' ?
              'Для загрузки объявлений файлом, удалите загруженную ссылку'
              : 'Для загрузки объявлений ссылкой, удалите загруженный файл'
          }
          // state={state}
        />,
        hideIcon: true,
        hideControll: true,
      })
    }

    setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS, state?.tab)
    switch (state.tab) {
      case 'hand':
        this.props.navigate(path);
        break;
      case 'file': // Загрузить файлом
        this.props.dispatch(ACTION_SET_TEXT_HEADER, this.state.listTitle[state.tab]);
        this.setState(state => ({
          ...state,
          currentTab: path,
          listMenu: [...menuMarketInnerCreateCard.filter(el => +el.id === 0), ...menuMarketInnerCreateCard.filter(el => +el.id === 2)],
        }));
        break;
      case 'file-link': //Загрузить ссылкой
        this.props.dispatch(ACTION_SET_TEXT_HEADER, this.state.listTitle[state.tab]);
        this.setState(state => ({
          ...state,
          currentTab: path,
          listMenu: [...menuMarketInnerCreateCard.filter(el => +el.id === 1), ...menuMarketInnerCreateCard.filter(el => +el.id === 2)],
        }))
        break;
      default:
    }
  }

  callback = () => {
    this.setState( state => ({
      ...state,
      loadingPreviewImage: []
    }))
  }

  handlerDeleteLink = ({ id }) => {
    this.setState( state => ({
      ...state,
      loadingPreviewImage: [id]
    }))
    this.props.dispatch(ACTION_DELETE_LINK_MARKET, { id, path: MARKETPLACE_MAIN, callback: this.callback })
  }
  handlerDeleteFile = ({ id }) => {
    this.setState( state => ({
      ...state,
      loadingPreviewImage: [id]
    }))
    this.props.dispatch(ACTION_DELETE_FILE_MARKET, { id, path: MARKETPLACE_MAIN, callback: this.callback })
  }

  handlerChangeFocus = even => {
    this.setState(state => ({
      ...state,
      isFocus: !state.isFocus
    }))
  }
  
  handlerChangeBlur = even => {
    this.setState(state => ({
      ...state,
      isFocus: !state.isFocus
    }))
  }

  render() {
    return (
      <AddFileMarkerPlaceSection
        handlerScreen={this.handlerScreen}
        values={{ ...this.props.storeValuesFilesMarket }}
        valuesPreview={{ ...this.props.storeValuesStatusFilesMarket }}
        isMark={this.state.isMark}
        tg={this.props.tg}
        testSize={this.props.testSize}
        isFocus={this.state.isFocus}
        dispatch={this.props.dispatch}
        listSubMenu={this.state.listMenu}
        percentage={this.props.percentageAddFileMP}
        handlerChangeData={this.handlerChangeData}
        handlerApplyChange={this.handlerSendData}
        handlerDeleteFile={this.handlerDeleteFile}
        handlerDeleteLink={this.handlerDeleteLink}
        handlerChangeFocus={this.handlerChangeFocus}
        handlerChangeBlur={this.handlerChangeBlur}
        loadingPreviewImage={this.state.loadingPreviewImage}
      />
    );
  }
}

export default connectStoreon(
  'storeValuesFilesMarket',
  'storeValuesStatusFilesMarket',

  'testSize',
  'tg',
  'percentageAddFileMP',
  WithRouter(AddFileMarketPlaceComponent));