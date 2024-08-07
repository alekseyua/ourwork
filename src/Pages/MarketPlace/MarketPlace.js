import React from 'react'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import MainCatalogMPComponent from '../../Components/Component.CatalogMP/MainCatalogMPComponent'
import MainFeedbackComponent from '../FeedbackPage/FeedbackPage'
import Offset from '../../View/Offset'
import { linksFeedback } from '../../helpers/config'

export default function MarketPlace({

}) {
  return (
    <WrapContainer>

      <Offset mb={16} />

      <MainCatalogMPComponent/>

      <Offset mb={36} />

      <MainFeedbackComponent list={linksFeedback} />


    </WrapContainer>
  )
}
