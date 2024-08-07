import React from 'react'

import MainFeedbackComponent from '../../FeedbackPage/FeedbackPage'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import WrapContainerCards from '../../../View/WrapContainer/WrapContainerCards'
import CardMPItem from '../../../View/Cards/CardMPItem'
import WrapContainerFilters from '../../../View/WrapContainer/WrapContainerFilters'
import Spinner from '../../../View/Spinner'
import { WithFavorite } from '../../../HOC/WithFavorite'
import PaginationComponent from '../../../Components/Component.PaginationCatalog/PaginationComponent'
import { DEFAULT_PAGE_SIZE_MARKET, linksFeedback } from '../../../helpers/config'
import Offset from '../../../View/Offset'

function MyFavorite({
  dispatch,
  listCards,
  removeFavorite,
  changePagination,
}) {
  return (
    <WrapContainer>

      {
        listCards.count ?
          <>

            <WrapContainerCards
              column={2}
              style={{ marginTop: 20 }}
            >
              {
                listCards.results.map((item, i) => {
                  return (
                    <CardMPItem
                      catalog
                      key={i}
                      item={item}
                      dispatch={dispatch}
                      hendlerFavorite={removeFavorite}
                    />
                  )
                })
              }
            </WrapContainerCards>

            <WrapContainerFilters >
              <PaginationComponent
                totalCount={listCards.count}
                currentPage={listCards.current_page}
                onChangePagination={changePagination}
                defaultPageSize={DEFAULT_PAGE_SIZE_MARKET}

              />
            </WrapContainerFilters>
          </>
          : <Spinner time={3000} text="Ваш список пуст" />
      }
      {
        !listCards.count?
         <Offset mb={'calc(100vh - 100%)' } />
        : null
      }
      <MainFeedbackComponent list={linksFeedback} />


    </WrapContainer>
  )
}
export default WithFavorite(MyFavorite)