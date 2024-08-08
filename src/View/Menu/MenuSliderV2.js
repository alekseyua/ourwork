import React from 'react'
import MenuContainer from './Detali/MenuContainer'
import MenuItemContainer from './Detali/MenuItemContainer';
import MenuItemTitle from './Detali/MenuItemTitle';
import Icon from '../Icon/Icon';



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
                <Icon
                  image={item.image}                     
                  style={{
                    position: 'absolute',
                    width: '90%',
                    height: '90%',
                    left: 8,
                    top: 25
                  }}
                />
              </MenuItemContainer>
            )
          })
      }
    </MenuContainer>
  )
}

export default MenuSliderV2;