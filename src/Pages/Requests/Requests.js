import React from 'react'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import Offset from '../../View/Offset'
import WrapContainerPreloader from '../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../View/Preloaders/Preloader'
import MenuSliderContainer from '../../View/Menu/styles/MenuSliderContainer'
import MenuSlider from '../../View/Menu/MenuSlider'

export default function Requests({
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
          handlerChangeScreen={handlerChangeScreen} 
        />
      </MenuSliderContainer>
     
      <Offset mt={24} />
      {/* <MainFeedbackComponent list={linksFeedback} /> */}

    </WrapContainer>
  )
}
