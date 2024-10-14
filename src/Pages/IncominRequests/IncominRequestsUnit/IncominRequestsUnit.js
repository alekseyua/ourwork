import React from "react";
import Offset from "../../../View/Offset";
import WrapContainer from "../../../View/WrapContainer/WrapContainer";
import WrapContainerPreloader from "../../../View/Preloaders/WrapContainerPreloader";
import Preloader from "../../../View/Preloaders/Preloader";
import CardFilterListContainer from "../../../Components/Component.IncominRequest/CardFilterList";
import CardFilterSelect from "../../../View/Cards/IncomingRequest/CardFilterSelect";
import InfoBlockContainer from "../../../Components/Component.Info/InfoBlockContainer";
import SearchComponent from "../../../Components/SearchSection/SearchComponent";
import { SET_TEXT_SEARCH_INCOMING_FILTERS_TEXT } from "../../../store/filters/filtersIncominRequest";
import WrapTwoColumnGrid from "../../../View/Blocks/WrapTwoColumnGrid";
import Button from "../../../View/Button/Button";

export default function IncominRequestsUnit({
  message,
  listTab,
  currentTab,
  resSelectCard,
  toolTipAction,
  listCardsFilter,
  textInputSearch,
  massagesSelectCard,
  textSearchFilterTab,

  loadCatalog,
  selectFilters,
  isLoadingItem,
  statusLoadingData,

  handlerTextSearch,
  handlerShowTooltip,
  comebackPrevFilters,
  handlerChangeScreen,
  handlerSelectItemFilter,
}) {
  return (
    <WrapContainer>
      <Offset mt={15} />
      {/* <InfoBlockContainer message={message[currentTab]} />
      <Offset mt={9} /> */}
      {resSelectCard[currentTab] && resSelectCard[currentTab]?.count ? (
        <>
          <CardFilterSelect
            massagesSelectCard={massagesSelectCard[currentTab]}
            item={resSelectCard[currentTab]}
          />
          <Offset mt={30} />
        </>
      ) : null}
      {/* ============================================== */}

      {/* <WrapTwoColumnGrid
        style={{
          position: "fixed",
          top: 60,
          width: "90%",
          zIndex: 9999999999,
        }}
      >
        <Button
          // disabled={currentTab === 0}
          id={"arrow-prev"}
          style={{
            opacity: 1,
            backgroundColor: "red",
            height: 30,
          }}
          onClick={() => comebackPrevFilters(-1)}
        >
          {`" <-- back"${loadCatalog}`}
        </Button>
        <Button
          id={"arrow-next"}
          style={{
            opacity: 1,
            backgroundColor: "blue",
          }}
          disabled={currentTab === listTab.length - 1}
          onClick={() => comebackPrevFilters(1)}
        >
          {"next -->"}
        </Button>
      </WrapTwoColumnGrid> */}

      {/* ============================================== */}
      {/* <Offset mt={-4} /> */}
      {/* <div>
        <SearchComponent
          placeholder={textSearchFilterTab[currentTab]}
          enteredText={textInputSearch} // текущий текст
          getResultSearch={handlerTextSearch} // функция обработки запроса
          actionDisptchGetSearch={SET_TEXT_SEARCH_INCOMING_FILTERS_TEXT} // где хроним текст
        />
      </div>
      <Offset mt={10} /> */}

      {
        listCardsFilter?.count ? (
          <CardFilterListContainer
            type={listTab[currentTab]}
            listCards={listCardsFilter?.results}
            toolTipAction={toolTipAction}
            loadCatalog={loadCatalog}
            statusLoadingData={statusLoadingData}
            // typePage={typePage}
            selectFilters={selectFilters}
            isLoadingItem={isLoadingItem}
            handlerShowTooltip={handlerShowTooltip}
            handlerSelectItemFilter={handlerSelectItemFilter}
            handlerChangeScreen={handlerChangeScreen}
          />
        ) : null
      }
      <Offset mb={20} />
      {loadCatalog && (
        <WrapContainerPreloader>
          Загрузка ... <Preloader />
        </WrapContainerPreloader>
      )}
      <Offset mt={54} />
    </WrapContainer>
  );
}