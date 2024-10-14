import React from "react";
import Offset from "../../View/Offset";
import SearchComponent from "../../Components/SearchSection/SearchComponent";
import { ACTION_SET_SEARCH_TEXT_FILTER } from "../../store/raiting-review/raiting-review";
import WrapRootContainer from "../../View/WrapContainer/WrapRootContainer";
import RaitingAndReviewInfoAboutUserComponent from "./RaitingAndReviewInfoAboutUser/RaitingAndReviewInfoAboutUserComponent";
import Button from "../../View/Button/Button";
import { REITING_CREATE } from "../../helpers/config";
import CardReviewOwn from "../../View/Cards/Detail/review/CardReviewOwn";
import WrapContainer from "../../View/WrapContainer/WrapContainer";

export default function RaitingAndReviewMain({
  t,
  handlerClick,
  textSearchReview,
  handlerTextSearch,
  infoAboutUserReview,
}) {
  console.log({infoAboutUserReview})
  return (
    <WrapRootContainer>
      <Offset mt={17} />

      <div style={{ width: "100vw" }}>
        <SearchComponent
          placeholder={t("input_name_user")}
          isUpblock={true}
          style={{
            paddingLeft: 1,
            height: 44,
          }}
          getResultSearch={handlerTextSearch}
          enteredText={textSearchReview}
          actionDisptchGetSearch={ACTION_SET_SEARCH_TEXT_FILTER} // где хроним текст
          styleHelpTextSearch={{}}
        />
      </div>
      <Offset mb={20} />
      {Object.keys(infoAboutUserReview).length ? (
        <RaitingAndReviewInfoAboutUserComponent
          infoAboutUserReview={infoAboutUserReview}
        />
      ) : null}
      {infoAboutUserReview?.username ? (
        <Button
          full
          onClick={() => handlerClick(infoAboutUserReview.username)}
          href={REITING_CREATE}
          addClass={"button__apply--dark-blue"}
        >
          {t("create-review")}
        </Button>
      ) : null}
      { infoAboutUserReview?.feedbacks?.length &&
        infoAboutUserReview.feedbacks.map((f) => {
          return <WrapContainer
              style={{
                marginBottom: 14,
              }}
              key={"Own-card-" + f.id}
            >
              <CardReviewOwn
                // own={own}
                item={f}
                index={f.id}
                // isLeftReview={isLeftReview}
                // statusInputForm={statusInputForm}
                // textMyFeedbackStore={textMyFeedbackStore}
                // handlerChangeScreen={handlerChangeScreen}
                // handlerDeleteReview={handlerDeleteReview}
                // handlerChangeFeedback={handlerChangeFeedback}
                // handlerChangeDataValues={handlerChangeDataValues}
              />
              {/* <FeedbackMyReview /> */}
            </WrapContainer>
          // <div key={f.id}>{f.text}</div>;
        })}
    </WrapRootContainer>
  );
}
