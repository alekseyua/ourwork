import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import Feedback from '../../View/Feedback/Feedback';
import WithRouter from '../../HOC/WithRouter';
import { getLocaleStore } from '../../helpers/utils';
import { ACTION_SET_INPUT_TEXT_FEEDBACK } from '../../store/feedback/feedback';

class FeedbackGetMonyForIdeaComponent extends Component {
  state = {
    placeholder: [
      'Опишите свою идею как можно улучшить сообщество. Если ваша идея понравится, то вы получите денежное вознаграждение'
    ],
    nameButton: 'Предложить'
  }
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Деньги за идею',
      pathBackButton: getLocaleStore('lastPathFeedback'),
    });

  }

  handlerChangeInputText = ({ text }) => {
    this.props.dispatch(ACTION_SET_INPUT_TEXT_FEEDBACK, text);
  }

  render() {
    return (
      <Feedback
        placeholder={this.state.placeholder}
        textInputFeedback={this.props.textInputFeedback}
        handlerChangeInputText={this.handlerChangeInputText}
      />
    )
  }
}

export default connectStoreon(
  'textInputFeedback',
  WithRouter(FeedbackGetMonyForIdeaComponent)
);