import React from 'react'
import CardRevieContainer from './CardRevieContainer'
import CardInfoBlock from './CardInfoBlock'
import CardInfoBlockWrapDesc from './CardInfoBlockWrapDesc'
import CardInfo from './CardInfo'
import CardTitleDescBlock from './CardTitleDescBlock'
import WrapContainerBlockBorder from '../../../Blocks/WrapContainerBlockBorder'
import Offset from '../../../Offset'
import RaitingContainer from '../../../Raiting/RaitingContainer'

export default function CardReview({
  item,
  handlerClick
}) {

  return (
    <React.Fragment>
      <WrapContainerBlockBorder
        onClick={() => handlerClick(item?.user_data?.user_telegram_id)}
      >

        <CardInfoBlock>
          <Offset mb={4} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>
              Пользователь:
            </CardTitleDescBlock>
            <CardInfo>
              {item?.first_name}
            </CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mb={21} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>
              Компания:
            </CardTitleDescBlock>
            <CardInfo>
              {item?.seller_organization}
            </CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mb={22} />
          <CardInfoBlockWrapDesc
            style={{
              textWrap: 'nowrap'
            }}
          >
            <CardTitleDescBlock>
              Количество отзывов:
            </CardTitleDescBlock>
            <CardInfo>
              {item?.feedbacks_count}
            </CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mb={14} />
          <CardInfoBlockWrapDesc
            style={{
              textWrap: 'nowrap'
            }}
          >
            <CardTitleDescBlock>
              Рейтинг продавца:
            </CardTitleDescBlock>
            <CardInfo
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                // right: -8,
                position: 'relative',
              }}
            >
              <RaitingContainer
                max={5}
                gap={3}
                value={item?.rating}
                sizeStarHeight={15}
                sizeStarWidth={15}
                backgroundFone
                reverse
              />
            </CardInfo>
          </CardInfoBlockWrapDesc>
        </CardInfoBlock>
      </WrapContainerBlockBorder>
      <Offset mb={14} />
    </React.Fragment>
  )
}
