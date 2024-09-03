import React from "react";
import { useStoreon } from "storeon/react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from "react-router-dom";

import styles from '../styles/cardmp.module.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';

import Icon from "../../Icon/Icon";
import { openModalImage } from "../../../helpers/const";

import { fullRedHart, heardRedBorder,  iconLightTheme } from "../../../images";
import FavoriteContainer from "../../BoxContainerFor/FaforiteConrainer/FavoriteContainer";
import { widthMobile } from "../../../helpers/config";

const ImageGalaryMP = ({
  item,
  urlGoToPath,
  hendlerFavorite,
  isClick,
  style,
  height = ((widthMobile-22) / 2),//154,
  width = ((widthMobile-22) / 2), //154,
  scrollPosition,
  isBound,
  own
}) => {
  const { dispatch } = useStoreon()
  const navigate = useNavigate();
  return (
    <div
      className={styles['cardmp__galarey']}
      style={style}
    >
      <LazyLoadImage
        alt={'image.alt'}
        effect="blur"
        src={ item?.image_urls?.length   && item?.image_urls[0]?.url ? item?.image_urls[0]?.url : 'https://garsing.shop/media/new/banners/motor_baner.png'}
        scrollPosition={scrollPosition}
        placeholderSrc={iconLightTheme}
        onClick={() => isClick && item?.image_urls?.length ?
          openModalImage(item.image_urls, dispatch, true)
          : navigate(urlGoToPath, { state: { card: item } })
        }
        style={{
          objectFit: 'cover',
          height: height,
          maxHeight: height,
          minHeight: height,
          borderRadius: '14px',
          width: width,
        }}

      />
      {
        own?
        <></>
        :<FavoriteContainer
          className={styles['cardmp__favorite']}
          // style={{marginLeft: 5}}     
          onClick={() => { hendlerFavorite({ status: item.is_favorite, id_card: item.id })}}
        >
          <Icon
           src={!item?.is_favorite ? heardRedBorder : fullRedHart}
            width= {12}
            height={12}
          />
        </FavoriteContainer>

      }

      {
        isBound && item?.image_urls?.length > 1 ?
          <span
            className={styles['cardmp__bound-container']}
          >
            <span
              className={styles['cardmp__bound-fone']}
            >
            </span>
            <span
              className={styles['cardmp__bound-text']}
            >
              1/{item?.image_urls?.length}
            </span>
          </span>
          : null
      }
      {/* <span
        className={styles['cardmp__favorite-fone']}
      ></span> */}
    </div>
  )
}

export default ImageGalaryMP;