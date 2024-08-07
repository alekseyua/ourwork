import React from 'react'
import CardTopContainer from './CardTopContainer'
import CardTopLeftBlock from './CardTopLeftBlock'
import CardTopRightBlock from './CardTopRightBlock'
import CardTopDecorBlock from './CardTopDecorBlock'
import Icon from '../../../Icon/Icon'
import { starStrokeWhite } from '../../../../images'
import CardInfoBlockTop from './CardInfoBlockTop'
import CardInfoBlockWrapDesc from './CardInfoBlockWrapDesc'
import CardInfo from './CardInfo'
import CardTitleDescBlock from './CardTitleDescBlock'
import Offset from '../../../Offset'

export default function CardReviewTop({
  item,
  index,
  handlerClick,
}) {

  return (
    <CardTopContainer
      onClick={() => handlerClick(item?.user_data?.user_telegram_id)}
    >
      <CardTopLeftBlock>
        <CardTopDecorBlock
          style={{
            backgroundColor: item.rating_number === 1 ? 'var(--background-color-button-red)' : 'var(--bgc-fair-pink)'
          }}
        >
          {
            item.rating_number === 1 ?
              <Icon
                image={starStrokeWhite}
              />
              : item.rating_number
          }
        </CardTopDecorBlock>
      </CardTopLeftBlock>
      <CardTopRightBlock>
        <CardInfoBlockTop>
          <Offset mt={5} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>
              Пользователь:
            </CardTitleDescBlock>
            <CardInfo
              style={{
                color: item.rating_number === 1 ? 'var(--text-color-red)' : 'var(--text-color )',
              }}
            >
              {item.user}
            </CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mt={19} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>
              Компания:
            </CardTitleDescBlock>
            <CardInfo>
              {item.telegram_username}
            </CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mt={21} />
          <CardInfoBlockWrapDesc
            style={{
              textWrap: 'nowrap'
            }}
          >
            <CardTitleDescBlock>
              Количество отзывов:
            </CardTitleDescBlock>
            <CardInfo>
              {item.comments}
            </CardInfo>
          </CardInfoBlockWrapDesc>
        </CardInfoBlockTop>
      </CardTopRightBlock>
    </CardTopContainer>
  )
}
