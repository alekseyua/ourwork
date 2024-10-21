import React from 'react'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Offset from '../../../View/Offset';
import MenuSliderContainer from '../../../View/Menu/MenuSliderContainer';
import MenuSlider from '../../../View/Menu/MenuSlider';


export default function CarSellMenu({
  listMenu = [],
  handlerChangeScreen = () => { },
}) {
  if (!listMenu.length) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>
      <Offset mb={14} />
      <MenuSliderContainer>
        <MenuSlider
          list={listMenu} 
          foreItem
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
     
      <Offset mt={24} />
      {/* <MainFeedbackComponent list={linksFeedback} /> */}

    </WrapContainer>
  )
}
