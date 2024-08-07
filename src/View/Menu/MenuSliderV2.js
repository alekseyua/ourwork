import React from 'react'
import MenuContainer from './Detali/MenuContainer'
import MenuItemContainer from './Detali/MenuItemContainer';
import MenuItemTitle from './Detali/MenuItemTitle';
import MenuItemIconContainer from './Detali/MenuItemIconContainer';
import Icon from '../Icon/Icon';
import MenuItemContainerIcons from './Detali/MenuItemContainerIcons';



function MenuSliderV2({
  list,
  menuRef,
  setMenuRef,
  handlerChangeScreen,
}) {


  return (
    <MenuContainer
      setMenuRef={setMenuRef}
      style={{
        marginTop: 15,
        // overflow: 'auto',
        filter: `blur(var(--filter-blur))`,
        gap: '15px'
      }}
    >
      {
        !!list.length &&
        list
          .filter(el => el.id !== 999)
          .filter(el => !el.isFooter)
          .map((item, index) => {
            return (

              <MenuItemContainer
                addClass={item?.isActive? 'main-menu__item-container' : 'main-menu__item-container--disabled'}
                style={{
                  opacity: item?.isActive?  1 : .5,
                }}
                key={index}
                onClick={() => handlerChangeScreen({path: item.slug}) }
              >
                <MenuItemTitle style={{ top: 15, left: 16 }}>{item.name}</MenuItemTitle>
                <MenuItemContainerIcons
                  style={{
                    left: 10
                  }}
                >
                  <MenuItemIconContainer
                  style={{ top: -2, left: 6 }}
                  >
                    <Icon
                      image={item.image}                     
                      width={14}
                      height={14}
                    />
                  </MenuItemIconContainer>
                </MenuItemContainerIcons>
              </MenuItemContainer>
            )
          })
      }
    </MenuContainer>
  )
}

export default MenuSliderV2;