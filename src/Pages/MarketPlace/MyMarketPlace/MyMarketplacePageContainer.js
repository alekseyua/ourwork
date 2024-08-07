import React, { Component } from "react";
import { connectStoreon } from 'storeon/react'
import WithRouter from "../../../HOC/WithRouter";
import MyMarketplacePage from "./MyMarketplacePage";
import { setLocaleStore } from "../../../helpers/utils";
import ComponentCreateMarket from '../../../Components/ModalSection/CreateMarketComponent';
import { MARKETPLACE_EDIT_OWN_CARD, PROFILE_MENU } from "../../../helpers/config";
import { plus } from "../../../images";
import { ACTION_GET_LIST_OWN_CARDS, ACTION_SET_SEARCH_OWN_CARDS, ACTION_RESET_TEXT_SEARCH_MARKET_CARDS } from "../../../store/marketplace/marketplace";
import { ACTION_OPEN_MODAL, ACTION_SET_BUTTON_HEADER_ACTION } from "../../../store/helpers/helpers-store";
import { ACTION_DELETE_CARD_FROM_MY_MARKET } from "../../../store/marketplace/myMarketplace/myMarketplace";
import { ACTION_DELETE_FILE_MARKET, ACTION_DELETE_LINK_MARKET, ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET } from "../../../store/marketplace/uploadFileCard/uploadFileCard";
import { funcDelay } from "../../../helpers/const";


class MyMarketplacePageContainer extends Component {

  state = {
    isLoading: true,
    loadingActionCard: [],
    loadingPreviewImage: [],
  }

  componentDidMount() {
    this.props.dispatch(ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET)
    this.props.dispatch(ACTION_GET_LIST_OWN_CARDS, { callback: this.callback })
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Мои объявления',
      pathBackButton: PROFILE_MENU
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.props.dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: <ComponentCreateMarket />,
            hideIcon: true,
            hideControll: true,
          }),
          iconLeft: plus,
          styleIconsLeft: { height: 12 },
          className: 'button__controll--red-148',
          title: 'Создать объявление',
        }
      ]
    })
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.myMarketplace.count !== this.props.myMarketplace.count) {
  //     this.setState({
  //       isLoading: false
  //     })
  //   }
  // }  

  componentWillUnmount() {
    console.log('обнуление в маркете поиска')
    // this.props.dispatch(ACTION_RESET_TEXT_SEARCH_MARKET_CARDS)
  }

  changePaginationPage = ({ page }) => {
    this.props.dispatch(ACTION_GET_LIST_OWN_CARDS, { page, callback: this.callback })
  }

  handlerActionCard = ({ action, id_card }) => {
    switch (action) {
      case 'delete':
        this.setState( state => ({
          ...state,
          loadingActionCard: [id_card]
        }))
        return this.props.dispatch(ACTION_DELETE_CARD_FROM_MY_MARKET, { engine_id: id_card, callback: this.callback });
      case 'edit':
        setLocaleStore('id_card_mp', id_card)
        this.handlerChangeScreen({ path: MARKETPLACE_EDIT_OWN_CARD + '/' + id_card })
        break;
      default:
        break;
    }
  }

  callback = () => {
    this.setState( state => ({
      isLoading: false,
      loadingActionCard: [],
      loadingPreviewImage: [],
    }))
  }

  
  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path)
  }

  handlerTextSearch = (text, callback) => {
    if (!!text) {
      this.props.dispatch(ACTION_SET_SEARCH_OWN_CARDS, { callback });
    } else {
      this.props.dispatch(ACTION_SET_SEARCH_OWN_CARDS, { callback });
    }
    return false;
  }

  handlerDeleteFile = ({ id }) => {
    this.setState( state => ({
      ...state,
      loadingPreviewImage: [id]
    }))
    this.props.dispatch(ACTION_DELETE_FILE_MARKET, { id , callback: this.callback});
    funcDelay(()=> this.props.dispatch(ACTION_GET_LIST_OWN_CARDS), 3000)
  }
  
  handlerDeleteLink = ({ id }) => {
    console.log({id})
    this.setState( state => ({
      ...state,
      loadingPreviewImage: [id]
    }))
    this.props.dispatch(ACTION_DELETE_LINK_MARKET, { id, callback: this.callback })
    funcDelay(()=> this.props.dispatch(ACTION_GET_LIST_OWN_CARDS), 3000)
  }

  render() {
    return (
      <MyMarketplacePage
        listCards={this.props.myMarketplace}
        handlerTextSearch={this.handlerTextSearch}
        changePagination={this.changePaginationPage}
        handlerActionCard={this.handlerActionCard}
        isLoading={this.state.isLoading}
        textSearch={this.props.textInputMarketSearch}
        textErrorSearch={this.props.textSearchError}
        
        valuesPreview={{ ...this.props.storeValuesStatusFilesMarket }}
        handlerDeleteFile={this.handlerDeleteFile}
        handlerDeleteLink={this.handlerDeleteLink}
        loadingActionCard={this.state.loadingActionCard}
        loadingPreviewImage={this.state.loadingPreviewImage}
      />
    )
  }
}

export default connectStoreon(
  'myMarketplace',
  'searchMyMPText',

  'textErrorSearch',
  'textInputMarketSearch',
  'storeValuesStatusFilesMarket',

  WithRouter(MyMarketplacePageContainer)
);