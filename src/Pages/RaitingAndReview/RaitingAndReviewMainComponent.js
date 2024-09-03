import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../HOC/WithRouter'
import { cloud } from '../../images';
import RaitingAndReviewMain from './RaitingAndReviewMain';
import { openOnlyURl } from '../../helpers/helpers';
import { ID_TELEGRAM_USER, REITING_CREATE, REITING_FULL_INFO, ROOT, menuRaitingAndReview } from '../../helpers/config';
import { setLocaleStore } from '../../helpers/utils';
import { ACTION_GET_SEARCH_TEXT_REVIEW, ACTION_GET_TOP_REVIEW, ACTION_SET_SEARCH_TEXT_FILTER } from '../../store/raiting-review/raiting-review';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';

class RaitingAndReviewMainComponent extends Component {
  state = {
    listSection: [
      {
        title: 'Все пользователи',
        id: 0,
        type: 'all',
        active: true
      },
      {
        title: 'В топе',
        id: 1,
        type: 'top',
        active: false
      }
    ],
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
          title: 'Оставить отзыв',
          className: 'button__orange-white'
        },
      ]
    })

    this.props.dispatch(ACTION_GET_TOP_REVIEW);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listRaitingAndReview?.count !== this.props.listRaitingAndReview?.count) {
      this.setState({
        isLoadingList: false
      })
    }
  }
  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_SEARCH_TEXT_FILTER, '')
  }
  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path)
  }
  
  timer = null;
  handlerTextSearch = (text, callback) => {
    this.setState({
      isLoadingList: true
    })
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      return this.setState({
        isLoadingList: false
      })
    }, 3000)
    if (!!text) {
      this.props.dispatch(ACTION_GET_SEARCH_TEXT_REVIEW, {callback})
      return this.props.dispatch(ACTION_GET_TOP_REVIEW, {callback})
    } else {
      return this.props.dispatch(ACTION_GET_TOP_REVIEW, {callback})
    }
  }


  handlerClick = (id) => {
    if (!`${id}`.includes('http')) {
      setLocaleStore(ID_TELEGRAM_USER, id)
      this.props.navigate(REITING_FULL_INFO+ '/' + id, { state: { id } })
      return
    }
    return openOnlyURl(id)
  }

  handlerChangePagination = ({ page }) => {
      return this.props.dispatch(ACTION_GET_TOP_REVIEW, { page })
  }

  render() {
    return (
      <RaitingAndReviewMain
        listMenu={menuRaitingAndReview}
        listSection={this.state.listSection}
        handlerClick={this.handlerClick}
        isLoadingList={this.state.isLoadingList}
        handlerTextSearch={this.handlerTextSearch}
        textSearchReview={this.props.textSearchReview}
        handlerChangeScreen={this.handlerChangeScreen}
        handlerChangeSection={this.handlerChangeSection}
        listRaitingAndReview={this.props.listRaitingAndReview}
        handlerChangePagination={this.handlerChangePagination}
      />
    )
  }
}

export default connectStoreon(
  'textSearchReview',
  'listRaitingAndReview',

  WithRouter(RaitingAndReviewMainComponent)
)