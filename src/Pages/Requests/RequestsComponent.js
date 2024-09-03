import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../HOC/WithRouter';
import Requests from './Requests';
import { arrowRight, myRequest } from '../../images';
import Button from '../../View/Button/Button';
import { MAKE_REQUEST_OWN_REQUEST, MARKETPLACE_MAIN, ROOT, menuRequests } from '../../helpers/config';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';
import { isAndroid, isIos } from '../../helpers/utils';

class RequestsComponent extends Component {

  state = {
    menu: [],
    headerTitleCatalog: ['Поиск по объявлениям',
      <Button
        iconRight={arrowRight}
        styleIconsRight={{ width: 13, height: 13, top: 4, left: -4 }}
        addClass={'button__main-menu-show-all'}
        onClick={() => this.props.navigate(MARKETPLACE_MAIN)}
      >{'Все'}</Button>
    ],
    hardColorBlockById: [
      {
        id: 0,
        colorBackground: 'var(--background-color-Mirage-blue)',
        color: 'var(--text-color-white)',
      },
      {
        id: 1,
        colorBackground: 'var(--background-color-Mirage-blue)',
        color: 'var(--text-color-white)'
      },
    ]
  }

  componentDidMount() {
    
    if(!isAndroid() && !isIos()) document.documentElement.style.setProperty('--hight-scrollbar', '10px')

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'СОЗДАТЬ ЗАПРОС',
      pathBackButton: () => this.handlerChangeScreen({ path: ROOT })//ROOT,       
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: MAKE_REQUEST_OWN_REQUEST }),
          iconLeft: myRequest,
          styleIconsLeft: { height: 12 },
          title: 'Мои запросы',
          className: 'button__orange-white'
        },
      ]
    })
  }


  componentWillUnmount(){
    document.documentElement.style.setProperty('--hight-scrollbar', '0px')
  }

  handlerChangeScreen = ({ path }) => this.props.navigate(path);

  render() {
    return (
      <Requests
        listMenu={menuRequests}
        hardColorBlockById={this.state.hardColorBlockById}
        headerTitleCatalog={this.state.headerTitleCatalog}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}
export default connectStoreon(
  WithRouter(RequestsComponent)
);