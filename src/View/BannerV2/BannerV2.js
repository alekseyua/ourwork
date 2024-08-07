import React from 'react'
import BannerContainer from './Detali/BannerContainer'
import BannerContent from './Detali/BannerContent';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination, A11y } from 'swiper';
import '../../styles/swiper-user-style.scss'
import 'swiper/scss/pagination';
import 'swiper/scss';


export default function BannerV2({
  handlerChangeScreen
}) {

  const pagination = {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  const settings = {
    // className: "center",
    // centerMode: true,
    // infinite: true,
    // slidesToShow: 3,
    // speed: 500,
    // rows: 2,
    // slidesPerRow: 1
    infinite: true,
    // speed: 5000,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    type: 'bullets',
    // centerMode: true,
  }

  return (
    <Swiper
      modules={[ Pagination, A11y]}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      pagination={pagination}
      style={{
        "--swiper-pagination-color": "var(--background-color-block)",
        "--swiper-pagination-bullet-inactive-color": "var(--background-color-opacity-50)",
        "--swiper-pagination-bullet-inactive-opacity": "1",
        "--swiper-pagination-bullet-size": "4px",
        "--swiper-pagination-bullet-horizontal-gap": "6px"
      }}
      {...settings}
    >
      <SwiperSlide
        style={{
          pointerEvents: 'all'
        }}
      >
        <BannerContainer>
          <BannerContent handlerChangeScreen={handlerChangeScreen} />
        </BannerContainer>
      </SwiperSlide>

      {/* <SwiperSlide>
        <BannerContainer>
          <div style={{
            width: '100%',
            height: 136,
            padding: 25,
            color: 'var(--text-color-white)'
          }}>
            Тут может быть Ваша реклама
          </div>
        </BannerContainer>
      </SwiperSlide>

      <SwiperSlide>
        <BannerContainer>
          <BannerContent
            handlerChangeScreen={handlerChangeScreen}
          />
        </BannerContainer>
      </SwiperSlide>

      <SwiperSlide>
        <BannerContainer>
          <div style={{
            width: '100%',
            height: 136,
            padding: 25,
            color: 'var(--text-color-red)'
          }}>
            И здесь тоже
          </div>
        </BannerContainer>
      </SwiperSlide> */}
    </Swiper>
  )
}