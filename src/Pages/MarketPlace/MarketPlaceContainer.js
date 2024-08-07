import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../HOC/WithRouter'
import MarketPlace from './MarketPlace'
import { setLocaleStore } from '../../helpers/utils'
import { ROOT } from '../../helpers/config'
import CreateMarketComponent from '../../Components/ModalSection/CreateMarketComponent'
import { ACTION_OPEN_MODAL, ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store'

class MarketPlaceContainer extends PureComponent {

  componentDidMount() {
    setLocaleStore('lastPathCreateCardMarket', this.props.pathname)
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Маркет',
      pathBackButton: ROOT,
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.props.dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: <CreateMarketComponent />,
            hideIcon: true,
            hideControll: true,
          }),
          styleIconsLeft: { height: 12 },
          title: 'Создать объявление',
          className: 'button__controll--red'
        },
      ]
    })
  }

  render() {
    return (
      <MarketPlace

      />
    )
  }
}

export default connectStoreon(

  WithRouter(MarketPlaceContainer)
)