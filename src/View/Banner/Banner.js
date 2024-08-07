import React from 'react'
import BannerContainer from './Detali/BannerContainer'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import '../../styles/swiper-user-style.scss'
import BannerContent from './Detali/BannerContent';
import { Autoplay, Pagination } from 'swiper';
import BannerContentContainer from './Detali/BannerContentContainer';
import BannerChain from './BannerChain/BannerChain';

export default function Banner({
  handlerChangeScreen
}) {


  return (
    <BannerContainer>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        style={{
          "--swiper-pagination-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-color": "#2B4969",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "4px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          backgroundColor: "#ffffff",
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
      >
        {/* <SwiperSlide>
          <BannerContent handlerChangeScreen={handlerChangeScreen} />
        </SwiperSlide> */}
        <SwiperSlide>
          <BannerChain handlerChangeScreen={handlerChangeScreen} />
        </SwiperSlide>
        {/* <SwiperSlide>
          <BannerContentContainer>

            <div style={{
              width: '100%',
              height: 136,
              padding: 25,
              color: 'var(--text-color-white)'
            }}>
              Тут может быть Ваша реклама
            </div>
          </BannerContentContainer>
        </SwiperSlide>
        <SwiperSlide><BannerContent /></SwiperSlide>
        <SwiperSlide>
          <BannerContentContainer>

            <div style={{
              width: '100%',
              height: 136,
              padding: 25,
              color: 'var(--text-color-white)'
            }}>
              И здесь тоже
            </div>
          </BannerContentContainer>
        </SwiperSlide> */}
      </Swiper>
    </BannerContainer>
  );
}
//swiper-pagination-bullet swiper-pagination-bullet-active