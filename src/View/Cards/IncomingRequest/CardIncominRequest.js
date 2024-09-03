import React from 'react'
import WrapContainerBlockBorder from '../../Blocks/WrapContainerBlockBorder'
import Offset from '../../Offset'
import BlockTitle from '../../Blocks/BlockTitle'
import Icon from '../../Icon/Icon'
import WrapTwoColumnGrid from '../../Blocks/WrapTwoColumnGrid'
import CheckBox from '../../CheckBox'

export default function CardIncominRequest({
  card,
  type,
  toolTipAction,
  handlerShowTooltip,
  handlerSelectcardFilter,
}) {

  return (
    <>
      <WrapContainerBlockBorder
        style={{
          gridTemplateColumns: `90% 10%`,
          // gridTemplate: 'revert',
          display: 'grid',
          padding: '14px 14px 9px',
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
            gridTemplateColumns: '100%',
          }}
        >
          <CheckBox
            checked={card['status_' + type]?.status}
            disabled={false}
            onChange={res => {
              handlerSelectcardFilter({ id: res.value, sub_type: type, type, checked: res.checked }) //
            }}
            // name={''}
            // helptext={}
            helpTextStyle={{
              top: 2
            }}
            style={{
              // marginRight: isShowButton ? 11 : 0
              pointerEvents: 'all',
            }}
            value={+card.id}
            // className={style['card-filter__container--checked']}
            id={`check-${card.id}`}
          />
        </WrapTwoColumnGrid>

      </WrapContainerBlockBorder>
      <Offset mb={20} />
    </>
  )
}
