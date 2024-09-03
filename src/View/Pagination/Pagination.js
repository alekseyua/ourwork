import React, { memo } from 'react'
import ContainerPagination from './Detail/ConainerPagination/ContainerPagination';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import PaginationContainerItems from './Detail/ConainerPagination/PaginationContainerItems';
import PaginationItem from './Detail/ConainerPagination/PaginationItem';
import { arrowLeftWhite, arrowRightWhite } from '../../images';
import { MAX_VIEW_ITEM, MAX_VIEW_ITEM_LAST_PAGE, widthPagination } from '../../helpers/config';

function Pagination({
  style = {},
  totalCount = 0,
  isLoad = false,
  currentPage = 1,
  newListItems = [],
  defaultPageSize,
  changePagination = Function,
  defoultViewItemPaggination
}) {
// console.log('view pagination ', newListItems, Math.round((totalCount / MAX_VIEW_ITEM_LAST_PAGE - 1)) === +currentPage)
// console.log('view pagination ',totalCount,MAX_VIEW_ITEM_LAST_PAGE -1,  newListItems, Math.round((totalCount / MAX_VIEW_ITEM_LAST_PAGE - 1)), currentPage)
// console.log(defaultPageSize,{ isLoad},{qqq: Math.round(totalCount / defaultPageSize) });
  return (
    <ContainerPagination
      style={{
        // 1 - display: 'none'
        // 2 - 3 - space-evenly
        // 3 - 4 - space-around
        // 5 > space-between 

        // display: 'none',
        justifyContent: 'space-between',
        filter: `blur(var(--filter-blur))`,
        ...style ?? {}
      }}
    >
      <Button
        addClass={'button__pagination'}
        disabled={isLoad || +currentPage === 1}
        data-item={'prev'}
        onClick={even => changePagination(even)}
      >
        <Icon width={11} height={11}src={arrowLeftWhite} style={{ pointerEvents: 'none' }} />
      </Button>

      <PaginationContainerItems
        style={{
          maxWidth: widthPagination,          
        }}
      >
        {
          newListItems.map(item=>(
          <Button
                                    addClass={'button__pagination-number'}
                                    key={item}
                                    disabled={isLoad}
                                    onClick={even => changePagination(even)}
                                    style={{
                                      pointerEvents: item === '...' || item === '....'? 'none' : 'all',
                                    }}
                                  >                                  
                                    <PaginationItem 
                                      data-item={item} 
                                      style={{
                                      border: (item === '...' || item === '....') && 'none',
                                      backgroundColor: 
                                        item === '...' || item === '....'? 
                                        'transporent' 
                                      : +currentPage === +item ?
                                          'var(--background-color-icon-red)' 
                                          : 'var(--bg-item)'
                                    }}>                                      
                                      {item}
                                    </PaginationItem>
                                  </Button>
                                  )
                  )
        }
      </PaginationContainerItems>

      <Button
        disabled={isLoad || (Math.ceil(totalCount / defaultPageSize)) === +currentPage}
        // disabled={isLoad ||  Math.round((totalCount / MAX_VIEW_ITEM_LAST_PAGE - 1)) === +currentPage}

        addClass={'button__pagination'}
        data-item={'next'}
        onClick={even => changePagination(even)}
      >
        <Icon width={15} height={15}src={arrowRightWhite} style={{ pointerEvents: 'none' }} />
      </Button>
    </ContainerPagination>
 )
}

export default memo(Pagination);