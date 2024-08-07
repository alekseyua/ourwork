import React from 'react'
import WrapContainerCards from '../WrapContainer/WrapContainerCards'
import CardMPItem from '../Cards/CardMPItem'
import { WithFavorite } from '../../HOC/WithFavorite';


function CatalogMarketPlace({
  own,
  dispatch,
  listCards,
  toggleFavorite,
  handlerActionCard,
  loadingActionCard,
}) {

  return (
    <WrapContainerCards>
      {
        listCards.results.map((item, i) => {
          return (
            <CardMPItem
              key={i}
              own={own}
              item={item}
              dispatch={dispatch}
              hendlerFavorite={toggleFavorite}
              handlerActionCard={handlerActionCard}
              loadingActionCard={loadingActionCard}
              catalog
              style={{
                // opacity: own && item.is_upload? .3 : 1,
                // pointerEvents: own && item.is_upload? 'none' : 'all'
              }}
            />
          )
        })
      }
    </WrapContainerCards>
  )
}

export default WithFavorite(CatalogMarketPlace)