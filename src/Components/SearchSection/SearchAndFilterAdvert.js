import React from 'react'
import { Link } from 'react-router-dom'
import { MARKETPLACE_FAVORITE } from '../../helpers/config'
import WrapContainerFiltersBody from '../../View/WrapContainer/WrapContainerFiltersBody'
import WidgetCount from '../../View/WidgetCount/WidgetCount'
import Button from '../../View/Button/Button'
import Icon from '../../View/Icon/Icon'
import { heardBlack, settingThree } from '../../images'
import FavoriteContainer from '../../View/BoxContainerFor/FaforiteConrainer/FavoriteContainer'
import BadgeFavorite from '../../View/BoxContainerFor/Badge/BadgeFavorite'
import NativeSelect from '../../View/Select/NativeSelect/NativeSelect'
import { getOptionsFiltersMP } from '../../helpers/helpers'
import WrapTwoColumnGrid from '../../View/Blocks/WrapTwoColumnGrid'
import Offset from '../../View/Offset'
import SearchComponent from './SearchComponent'
import { ACTION_SET_TEXT_SEARCH_MARKET_CARDS } from '../../store/marketplace/marketplace'

export default function SearchAndFilterAdvert({
  option,
  isUpblock,
  countFilters,
  countFavorite,
  textInputSearch,
  handlerTextSearch,
  listOptionsLowHigh,
  handlerFiltersOpen = () => { },
  handlerChangeFilters = () => { },
}) {

  return (
    <WrapContainerFiltersBody>
      <WrapTwoColumnGrid
        style={{
          gridTemplateColumns: `var(--gridTemplateColtumnSearchFavorie)`,
          // gridTemplateColumns: `5fr 1fr`,
          justifyItems: 'center',
          
          // position: 'fixed',
          // top: 70,
          // width:  'calc(100% - 38px)'
        }}
      >
        
        <SearchComponent
          style={{
            width: `100% `,
            height: 46,
            // maxWidth: 250,
          }}
          isUpblock={isUpblock}
          enteredText={textInputSearch} // текущий текст
          getResultSearch={handlerTextSearch} // функция обработки запроса 
          actionDisptchGetSearch={ACTION_SET_TEXT_SEARCH_MARKET_CARDS} // где хроним текст
        />
        <div>

        <Link to={MARKETPLACE_FAVORITE}>
          <FavoriteContainer style={{ marginLeft: 5 }}>
            <Icon
              image={heardBlack}
              width={16}
              height={16}
              />
            {!!countFavorite && <BadgeFavorite>{countFavorite}</BadgeFavorite>}
          </FavoriteContainer>
        </Link>
              </div>
      </WrapTwoColumnGrid>
      <Offset mb={14} />
      <WrapTwoColumnGrid
        style={{
          gridTemplateColumns: `1.1fr 1.2fr`,
          filter: `blur(var(--filter-blur))`
        }}
      >
        <Button
          iconLeft={settingThree}
          classNameIcon={'size-15'}
          addClass={'filter-btn'}
          style={{
            maxWidth: 114
          }}
          onClick={(e) => {
            e.preventDefault()
            handlerFiltersOpen(true)
          }
          }
          helptext={
            countFilters ? <WidgetCount>{countFilters}</WidgetCount> : null
          }
        >
          <p>
            Параметры
          </p>
        </Button>
        <NativeSelect
          data={getOptionsFiltersMP(listOptionsLowHigh.lowHigh.filter(el => +el.id !== +option.optinsFastFilter))}
          height={30}
          pt={3}
          pl={4}
          letterSpacing={.1}
          enabled={true}
          placeholder={(option?.optinsFastFilter && listOptionsLowHigh?.lowHigh.filter(el => +el.id === +option.optinsFastFilter)[0].name) ?? 'Сортировка: по умол...'}
          selectedValue={0}
          width={'100%'}
          style={{
            color: `var(--text-color)`,
            fontWeight: 500,
          }}

          onChange={(value) => {
            handlerChangeFilters({
              key: listOptionsLowHigh.lowHigh.filter(el => +el.id === +value)[0].key,
              value,
              id: true
            })
          }}
        />

      </WrapTwoColumnGrid>
    </WrapContainerFiltersBody>
  )
}
