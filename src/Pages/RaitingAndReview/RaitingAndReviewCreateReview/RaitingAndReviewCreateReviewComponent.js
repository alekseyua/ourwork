import React, { Component } from 'react'
import RaitingAndReviewCreateReview from './RaitingAndReviewCreateReview'
import WithRouter from '../../../HOC/WithRouter';
import { connectStoreon } from 'storeon/react';
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';
import { LAST_PATH_SEND_REVIEW, REITING_MENU } from '../../../helpers/config';
import { ACTION_SET_VALUES_REVIEW, ACTION_SET_VALUES_REVIEW_NULL } from '../../../store/raiting-review/raiting-review';

class RaitingAndReviewCreateReviewComponent extends Component {
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Оставить отзыв',
      pathBackButton: REITING_MENU//
    });
  }

  componentWillUnmount() {
    setLocaleStore("recipient_id", null);
    setLocaleStore("username", '');

    this.props.dispatch(ACTION_SET_VALUES_REVIEW_NULL)
  }

  handlerChangeDataValues = values => this.props.dispatch(ACTION_SET_VALUES_REVIEW, values);

  render() {
    return (
      <RaitingAndReviewCreateReview
        dispatch={this.props.dispatch}
        handlerChangeDataValues={this.handlerChangeDataValues}
      />
    )
  }
}

export default connectStoreon(

  WithRouter(RaitingAndReviewCreateReviewComponent)
)