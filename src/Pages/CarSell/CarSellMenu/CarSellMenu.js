import React from 'react'
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Offset from '../../../View/Offset';
import MenuSliderContainer from '../../../View/Menu/styles/MenuSliderContainer';
import MenuSliderV2 from '../../../View/Menu/MenuSliderV2';


export default function CarSellMenu({
  listMenu = [],
  handlerChangeScreen = () => { },
}) {
  if (!listMenu.length) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>
      <Offset mb={14} />
      <MenuSliderContainer>
        <MenuSliderV2
          list={listMenu} 
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
     
      <Offset mt={24} />
      {/* <MainFeedbackComponent list={linksFeedback} /> */}

    </WrapContainer>
  )
}
