import React, { Component } from 'react'
import { PROFILE_MENU } from '../../../helpers/config';
import WithRouter from '../../../HOC/WithRouter';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Offset from '../../../View/Offset';
import { openOnlyURl } from '../../../helpers/helpers';
import Button from '../../../View/Button/Button';

class InfoPageProfile extends Component {
  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Как настроить',
      pathBackButton: PROFILE_MENU,
    });

  }

  handlerOpenLink = (link) => {
    openOnlyURl(link,true,true) 
  }
  render() {
    return (
      <WrapContainer >
        <Offset mb={14} />
        <p>
          <h1 style={{ fontWeight: 500, fontSize: 16, textAlign: 'center' }}>Торговая площадка RUUUM - создана для поиска и продажи Б/У автозапчастей, агрегатов и авто.</h1>
        </p>
        <Offset mb={14} />      

        <p style={{lineHeight: `140%`}}>Для Вас будет доступен следующий функционал:</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Маркетплейс  
        - Поиск и продажа автозапчастей по России и СНГ</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Отправка запросов
        - Поиск запчастей методом оповещения продавцов у которых выставлены соответсвующие настройки.</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Входящие заявки
        - Оповещение на срочные запросы от покупателей площадки RUUUM.</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Рейтинги и отзывы
        - Проверка участников.</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Безопасные сделки через администрацию 
        - Заморозка денег в администрации до подтверждения получения товара.</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Гаранты по городам
        - За вознаграждение Вам помогут: подтвердить авторазбор, посмотреть авто или отправить товар.</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>{`Участие в совместных контейнерных закупках агрегатов из ОАЭ под ключ
        - Найдём, проверим и доставим ваш агрегат через таможню в Челябинск. Далее, доставка любым удобным для Вас способом.
        Предоставляем услугу \<\<Лёгкий старт\>\> - привезём агрегат по минимальной предоплате. Если агрегат Вас не устроит, мы его выкупим!`}</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Администратор <b>RUUUM</b> - <Button onClick={()=>this.handlerOpenLink("https://t.me/admrazborov")}>@admrazborov</Button></p>
        <p style={{lineHeight: `140%`}}>Менеджер по закупкам из ОАЭ - <b>@STASUAE</b> - <Button onClick={()=>this.handlerOpenLink("https://t.me/zap_emirates")}>https://t.me/zap_emirates</Button></p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Некоторые функции недоступны без подписки. Уточняйте функционал в разделе Мой профиль - подписка!</p>
        <Offset mb={8} />

        <p style={{lineHeight: `140%`}}>Рекомендация для новых пользователей: Запросите у администратора бесплатную демонстрацию. За пять минут Вам покажут как работать на площадке и ответят на сопутствующие вопросы!</p>

      </WrapContainer>
    )
  }
}
export default WithRouter(InfoPageProfile);