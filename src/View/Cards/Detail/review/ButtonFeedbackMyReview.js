import React from "react";
import styles from "../../styles/review.module.scss";
import Button from "../../../Button/Button";

export default function ButtonFeedbackMyReview({
  id,
  textButtonFeedbackMyReview = "",
  onClick,
  disabled,
}) {
  return (
    <Button disabled={disabled} onClick={()=>onClick(id)} className={styles["feedback-reviews__button"]}>
      {textButtonFeedbackMyReview}
    </Button>
  );
}
