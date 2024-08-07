import React from "react";
import { connectStoreon } from "storeon/react";
import WrapTwoColumnGrid from "../../View/Blocks/WrapTwoColumnGrid";
import Offset from "../../View/Offset";
import Icon from "../../View/Icon/Icon";
import { cross } from "../../images";
import BlockTitle from "../../View/Blocks/BlockTitle";
import Menu from "../../View/Menu/Menu";
import {
  MARKET_CURRENT_TAB_ADD_CARDS,
  menuMarketCreateCard,
} from "../../helpers/config";
import WithRouter from "../../HOC/WithRouter";
import InfoBlockContainer from "../Component.Info/InfoBlockContainer";
import { setLocaleStore } from "../../helpers/utils";
import NotiiceComponent from "./NotiiceComponent";
import {
  ACTION_CLOSE_MODAL,
  ACTION_OPEN_MODAL,
} from "../../store/helpers/helpers-store";
import { ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET } from "../../store/marketplace/uploadFileCard/uploadFileCard";

class CreateMarketComponent extends React.Component {
  state = {
    // headerSectionSettingRequest: ['Быстрая настройка заявок'],   /// ??? снова смена макета
    hardColorBlockById: [
      {
        id: 0,
        colorBackground: "var(--background-color-Mirage-blue)",
        color: "var(--text-color-white)",
      },
    ],
  };

  componentDidMount() {
    this.props.dispatch(ACTION_GET_INFO_ABOUT_DOWNLOAD_FILE_MARKET);
  }

  handlerScreen = ({ path, state }) => {
    if (path === "modal") {
      return this.props.dispatch(ACTION_OPEN_MODAL, {
        show: true, //
        //
        content: (
          <NotiiceComponent
            message={
              state?.tab === "file"
                ? "Удалите загруженный файл или ссылку в разделе Создать Объявление. Если он не отображается - подождите некоторое время"
                : "Удалите загруженный файл или ссылку в разделе Создать Объявление. Если он не отображается - подождите некоторое время"
            }
            state={state}
          />
        ),
        hideIcon: true,
        hideControll: true,
      });
    }
    setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS, state?.tab);
    this.props.navigate(path);
    this.props.dispatch(ACTION_CLOSE_MODAL);
  };

  render() {
    return (
      <React.Fragment>
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: ` 95% 5%`,
          }}
        >
          <BlockTitle
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Выберите вариант
          </BlockTitle>
          <Icon
            image={cross}
            width={14}
            height={14}
            onClick={() => this.props.dispatch(ACTION_CLOSE_MODAL)}
          />
        </WrapTwoColumnGrid>
        <Offset mb={23} />
        <Menu
          list={menuMarketCreateCard}
          isMark={
            this.props.storeValuesStatusFilesMarket.status_upload ? [] : [0, 1]
          }
          handlerScreen={this.handlerScreen}
          iconSize={18}
          margin={45}
          isStartBigSlide
          hardColorBlockById={this.state.hardColorBlockById}
        />
        {/* <Offset mb={2} /> */}
        <InfoBlockContainer
          message={`Создайте объявление вручную или загрузите выгруженный файл из стороннего сервиса.
•  Формат загружаемого файла должен быть XML (формат как на Авито)
•  Размер не должен превышать 50 Mb

При автозагрузке будет автоматически применена 5% скидка на товары для участников сообщества`}
          style={{
            padding: "9px 12px 7px",
          }}
          styleText={{
            textAlign: "start",
          }}
        >
          <div
            style={{
              padding: "12px 0 0px",
              textAlign: "start",
              fontSize: 12,
            }}
          >
            По всем вопросам к{" "}
            <a href="https://t.me/admrazborov">@admrazborov</a>
          </div>
          <div
            style={{
              padding: "12px 0 0px",
              textAlign: "start",
              fontSize: 12,
            }}
          >
            Обращаем ваше внимание, автоудаление карточек происходит через 7
            дней с момента загрузки файла или последнего изменения в ссылке.
          </div>
        </InfoBlockContainer>
      </React.Fragment>
    );
  }
}
export default connectStoreon(
  "storeValuesStatusFilesMarket",

  WithRouter(CreateMarketComponent)
);
