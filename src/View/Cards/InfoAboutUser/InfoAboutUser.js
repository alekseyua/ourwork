import React from 'react'
import WrapContainerBlockBorder from '../../Blocks/WrapContainerBlockBorder'
import CardInfoBlock from '../Detail/review/CardInfoBlock'
import CardInfoBlockWrapDesc from '../Detail/review/CardInfoBlockWrapDesc'
import CardTitleDescBlock from '../Detail/review/CardTitleDescBlock'
import CardInfo from '../Detail/review/CardInfo'
import Offset from '../../Offset'
import Line from '../../Line/Line'
import { getDataInfoUserFromArray } from '../../../helpers/helpers'
import RaitingContainer from '../../Raiting/RaitingContainer'

export default function InfoAboutUser({
  infoUser,
  handlerChangeScreen
}) {
  // console.log({infoUser})
  return (
    <WrapContainerBlockBorder>
      <CardInfoBlock>
        <Offset mt={9} />
        <CardInfoBlock
          // onClick={() => handlerChangeScreen({ url: infoUser?.user_link })}
        >
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>Пользователь:</CardTitleDescBlock>
            <CardInfo>{infoUser.first_name}</CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mt={21} />
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
              style={{
                display: "flex",
                justifyContent: "flex-end",
                right: -4,
                position: "relative",
              }}
            >
              <RaitingContainer
                max={5}
                value={infoUser?.seller_rating}
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
        </CardInfoBlock>
        <Line />
        <Offset mt={25} />
      </CardInfoBlock>
    </WrapContainerBlockBorder>
  );
}


