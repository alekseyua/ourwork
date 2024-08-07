import React from 'react'
import WrapContainer from '../../../View/WrapContainer/WrapContainer'
import Offset from '../../../View/Offset'
import Label from '../../../View/Label/Label'
import NativeSelect from '../../../View/Select/NativeSelect/NativeSelect'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../../View/Preloaders/Preloader'
import ListCardWarrantlyForMembers from '../../../View/Cards/Warrantly/ListCardWarrantlyForMembers'
import SearchSectionWithOfferContainer from '../../../Components/SearchSectionWithOffer/SearchSectionWithOfferContainer'

export default function RaitingAndReviewWarrantlyForMembers({
  isLoading,
  selectCity,
  listCities,
  handlerSelect,
  isLoadingCards,
  changePagination,
  handlerChangeScreen,
  listCardsForWarrantlyMemners,
}) {
  return (
    <WrapContainer>
      <Offset mt={16} />
      <Label style={{ fontWeight: 700, letterSpacing: 0.1 }}>Ваш город</Label>
      <Offset mt={6} />
      {/* <NativeSelect
        data={listCities}
        height={38}
        enabled={true}
        selectedValue={selectCity}
        placeholder={'Выберите город'}
        onChange={(value) => {
          handlerSelect(value)
        }}
      /> */}
      <SearchSectionWithOfferContainer
        textToolTip={'"Города с таким названием нет в списке"'}
        isCity={true}
        isIconLeft={true}
        data={listCities}
        // value={selectCity}
        // showList
        name={"city"}
        onChange={(value, e) => {
          handlerSelect(value);
        }}
        onFocus={(e) => {
          e.target.select();
        }}
        stylehelptext={{
          color: "var(--text-color-red)",
        }}
      />

      <Offset mt={20} />
      {!isLoading ? (
        <ListCardWarrantlyForMembers
          list={listCardsForWarrantlyMemners.results}
          totalCount={listCardsForWarrantlyMemners.count}
          currentPage={listCardsForWarrantlyMemners.current_page}
          changePagination={changePagination}
          handlerChangeScreen={handlerChangeScreen}
        />
      ) : (
        <WrapContainerPreloader>
          Загрузка ... <Preloader />
        </WrapContainerPreloader>
      )}
    </WrapContainer>
  );
}
