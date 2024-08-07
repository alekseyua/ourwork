import React, { PureComponent } from 'react';
import { connectStoreon } from 'storeon/react';
import MyFavorite from './MyFavorite';
import WithRouter from '../../../HOC/WithRouter';
import { WithFavorite } from '../../../HOC/WithFavorite';
import { getLocaleStore } from '../../../helpers/utils';
import ComponentCreateMarket from '../../../Components/ModalSection/CreateMarketComponent';
import { LAST_PATH_MY_FAVORITE_CARDS } from '../../../helpers/config';
import { ACTION_OPEN_MODAL, ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';
import { ACTION_GET_DATA_PROFILE } from '../../../store/profile/profile';
import { ACTION_GET_LIST_MY_CARDS_MARKET } from '../../../store/marketplace/marketplace';

class MyFavoriteContainer extends PureComponent {

  componentDidMount() {

    this.props.dispatch(ACTION_GET_DATA_PROFILE);

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Избранное',
      pathBackButton: getLocaleStore(LAST_PATH_MY_FAVORITE_CARDS),
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
          styleIconsLeft: { height: 12 },
          title: 'Создать объявление',
          className: 'button__controll--red'
        },
      ]
    });

    this.props.dispatch(ACTION_GET_LIST_MY_CARDS_MARKET, { filter_by_favorite: true });
  }

  changePagination = ({ page }) => {
    const params = {
      filter_by_favorite: true,
      page: page
    }
    this.props.dispatch(ACTION_GET_LIST_MY_CARDS_MARKET, params)
  }



  render() {
    return (
      <MyFavorite
        // isLoading={this.state?.isLoading}
        changePagination={this.changePagination}
        listCards={this.props.favoriteMPCards}
        dispatch={this.props.dispatch}
      />
    )
  }
}

export default connectStoreon(
  'favoriteMPCards',

  WithRouter(WithFavorite(MyFavoriteContainer))
)