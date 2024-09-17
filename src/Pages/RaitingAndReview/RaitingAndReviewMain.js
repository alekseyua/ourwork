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
import MenuSlider from '../../View/Menu/MenuSlider';
import RaitingAndReviewInfoAboutUserComponent from './RaitingAndReviewInfoAboutUser/RaitingAndReviewInfoAboutUserComponent';

export default function RaitingAndReviewMain({
  handlerClick,
  isLoadingList,
  textSearchReview,
  handlerTextSearch,
  infoAboutUserReview,
}) {
  return (
    <WrapRootContainer>
      <Offset mt={17} />

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
      {Object.keys(infoAboutUserReview).length ? (
        <RaitingAndReviewInfoAboutUserComponent
          infoAboutUserReview={infoAboutUserReview}
        />
      ) : null}
    </WrapRootContainer>
  );
}
