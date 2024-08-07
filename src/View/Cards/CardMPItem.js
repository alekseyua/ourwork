import React from "react";
import { Link } from "react-router-dom";
import ImageGalaryMP from "./Detail/ImageGalaryMP";
import { openURl } from "../../helpers/helpers";

import CardMPContainer from "./Detail/CardMPContainer";
import CardMPTitle from "./Detail/CardMPTitle";
import CardMPPrice from "./Detail/CardMPPrice";
import CardMPContainerRow from "./Detail/CardMPContainerRow";
import CardMPDate from "./Detail/CardMPDate";
import CardMPCharacteristic from "./Detail/CardMPCharacteristic";
import CardMPDescriptions from "./Detail/CardMPDescriptions";
import CardMPLink from "./Detail/CardMPLink";
import Icon from "../Icon/Icon";
import { MARKETPLACE_DETAILY_CARD } from "../../helpers/config";
import WrapContainerBlock from "../Blocks/WrapContainerBlock";
import WrapTwoColumnGrid from "../Blocks/WrapTwoColumnGrid";
import Button from "../Button/Button";
import { bascketWhite, location, penRed, settingRedRotation } from "../../images";
import Offset from "../Offset";
import { getNumberSpace } from "../../helpers/const";

const CardMPItem = ({
  own,
  item,
  style = {},
  isDate,
  isUser,
  catalog,
  dispatch,
  description,
  isIconLocation,
  characteristic,
  hendlerFavorite = () => { },
  handlerActionCard = () => { },
  loadingActionCard = [],
}) => {
  return (
    <CardMPContainer
      style={{
        ...style,
      }}
    >
      <ImageGalaryMP
        urlGoToPath={MARKETPLACE_DETAILY_CARD}
        own={own}
        item={item}
        catalog={catalog}
        hendlerFavorite={hendlerFavorite}
      />

      <Link
        to={MARKETPLACE_DETAILY_CARD}
        state={{ card: item, own }}
        style={{
          zIndex: "var(--z-index-element-link)",
          // marginTop: 11
        }}
      >
        <Offset mb={14} />
        {item?.title && (
          <CardMPTitle
            style={{
              minHeight: 37, //60
              maxWidth: `calc((100vw - 110px) / 2)`,
              display: `-webkit-box`,
              WebkitLineClamp: `2`,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item?.title}
          </CardMPTitle>
        )}
        <Offset mb={2} />

        {item?.country ? (
          <CardMPContainerRow catalog={catalog}>
            {isIconLocation && <Icon image={location} />}
            {item?.country} {item?.city ? ", " : ""}{" "}
            {item?.city ? item?.city : ""}
          </CardMPContainerRow>
        ) : (
          <Offset mb={26} />
        )}

        {
          item?.price ? (
            <CardMPPrice catalog={catalog}>
              {getNumberSpace(item.price)} <span>₽</span>{" "}
            </CardMPPrice>
          ) : (
            <Offset mb={27} />
          )
          // <CardMPPrice style={{ minHeight: 25 }}></CardMPPrice>
        }
        {characteristic && item?.characteristic && (
          <CardMPCharacteristic title={"Характеристики"} catalog={catalog}>
            {item.characteristic}
          </CardMPCharacteristic>
        )}
        {description && item?.description && (
          <CardMPDescriptions title={"Описание"} catalog={catalog}>
            {item.description}
          </CardMPDescriptions>
        )}
      </Link>
      {isUser && item?.user_data?.user_url && (
        <CardMPLink
          onClick={() =>
            openURl(
              item.user_data.user_url,
              `Написать ${item.user_data?.user_profile_name}`,
              dispatch
            )
          }
        >
          {/* {item.user_data.user_url} */}
          {item.user_data?.user_profile_name}
        </CardMPLink>
      )}
      {isDate && item?.date && <CardMPDate>{item.date}</CardMPDate>}
      {own ? (
        <WrapContainerBlock>
          <Offset mt={14} />
          <WrapTwoColumnGrid
            style={{
              gridTemplateColumns: `36px 70%`,
              justifyItems: "end",
              gap: 10,
              pointerEvents: item.is_upload ? "none" : "all",
              opacity: item.is_upload? .3 : 1,
            }}
          >
            <Button
              addClass={"button__controll-delete--red"}
              onClick={() =>
                handlerActionCard({ action: "delete", id_card: item.id })
              }
            >
              <Icon image={bascketWhite} width={15} height={15} />
            </Button>

            <Button
              addClass={"button__controll-edit--roze"}
              iconLeft={penRed}
              onClick={() =>
                handlerActionCard({ action: "edit", id_card: item.id })
              }
              styleIconsLeft={{
                width: 15,
                height: 15,
                marginRight: 8,
              }}
            >
              Редактировать
            </Button>
          </WrapTwoColumnGrid>
        </WrapContainerBlock>
      ) : null}
      {loadingActionCard.length && loadingActionCard.includes(item.id) ? (
        <span className={"action__background-loading"} style={{}}>
          <Icon image={settingRedRotation} width={20} height={20} />
        </span>
      ) : null}
    </CardMPContainer>
  );
}

export default CardMPItem;