import React from "react";
import styles from "../../styles/review.module.scss";
import ButtonFeedbackMyReview from "./ButtonFeedbackMyReview";
import MessageFeedbackMyReview from "./MessageFeedbackMyReview";
import Offset from "../../../Offset";
import CardTitleDescBlock from "./CardTitleDescBlock";

export default function FeedbackMyReview({
  id,
  own,
  isLeftReview,
  statusInputForm,
  textMyFeedbackStore,
  handlerDeleteReview,
  textFeedbackMyReview,
  handlerChangeFeedback,
  handlerChangeDataValues,
}) {
  return (
    <div className={styles["feedback-reviews__container"]}>
      {textFeedbackMyReview ||
      (statusInputForm?.isEnable && statusInputForm?.id === id) ? (
        <>
          <CardTitleDescBlock>Ответ:</CardTitleDescBlock>
          {/* <Offset mb={14} /> */}
          <MessageFeedbackMyReview
            own={own}
            id={id}
            textMyFeedbackStore={textMyFeedbackStore}
            textFeedbackMyReview={textFeedbackMyReview}
            handlerChangeDataValues={handlerChangeDataValues}
            placeholder={
              statusInputForm?.isEnable && statusInputForm?.id === id
                ? "Текст ответа"
                : ""
            }
          />
          <Offset mb={10} />
        </>
      ) : null}

      {!isLeftReview && own && (
        <ButtonFeedbackMyReview
          id={id}
          onClick={handlerChangeFeedback}
          disabled={
            textFeedbackMyReview &&
            !(textMyFeedbackStore?.text && textMyFeedbackStore?.id === id)
          }
          textButtonFeedbackMyReview={
            textFeedbackMyReview
              ? "Редактировать"
              : statusInputForm?.isEnable && statusInputForm?.id === id
              ? "Отправить"
              : "Ответить"
          }
        />
      )}
      {isLeftReview && (
        <ButtonFeedbackMyReview
          id={id}
          onClick={handlerDeleteReview}
          textButtonFeedbackMyReview={"Удалить"}
        />
      )}
    </div>
  );
}
