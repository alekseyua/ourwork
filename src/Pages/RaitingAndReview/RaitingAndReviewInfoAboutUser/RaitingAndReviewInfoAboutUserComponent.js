import React, { Component } from 'react'
import RaitingAndReviewInfoAboutUser from './RaitingAndReviewInfoAboutUser'
import WithRouter from '../../../HOC/WithRouter'
import { connectStoreon } from 'storeon/react';
import { cloud } from '../../../images';
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { ID_TELEGRAM_USER, ID_USER_FOR_REVIEW, LAST_PATH_FULL_INFO, REITING_CREATE, REITING_FULL_INFO, USERNAME } from '../../../helpers/config';
import { ACTION_GET_FULL_INFO_USER, ACTION_GET_REVIEWS_FOR_FULL_INFO_USER } from '../../../store/raiting-review/raiting-review';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';
import { openOnlyURl } from '../../../helpers/helpers';

class RaitingAndReviewInfoAboutUserComponent extends Component {

  state = {
    headerTitle: ['Отзывы продавца'],
    listSection: [
      {
        title: 'Хорошие',
        id: 0,
        type: 'good',
        active: true
      },
      {
        title: 'Плохие',
        id: 1,
        type: 'bad',
        active: false
      }
    ],
  }
  componentDidMount() {
    
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Рейтинг и отзывы',
      pathBackButton: () => this.handlerChangeScreen({path: getLocaleStore(LAST_PATH_FULL_INFO)})      
    });
    
    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: REITING_CREATE, username:  this.props.infoAboutUserReview.username}),
          iconLeft: cloud,
          styleIconsLeft: { height: 12 },
          title: 'Оставить отзыв',
          className: 'button__controll--red'
        },
      ]
    })

    this.props.dispatch(ACTION_GET_FULL_INFO_USER, {
      user_id: getLocaleStore(ID_TELEGRAM_USER)
    });
  }

  handlerChangeScreen = ({ url, path, id, username }) => {
    if(username) setLocaleStore(USERNAME,username)
    if(path){
      return this.props.navigate(path);
    }
    if (id) {
      if (!`${id}`.includes('http')) {
        setLocaleStore(ID_TELEGRAM_USER, id)
        this.props.navigate(REITING_FULL_INFO+ '/' + id, { state: { id } })
        return
      }
      
    }
    
    return openOnlyURl(url)
  } 

  handlerChangeSection = (e, type) => {
    e.preventDefault()
    this.setState({
      listSection: this.state.listSection.map(el => type === el.type ? { ...el, active: true } : { ...el, active: false })
    })
    if (!this.state.listSection[1].active) {
      return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, { user_id: getLocaleStore(ID_USER_FOR_REVIEW), type: 'bad' });
    }
    if (!this.state.listSection[0].active) {
      return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, { user_id: getLocaleStore(ID_USER_FOR_REVIEW), type: 'good' });
    }
  }

  changePagination = ({ page }) => {
    let type = '';
    if (!this.state.listSection[0].active) type = 'bad';
    if (!this.state.listSection[1].active) type = 'good';
    return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, { user_id: getLocaleStore(ID_USER_FOR_REVIEW), type, page });
  }

  render() {
    return (
      <RaitingAndReviewInfoAboutUser
        infoUser={this.props.infoAboutUserReview}
        headerTitle={this.state.headerTitle}
        listSection={this.state.listSection}
        changePagination={this.changePagination}
        handlerChangeSection={this.handlerChangeSection}
        handlerChangeScreen={this.handlerChangeScreen}
        reviews={this.props.infoAboutUserListReview}
      />
    )
  }
}


export default connectStoreon(
  'infoAboutUserReview',
  'infoAboutUserListReview',

  WithRouter(RaitingAndReviewInfoAboutUserComponent)
)