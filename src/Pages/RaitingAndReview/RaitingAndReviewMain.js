import React from "react";
import Offset from "../../View/Offset";
import SearchComponent from "../../Components/SearchSection/SearchComponent";
import { ACTION_SET_SEARCH_TEXT_FILTER } from "../../store/raiting-review/raiting-review";
import WrapRootContainer from "../../View/WrapContainer/WrapRootContainer";
import RaitingAndReviewInfoAboutUserComponent from "./RaitingAndReviewInfoAboutUser/RaitingAndReviewInfoAboutUserComponent";
import Button from "../../View/Button/Button";
import { REITING_CREATE } from "../../helpers/config";

export default function RaitingAndReviewMain({
  t,
  handlerClick,
  textSearchReview,
  handlerTextSearch,
  infoAboutUserReview,
}) {

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
      {
      infoAboutUserReview?.username?
      <Button
        full
        onClick={() => handlerClick(infoAboutUserReview.username)}
        href={REITING_CREATE}
        addClass={"button__apply--dark-blue"}
      >
        {t("create-review")}
      </Button>
      :null
      }
    </WrapRootContainer>
  );
}
