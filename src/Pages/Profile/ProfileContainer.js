import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../HOC/WithRouter'
import Profile from './Profile'
import { PROFILE_SUBSCRIBE, ROOT, menuProfile } from '../../helpers/config'
import { ACTION_GET_DATA_INFO_PROFILE, ACTION_GET_DATA_PROFILE, ACTION_SET_DATA_FOR_CHANGE_PROFILE_NULL } from '../../store/profile/profile'
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store'
import { openOnlyURl } from '../../helpers/helpers'

class ProfileContainer extends Component {
  state = {
    headerTitleUsefulInfo: ['Полезная информация'],
    headerTitleInfoAboutProduct: ['Информация о подписке'],
  }
  componentDidMount() {
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Профиль',
      pathBackButton: ROOT,
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: PROFILE_SUBSCRIBE }),
          styleIconsLeft: { height: 12 },
          title: 'Продлить подписку',
          className: 'button__controll--red'
        },
      ]
    })
    this.props.dispatch(ACTION_GET_DATA_PROFILE)
    this.props.dispatch(ACTION_GET_DATA_INFO_PROFILE)
  }

  componentWillUnmount(){
    this.props.dispatch(ACTION_SET_DATA_FOR_CHANGE_PROFILE_NULL)
  }

  handlerChangeScreen = ({ path, url }) => {
    if(url){
      return openOnlyURl(url)
    }
    this.props.navigate(path)
  }

  render() {
    return (
      <Profile
        listMenu={menuProfile}
        statusPayment={this.props.statusAutopaymentProfileUser}
        infoPayment={this.props.descriptionProfileUser}
        profileInfoData={this.props.profileInfoData}
        handlerChangeScreen={this.handlerChangeScreen}
        headerTitleUsefulInfo={this.state.headerTitleUsefulInfo}
        headerTitleInfoAboutProduct={this.state.headerTitleInfoAboutProduct}
      />
    )
  }
}

export default connectStoreon(
  'profileInfoData',
  'listOptionsPayment',
  'descriptionProfileUser',
  'statusAutopaymentProfileUser',
  'listDescriptionAccessPayment',

  WithRouter(ProfileContainer)
)