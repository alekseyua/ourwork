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
  t,
  infoUser,
}) {
  if (!infoUser?.id) return (<></>);
  return (
    <WrapContainer>
      <Offset mb={15} />
      <InfoAboutUser
        t={t}
        infoUser={infoUser}
      />
      <Offset mb={25} />     
    </WrapContainer>
  );
}
