import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../HOC/WithRouter'
import { cloud } from '../../images';
import RaitingAndReviewMain from './RaitingAndReviewMain';
import { openOnlyURl } from '../../helpers/helpers';
import { ID_TELEGRAM_USER, REITING_CREATE, REITING_FULL_INFO, ROOT } from '../../helpers/config';
import { setLocaleStore } from '../../helpers/utils';
import { ACTION_GET_SEARCH_TEXT_REVIEW, ACTION_SET_INFO_ABOUT_REIVEW, ACTION_SET_SEARCH_TEXT_FILTER } from '../../store/raiting-review/raiting-review';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';
import BackgroundPreloader from '../../View/Preloaders/BackgroundPreloader';

class RaitingAndReviewMainComponent extends Component {
  state = {
    isLoadingList: !!!this.props.listRaitingAndReview?.count,
  }
  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Рейтинг и отзывы',
      pathBackButton: ROOT,
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: REITING_CREATE }),
          iconLeft: cloud,
          styleIconsLeft: { height: 12 },
          title: `Оставить отзыв`,
          className: "button__orange-white--disable",
        },
      ],
    });
  }

  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_SEARCH_TEXT_FILTER, '')
    this.props.dispatch(ACTION_SET_INFO_ABOUT_REIVEW, {});
  }

  componentDidUpdate(prevProps, prevState){
    console.log({prevProps})
    if(Object.keys(this.props.infoAboutUserReview).length && this.props.infoAboutUserReview?.id !== prevProps.infoAboutUserReview?.id){
      this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
        isVisible: true,
        buttons: [
          {
            action: () => this.handlerChangeScreen({ path: REITING_CREATE }),
            iconLeft: cloud,
            styleIconsLeft: { height: 12 },
            title: `Оставить отзыв ${this.props.infoAboutUserReview.username}`,
            className: "button__orange-white",
          },
        ],
      });
    }
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
      this.props.navigate(REITING_FULL_INFO+ '/' + id, { state: { id } })
      return
    }
    return openOnlyURl(id)
  }

  render() {
    // return <BackgroundPreloader />;
    return (
      <RaitingAndReviewMain
        handlerTextSearch={this.handlerTextSearch}
        textSearchReview={this.props.textSearchReview}
        handlerClick={this.handlerClick}
        isLoadingList={this.state.isLoadingList}
        handlerChangeScreen={this.handlerChangeScreen}
        handlerChangeSection={this.handlerChangeSection}
        infoAboutUserReview={this.props.infoAboutUserReview}
      />
    );
  }
}

export default connectStoreon(
  "textSearchReview",
  "infoAboutUserReview",

  WithRouter(RaitingAndReviewMainComponent)
);
