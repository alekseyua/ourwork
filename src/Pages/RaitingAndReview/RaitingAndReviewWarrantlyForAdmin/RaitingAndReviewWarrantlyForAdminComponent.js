import React, { Component } from "react";
import RaitingAndReviewWarrantlyForAdmin from "./RaitingAndReviewWarrantlyForAdmin";
import { connectStoreon } from "storeon/react";
import WithRouter from "../../../HOC/WithRouter";
import { REITING_MENU } from "../../../helpers/config";

class RaitingAndReviewWarrantlyForAdminComponent extends Component {
  state = {
    info: {
      title:
        "Гарант от портала RUUUM - это сделка, при которой риски для участников минимальны. Участие администратора помогает снизить риски мошенничества и конфликтов между сторонами, а также обеспечивает более эффективное и прозрачное проведение сделки.",
      desc: [
        `Порталом создается чат, где администратор выступает в роли гаранта безопасности проведения сделки между покупателем и продавцом, обеспечивает соблюдение интересов всех сторон.`,
        `Покупатель отправляет денежные средства администратору портала RUUUM, который удерживает их до получения товара покупателем.`,
        `При поступлении и проверки оговоренной целостности товара, продавец получает удержанные порталом денежные средства.`,
      ],
    },
  };
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Безопасная сделка",
      pathBackButton: REITING_MENU,
    });
  }
  render() {
    return <RaitingAndReviewWarrantlyForAdmin context={this.state.info} />;
  }
}

//https://t.me/admrazborov
export default connectStoreon(
  "messageWarrantlyForAdmin", 
  WithRouter(RaitingAndReviewWarrantlyForAdminComponent)
);
