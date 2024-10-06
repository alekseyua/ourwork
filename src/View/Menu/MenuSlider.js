import React from 'react'
import MenuContainer from './Detali/MenuContainer'
import MenuItemContainer from './Detali/MenuItemContainer';
import MenuItemTitle from './Detali/MenuItemTitle';
import Icon from '../Icon/Icon';
import { useTranslation } from 'react-i18next';



function MenuSlider({
  list,
  menuRef,
  foreItem,
  setMenuRef,
  handlerChangeScreen,
}) {

  const {t, i18n} = useTranslation()
  return (
    <MenuContainer
      setMenuRef={setMenuRef}
      addClass={foreItem? 'main-menu__fore-items' : ''}
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
                <MenuItemTitle style={{ top: 35, left: 16, fontSize: 20 }}>{t(item.name)}</MenuItemTitle>
                <Icon
                 src={item.image}                     
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    left: '44%',
                    top: '50%',
                    transform: 'transition(-50%,-50%)'
                  }}
                />
              </MenuItemContainer>
            )
          })
      }
    </MenuContainer>
  )
}

export default MenuSlider;