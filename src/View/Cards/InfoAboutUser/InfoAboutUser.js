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
          onClick={() => handlerChangeScreen({ url: infoUser.user_link })}
        >
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>Пользователь:</CardTitleDescBlock>
            <CardInfo>{infoUser.first_name}</CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mt={21} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>Компания:</CardTitleDescBlock>
            <CardInfo>{infoUser.seller_organization}</CardInfo>
          </CardInfoBlockWrapDesc>
          <Offset mt={20} />
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

          <Offset mt={21} />
          <CardInfoBlockWrapDesc>
            <CardTitleDescBlock>Кол-во дней в сервисе:</CardTitleDescBlock>
            <CardInfo>{infoUser?.user_data?.days_in_service}</CardInfo>
          </CardInfoBlockWrapDesc>
        </CardInfoBlock>

        <Offset mt={18} />
        <Line />
        <Offset mt={25} />
        <CardInfoBlockWrapDesc
          style={{
            whiteSpace: "nowrap",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <CardTitleDescBlock>Преимущество продавца:</CardTitleDescBlock>
          <Offset mt={5} />
          <CardInfo
            style={{
              textAlign: "start",
              marginTop: 3,
              whiteSpace: "normal",
            }}
          >
            {/* {infoUser.seller_comment} */}
            {
              <span
                dangerouslySetInnerHTML={{ __html: infoUser.seller_comment }}
              ></span>
            }
          </CardInfo>
        </CardInfoBlockWrapDesc>
        <Offset mt={21} />
        <CardInfoBlockWrapDesc
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <CardTitleDescBlock>Адрес доставки:</CardTitleDescBlock>
          <CardInfo
            style={{
              textAlign: "start",
              marginTop: 3,
              whiteSpace: "normal",
            }}
          >
            {getDataInfoUserFromArray(infoUser.seller_address)}
          </CardInfo>
        </CardInfoBlockWrapDesc>
        <Offset mt={23} />
        <CardInfoBlockWrapDesc
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <CardTitleDescBlock>Гаранты города:</CardTitleDescBlock>
          <CardInfo
            style={{
              textAlign: "start",
              marginTop: 3,
            }}
          >
            {getDataInfoUserFromArray(infoUser.garant_citys)}
          </CardInfo>
        </CardInfoBlockWrapDesc>
      </CardInfoBlock>
    </WrapContainerBlockBorder>
  );
}


