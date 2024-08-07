import React from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import InfoAboutUser from '../../../View/Cards/InfoAboutUser/InfoAboutUser'
import HeaderTitleActionComponent from '../../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent'
import NavigationReview from '../../../View/Navigation/NavigationMyApplication/NavigationReview'
import Offset from '../../../View/Offset'
import WrapContainerCardReviewList from '../../../View/Cards/RaitingAndReview/WrapContainerCardReviewList'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'

export default function RaitingAndReviewInfoAboutUser({
  infoUser,
  headerTitle,
  listSection,
  reviews,
  changePagination,
  handlerChangeSection,
  handlerChangeScreen,
}) {
  if (!infoUser?.id) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>
      <Offset mb={15} />
      <InfoAboutUser
        infoUser={infoUser}
        handlerChangeScreen={handlerChangeScreen}
      />
      <Offset mb={25} />
      <HeaderTitleActionComponent list={headerTitle} />
      <Offset mb={13} />
      <NavigationReview
        listSection={listSection}
        handlerChangeSection={handlerChangeSection}
        style={{
          gridTemplateAreas: `'good bad'`,
        }}
      />
      <Offset mb={20} />

      <WrapContainerCardReviewList
        list={reviews.results}
        count={reviews.count}
        currentPage={reviews.current_page}
        changePagination={changePagination}
        handlerChangeScreen={handlerChangeScreen}
      />
    </WrapContainer>
  );
}
