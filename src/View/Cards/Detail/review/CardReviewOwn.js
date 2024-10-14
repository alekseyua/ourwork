import React from "react";
import CardInfoBlock from "./CardInfoBlock";
import CardInfoBlockWrapDesc from "./CardInfoBlockWrapDesc";
import CardInfo from "./CardInfo";
import CardTitleDescBlock from "./CardTitleDescBlock";
import WrapContainerBlockBorder from "../../../Blocks/WrapContainerBlockBorder";
import Line from "../../../Line/Line";
import Offset from "../../../Offset";
import RaitingContainer from "../../../Raiting/RaitingContainer";
import FeedbackMyReview from "./FeedbackMyReview";
import { Link } from "react-router-dom";

export default function CardReviewOwn({
  item,
  own,
  isLeftReview,
  statusInputForm,
  handlerDeleteReview,
  handlerChangeScreen,
  textMyFeedbackStore,
  handlerChangeFeedback,
  handlerChangeDataValues,
}) {
  return (
    <WrapContainerBlockBorder
      onClick={() => handlerChangeScreen({ url: item?.author_url })}
    >
      <CardInfoBlock>
        <Offset mb={6} />

        <CardInfoBlockWrapDesc>
          <CardInfo style={{ textAlign: "start" }}>{item.author_name}</CardInfo>
          {isLeftReview ? (
            // <Link to={item.user_data.user_url}>{
            <CardInfo style={{ textAlign: "start" }}>
              {item.username}
              {/* {item.user_data.user_profile_name} */}
            </CardInfo>
          ) : (
            // }</Link>
            <CardTitleDescBlock style={{ textAlign: "end" }}>
              {/* {item.date_create} */}
              <CardInfo
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  right: -10,
                  position: "relative",
                }}
              >
                <RaitingContainer
                  max={5}
                  gap={4}
                  value={item?.rating}
                  sizeStarHeight={15}
                  sizeStarWidth={15}
                  reverse
                  // backgroundFone
                />
              </CardInfo>
            </CardTitleDescBlock>
          )}
        </CardInfoBlockWrapDesc>
        <CardInfoBlockWrapDesc>
          <CardTitleDescBlock style={{ textAlign: "start" }}>
            {item.date_create.slice(0, 10)}
          </CardTitleDescBlock>
          {isLeftReview ? (
            <CardTitleDescBlock style={{ textAlign: "end" }}>
              <CardInfo
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  right: -10,
                  position: "relative",
                }}
              >
                <RaitingContainer
                  max={5}
                  gap={4}
                  value={item?.rating_int}
                  sizeStarHeight={15}
                  sizeStarWidth={15}
                  reverse
                  // backgroundFone
                />
              </CardInfo>
            </CardTitleDescBlock>
          ) : (
            ""
          )}
        </CardInfoBlockWrapDesc>

        <Offset mb={5} />
        {/* <CardInfoBlockWrapDesc>
          <CardTitleDescBlock>Оценка:</CardTitleDescBlock>
          <CardInfo
            style={{
              display: "flex",
              justifyContent: "flex-end",
              right: -4,
              position: "relative",
            }}
          >
            <RaitingContainer
              max={5}
              gap={4}
              value={item?.rating_int}
              sizeStarHeight={15}
              sizeStarWidth={15}
              reverse
              // backgroundFone
            />
          </CardInfo>
        </CardInfoBlockWrapDesc>
        <Offset mb={14} /> */}
        {/* <Line /> */}
        {/* <Offset mb={14} /> */}
        {/* <CardTitleDescBlock>Текст отзыва:</CardTitleDescBlock> */}
        <Offset mb={14} />
        <CardInfo
          style={{
            textAlign: "start",
            fontSize: 14,
            fontWeight: 400,
            whiteSpace: "normal",
          }}
        >
          {item.text}
        </CardInfo>
      </CardInfoBlock>
      <Offset mb={5} />
      <Line />
      <Offset mb={15} />
      {/* reply */}
      <FeedbackMyReview
        id={item.id}
        own={own}
        isLeftReview={isLeftReview}
        statusInputForm={statusInputForm}
        textFeedbackMyReview={item.reply}
        textMyFeedbackStore={textMyFeedbackStore}
        handlerDeleteReview={handlerDeleteReview}
        handlerChangeFeedback={handlerChangeFeedback}
        handlerChangeDataValues={handlerChangeDataValues}
      />
    </WrapContainerBlockBorder>
  );
}
