import React, { Component } from 'react'
import RaitingAndReviewInfoAboutUser from './RaitingAndReviewInfoAboutUser'
import WithRouter from '../../../HOC/WithRouter'
import { ID_TELEGRAM_USER, REITING_FULL_INFO, USERNAME } from '../../../helpers/config';
import { openOnlyURl } from '../../../helpers/helpers';
import withTranslationCostom from '../../../HOC/withTranslationCostom';
import { setLocaleStore } from '../../../helpers/utils';

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
        t={this.props.t}
      />
    )
  }
}


export default WithRouter(
  withTranslationCostom(RaitingAndReviewInfoAboutUserComponent)
);