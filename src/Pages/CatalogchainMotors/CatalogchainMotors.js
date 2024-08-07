import React from 'react'
import CardMPContainer from '../../View/Cards/Detail/CardMPContainer'
import WrapContainerCards from '../../View/WrapContainer/WrapContainerCards';
import ImageGalaryMP from '../../View/Cards/Detail/ImageGalaryMP';
import WrapContainerPreloader from '../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../View/Preloaders/Preloader';
import { Link } from 'react-router-dom';
import Offset from '../../View/Offset';
import CardMPTitle from '../../View/Cards/Detail/CardMPTitle';
import CardMPPrice from '../../View/Cards/Detail/CardMPPrice';
import { getNumberSpace } from '../../helpers/const';
import Label from '../../View/Label/Label';
import { DEFAULT_PAGE_SIZE_MARKET, MAX_VIEW_ITEM_LAST_PAGE, ONE_CARD_CHAIN_MOTOR } from '../../helpers/config';
import PaginationComponentAllPages from '../../Components/Component.PaginationCatalog/PaginationComponentAllPages';
import { getSessionStore } from '../../helpers/utils';

function CatalogchainMotors({ dataCards, changePagination }) {
  console.log(dataCards);

  if (!dataCards?.results && !dataCards?.results?.length)
    return (
      <WrapContainerPreloader>
        Загрузка ... <Preloader />
      </WrapContainerPreloader>
    );
  return (
    <React.Fragment>
      <Offset mb={14} />

      <WrapContainerCards>
        {dataCards.results.map((item) => {
          return (
            <CardMPContainer style={{}}>
              <ImageGalaryMP
                urlGoToPath={ONE_CARD_CHAIN_MOTOR}
                own
                item={item}
                catalog
                // hendlerFavorite={hendlerFavorite}
              />

              <Link
                to={ONE_CARD_CHAIN_MOTOR}
                state={{ card: item }}
                style={{
                  zIndex: "var(--z-index-element-link)",
                  // marginTop: 11
                }}
              >
                <Offset mb={14} />
                {item?.title && (
                  <CardMPTitle
                    style={{
                      minHeight: 37, //60
                      maxWidth: `calc((100vw - 110px) / 2)`,
                      display: `-webkit-box`,
                      WebkitLineClamp: `2`,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item?.title}
                  </CardMPTitle>
                )}
                <Offset mb={2} />

                {item?.count && (
                  <Label>
                    {"В наличии "} {item.count}
                  </Label>
                )}
                {
                  item?.price ? (
                    <CardMPPrice catalog>
                      {getNumberSpace(item.price)} <span>₽</span>{" "}
                    </CardMPPrice>
                  ) : (
                    <Offset mb={27} />
                  )
                  // <CardMPPrice style={{ minHeight: 25 }}></CardMPPrice>
                }
              </Link>
            </CardMPContainer>
          );
        })}
      </WrapContainerCards>
      <Offset mb={25} />
      <PaginationComponentAllPages
        isLoad={getSessionStore("loadDataChainMotor")}
        totalCount={dataCards.count}
        currentPage={dataCards.current_page}
        onChangePagination={changePagination}
        defaultPageSize={DEFAULT_PAGE_SIZE_MARKET}
        defoultViewItemPaggination={MAX_VIEW_ITEM_LAST_PAGE}
      />
    </React.Fragment>
  );
}

export default CatalogchainMotors