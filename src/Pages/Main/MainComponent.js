import React from 'react'
import Main from './Main'
import { connectStoreon } from 'storeon/react';
import { plus, userWhite, arrowRight, plusDarkBlue } from '../../images';
import WithRouter from '../../HOC/WithRouter';
import Button from '../../View/Button/Button';
import { MAKE_REQUEST_MENU, MARKETPLACE_MAIN, PROFILE_MENU, mainMenuInit } from '../../helpers/config';
import { openOnlyURl } from '../../helpers/helpers';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';
import { checkAccess } from '../../helpers/utils';

class MainComponent extends React.PureComponent {

  state = {
    headerTitleCatalog: ['Поиск по объявлениям',
      <Button
        iconRight={arrowRight}
        styleIconsRight={{ width: 5, height: 13, top: 3, left: -2, minWidth: 15 }}
        addClass={'button__main-menu-show-all'}
        onClick={() => this.props.navigate(MARKETPLACE_MAIN)}
      >{'Все'}</Button>
    ],   
  }

  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Главное меню',
    });
    window.performance.mark('mark_fully_loaded');

    // this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
    //   isVisible: true,
    //   buttons: [
    //     {
    //       action: () => this.handlerChangeScreen({ path: MAKE_REQUEST_MENU }),
    //       iconLeft: plus,
    //       styleIconsLeft: { height: 12 },
    //       title: 'Создать запрос',
    //       className: 'button__controll--red'
    //     },
    //   ]
    // })
  }

  handlerChangeScreen = ({ path }) => {
    if (path.includes('http')) {
      return openOnlyURl(path)
    }
    this.props.navigate(path);
  }

  render() {
    return (
      <Main
        mainMenu={checkAccess(mainMenuInit, this.props.access)}

        listFAQ={this.state.listFAQ}
        headerTitleFAQ={this.state.headerTitleFAQ}
        listToggleTheme={this.state?.listToggleTheme}
        headerTitleCatalog={this.state.headerTitleCatalog}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}

export default connectStoreon(
  'tg',
  'access',
  'mainMenu',
  WithRouter(MainComponent));