import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import styless from './styles/viewsimage.module.scss';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import { Image, StyleSheet } from 'react-native-web';
import { isElectron } from "../../helpers/utils";
import { widthDesktop, widthMobile } from "../../helpers/config";
import ImageGalaryMP from "./ImageGalary";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ViewsImage = ({
    images,
    idImage
}) => {

    const [rotate, setRotate] = useState(0);
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + "</span>";
        },
    };
    const styles = StyleSheet.create({
        imageTelegram: {
            width: widthMobile,
            minWidth: `100%`,
            height: `75vw`,
            overflow: 'hidden',
            borderRadius: 14
        },
        imageDesktop: {
            height: `475px`,
            width: widthDesktop,
            resizeMode: 'contain',
            borderRadius: 14
        },
        containerDesktop: {
            width: widthDesktop,
            height: '50vh'
        },
        containerTelegram: {
        }
    })
    return (
        <React.Fragment>
            <div
                className={styless['preview-image__container']}
                style={isElectron() ? styles.containerDesktop : styles.containerTelegram}
            >
                <Swiper
                    modules={[Pagination]}
                    lazyPreloadPrevNext={1}
                    spaceBetween={0}
                    slidesPerView={1}
                    allowTouchMove={true}
                    zoom={true}
                    pagination={pagination}
                    observer={true}
                    observeSlideChildren
                    onSlideChange={() => setRotate(0)}
                    className={styless['preview-image__slider-image']}
                    style={{
                        "--swiper-pagination-color": "var(--bg-block)",
                        "--swiper-pagination-bullet-inactive-color": "var(--background-color-opacity-50)",
                        "--swiper-pagination-bullet-inactive-opacity": "1",
                        "--swiper-pagination-bullet-size": "4px",
                        "--swiper-pagination-bullet-horizontal-gap": "6px",
                      }}
                >
                    {
                        images?.length ?
                        [...images.filter(el => el.id === idImage), ...images.filter(el => el.id !== idImage) ].map((item, i) => {
                            return <SwiperSlide
                                    className={styless['preview-image__slider-swiper-image']}
                                    key={i}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                            transform: `rotate(${rotate}deg)`,
                                            borderRadius: 17,
                                            overflow: 'hidden'
                                        }}

                                    >
                                        {/* <Image
                                            style={isElectron() ? styles.imageDesktop : styles.imageTelegram}
                                            source={{
                                                uri: item.url
                                            }}
                                        /> */}
                                         <LazyLoadImage
                                            alt={'image.alt'}
                                            effect="blur"
                                            src={ item.url}
                                            style={{
                                                objectFit: 'cover',
                                                maxHeight: 400,
                                                minHeight: 400,
                                                width: '100vw',
                                            }}

                                        />
                                    </div>
                                </SwiperSlide>
                            })
                            : null
                    }
                </Swiper>
            </div>
        </React.Fragment>
    )
}

export default ViewsImage;


