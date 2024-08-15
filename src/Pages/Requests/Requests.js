import React from 'react'
import Menu from '../../View/Menu/Menu'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import Offset from '../../View/Offset'
import HeaderTitleActionComponent from '../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent'
import MainFeedbackComponent from '../FeedbackPage/FeedbackPage'
import WrapContainerPreloader from '../../View/Preloaders/WrapContainerPreloader'
import Preloader from '../../View/Preloaders/Preloader'
import MainCatalogMPComponent from '../../Components/Component.CatalogMP/MainCatalogMPComponent'
import { linksFeedback } from '../../helpers/config'
import MenuSliderContainer from '../../View/Menu/styles/MenuSliderContainer'
import MenuSliderV2 from '../../View/Menu/MenuSliderV2'

export default function Requests({
  listMenu = [],
  accessRedirect,
  headerTitleCatalog,
  hardColorBlockById,
  handlerChangeScreen = () => { },

}) {
  if (!listMenu.length) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);
  return (
    <WrapContainer>
      <Offset mb={14} />
      {/* <Menu
        list={listMenu}
        handlerScreen={handlerChangeScreen}
        accessRedirect={accessRedirect}
        hardColorBlockById={hardColorBlockById}
        firstButtonArrow

      /> */}
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
