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
  handlerChangeScreen,

}) {
  console.log({infoUser})
  if (!infoUser?.id) return (<></>);
  return (
    <WrapContainer>
      <Offset mb={15} />
      <InfoAboutUser
        infoUser={infoUser}
        handlerChangeScreen={handlerChangeScreen}
      />
      <Offset mb={25} />
      {/* <WrapContainerCardReviewList
        list={infoUser.feedbacks}
        count={infoUser.feedbacks.length}
        currentPage={reviews.current_page}
        changePagination={changePagination}
        handlerChangeScreen={handlerChangeScreen}
      /> */}
    </WrapContainer>
  );
}
