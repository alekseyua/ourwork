import React from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import WrapGrid from '../Detail/WrapGrid'
import CardReviewTop from '../Detail/review/CardReviewTop'
import { DEFAULT_PAGE_SIZE } from '../../../helpers/config'
import PaginationComponent from '../../../Components/Component.PaginationCatalog/PaginationComponent'
import Offset from '../../Offset'
import Label from '../../Label/Label'
import WrapRootContainer from '../../WrapContainer/WrapRootContainer'

export default function WrapContainerCardTopList({
  list = [],
  totalCount = 0,
  count=0,
  currentPage,
  handlerClick,
  handlerChangePagination
}) {
  return (
    <WrapRootContainer
      style={{
        filter: `blur(var(--filter-blur))`,
      }}
    >
      <Label
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0px'
        }}
      >
        Всего пользователей: {totalCount}
      </Label>
      <Offset mt={8} />
      <WrapGrid>
        {
          list.map((item, index) => {
            return (
              <CardReviewTop
                key={'review-top-' + index}
                item={item}
                index={index}
                handlerClick={handlerClick}
              />
            )
          })
        }
        <Offset mb={15} />
        <PaginationComponent
          totalCount={count}
          currentPage={currentPage}
          onChangePagination={handlerChangePagination}
        />
      </WrapGrid>
    </WrapRootContainer>
  )
}
