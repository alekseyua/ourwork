import React from 'react'
import WrapContainer from '../../WrapContainer/WrapContainer'
import WrapGrid from '../Detail/WrapGrid'
import CardReviewTop from '../Detail/review/CardReviewTop'
import { DEFAULT_PAGE_SIZE } from '../../../helpers/config'
import PaginationComponent from '../../../Components/Component.PaginationCatalog/PaginationComponent'
import Offset from '../../Offset'
import Label from '../../Label/Label'
import CardWarrantlyMembers from '../Detail/review/CardWarrantlyMembers'

export default function ListCardWarrantlyForMembers({
  list = [],
  totalCount = 0,
  currentPage,
  changePagination,
  handlerChangeScreen,
}) {
  
  return (
    <WrapContainer>
      <Label
        style={{
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0px'
        }}
      >
        Найдено гарантов: {totalCount}
      </Label>
      <Offset mt={8} />
      <WrapGrid>
        {
          list.map((item, index) => {
            return (
              <CardWarrantlyMembers
                key={'warrantly-' + index}
                item={item}
                index={index}
                handlerChangeScreen={handlerChangeScreen}
              />
            )
          })
        }
        <Offset mb={15} />
            <PaginationComponent
              currentPage={currentPage}
              totalCount={totalCount}
              onChangePagination={changePagination}                
            />
      </WrapGrid>
    </WrapContainer>
  )
}
