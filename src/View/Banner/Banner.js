import React from 'react'
import { imageBanner, imageBanner1, imageBanner2 } from '../../images';
import ImageGalary from '../ViewsImage/ImageGalary';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import Label from '../Label/Label';

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
          delay: 2500,
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
              <div style={{ position: "relative" }}>
                <ImageGalary src={banner} width={"100%"} height={180} />
                <Label
                  style={{
                    position: "absolute",
                    top: i === 0 ? "80%" : "20%",
                    left: i === 0 ? "20px" : "60%",
                    maxWidth: 110,
                    transform:
                      i === 0 ? "translateY(-50%)" : "translateY(-20%)",
                    fontSize: "18px",
                    color: "var(--text-color-white)",
                    fontWeight: "bold",
                    textShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {i === 0 ? "baner.spare" : "baner.earn_many_with_us"}
                </Label>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner