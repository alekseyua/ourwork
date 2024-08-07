import React from 'react'
import Main from './Main'
import { connectStoreon } from 'storeon/react';
import { plus, userWhite, arrowRight, plusDarkBlue } from '../../images';
import WithRouter from '../../HOC/WithRouter';
import Button from '../../View/Button/Button';
import { MAKE_REQUEST_MENU, MARKETPLACE_MAIN, PROFILE_MENU, menuTop } from '../../helpers/config';
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
    headerTitleFAQ: ['Вопросы и ответы'],
    listFAQ: [
      {
        title: 'Как создать запрос на агрегат?',
        description: 'Чтобы найти запчасть, нажмите: «Синяя кнопка меню — Запрос — агрегат/запчасть.» ',
        icon: plusDarkBlue
      },
      {
        title: 'Что делать, если истекает подписка?',
        description: 'Оплата подписки: Синяя кнопка меню — профиль  — подписка. Выберите необходимый доступ.',
        icon: plusDarkBlue
      },
      {
        title: 'Как настроить входящие заявки?',
        description: 'Чтобы начать получать целевые Входящие заявки, нажмите: Синяя кнопка меню — Входящие заявки — и выберите марки, модели и поколения авто от которых у вас есть запчасти.',
        icon: plusDarkBlue
      },
    ],
    
  }

  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Главное меню',
    });
    window.performance.mark('mark_fully_loaded');

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: MAKE_REQUEST_MENU }),
          iconLeft: plus,
          styleIconsLeft: { height: 12 },
          title: 'Создать запрос',
          className: 'button__controll--red'
        },
        {
          action: () => this.handlerChangeScreen({ path: PROFILE_MENU }),
          iconLeft: userWhite,
          styleIconsLeft: { height: 12 },
          style: { marginLeft: 10 },
          title: '',
          className: 'button__header-profile'
        }
      ]
    })
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
        listFAQ={this.state.listFAQ}
        mainMenu={checkAccess(menuTop, this.props.access)}
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