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


  render() {
    return (
      <RaitingAndReviewInfoAboutUser
        infoUser={this.props.infoAboutUserReview}
        handlerChangeScreen={this.handlerChangeScreen}
      />
    )
  }
}


export default WithRouter(RaitingAndReviewInfoAboutUserComponent)