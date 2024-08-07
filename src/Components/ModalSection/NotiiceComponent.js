import React from 'react'
import { connectStoreon } from 'storeon/react'
import WrapContainerBlock from '../../View/Blocks/WrapContainerBlock'
import WrapTwoColumnGrid from '../../View/Blocks/WrapTwoColumnGrid'
import Offset from '../../View/Offset'
import Icon from '../../View/Icon/Icon'
import { cross } from '../../images'
import BlockTitle from '../../View/Blocks/BlockTitle'
import { MARKET_CURRENT_TAB_ADD_CARDS } from '../../helpers/config'
import WithRouter from '../../HOC/WithRouter'
import InfoBlockContainer from '../Component.Info/InfoBlockContainer'
import { setLocaleStore } from '../../helpers/utils'
import { ACTION_CLOSE_MODAL } from '../../store/helpers/helpers-store'

class NotiiceComponent extends React.Component {
  state = {
    hardColorBlockById: [
      {
        id: 0,
        colorBackground: 'var(--background-color-Mirage-blue)',
        color: 'var(--text-color-white)',
      },
    ]
  }

  handlerScreen = ({path, state}) => {
    if(path === 'undefined') return this.props.dispatch(ACTION_CLOSE_MODAL);
    this.props.dispatch(ACTION_CLOSE_MODAL);
    setLocaleStore(MARKET_CURRENT_TAB_ADD_CARDS,state?.tab)
    this.props.navigate(path);
  }
  

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
          >Внимание</BlockTitle>
          <Icon
            image={cross}
            width={14}
            height={14}
            onClick={() => {
              // this.props.dispatch(ACTION_CLOSE_MODAL)
              this.handlerScreen({path: `${this.props?.state?.slug}`, state:{...this.props?.state}})
            }
            }
          />
        </WrapTwoColumnGrid>
        <Offset mb={23} />
        <InfoBlockContainer
          message={this.props.message}
          style={{
            padding: '18px 12px',
            textAlign: 'left'
          }}
        />
        <Offset mb={12} />      
        <Offset mb={2} />

      </React.Fragment>
    )
  }
}
export default connectStoreon(

  WithRouter(NotiiceComponent),
)