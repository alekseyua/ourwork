import React from "react";
import WrapContainer from "../../../View/WrapContainer/WrapContainer";
import CatalogMarketPlace from "../../../View/CatalogMarketPlace/CatalogMarketPlace";
import PaginationComponent from "../../../Components/Component.PaginationCatalog/PaginationComponent";
import Offset from "../../../View/Offset";
import WrapContainerPreloader from "../../../View/Preloaders/WrapContainerPreloader";
import Preloader from "../../../View/Preloaders/Preloader";
import SearchComponent from "../../../Components/SearchSection/SearchComponent";
import { ACTION_SET_TEXT_SEARCH_MARKET_CARDS } from "../../../store/marketplace/marketplace";
import ShowPreviewImages from "../../../View/UploadImage/Detail/ShowPreviewImages";
import BlockTitle from "../../../View/Blocks/BlockTitle";
import { DEFAULT_PAGE_SIZE_MARKET } from "../../../helpers/config";
import Spinner from "../../../View/Spinner";

const MyMarketplacePage = ({
  dispatch,
  listCards,
  isLoading,
  textSearch,
  valuesPreview,
  changePagination,
  handlerDeleteFile,
  handlerDeleteLink,
  handlerActionCard,
  handlerTextSearch,
  loadingActionCard,
  loadingPreviewImage,
}) => {

  return (
    <WrapContainer>
      <Offset mt={20} />
      <div>
        <SearchComponent
          style={{
            width: `100% `,
            height: 46,
          }}
          enteredText={textSearch} // текущий текст
          getResultSearch={handlerTextSearch} // функция обработки запроса
          actionDisptchGetSearch={ACTION_SET_TEXT_SEARCH_MARKET_CARDS} // где хроним текст
        />
      </div>
      <Offset mb={20} />
      {valuesPreview.file_name && valuesPreview?.idFiles ? (
        <>
          <BlockTitle style={{ fontWeight: 700, fontSize: 16 }}>
            Загруженное
          </BlockTitle>
          <Offset mb={20} />
          <ShowPreviewImages
            preview={[
              {
                file_name: valuesPreview["file_name"],
                id: valuesPreview.idFiles,
                type: valuesPreview.type,
              },
            ]}
            isFileName
            deleteImage={
              valuesPreview.type === "link"
                ? handlerDeleteLink
                : handlerDeleteFile
            }
            loadingPreviewImage={loadingPreviewImage}
          />
        </>
      ) : null}

      {valuesPreview?.cards_count_file ? (
        <>
          <Offset mt={20} />
          <span> Карточек: {valuesPreview?.cards_count_file}</span>
        </>
      ) : null}
      <Offset mb={40} />

      {
        isLoading ? (
          // !listCards.results.length ?
          <WrapContainerPreloader>
            Загрузка ... <Preloader />
          </WrapContainerPreloader>
        ) : null
        // : null
      }
      {listCards.count ? (
        <>
          <CatalogMarketPlace
            listCards={listCards}
            dispatch={dispatch}
            textSearch={textSearch}
            handlerTextSearch={handlerTextSearch}
            loadingActionCard={loadingActionCard}
            handlerActionCard={handlerActionCard}
            own
          />
          <Offset mb={36} />
        
          <PaginationComponent
            totalCount={listCards.count}
            currentPage={listCards.current_page}
            onChangePagination={changePagination}
            defaultPageSize={DEFAULT_PAGE_SIZE_MARKET}
          />
        </>
      ) : (
        <Spinner time={3000} text="Ваш список пуст" />
      )}
    </WrapContainer>
  );
}

export default MyMarketplacePage;