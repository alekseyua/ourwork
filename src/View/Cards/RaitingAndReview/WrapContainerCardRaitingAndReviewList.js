import React from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import WrapGrid from '../Detail/WrapGrid'
import { DEFAULT_PAGE_SIZE } from '../../../helpers/config'
import PaginationComponent from '../../../Components/Component.PaginationCatalog/PaginationComponent'
import Offset from '../../Offset'
import Label from '../../Label/Label'
import CardReview from '../Detail/review/CardReview'
import WrapRootContainer from '../../WrapContainer/WrapRootContainer'

export default function WrapContainerCardRaitingAndReviewList({
  list = [],
  totalCount = 0,
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
        Активные пользователи: {totalCount}
      </Label>
      <Offset mt={10} />
      <WrapGrid>
        {
          list.map((item, index) => {

            return (
              <CardReview
                key={'review-common-' + index}
                item={item}
                handlerClick={handlerClick}
              />
            )
          })
        }
        <Offset mb={15} />       
        <PaginationComponent
          totalCount={totalCount}
          currentPage={currentPage}
          onChangePagination={handlerChangePagination}
        />
        <Offset mb={25} />       

      </WrapGrid>
    </WrapRootContainer>
  )
}
