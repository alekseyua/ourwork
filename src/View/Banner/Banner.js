import React from 'react'
import BannerContainer from './Detali/BannerContainer'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import '../../styles/swiper-user-style.scss'
import { Autoplay, Pagination } from 'swiper';


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
        <SwiperSlide>
          <div
            style={{
              width: '99.9%',
              height: '140px',
              border: '1px solid var(--bg-item)',
              backgroundColor: 'var(--bg-item)',
              borderRadius: 10
            }}
          >this is new banner</div>

        </SwiperSlide>
      </Swiper>
    </BannerContainer>
  );
}
//swiper-pagination-bullet swiper-pagination-bullet-active