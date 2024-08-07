import React from 'react'
import MenuContainer from './Detali/MenuContainer'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';



import '../../styles/swiper-user-style.scss'
import MenuItemContainer from './Detali/MenuItemContainer';
import MenuItemTitle from './Detali/MenuItemTitle';
import MenuItemIconContainer from './Detali/MenuItemIconContainer';
import Icon from '../Icon/Icon';
import MenuItemContainerIcons from './Detali/MenuItemContainerIcons';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';



function MenuSlider({
  list,
  handlerChangeScreen,
}) {
  return (
    
    <div
      style={{ 
        marginTop: 14, 
        with: '100%',
      }}
    >
      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        style={{ 
          with: '100%'
        }}
      >
        {
          !!list.length &&
          list.filter(el => el.id !== 999)
            .map((item, index) => {
              return (<SwiperSlide
                key={index}
                style={{
                  width: 150,
                  minWidth: 150,
                  display: 'block',
                  height: '100%',
                  objectFit: 'cover',
                }}
              >
                <MenuItemContainer
                  onClick={() => handlerChangeScreen({path: item.slug}) }
                >
                  <MenuItemTitle style={{ top: 14, left: 16 }}>{item.name}</MenuItemTitle>
                  <MenuItemContainerIcons>
                    <MenuItemIconContainer>
                      <Icon
                        image={item.image}
                      />
                    </MenuItemIconContainer>
                  </MenuItemContainerIcons>
                </MenuItemContainer>
              </SwiperSlide>)
            })}
      </Swiper>
    </div>
  )
}

export default MenuSlider;