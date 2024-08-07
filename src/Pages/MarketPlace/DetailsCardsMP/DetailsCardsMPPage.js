import React from "react";
import WrapPaddingContainer from "../../../View/WrapContainer/WrapPaddingContainer";
import CardMPDetailInfo from "../../../View/Cards/Detail/marketplace/CardMPDetailInfo";
import WithWrapContainer from "../../../HOC/WithWrapContainer";
import InfoAboutHosterCArdMarket from "../../../View/Cards/Detail/marketplace/InfoAboutHosterCArdMarket";
import WrapContainerPreloader from "../../../View/Preloaders/WrapContainerPreloader";
import Preloader from "../../../View/Preloaders/Preloader";
import Offset from "../../../View/Offset";
import MainFeedbackComponent from "../../FeedbackPage/FeedbackPage";
import { linksFeedback } from "../../../helpers/config";
import { Button } from "react-native-web";
import WrapTwoColumnGrid from "../../../View/Blocks/WrapTwoColumnGrid";


const DetailsCardsMPPage = ({
  card,
  dispatch,
  countFavorite,
  hendlerFavorite,
  handlerChangeScreen,
}) => {

  // if (!Object.keys(card).length) return (<WrapContainerPreloader>Загрузка ... <Preloader /></WrapContainerPreloader>);

  return (
    <WrapPaddingContainer>
       {/* <WrapTwoColumnGrid>
        <Button
          // disabled={currentTab === 0}
          id={'arrow-prev'}
          style={{
            opacity: 1,
            height: 50
          }}
          onPress={() => handlerChangeScreen({path: -1})}
          >
          {'<-- back'}
        </Button>
        <Button
          id={'arrow-next'}
          style={{
            opacity: 1,
            height: 50
          }}
          onClick={() => handlerChangeScreen(1)}
        >
          {'next -->'}
        </Button>

      </WrapTwoColumnGrid> */}
   

      <CardMPDetailInfo
        item={card}
        description
        characteristic
        dispatch={dispatch}
        countFavorite={countFavorite}
        hendlerFavorite={hendlerFavorite}
      />
    
      <Offset mt={22} />
      {
        !Object.keys(card).length?
        <WrapContainerPreloader><Offset mb={20} /> Загрузка ...  <Preloader /></WrapContainerPreloader>
        : <InfoAboutHosterCArdMarket
          dispatch={dispatch}
          locationUser={card.city}
          dayInService={card.user_data?.days_in_service}
          userTelegramId={card.user_data?.user_telegram_id}

          handlerChangeScreen={handlerChangeScreen}
          userUrl={card.user_data?.user_url}
          userProfile={card.user_data?.user_profile_name}
          userDesc={card.user_data?.seller_comment}
          userPhoneNumber={card.user_data.user_phone_number}
  
        />

      }

      <Offset mt={24} />
      <MainFeedbackComponent list={linksFeedback} />
      <Offset mt={36} />

    </WrapPaddingContainer>
  )
}

export default (DetailsCardsMPPage);
// export default WithWrapContainer(DetailsCardsMPPage);