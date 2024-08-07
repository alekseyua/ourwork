import React, { Component } from 'react'
import { getLocaleStore } from '../../../helpers/utils';
import { LAST_PATH_HOW_TO_SETUP } from '../../../helpers/config';
import WithRouter from '../../../HOC/WithRouter';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Offset from '../../../View/Offset';

class IncomingRequestHowToSetup extends Component {
  componentDidMount() {

    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Как настроить',
      pathBackButton: getLocaleStore(LAST_PATH_HOW_TO_SETUP),
    });

  }

  render() {
    return (
      <WrapContainer>
        <Offset mb={14} />
        <p>
          <h1 style={{fontWeight: 500}}>1. Входящие заявки</h1>
          Выберите раздел для настройки входящих заявок.
          Заявки от покупателей будут отображаться на главном экране.
        </p>
        <Offset mb={6} />
        <p>
        <h1 style={{fontWeight: 500}}>1.1. Агрегаты и запчасти (марка авто)</h1>
          Чтобы перейти в модельный ряд и поколения: нажмите на пустое поле марки авто.
          Чтобы получать запросы по всем моделям: выберите категории агрегаты и запчасти.
          Заявки от покупателей будут отображаться на главном экране.
        </p>
        <Offset mb={6} />
        <p>
        <h1 style={{fontWeight: 500}}>1.1.1  Агрегаты и запчасти  (модель авто)</h1>
          Чтобы выбрать поколение: нажмите на пустое поле модели авто
          Заявки от покупателей будут отображаться на главном экране.
        </p>
        <Offset mb={6} />
        <p>
        <h1 style={{fontWeight: 500}}>1.1.1.1 Агрегаты и запчасти (поколения)</h1>
          Выберите поколение. Выберите категории заявок
          Заявки от покупателей будут отображаться на главном экране.
        </p>
        
      </WrapContainer>
    )
  }
}
export default WithRouter(IncomingRequestHowToSetup);