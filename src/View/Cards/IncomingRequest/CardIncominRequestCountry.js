import React from 'react'
import WrapContainerBlockBorder from '../../Blocks/WrapContainerBlockBorder'
import Offset from '../../Offset'
import BlockTitle from '../../Blocks/BlockTitle'
import Icon from '../../Icon/Icon'
import WrapTwoColumnGrid from '../../Blocks/WrapTwoColumnGrid'
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent'
import MenuItemIconContainer from '../../Menu/Detali/MenuItemIconContainer'
import { arrowRightWhite } from '../../../images'
import Button from '../../Button/Button'
import CheckBox from '../../CheckBox'

export default function CardIncominRequestCountry({
  card,
  type,
  toolTipAction,
  currentValueTab,
  handlerShowTooltip,
  handlerChangeScreen,
  handlerSelectItemFilter,
}) {
  return (
    <>
      <WrapContainerBlockBorder
        style={{
          gridTemplateColumns: currentValueTab !== 'citys' ? `80% 21%` : `90% 10%`,
          // gridTemplate: 'revert',
          display: 'grid',
          padding: '14px',
        }}
      >
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: card?.image ? `10% 90%` : '100%',
          }}
        >

          {
            card?.image &&
            <Icon
             src={card.image}
              width={24}
              height={24}
            />
          }
          <BlockTitle
            style={{
              top: 2,
              fontWeight: 500
            }}
          >
            {card.name}
          </BlockTitle>

        </WrapTwoColumnGrid>

        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: currentValueTab !== 'citys' ? `50% 50%` : '100%',
          }}
        >
          <CheckBox
            checked={card['status_' + currentValueTab.slice(0, -1)]?.status}
            onChange={res => {
              handlerSelectItemFilter({ id: res.value, sub_type: type, type, checked: res.checked }) //'spare'

            }}
            // name={''}
            // helptext={}
            helpTextStyle={{
              top: 2
            }}
            style={{
              // marginRight: isShowButton ? 11 : 0
              transform: `scale(1.4)`,
              pointerEvents: 'all'
            }}
            value={+card.id}
            // className={style['card-filter__container--checked']}
            id={`check-${card.id}`}
          />

          {
            currentValueTab !== 'citys' ?
              <TooltipComponent
                onClick={() => !card?.status_child && handlerShowTooltip({// нужно другое
                  action: 'disabled',
                  id: +card.id
                })}
                message={toolTipAction.message}
                isShow={toolTipAction.id === card.id && toolTipAction.isShow}
              >
                <Button
                  disabled={!card.can_click} // нужно другое
                  style={{
                    transform: `scale(1.4)`,
                    top: 2,
                  }}
                  onClick={() => {
                    // const id = type === 'respair' ? card.id_list : card.id
                    const id = card.id
                    // const typeChild = card.child_type;
                    let params = {
                      //   path: '/' + type + '/' + card.id,
                      type: currentValueTab,
                      id,
                      image_card: card?.image,
                      name_card: card.name,
                      action: 1
                    };
                    handlerChangeScreen(params)
                  }
                  }
                >
                  <MenuItemIconContainer
                    width={20}
                    height={20}
                    style={{
                      borderRadius: 5,
                      top: 0
                    }}
                  >
                    <Icon
                     src={arrowRightWhite}
                      width={11}
                      height={11}
                    />
                  </MenuItemIconContainer>
                </Button>
              </TooltipComponent>
              : null
          }

        </WrapTwoColumnGrid>

      </WrapContainerBlockBorder >
      <Offset mb={18} />
    </>
  )
}
