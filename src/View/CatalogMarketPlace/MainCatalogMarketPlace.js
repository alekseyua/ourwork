import React from 'react'
import WrapContainerPreloader from '../Preloaders/WrapContainerPreloader';
import Preloader from '../Preloaders/Preloader';
import WrapContainer from '../WrapContainer/WrapContainer';
import CatalogMarketPlace from './CatalogMarketPlace';
import SearchApplicationsAndFiltersMain from '../../Components/Component.SearchApplicationsAndFilters/SearchApplicationsAndFiltersMain';
import PaginationComponent from '../../Components/Component.PaginationCatalog/PaginationComponent';
import Offset from '../Offset';
import BackgroundPreloader from '../Preloaders/BackgroundPreloader';
import { DEFAULT_PAGE_SIZE_MARKET, MAX_VIEW_ITEM_LAST_PAGE } from '../../helpers/config';
import PaginationComponentAllPages from '../../Components/Component.PaginationCatalog/PaginationComponentAllPages';
import WrapRootContainer from '../WrapContainer/WrapRootContainer';
import { getLocaleStore } from '../../helpers/utils';

export default function MainCatalogMarketPlace({
  dispatch,
  isUpblock,
  listCards,
  isLoading,
  textSearch,
  countFilters,
  isLoadingAuto,
  countFavorite,
  changePagination,
  isLoadingPagination,
}) {
  // if(!listCards?.results.length) return ();

  return (
    <WrapRootContainer>
            {/* {
            !isLoadingPagination? 
              <BackgroundPreloader />
              // <>hi</>
            : null} */}
      <SearchApplicationsAndFiltersMain
          isUpblock={isUpblock}

      />

      {/* {
        isLoading ? <WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader> : null
      } */}
      <Offset mb={20} />
      {
        textSearch && listCards.count ?
          <Offset mb={10} style={{ alignItems: 'flex-start', fontWeight: 500 }}>
            Найдено предложений: {listCards.count}
          </Offset>
          : null
      }
      <CatalogMarketPlace
        listCards={listCards}
        dispatch={dispatch}
        textSearch={textSearch}
        countFilters={countFilters}
        countFavorite={countFavorite}
        isLoadingAuto={isLoadingAuto}
      />

      <Offset mb={25} />
      <PaginationComponentAllPages
        isLoad={getLocaleStore("loadDataMarket")}
        totalCount={listCards.count}
        currentPage={listCards.current_page}
        onChangePagination={changePagination}
        defaultPageSize={DEFAULT_PAGE_SIZE_MARKET}
        defoultViewItemPaggination={MAX_VIEW_ITEM_LAST_PAGE}
      />

    </WrapRootContainer>
  )
}
