import React from 'react'
import Offset from '../../../View/Offset'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'
import InfoBlockContainer from '../../../Components/Component.Info/InfoBlockContainer'
import CardFilterListTruckTransport from '../../../Components/Component.IncominRequest/CardFilterListTruckTransport'

export default function IncomingRequestTruck({
  type,
  message,
  listCards = [],
  toolTipAction,
  handlerSelectcardFilter,
}) {
  if (!message) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>

      <InfoBlockContainer
          message={message}
      />
      <Offset mt={14} />
      {
        listCards.results.length ?
          <CardFilterListTruckTransport
            type={type}
            handlerSelectcardFilter={handlerSelectcardFilter}
            listCards={listCards.results}
            toolTipAction={toolTipAction}

          />
          : <WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>
      }
    </WrapContainer>
  )
}
