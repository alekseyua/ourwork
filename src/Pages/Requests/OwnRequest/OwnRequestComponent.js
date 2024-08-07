import React, { Component } from 'react'
import OwnRequest from './OwnRequest'
import { plus } from '../../../images'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../../HOC/WithRouter';
import { LAST_PATH_OWN_REQUEST, MAKE_REQUEST_MENU } from '../../../helpers/config';
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { ACTION_APPLY_ACTION_INTO_MY_APPLICATION, ACTION_GET_LIST_MY_APPliCATION } from '../../../store/requests/requests';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';

class OwnRequestComponent extends Component {

  state = {
    listSection: [
      {
        title: 'На агрегат',
        id: 0,
        type: 'unit',
        active: true
      },
      {
        title: 'На запчасть',
        id: 1,
        type: 'spare',
        active: false
      },
      {
        title: 'На грузовые',
        id: 2,
        type: 'truck',
        active: false
      },
      {
        title: 'На грузоперевозки',
        id: 3,
        type: 'transport',
        active: false
      },
      // {
      //   title: 'На ремонт',
      //   id: 4,
      //   type: 'respair',
      //   active: false
      // },
    ]
  }

  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Мои запросы',
      pathBackButton: getLocaleStore(LAST_PATH_OWN_REQUEST)
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({path: MAKE_REQUEST_MENU}),
          iconLeft: plus,
          styleIconsLeft: { height: 12 },
          title: 'Создать запрос',
          className: 'button__controll--red'
        }
      ]
    })
    this.props.dispatch(ACTION_GET_LIST_MY_APPliCATION, {
      type: this.state.listSection[0].type
    })
  }

  handlerChangeScreen = ({path}) => {
    this.props.navigate(path)
  }

  handlerChangeSection = (e, type) => {
    e.preventDefault();
    this.props.dispatch(ACTION_GET_LIST_MY_APPliCATION, {
      type: type
    })
    this.setState({
      listSection: this.state.listSection.map(el => type === el.type ? { ...el, active: true } : { ...el, active: false })
    })
  }

  changePaginationPage = ({ page }) => {

  }

  handlerActionMyApplication = (action, id, type) => {
    if(action === 'edit'){
      setLocaleStore("itemTabRequest",type);
      setLocaleStore("itemIdOwnRequest",id);
      return this.props.navigate("edit");
    }
    this.props.dispatch(ACTION_APPLY_ACTION_INTO_MY_APPLICATION, { action, id, type })
  }

  render() {
    return (
      <OwnRequest
        listSection={this.state.listSection}
        handlerChangeSection={this.handlerChangeSection}
        listMyApplication={this.props.listMyApplication?.results}
        countMyApplication={this.props.listMyApplication?.count}
        currentPageMyApplication={this.props.listMyApplication?.current_page}
        handlerActionMyApplication={this.handlerActionMyApplication}
        changePaginationPage={this.changePaginationPage}
      />
    )
  }
}


export default connectStoreon(
  'pageMyApplication',
  'listMyApplication',
  WithRouter(OwnRequestComponent)
)