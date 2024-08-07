import React, { Component } from "react";
import { connectStoreon } from "storeon/react";
import DetailsCardsMPPage from "./DetailsCardsMPPage";
import { getLocaleStore, setLocaleStore, setSessionStore } from "../../../helpers/utils";
import WithRouter from "../../../HOC/WithRouter";
import { CURRENT_PATH_TO_FULL_INFO, ID_TELEGRAM_USER, LAST_PATH_DETAIL_CARD, MARKETPLACE_MAIN, REITING_FULL_INFO } from "../../../helpers/config";
import ComponentCreateMarket from "../../../Components/ModalSection/CreateMarketComponent";
import { WithFavorite } from "../../../HOC/WithFavorite";
import { ACTION_OPEN_MODAL, ACTION_SET_BUTTON_HEADER_ACTION } from "../../../store/helpers/helpers-store";
import { ACTION_GET_DATA_CARD_MARKET, ACTION_RESET_DATA_CARD, ACTION_SET_VALUES_INTO_STORE_MARKET_NULL } from "../../../store/marketplace/createCardMarketPlace/createCardMarketPlace";
import { ACTION_GET_LIST_MY_CARDS_MARKET } from "../../../store/marketplace/marketplace";


class DetailsCardsMPContainer extends Component {
  state = {
    isLoading: {
      loading: true,
      item: null
    },
    id: this.props?.stateNavigate?.card?.id ?? getLocaleStore('id_card_mp'),
    title: ''
  }
  changeScreen = ({path}) => {
    setSessionStore('savePlaceLastLocationOpenCardMarket', true)
    this.props.navigate(path)
  }
  componentDidMount() {
    let pathCameback = -1;
    if(getLocaleStore(CURRENT_PATH_TO_FULL_INFO)?.includes('/rating/full-info/')) pathCameback = getLocaleStore(LAST_PATH_DETAIL_CARD);    
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Маркет',
      pathBackButton: ()=>this.changeScreen({path: pathCameback}),
    });

    this.props.dispatch(ACTION_GET_LIST_MY_CARDS_MARKET, { filter_by_favorite: true })
    if (this?.props?.stateNavigate?.card) {
      setLocaleStore('nameCard', this.props.stateNavigate?.card?.title)
      this.props.stateNavigate?.card?.id && setLocaleStore('id_card_mp', this.props.stateNavigate.card.id)
      this.setState({
        isLoading: {
          loading: false,
        },
        title: this.props.stateNavigate?.card.title ?? ''
      })
    }
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
          title: 'Создать объявление',
          className: 'button__controll--red'
        }
      ]
    })
    this.props.dispatch(ACTION_GET_DATA_CARD_MARKET, { engine_id: this?.state?.id, callback: () => this.handlerChangeScreen({path: MARKETPLACE_MAIN}) })
  }

  componentWillUnmount() {
    setLocaleStore(CURRENT_PATH_TO_FULL_INFO)
    this.props.dispatch(ACTION_RESET_DATA_CARD)
    this.props.dispatch(ACTION_SET_VALUES_INTO_STORE_MARKET_NULL)
  }

  callbackFavorite = () => {
    this.props.dispatch(ACTION_GET_DATA_CARD_MARKET, { engine_id: this?.state?.id,  })
  }

  hendlerFavorite = ({ status, id_card }) => {
    this.props.toggleFavorite({ status, id_card, callback: this.callbackFavorite })
  }

  handlerChangeScreen = ({ url, path, id, username }) => {
    if (username) setLocaleStore('username_review_full', username);
    if (id) {
      setLocaleStore(ID_TELEGRAM_USER, id)
      this.props.navigate(REITING_FULL_INFO+ '/' + id)
      return console.log({ id })
    }
    console.log({path})
    if (path) {
      this.props.navigate(path)
      return
    }
  }

  render() {
    return (
      <DetailsCardsMPPage
        handlerChangeScreen={this.handlerChangeScreen}
        card={this.props.storeOptionCardMP}
        dispatch={this.props.dispatch}
        countFavorite={this.props.favoriteMPCards.count}
        own={this.props.stateNavigate?.own}
        hendlerFavorite={this.hendlerFavorite}
        />
    )
  }
}

export default connectStoreon(
  'storeOptionCardMP',
  'favoriteMPCards',
  WithFavorite(
    WithRouter(
      DetailsCardsMPContainer
    )
  )
);