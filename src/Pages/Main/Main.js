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
      <Banner />
      <Offset mb={20} />
      <MenuSliderContainer>
        <MenuSliderV2
          list={[...mainMenu]} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
      <Offset mb={17} />
    
    </WrapRootContainer>
  );
};

export default WithWrapContainer(Main);
