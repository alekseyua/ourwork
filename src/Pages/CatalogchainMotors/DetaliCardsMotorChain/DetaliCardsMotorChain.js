import React from 'react'
import WrapPaddingContainer from '../../../View/WrapContainer/WrapPaddingContainer'
import ViewsImage from '../../../View/ViewsImage';
import { aggrigatePng, location, user } from '../../../images';
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import Offset from '../../../View/Offset';
import CardMPTitle from '../../../View/Cards/Detail/CardMPTitle';
import CardMPContainerRow from '../../../View/Cards/Detail/CardMPContainerRow';
import Icon from '../../../View/Icon/Icon';
import CardMPText from '../../../View/Cards/Detail/CardMPText';
import CardMPPrice from '../../../View/Cards/Detail/CardMPPrice';
import { getNumberSpace } from '../../../helpers/const';
import WrapContainerFilters from '../../../View/WrapContainer/WrapContainerFilters';
import { openURl } from '../../../helpers/helpers';
import Button from '../../../View/Button/Button';
import CardMPCharacteristic from '../../../View/Cards/Detail/CardMPCharacteristic';
import CardMPCharacteristicSubTitle from '../../../View/Cards/Detail/CardMPCharacteristicSubTitle';
import CardMPDescriptions from '../../../View/Cards/Detail/CardMPDescriptions';
import CardMPDate from '../../../View/Cards/Detail/CardMPDate';

function DetaliCardsMotorChain({card, dispatch}) {
  console.log({card})
  return (
    <WrapPaddingContainer>
      <ViewsImage
        images={
          card?.image_urls?.length && card?.image_urls.length
            ? card?.image_urls
            : [
                {
                  url: aggrigatePng,
                },
              ]
        }
        fullscreenCard={true}
      />
      {!card?.title ? (
        <WrapContainerPreloader>
          <Offset mb={20} /> Загрузка ... <Preloader />
        </WrapContainerPreloader>
      ) : (
        <>
          {card?.title ? (
            <CardMPTitle
              style={{ fontSize: 18, fontWeight: 900, marginTop: 14 }}
            >
              {card?.title}
            </CardMPTitle>
          ) : null}
          <Offset mb={6} />
          {card?.country || card?.city || card?.address ? (
            <CardMPContainerRow>
              <Icon width={16} height={16} image={location} />
              <CardMPText
                style={{ padding: 3, color: "var(--text-color-opacity)" }}
              >
                {card?.country ? card?.country : ""}{" "}
                {card?.city ? card.city : ""}{" "}
                {card?.address ? card.address : ""}
              </CardMPText>
            </CardMPContainerRow>
          ) : null}
          {card?.price ? (
            <CardMPPrice catalog={true}>
              {getNumberSpace(card.price)} <span>₽</span>{" "}
            </CardMPPrice>
          ) : null}
          {/* {card?.price_delivery ? (
            <>
              <CardMPCharacteristicSubTitle title={"Доставка: "}>
                <CardMPPrice catalog={true} style={{bottom: 2, position: 'relative'}}>
                  {getNumberSpace(card.price_delivery)} <span>₽</span>{" "}
                </CardMPPrice>
              </CardMPCharacteristicSubTitle>
            </>
          ) : null} */}

          {!!card.user && (
            <CardMPContainerRow style={{ marginTop: 9 }}>
              <Icon width={16} height={16} image={user} />
              <CardMPText
                style={{ padding: 3, color: "var(--text-color-opacity)" }}
              >
                {card.user_data.user_profile_name}
              </CardMPText>
            </CardMPContainerRow>
          )}

          <WrapContainerFilters
            style={{
              position: "relative",
              marginTop: 14,
              marginBottom: 28,
            }}
          >
            <Button
              addClass={"button__controll--red"}
              style={{
                width: "100%",
                minHeight: 46,
                fontSize: 12,
                fontWeight: 900,
              }}
              onClick={() => {
                // if (
                //   getLocaleStore(SELF_ID_TELEGRAM) ===
                //   card.user_data?.user_telegram_id
                // ) {
                //   return;
                // }
                openURl(
                  card.user_data.user_url,
                  `Написать ${card.user_data.user_profile_name}`,
                  dispatch,
                  true
                );
              }}
            >
              <p>Написать продавцу</p>
            </Button>
          </WrapContainerFilters>

          <CardMPCharacteristic title={"Характеристики"}>
            {card.count ? (
              <CardMPCharacteristicSubTitle title={"В наличии:"}>
                {card.count}
              </CardMPCharacteristicSubTitle>
            ) : null}
            {card?.oem ? (
              <CardMPCharacteristicSubTitle title={"Номер запчасти:"}>
                {card.oem}
              </CardMPCharacteristicSubTitle>
            ) : null}
            {card?.brand || card?.model || card?.generation ? (
              <CardMPCharacteristicSubTitle title={"Применимость:"}>
                {card?.brand ? card.brand : ""}{" "}
                {card?.model ? ` | ${card.model}` : ""}{" "}
                {card.generation ? ` | ${card.generation}` : ""}
              </CardMPCharacteristicSubTitle>
            ) : null}
          </CardMPCharacteristic>

          {card?.description ? (
            <CardMPDescriptions title={"Описание товара"}>
              {card.description}
            </CardMPDescriptions>
          ) : null}
          <Offset mb={3} />
          {!!card?.date_create && (
            <CardMPCharacteristicSubTitle
              title={"Опубликовано:"}
              style={{
                color: "var(--text-color-opacity)",
                fontSize: 12,
              }}
              styleText={{
                color: "var(--text-color-opacity)",
                fontSize: 12,
              }}
            >
              <CardMPDate>{card.date_create}</CardMPDate>
            </CardMPCharacteristicSubTitle>
          )}
        </>
      )}
    </WrapPaddingContainer>
  );
}

export default DetaliCardsMotorChain