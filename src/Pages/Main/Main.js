import React from 'react';
import WithWrapContainer from '../../HOC/WithWrapContainer';
import HeaderTitleActionComponent from '../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent';
import Offset from '../../View/Offset';
import AccordionContainer from '../../Components/Component.Accardion/AccordionContainer';
import MainFeedbackComponent from '../FeedbackPage/FeedbackPage';
import MainCatalogMPComponent from '../../Components/Component.CatalogMP/MainCatalogMPComponent';
import Banner from '../../View/Banner/Banner';
import { linksFeedback } from '../../helpers/config';
import MenuSliderContainer from '../../View/Menu/styles/MenuSliderContainer';
import MenuSliderV2 from '../../View/Menu/MenuSliderV2';
import WrapRootContainer from '../../View/WrapContainer/WrapRootContainer';

const Main = ({
  listFAQ,
  mainMenu = [],
  headerTitleFAQ,
  headerTitleCatalog,
  handlerChangeScreen,
}) => {
  return (
    <WrapRootContainer>
      <Offset mb={20} />
      <Banner handlerChangeScreen={handlerChangeScreen} />
      {/* <MenuSlider list={[...mainMenu]} handlerChangeScreen={handlerChangeScreen}/> */}
      <MenuSliderContainer>
        <MenuSliderV2
          list={[...mainMenu]} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
      <Offset mb={17} />
      <HeaderTitleActionComponent
        list={headerTitleCatalog}
      />

      <Offset mt={9} />
      <MainCatalogMPComponent
        isUpblock={true}
      />
      <Offset mt={38} />

      <HeaderTitleActionComponent
        list={headerTitleFAQ}
      />
      <Offset mt={10} />
      <AccordionContainer
        styleItem={{
          paddingTop: '14px ',
          paddingBottom: '14px ',
          filter: `blur(var(--filter-blur))`,
        }}
        styleItemIcon={{
          width: '14px',
          height: '14px'
        }}
        list={listFAQ}
      />
      <Offset mt={24} />
      <MainFeedbackComponent list={linksFeedback} />
      {/* <Offset mt={16} /> */}
    </WrapRootContainer>
  );
};

export default WithWrapContainer(Main);
