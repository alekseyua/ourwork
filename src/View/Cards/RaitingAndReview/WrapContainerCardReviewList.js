import React from "react";
import WrapContainer from "../../WrapContainer/WrapContainer";
import WrapGrid from "../Detail/WrapGrid";
import { DEFAULT_PAGE_SIZE } from "../../../helpers/config";
import PaginationComponent from "../../../Components/Component.PaginationCatalog/PaginationComponent";
import Offset from "../../Offset";
import Label from "../../Label/Label";
import CardReviewOwn from "../Detail/review/CardReviewOwn";

export default function WrapContainerCardReviewList({
  own,
  list = [],
  count = 0,
  currentPage,
  isLeftReview,
  statusInputForm,
  changePagination,
  handlerDeleteReview,
  handlerChangeScreen,
  textMyFeedbackStore,
  handlerChangeFeedback,
  handlerChangeDataValues,
}) {
  return (
    <WrapContainer>
      <Label
        style={{
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Отзывов найдено: {count}
      </Label>
      <Offset mb={7} />
      <WrapGrid>
        {list.map((item, index) => {
          return (
            <WrapContainer
              style={{
                marginBottom: 14,
              }}
              key={"Own-card-" + index}
            >
              <CardReviewOwn
                own={own}
                item={item}
                index={index}
                isLeftReview={isLeftReview}
                statusInputForm={statusInputForm}
                textMyFeedbackStore={textMyFeedbackStore}
                handlerChangeScreen={handlerChangeScreen}
                handlerDeleteReview={handlerDeleteReview}
                handlerChangeFeedback={handlerChangeFeedback}
                handlerChangeDataValues={handlerChangeDataValues}
              />
              {/* <FeedbackMyReview /> */}
            </WrapContainer>
          );
        })}
        <Offset mb={15} />
        {count > DEFAULT_PAGE_SIZE ? (
          <PaginationComponent
            totalCount={count}
            currentPage={currentPage}
            onChangePagination={changePagination}
          />
        ) : null}
      </WrapGrid>
    </WrapContainer>
  );
}
