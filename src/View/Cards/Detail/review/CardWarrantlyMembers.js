import React from 'react'
import WrapContainerBlockBorder from '../../../Blocks/WrapContainerBlockBorder'
import Offset from '../../../Offset'
import CardInfoBlock from './CardInfoBlock'
import CardInfoBlockWrapDesc from './CardInfoBlockWrapDesc'
import CardTitleDescBlock from './CardTitleDescBlock'
import CardInfo from './CardInfo'
import Line from '../../../Line/Line'
import CardDescBlock from './CardDescBlock'
import CardContainerControlCard from '../CardContainerControlCard'
import { twoCloud } from '../../../../images'
import Button from '../../../Button/Button'
import { getDataInfoWhereWorkUser } from '../../../../helpers/helpers'
import RaitingContainer from '../../../Raiting/RaitingContainer'

export default function CardWarrantlyMembers({
  item,
  handlerChangeScreen,
}) {

  return (
    <WrapContainerBlockBorder style={{ marginBottom: 14 }}>
      <CardInfoBlock>
        <Offset mt={8} />
        <CardInfoBlockWrapDesc>
          <CardTitleDescBlock>Пользователь:</CardTitleDescBlock>
          <CardInfo>{item.user_data.user_profile_name}</CardInfo>
        </CardInfoBlockWrapDesc>
        <Offset mt={22} />
        <CardInfoBlockWrapDesc>
          <CardTitleDescBlock>Компания:</CardTitleDescBlock>
          <CardInfo>{item.seller_organization}</CardInfo>
        </CardInfoBlockWrapDesc>
        <Offset mt={17} />
        <CardInfoBlockWrapDesc>
          <CardTitleDescBlock>Рейтинг продавца:</CardTitleDescBlock>
          <CardInfo
            style={{
              display: "flex",
              justifyContent: "flex-end",
              // right: -8,
              position: "relative",
            }}
          >
            <RaitingContainer
              max={5}
              value={item?.rating_int}
              sizeStarHeight={17}
              sizeStarWidth={17}
              reverse
              backgroundFone
            />
          </CardInfo>
        </CardInfoBlockWrapDesc>
      </CardInfoBlock>

      <Line />

      <Offset mb={28} />
      <CardTitleDescBlock>Инфо об продавце:</CardTitleDescBlock>
      <Offset mb={6} />
      <CardDescBlock style={{ fontSize: 14 }}>
        {item.seller_address}
      </CardDescBlock>
      <Offset mb={10} />
      <CardDescBlock style={{ fontSize: 14 }}>
        {item.seller_comment}
      </CardDescBlock>

      <Offset mb={10} />
      <CardDescBlock style={{ fontSize: 14 }}>
        Работал с:
        <span
          style={{
            color: 'var(--text-color)'
          }}
          dangerouslySetInnerHTML={{
            __html: getDataInfoWhereWorkUser(item.seller_worked),
          }}
        ></span>
        {/* {getDataInfoWhereWorkUser(item.seller_worked)} */}
      </CardDescBlock>

      <Offset mt={24} />
      <CardContainerControlCard
        style={{
          gridTemplateColumns: ".95fr 1.05fr",
        }}
      >
        <Button
          onClick={() =>
            handlerChangeScreen({
              id: item?.user_data?.user_telegram_id,
              username: item.username,
            })
          }
          addClass={"button__dark-blue"}
          style={{
            minHeight: 36,
            fontSize: 10,
            width: "95%",
            justifyContent: "center",
          }}
        >
          Открыть профиль
        </Button>
        <Button
          onClick={() =>
            handlerChangeScreen({ url: item?.user_data?.user_url })
          }
          addClass={"button__red"}
          iconLeft={twoCloud}
          style={{
            fontSize: 10,
            minWidth: "content",
            width: "100%",
          }}
          styleIconsLeft={{
            width: 14,
            height: 14,
            top: -2,
          }}
        >
          Написать продавцу
        </Button>
      </CardContainerControlCard>
    </WrapContainerBlockBorder>
  );
}
