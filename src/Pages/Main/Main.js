import React from 'react';
import WithWrapContainer from '../../HOC/WithWrapContainer';
import Offset from '../../View/Offset';
import Banner from '../../View/Banner/Banner.js';
import MenuSliderContainer from '../../View/Menu/MenuSliderContainer.js';
import MenuSlider from '../../View/Menu/MenuSlider';
import WrapRootContainer from '../../View/WrapContainer/WrapRootContainer';

const Main = ({
  mainMenu = [],
  handlerChangeScreen,
}) => {
  return (
    <WrapRootContainer>
      <Offset mb={17} />
      <Banner />
      <Offset mb={20} />
      <MenuSliderContainer>
        <MenuSlider
          list={[...mainMenu]} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
      <Offset mb={20} />
    
    </WrapRootContainer>
  );
};

export default WithWrapContainer(Main);
