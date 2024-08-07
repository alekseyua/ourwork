import React, { PureComponent } from 'react'
import { connectStoreon } from 'storeon/react'
import WithRouter from '../../../HOC/WithRouter'
import EditProfile from './EditProfile'
import { PROFILE_MENU } from '../../../helpers/config'
import { ACTION_CHANGE_DATA_PROFILE, ACTION_GET_DATA_INFO_PROFILE, ACTION_GET_DATA_PROFILE, ACTION_SAVE_DATA_INTO_STORE_PROFILE } from '../../../store/profile/profile'
import EditProfileTabs from './EditProfileTabs'

class EditProfileContainer extends PureComponent {
  state = {
    listSectionTabs: [
      {
        "id": 0,
        "tab_name": 'Личные данные',
        "title_description": "",
        "type": "part_1",
        "active": true,
      },
      {
        "tab_name": "Адрес",
        "id": 2,
        "title_description": "",
        "type": "part_2",
        "active": false,
      },
      {
        "tab_name": "Дополнительная информация",
        "id": 2,
        "title_description": "",
        "type": "part_3",
        "active": false,
      },
    ],
    action_tab: 'part_1'
  }

  handlerChangeSection = (e, type) => {
    e.preventDefault()
    this.setState( state => ({
      ...state,
      listSectionTabs: this.state.listSectionTabs.map(el => type === el.type ? { ...el, active: true } : { ...el, active: false }),
      action_tab: type
    }))
  }

  componentDidMount() {
    this.props.dispatch(ACTION_GET_DATA_PROFILE)
    this.props.controllerHeaderBand({
      currentTextHandlerBand: 'Редактировать профиль',
      pathBackButton: PROFILE_MENU
    });
    this.props.dispatch(ACTION_GET_DATA_INFO_PROFILE);
  }

  handlerSetDataProfile = ({ key, value }) => this.props.dispatch(ACTION_SAVE_DATA_INTO_STORE_PROFILE, { [key]: value });

  handlerApplyChange = () => this.props.dispatch(ACTION_CHANGE_DATA_PROFILE);

  render() {
    return (
      <EditProfileTabs
        dispatch={this.props.dispatch}
        profileData={this.props.profileInfoData}
        handlerApplyChange={this.handlerApplyChange}
        handlerSetDataProfile={this.handlerSetDataProfile}

        handlerChangeSection={this.handlerChangeSection}
        listSectionTabs={this.state.listSectionTabs}
        action_tab={this.state.action_tab}
      />
      // <EditProfile
      //   dispatch={this.props.dispatch}
      //   profileData={this.props.profileInfoData}
      //   handlerApplyChange={this.handlerApplyChange}
      //   handlerSetDataProfile={this.handlerSetDataProfile}

      //   handlerChangeSection={this.handlerChangeSection}
      //   listSectionTabs={this.state.listSectionTabs}
      //   action_tab={this.state.action_tab}
      // />
    )
  }
}

export default connectStoreon(
  'profileInfoData',

  WithRouter(EditProfileContainer)
)