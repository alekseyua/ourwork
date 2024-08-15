import React from 'react'
import WrapContainerPreloader from '../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../View/Preloaders/Preloader';
import WrapContainer from '../../View/WrapContainer/WrapContainer';
import Offset from '../../View/Offset';
import Menu from '../../View/Menu/Menu';
import WrapContainerCardTopList from '../../View/Cards/RaitingAndReview/WrapContainerCardTopList';
import NavigationIncominRequests from '../../View/Navigation/NavigationMyApplication/NavigationIncominRequests';
import WrapContainerCardRaitingAndReviewList from '../../View/Cards/RaitingAndReview/WrapContainerCardRaitingAndReviewList';
import SearchComponent from '../../Components/SearchSection/SearchComponent';
import { ACTION_SET_SEARCH_TEXT_FILTER } from '../../store/raiting-review/raiting-review';
import WrapRootContainer from '../../View/WrapContainer/WrapRootContainer';
import FormInputContainer from '../../View/FormInput/FormInputContainer';
import MenuSliderV2 from '../../View/Menu/MenuSliderV2';

export default function RaitingAndReviewMain({
  listMenu,
  listSection,
  handlerClick,
  isLoadingList,
  textSearchReview,
  handlerTextSearch,
  handlerChangeScreen,
  handlerChangeSection,
  listRaitingAndReview,
  handlerChangePagination,
}) {
  return (
    <WrapRootContainer>


        <MenuSliderV2
          list={listMenu} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      <Offset mt={17} />
      {/* <NavigationIncominRequests
        handlerChangeSection={handlerChangeSection}
        listSection={listSection}
      />
      <Offset mt={15} /> */}
      <div style={{ width: "100vw" }}>
        <SearchComponent
          placeholder={"Введите имя пользователя"}
          isUpblock={true}
          style={{
            paddingLeft: 1,
            height: 44,
          }}
          getResultSearch={handlerTextSearch}
          enteredText={textSearchReview}
          actionDisptchGetSearch={ACTION_SET_SEARCH_TEXT_FILTER} // где хроним текст
          styleHelpTextSearch={{}}
        />
      </div>
      <Offset mb={20} />
      {!isLoadingList ? (
        textSearchReview &&
        listRaitingAndReview.results.length &&
        !listRaitingAndReview.results[0]?.rating_number ? ( // только для 100% совпадения и толко для одного
          <WrapContainerCardRaitingAndReviewList
            list={listRaitingAndReview.results}
            totalCount={listRaitingAndReview.count}
            currentPage={listRaitingAndReview.current_page}
            handlerClick={handlerClick}
            handlerChangePagination={handlerChangePagination}
          />
        ) : !textSearchReview ? (
          <WrapContainerCardTopList
            list={listRaitingAndReview.results}
            count={listRaitingAndReview?.count}
            totalCount={listRaitingAndReview?.count_all}
            currentPage={listRaitingAndReview.current_page}
            handlerClick={handlerClick}
            handlerChangePagination={handlerChangePagination}
          />
        ) : null
      ) : (
        <WrapContainerPreloader>
          Загрузка ... <Preloader />
        </WrapContainerPreloader>
      )}
    </WrapRootContainer>
  );
}
