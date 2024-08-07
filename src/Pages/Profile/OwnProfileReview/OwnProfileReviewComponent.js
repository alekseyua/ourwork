import React, { Component } from "react";
import WithRouter from "../../../HOC/WithRouter";
import { connectStoreon } from "storeon/react";
import { getLocaleStore, setSessionStore } from "../../../helpers/utils";
import {
  ID_USER_FOR_REVIEW,
  PROFILE_MENU,
  SELF_ID_TELEGRAM,
  TYPE_REVIEW,
} from "../../../helpers/config";
import OwnProfileReview from "./OwnProfileReview";
import {
  ACTION_DELETE_REVIEWS,
  ACTION_GET_FULL_INFO_USER,
  ACTION_GET_REVIEWS_FOR_FULL_INFO_USER,
  ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE,
  ACTION_SEND_FEEDBACK_MY_REVIEW,
  ACTION_SET_FEEDBACK_MY_REVIEW_STORE,
  ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW_NULL,
} from "../../../store/raiting-review/raiting-review";

class OwnProfileReviewComponent extends Component {
  state = {
    // headerTitle: ['Отзывы продавца'],
    listSection: [
      {
        title: "Хорошие",
        id: 0,
        type: "good",
        active: true,
      },
      {
        title: "Плохие",
        id: 1,
        type: "bad",
        active: false,
      },
    ],
    listSectionReviews: [
      {
        title: "Полученные",
        id: 0,
        type: "received",
        active: true,
      },
      {
        title: "Оставленные",
        id: 1,
        type: "left",
        active: false,
      },
    ],
    statusInputForm: {
      id: null,
      isEnable: false,
    },
  };
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Мои отзывы",
      pathBackButton: PROFILE_MENU, //ROOT,
    });

    this.props.dispatch(ACTION_GET_FULL_INFO_USER, {
      user_id: getLocaleStore(SELF_ID_TELEGRAM),
    });
  }

  handlerChangeScreen = ({ path, id }) => {
    if (id) {
      return console.log(id);
    }
    this.props.navigate(path);
  };

  handlerChangeSection = (e, type) => {
    e.preventDefault();
    this.props.dispatch(ACTION_SET_INFO_ABOUT_USER_LIST_REVIEW_NULL);
    let typeReviewStatus = this.state.listSectionReviews.filter(el=>el.active)[0].type;
    let typeReview = this.state.listSection.filter((el) => el.active)[0].type;
    setSessionStore(TYPE_REVIEW, typeReview);
    if (type === "bad" || type === "good") {
      setSessionStore(TYPE_REVIEW, type);
      typeReview = type
      this.setState( state => ({
        ...state,
        listSection: state.listSection.map((el) =>
          type === el.type ? { ...el, active: true } : { ...el, active: false }
        ),
      }));
      if(typeReviewStatus === 'received'){
        return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, {
          user_id: getLocaleStore(ID_USER_FOR_REVIEW),
          type: typeReview,
        });
      }else{        
        return this.props.dispatch(
          ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE,
          {
            user_id: getLocaleStore(ID_USER_FOR_REVIEW),
            type: typeReview,
          }
        );          
      }
    }else{
      typeReviewStatus = type
        this.setState((state) => ({
          ...state,
          listSectionReviews: state.listSectionReviews.map((el) =>
            type === el.type
              ? { ...el, active: true }
              : { ...el, active: false }
          ),
        }));

        console.log({
          typeReviewStatus,
          typeReview,
        })
      if (typeReviewStatus === "received") {
        return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, {
          user_id: getLocaleStore(ID_USER_FOR_REVIEW),
          type: typeReview,
        });
      } else {
        return this.props.dispatch(
          ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE,
          {
            user_id: getLocaleStore(ID_USER_FOR_REVIEW),
            type: typeReview,
          }
        );
      }
    }

  };

  changePagination = ({ page }) => {
    let typeReviewStatus = this.state.listSectionReviews.filter((el) => el.active)[0].type;
    let typeReview = this.state.listSection.filter((el) => el.active)[0].type;
    if (typeReviewStatus === "received") {
      return this.props.dispatch(ACTION_GET_REVIEWS_FOR_FULL_INFO_USER, {
        user_id: getLocaleStore(ID_USER_FOR_REVIEW),
        type: typeReview,
        page,
      });
    } else {
      return this.props.dispatch(
        ACTION_GET_REVIEWS_FOR_FULL_INFO_USER_RECIEVE,
        {
          user_id: getLocaleStore(ID_USER_FOR_REVIEW),
          type: typeReview,
          page,
        }
      );
    }
  };

  handlerDeleteReview = (id) => {
    this.props.dispatch(ACTION_DELETE_REVIEWS, {id});
  }
  handlerChangeFeedback = (id) => {
    console.log({ id, props: this.props.textMyFeedbackStore });
    this.setState((state) => ({
      ...state,
      statusInputForm: {
        id,
        isEnable: true,
      },
    }));

    this.props.textMyFeedbackStore.id === id &&
      this.props.textMyFeedbackStore.text &&
      // this.state.statusInputForm.isEnable &&
      this.props.dispatch(ACTION_SEND_FEEDBACK_MY_REVIEW, {
        id,
        // path: PROFILE_MENU,
      });
  };
  handlerChangeDataValues = (message) => {
    this.props.dispatch(ACTION_SET_FEEDBACK_MY_REVIEW_STORE, message);
  };

  render() {
    return (
      <OwnProfileReview
        infoUser={this.props.infoAboutUserReview}
        isLeftReview={
          this.state.listSectionReviews.filter((el) => el.active)[0].type ===
          "left"
        }
        // headerTitle={this.state.headerTitle}
        listSection={this.state.listSection}
        listSectionReviews={this.state.listSectionReviews}
        changePagination={this.changePagination}
        handlerDeleteReview={this.handlerDeleteReview}
        handlerChangeSection={this.handlerChangeSection}
        reviews={this.props.infoAboutUserListReview}
        handlerChangeFeedback={this.handlerChangeFeedback}
        handlerChangeDataValues={this.handlerChangeDataValues}
        statusInputForm={this.state.statusInputForm}
        handlerChangeScreen={this.handlerChangeScreen}
        textMyFeedbackStore={this.props.textMyFeedbackStore}
      />
    );
  }
}

export default connectStoreon(
  "infoAboutUserReview",
  "textMyFeedbackStore",
  "infoAboutUserListReview",
  WithRouter(OwnProfileReviewComponent)
);
