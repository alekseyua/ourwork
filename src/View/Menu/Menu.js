import React from 'react'
import WrapMenuContainer from './Detali/WrapMenuContainer'
import MenuItemContainer from './Detali/MenuItemContainer'
import MenuItemTitle from './Detali/MenuItemTitle'
import Icon from '../Icon/Icon'
import MenuItemIconContainer from './Detali/MenuItemIconContainer'
import MenuItemContainerIcons from './Detali/MenuItemContainerIcons'
import { actionSquer, arrowRightWhite } from '../../images'
import MenuContainer from './Detali/MenuContainer'
import { widthMobile } from '../../helpers/config'
import WrapContainerBlock from '../Blocks/WrapContainerBlock'
import MenuSliderContainer from './styles/MenuSliderContainer'

export default function Menu({
  list,
  margin = 10,
  isStartBigSlide,
  iconSize = 14,
  handlerScreen = () => { },
  accessRedirect = () => { },
  firstButtonArrow,
  hardColorBlockById = [],
  isMark,
}) {

if( !list?.length) return;

  return (
    <>
      {
        !!list.length && list.filter(el => el.id !== 999).filter(el => !el?.isSlider).length ?
          list.filter(el => el.oneBigSlide).length ?
            <WrapMenuContainer
              style={{
                gridTemplateColumns: '1fr',
              }}
            >
              {
                list
                  .filter(el => el.oneBigSlide)
                  .map((item, index) => (
                    <MenuItemContainer
                      style={{
                        backgroundColor: hardColorBlockById?.length ? hardColorBlockById[index]?.id === index ? hardColorBlockById[index].colorBackground : 'var(--bg-item)' : 'var(--bg-item)',
                        // width: widthMobile - margin,
                        width: '100%',
                        height: item.height,
                        opacity: !item?.isActive ?
                          .5
                          : isMark && isMark.includes(item.id) ? .5 : 1,
                        minWidth: (widthMobile - margin - 12) / 2,
                      }}

                      key={index}
                      // onClick={() => handlerScreen({ path: `${item.slug}`, state: { ...item } })}
                      onClick={() => !item?.isActive ? accessRedirect() : isMark && isMark.includes(item.id) ? handlerScreen({ path: `modal`, state: { ...item } }) : handlerScreen({ path: `${item.slug}`, state: { ...item } })}

                    >
                      <MenuItemTitle style={{
                        top: 24,
                        left: 20,
                        color: hardColorBlockById?.length ? hardColorBlockById[index]?.id === index ? hardColorBlockById[index].color : 'var(--text-color)' : 'var(--text-color)',
                        textAlign: 'start',
                        maxWidth: '55%'
                      }}
                      >{item.name}</MenuItemTitle>
                      <MenuItemContainerIcons

                      >
                        {
                        firstButtonArrow &&
                          <MenuItemIconContainer
                            style={{
                              backgroundColor: 'var(--text-color-blue)'
                            }}
                          >
                            <Icon
                             src={arrowRightWhite}
                              width={14}
                              height={14} />
                          </MenuItemIconContainer>
                          }
                        <WrapContainerBlock
                          style={{
                            display: 'flex',
                            justifyContent: isStartBigSlide ? 'flex-start' : 'flex-end',
                            width: widthMobile - 90
                          }}
                        >
                          {item?.images &&
                            item?.images
                              .map((image, index) => {
                                return (

                                  <MenuItemIconContainer
                                    key={index}
                                  >
                                    <Icon
                                     src={image} />
                                  </MenuItemIconContainer>
                                )
                              })}
                        </WrapContainerBlock>
                        {isMark && isMark.includes(item.id) ?
                          <Icon
                           src={actionSquer}
                            style={{
                              position: 'absolute',
                              right: -4,
                              width: 25,
                              height: 25,
                              top: -60
                            }} />
                          : null}
                      </MenuItemContainerIcons>
                    </MenuItemContainer>
                  ))
              }
            </WrapMenuContainer>
            : <WrapMenuContainer>
              {
                !!list.length &&
                list
                  .filter(el => el.id !== 999)
                  .filter(el => !el.isSlider)
                  .map((item, index) => {
                    return (
                      <MenuItemContainer
                        style={{
                          backgroundColor: hardColorBlockById?.length ? hardColorBlockById[index]?.id === index ? hardColorBlockById[index].colorBackground : 'var(--bg-item)' : 'var(--bg-item)',
                          width: (widthMobile - 22) / 2,
                          height: 154,
                          filter: `blur(var(--filter-blur))`,
                        }}
                        key={index}
                        onClick={() => handlerScreen({ path: `${item.slug}`, state: { ...item } })}
                        
                      >
                        <MenuItemTitle style={{
                          top: 24,
                          left: 20,
                          color: hardColorBlockById?.length ? hardColorBlockById[index]?.id === index ? hardColorBlockById[index].color : 'var(--text-color)' : 'var(--text-color)'
                        }}
                        >{item.name}</MenuItemTitle>
                        <MenuItemContainerIcons
                        
                        >
                          {
                            firstButtonArrow &&
                            <MenuItemIconContainer
                            style={{
                              backgroundColor: 'var(--text-color-blue)'
                            }}
                            >
                              <Icon
                               src={arrowRightWhite}
                                width={14}
                                height={14}
                              />
                            </MenuItemIconContainer>
                          }
                          <MenuItemIconContainer>
                            <Icon
                             src={item.image}
                            // width={18}
                            // height={18}
                            />
                          </MenuItemIconContainer>
                        </MenuItemContainerIcons>
                      </MenuItemContainer>
                    )
                  })
              }
            </WrapMenuContainer>
          : null

      }
        <MenuSliderContainer>
          <>
          <MenuContainer
            style={{
                marginTop: 14, //???
              // justifyContent: list.length <= 2 ? 'space-around' : 'none',
              gridTemplateColumns: `repeat(${ list.filter(el => el.id !== 999).filter(el => el.isSlider).length}, 1fr)`,
              // gridTemplateColumns: `repeat(${list.length - list.filter(el => el.oneBigSlide).length}, 1fr)`,
              gap: '12px',
            }}
          >
      {
          list
          .filter(el => el.id !== 999)
          .filter(el => el.isSlider)
          .map((item, index) => {
            return (
              
                      <MenuItemContainer
                        addClass={
                          !item?.isActive ?
                            'main-menu__item-container--disabled'
                            : item?.isDisable ?
                            'main-menu__item-container--disabled'
                            : 'main-menu__item-container'}
                        style={{
                          opacity: !item?.isActive ?
                            .5
                            : isMark && isMark.includes(item.id) ? .5 : 1,
                          height: 128,
                          minWidth: (widthMobile - margin - 12) / 2,
                          filter: `blur(var(--filter-blur))`,
                          
                        }}
                        key={index}
                        // onClick={() => isMark && isMark.includes(item.id)? ()=>{} : handlerScreen({path: `${item.slug}`, state:{...item}}) }
                        onClick={() => !item?.isActive ? accessRedirect() : isMark && isMark.includes(item.id) ? handlerScreen({ path: `modal`, state: { ...item } }) : handlerScreen({ path: `${item.slug}`, state: { ...item } })}
                      >
                        {
                          isMark && isMark.includes(item.id) ?
                          <Icon
                             src={actionSquer}
                              style={{
                                position: 'absolute',
                                right: 8,
                                width: 25,
                                height: 25,
                                top: 14
                              }}
                            />
                            : null
                        }
                        <MenuItemTitle style={{
                          top: 24,
                          left: 20,
                          textAlign: 'start',
                        }}>{item.name}</MenuItemTitle>
                        <MenuItemContainerIcons>
                          <MenuItemIconContainer>
                            <Icon
                             src={item.image}
                              width={iconSize}
                              height={iconSize}
                            />
                          </MenuItemIconContainer>
                        </MenuItemContainerIcons>
                      </MenuItemContainer>
                  )
                })
              }
              </MenuContainer>
              </>
              </MenuSliderContainer>
    </>
  )
}
