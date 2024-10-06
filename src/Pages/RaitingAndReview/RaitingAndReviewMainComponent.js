import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../HOC/WithRouter'
import RaitingAndReviewMain from './RaitingAndReviewMain';
import { openOnlyURl } from '../../helpers/helpers';
import { ID_TELEGRAM_USER, ROOT } from '../../helpers/config';
import { setLocaleStore } from '../../helpers/utils';
import { ACTION_GET_SEARCH_TEXT_REVIEW, ACTION_SET_INFO_ABOUT_REIVEW, ACTION_SET_SEARCH_TEXT_FILTER } from '../../store/raiting-review/raiting-review';
import withTranslationCostom from '../../HOC/withTranslationCostom';

class RaitingAndReviewMainComponent extends Component {

  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "raiting_and_review",
      pathBackButton: ROOT,
    });
  }

  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_SEARCH_TEXT_FILTER, '')
    this.props.dispatch(ACTION_SET_INFO_ABOUT_REIVEW, {});
  }
  

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path)
  }  
  timer = null;
  handlerTextSearch = (text, {}, callback) => {
    this.setState({
      isLoadingList: true
    })
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      return this.setState({
        isLoadingList: false
      })
    }, 3000)
    this.props.dispatch(ACTION_GET_SEARCH_TEXT_REVIEW, {callback})
  }


  handlerClick = (id) => {
    if (!`${id}`.includes('http')) {
      setLocaleStore(ID_TELEGRAM_USER, id)
      return
    }
    return openOnlyURl(id)
  }

  render() {
    return (
      <RaitingAndReviewMain
        handlerTextSearch={this.handlerTextSearch}
        textSearchReview={this.props.textSearchReview}
        handlerClick={this.handlerClick}
        handlerChangeScreen={this.handlerChangeScreen}
        handlerChangeSection={this.handlerChangeSection}
        infoAboutUserReview={this.props.infoAboutUserReview}
        t={this.props.t}
      />
    );
  }
}

export default 
  connectStoreon(
    "textSearchReview",
    "infoAboutUserReview",

    WithRouter(withTranslationCostom(RaitingAndReviewMainComponent)
  )
);
