import React from 'react'
import Offset from '../../../View/Offset'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'
import { API_SEARCH_FILTERS } from '../../../helpers/config'
import CardFilterCountryContainer from '../../../Components/Component.IncominRequest/CardFilterCountryContainer'
import CardFilterSelect from '../../../View/Cards/IncomingRequest/CardFilterSelect'
import InfoBlockContainer from '../../../Components/Component.Info/InfoBlockContainer'
import SearchComponent from '../../../Components/SearchSection/SearchComponent'
import { ACTION_SET_TEXT_SEARCH_FILTER_SERVICE } from '../../../store/filters/filtersIncominRequest'


export default function IncomingRequestRespair({
  type,
  message,
  helptext,
  listTabs,
  listCards,
  currentTab,
  toolTipAction,
  textInputSearch,
  loadingListData,
  handlerTextSearch,
  placeholderSearch,
  handlerShowTooltip,
  massagesSelectCard,
  handlerChangeScreen,
  resSelectCardCountry,
  handlerSelectItemFilter,

  comebackPrevFilters,
}) {

  return (
    <WrapContainer>
      <Offset mt={18} />

      <InfoBlockContainer
        message={message}
      />

      <Offset mt={14} />

      {
        resSelectCardCountry[currentTab] && resSelectCardCountry[currentTab]?.count ?
          <>
            <Offset mt={6} />
            <CardFilterSelect
              massagesSelectCard={massagesSelectCard[currentTab]}
              item={resSelectCardCountry[currentTab]}
            />
            <Offset mt={24} />
          </>
          : null
      }
      <Offset mt={4} />
      <SearchComponent
        urlRequest={API_SEARCH_FILTERS}
        
        helptext={helptext}
        styleHelpTextSearch={{
        }}
        placeholder={placeholderSearch}
        getResultSearch={handlerTextSearch} // функция обработки запроса 
        enteredText={textInputSearch} // текущий текст
        actionDisptchGetSearch={ACTION_SET_TEXT_SEARCH_FILTER_SERVICE} // где хроним текст

        // placeholder={textSearchFilterTab[currentTab]}
      />
      <Offset mt={14} />

      {
        listCards.count && !loadingListData ?
          <CardFilterCountryContainer
            type={type}
            currentValueTab={listTabs[currentTab]}
            listCards={listCards.results}
            toolTipAction={toolTipAction}
            handlerShowTooltip={handlerShowTooltip}
            handlerChangeScreen={handlerChangeScreen}
            handlerSelectItemFilter={handlerSelectItemFilter}
          />
          : <WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>
      }
      <Offset mt={34} />

    </WrapContainer>
  )
}
