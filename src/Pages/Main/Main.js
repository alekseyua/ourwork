import React from 'react';
import WithWrapContainer from '../../HOC/WithWrapContainer';
import Offset from '../../View/Offset';
import Banner from '../../View/Banner/Banner';
import MenuSliderContainer from '../../View/Menu/styles/MenuSliderContainer';
import MenuSlider from '../../View/Menu/MenuSlider';
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
        <MenuSlider
          list={[...mainMenu]} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
      <Offset mb={17} />
    
    </WrapRootContainer>
  );
};

export default WithWrapContainer(Main);
