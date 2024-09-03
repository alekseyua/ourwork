import React from "react";
import WrapContainer from "../../../View/WrapContainer/WrapContainer";
import InfoAboutUser from "../../../View/Cards/InfoAboutUser/InfoAboutUser";
// import HeaderTitleActionComponent from '../../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent'
import NavigationReview from "../../../View/Navigation/NavigationMyApplication/NavigationReview";
import Offset from "../../../View/Offset";
import WrapContainerCardReviewList from "../../../View/Cards/RaitingAndReview/WrapContainerCardReviewList";
import WrapContainerPreloader from "../../../View/Preloaders/WrapContainerPreloader";
import Preloader from "../../../View/Preloaders/Preloader";
import { subscribe } from "../../../images";
import WrapTwoColumnGrid from "../../../View/Blocks/WrapTwoColumnGrid";
import WrapContainerBlockBorder from "../../../View/Blocks/WrapContainerBlockBorder";
import WrapIconBlock from "../../../View/Blocks/WrapIconBlock";
import Icon from "../../../View/Icon/Icon";
import WrapRowGrid from "../../../View/Blocks/WrapRowGrid";
import BlockTitle from "../../../View/Blocks/BlockTitle";
import WrapTitleDescBlockOpacity from "../../../View/Blocks/WrapTitleDescBlockOpacity";
import Line from "../../../View/Line/Line";
import CardTitleDescBlock from "../../../View/Cards/Detail/review/CardTitleDescBlock";
import CardInfo from "../../../View/Cards/Detail/review/CardInfo";
import RaitingContainer from "../../../View/Raiting/RaitingContainer";
import CardInfoBlockWrapDesc from "../../../View/Cards/Detail/review/CardInfoBlockWrapDesc";

export default function OwnProfileReview({
  reviews,
  infoUser,
  listSection,
  isLeftReview,
  statusInputForm,
  changePagination,
  listSectionReviews,
  handlerDeleteReview,
  textMyFeedbackStore,
  handlerChangeScreen,
  handlerChangeSection,
  handlerChangeFeedback,
  handlerChangeDataValues,
}) {
  if (!infoUser?.id)
    return (
      <WrapContainerPreloader>
        Загрузка ... <Preloader />
      </WrapContainerPreloader>
    );
  return (
    <WrapContainer>
      <Offset mb={15} />
      <WrapContainerBlockBorder
        style={{
          padding: "16px 20px",
        }}
      >
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: `15% 85%`,
            padding: "0 10px",
          }}
        >
          <WrapIconBlock>
            <Icon
              addClass={"icon__bg-roze-38"}
              width={14}
              height={14}
             src={subscribe}
            />
          </WrapIconBlock>
          <WrapRowGrid>
            <BlockTitle style={{ fontWeight: 500 }}>
              {infoUser.user_data.user_profile_name}
            </BlockTitle>
            <WrapTitleDescBlockOpacity style={{ fontSize: 14 }}>
              {infoUser.user_data.user_url}
            </WrapTitleDescBlockOpacity>
          </WrapRowGrid>
        </WrapTwoColumnGrid>
        <Offset mb={12} />
        <Line />
        <Offset mb={19} />
        <CardInfoBlockWrapDesc
          style={{
            justifyContain: "space-between",
          }}
        >
          <CardTitleDescBlock
            style={{
              whiteSpace: "nowrap",
            }}
          >
            Рейтинг продавца:
          </CardTitleDescBlock>
          <CardInfo
            //  style={{
            //   display: 'flex',
            //   justifyContent: 'flex-end'
            // }}

            style={{
              display: "flex",
              justifyContent: "flex-end",
              right: -4,
              position: "relative",
            }}
          >
            <RaitingContainer
              max={5}
              value={infoUser?.rating_int}
              sizeStarHeight={13}
              sizeStarWidth={13}
              gap={3.5}
              backgroundFone
              reverse
              // styleStar={{
              //   marginRight: 5
              // }}
            />
          </CardInfo>
        </CardInfoBlockWrapDesc>
      </WrapContainerBlockBorder>

      <Offset mb={11} />
      {/* <HeaderTitleActionComponent
        list={headerTitle}
      /> */}
      <Offset mb={13} />
      <NavigationReview
        handlerChangeSection={handlerChangeSection}
        listSection={listSectionReviews}
        style={{
          gridTemplateAreas: `'received left'`,
        }}
      />
      <Offset mb={5} />
      <Line />
      <Offset mb={13} />
      <NavigationReview
        handlerChangeSection={handlerChangeSection}
        listSection={listSection}
        style={{
          gridTemplateAreas: `'good bad'`,
        }}
      />
      <Offset mb={20} />

      <WrapContainerCardReviewList
        own
        list={reviews.results}
        count={reviews.count}
        currentPage={reviews.current_page}
        isLeftReview={isLeftReview}
        statusInputForm={statusInputForm}
        handlerDeleteReview={handlerDeleteReview}
        textMyFeedbackStore={textMyFeedbackStore}
        changePagination={changePagination}
        handlerChangeFeedback={handlerChangeFeedback}
        handlerChangeScreen={handlerChangeScreen}
        handlerChangeDataValues={handlerChangeDataValues}
      />
    </WrapContainer>
  );
}
