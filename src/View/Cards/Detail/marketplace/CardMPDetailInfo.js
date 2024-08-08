import React from "react";
import ViewsImage from "../../../ViewsImage";
import CardMPTitle from "../CardMPTitle";
import CardMPPrice from "../CardMPPrice";
import CardMPContainerRow from "../CardMPContainerRow";
import Icon from "../../../Icon/Icon";
import { fullRedHart, heardRedBorder, location, user } from "../../../../images";
import WrapContainerFilters from "../../../WrapContainer/WrapContainerFilters";
import Button from "../../../Button/Button";
import FavoriteContainer from "../../../BoxContainerFor/FaforiteConrainer/FavoriteContainer";
import CardMPCharacteristic from "../CardMPCharacteristic";
import CardMPDescriptions from "../CardMPDescriptions";
import { openURl } from "../../../../helpers/helpers";
import CardMPCharacteristicSubTitle from "../CardMPCharacteristicSubTitle";
import CardMPText from "../CardMPText";
import CardMPDate from "../CardMPDate";
import Offset from "../../../Offset";
import { getLocaleStore } from "../../../../helpers/utils";
import { SELF_ID_TELEGRAM } from "../../../../helpers/config";
import Preloader from "../../../Preloaders/Preloader";
import WrapContainerPreloader from "../../../Preloaders/WrapContainerPreloader";
import { getNumberSpace } from "../../../../helpers/const";


const CardMPDetailInfo = ({
  item,
  dispatch,
  description,
  countFavorite,
  characteristic,
  hendlerFavorite,
}) => {
  return (
    <>
      <ViewsImage
        images={item?.image_urls?.length && item?.image_urls.length ? item?.image_urls : [{ url: 'https://garsing.shop/media/new/banners/motor_baner.png' }]}
        fullscreenCard={true}
      />
      {
        !item?.title ?
          (<WrapContainerPreloader><Offset mb={20} /> Загрузка ...  <Preloader /></WrapContainerPreloader>)
          : (
            <>
              {item?.title ? <CardMPTitle style={{ fontSize: 18, fontWeight: 900, marginTop: 14 }}>{item?.title}</CardMPTitle> : null}
              <Offset mb={6} />
              {
                item?.country || item?.city || item?.address ?
                  <CardMPContainerRow>
                    <Icon width={16} height={16} image={location} />
                    <CardMPText style={{ padding: 3, color: 'var(--text-color-opacity)' }}>{item?.country ? item?.country : ''} {item?.city ? item.city : ''} {item?.address ? item.address : ''}</CardMPText>
                  </CardMPContainerRow>
                  : null
              }
              {item?.price ? <CardMPPrice catalog={true}>{getNumberSpace(item.price)} <span>₽</span> </CardMPPrice> : null}

              {!!item.user && <CardMPContainerRow style={{ marginTop: 9 }}>
                <Icon width={16} height={16} image={user} />
                <CardMPText style={{ padding: 3, color: 'var(--text-color-opacity)' }}>{item.user}</CardMPText>
              </CardMPContainerRow>}

              <WrapContainerFilters
                style={{
                  position: 'relative',
                  marginTop: 14,
                  marginBottom: 28
                }}
              >
                <Button
                  addClass={'button__controll--red'}
                  style={{
                    width: '100%',
                    minHeight: 46,
                    fontSize: 12,
                    fontWeight: 900
                  }}
                  onClick={() => {
                    if (getLocaleStore(SELF_ID_TELEGRAM) === item.user_data?.telegram_id) {
                      return
                    }
                    openURl(item.user_data.user_url, `Написать ${item.user_data.user_profile_name}`, dispatch, true)
                  }
                  }
                >
                  <p>
                    Написать продавцу
                  </p>
                </Button>
                {/* /button_marketplace_menu */}
                {/* <Link to={MARKETPLACE_FAVORITE}> */}
                <FavoriteContainer
                  style={{ marginLeft: 5 }}
                  onClick={() => { hendlerFavorite({ status: item.is_favorite, id_card: item.id }) }}
                >
                  <Icon
                    image={!item?.is_favorite ? heardRedBorder : fullRedHart}
                    width={16}
                    height={16}
                  />
                  {/* {!!countFavorite && <BadgeFavorite>{countFavorite}</BadgeFavorite>} */}
                </FavoriteContainer>
                {/* </Link> */}
              </WrapContainerFilters>

              {
                characteristic &&
                <CardMPCharacteristic title={'Характеристики'}>
                  {
                    item.count?
                    <CardMPCharacteristicSubTitle title={'В наличии:'}>
                        {item.count}
                      </CardMPCharacteristicSubTitle>
                      : null

                  }
                  {
                    item?.oem ?
                      <CardMPCharacteristicSubTitle title={'Номер запчасти:'}>
                        {item.oem}
                      </CardMPCharacteristicSubTitle>
                      : null
                  }
                  {
                    (item?.brand || item?.model || item?.generation) ?
                      <CardMPCharacteristicSubTitle title={'Применимость:'}>
                        {item?.brand ? item.brand : ''} {item?.model ? ` | ${item.model}` : ''}  {item.generation ? ` | ${item.generation}` : ''}
                      </CardMPCharacteristicSubTitle>
                      : null
                  }

                </CardMPCharacteristic>
              }
              {
                description && item?.description ?
                  <CardMPDescriptions title={'Описание товара'}>
                    {item.description}
                  </CardMPDescriptions>
                  : null
              }
              <Offset mb={3} />
              {
                !!item?.date &&
                <CardMPCharacteristicSubTitle
                  title={'Опубликовано:'}
                  style={{
                    color: 'var(--text-color-opacity)',
                    fontSize: 12
                  }}
                  styleText={{
                    color: 'var(--text-color-opacity)',
                    fontSize: 12
                  }}
                >
                  <CardMPDate>{item.date}</CardMPDate>
                </CardMPCharacteristicSubTitle>
              }
          </>
            )
      }
    </>
  )
}

export default CardMPDetailInfo;