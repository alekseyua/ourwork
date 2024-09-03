import React from 'react'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import InfoContainerBorder from '../../View/InfoBlock/InfoContainerBorder'
import InfoTextBlock from '../../View/InfoBlock/InfoTextBlock'
import Icon from '../../View/Icon/Icon'
import { attention } from '../../images'
import Offset from '../../View/Offset'
import Menu from '../../View/Menu/Menu'
import Preloader from '../../View/Preloaders/Preloader'
import WrapContainerPreloader from '../../View/Preloaders/WrapContainerPreloader'
import MainFeedbackComponent from '../FeedbackPage/FeedbackPage'
import InfoIconBlock from '../../View/InfoBlock/InfoIconBlock'
import { linksFeedback } from '../../helpers/config'

export default function IncominRequests({
  list,
  message,
  accessRedirect,
  hardColorBlockById,
  handlerChangeScreen,
  isLoadingMainContext,
}) {
  if (isLoadingMainContext) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>

      <Offset mb={15} />

      <InfoContainerBorder>
        <InfoIconBlock>
          <Icon
            width={14}
            height={14}
           src={attention}
          />
        </InfoIconBlock>
        <InfoTextBlock
          style={{ fontWeight: 500 }}
        >
          {message}
        </InfoTextBlock>
      </InfoContainerBorder>

      <Offset mt={14} />

      <Menu
        list={list}
        handlerScreen={handlerChangeScreen}
        hardColorBlockById={hardColorBlockById}
        accessRedirect={accessRedirect}
        firstButtonArrow
        iconSize={18}
      />

      <Offset mb={'calc(100vh - 100% - 243px)'} />

      <MainFeedbackComponent
        list={linksFeedback}
      />

      <Offset mt={36} />

    </WrapContainer>
  )
}
