import React from 'react'
import { imageBanner, imageBanner1, imageBanner2 } from '../../images';
import ImageGalary from '../ViewsImage/ImageGalary';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";

const Banner = () => {
  const listBanners = [imageBanner1, imageBanner2]
      const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + "</span>";
        },
      };
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        lazyPreloadPrevNext={1}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={pagination}
        // observer={true}
        // observeSlideChildren
        style={{
          "--swiper-pagination-color": "var(--bg-block)",
          "--swiper-pagination-bullet-inactive-color":
            "var(--background-color-opacity-50)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "4px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
      >
        {listBanners.map((banner, i) => {
          return (
            <SwiperSlide key={i}>
              <ImageGalary src={banner} width={"100%"} height={180} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner