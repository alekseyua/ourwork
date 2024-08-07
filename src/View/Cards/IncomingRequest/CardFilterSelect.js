import React from 'react'

import InfoTextBlock from '../../InfoBlock/InfoTextBlock'
import WrapContainerBlockBorder from '../../Blocks/WrapContainerBlockBorder'
import WrapTwoColumnGrid from '../../Blocks/WrapTwoColumnGrid'
import Icon from '../../Icon/Icon'
import BlockTitle from '../../Blocks/BlockTitle'

export default function CardFilterSelect({
  item,
  massagesSelectCard
}) {

  if (!item) return;
  return (
      <WrapContainerBlockBorder
        style={{
          gridTemplateColumns: `55% 45%`,
          // gridTemplate: 'revert',
          display: 'grid',
          alignItems: 'center',
          padding: '15px 14px 13px',
        }}
      >
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: item?.image ? `10% 90%` : '100%',
          }}
        >

          {
            item?.image &&
            <Icon
              image={item.image}
              width={24}
              height={24}
            />
          }
          <BlockTitle
            style={{
              top: 2,
              fontWeight: 500,
              left: item?.image? 15 : 0
            }}
          >
            {item.name}
          </BlockTitle>

        </WrapTwoColumnGrid>
        <InfoTextBlock>
          {massagesSelectCard}: {item.count}
        </InfoTextBlock>
      </WrapContainerBlockBorder>
  )
}
