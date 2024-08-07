import React from "react";
import styles from "../../styles/review.module.scss";
import TextArea from "../../../TextArea/TextArea";
import { Form, Formik } from "formik";

export default function MessageFeedbackMyReview({
  own,
  id,
  placeholder,
  textMyFeedbackStore,
  textFeedbackMyReview,
  handlerChangeDataValues,
}) {
  return (
    <TextArea
      disabled={!!!own}
      addClass={styles["feedback-reviews__form-input"]}
      value={
        textMyFeedbackStore?.id === id && textMyFeedbackStore?.text
          ? textMyFeedbackStore.text
          : textFeedbackMyReview
      }
      // value={values.text }
      placeholder={placeholder}
      height={50}
      name={"text"}
      // style={{
      //   paddingLeft: 0
      // }}
      onChange={(e) => {
        let value = e.target.value;
        if(value.length === 0) value = ' ';
        handlerChangeDataValues({ text: value, id });
        // setFieldValue("text", value);
      }}
    />
  );
}
