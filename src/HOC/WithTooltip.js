import React from 'react'
import { funcDelay } from '../helpers/const'
import { ACTION_CHECK_VALIDATE } from '../store/helpers/helpers-store'
import { connectStoreon } from 'storeon/react'

function WithTooltip(Component) {

  class WithTooltipComponent extends React.Component { 
    state = {
      tooltip: {
        create_edit_mp: {
          input_option_city: {
            isShow: false,
            id: null,
            message: 'Не указана страна',
          },          
        },
        subscribe: {
          bank: {
            isShow: false,
            id: null,
            message: 'Не указан срок подписки',
          },
          gotoPayment: {
            isShow: false,
            id: null,
            message: 'Нужно заполнить данные формы',
          },
        },
        validate: {
          validate: {
            isShow: false,
            id: null,
            message: 'Нужно заполнить данные формы',
          }
        },
        request: {
          model: {
            isShow: false,
            id: null,
            message: 'Нужно указать марку авто',
          },
          generation: {
            isShow: false,
            id: null,
            message: 'Нужно указать модель авто',
          },
          city: {
            isShow: false,
            id: null,
            message: 'Нужно указать страну',
          }
        },
        market_add: {
          link: {
            isShow: false,
            id: null,
            message: 'Что бы добавить новый файл или ссылку, необходимо удалить предыдущий добавленный файл или ссылку',
          },
          file: {
            isShow: false,
            id: null,
            message: 'Что бы добавить новую ссылку или файл, необходимо удалить предыдущий добавленный файл или ссылку',
          },
        },
        template_key: {
          template_action: {
            isShow: false,
            id: null,
            message: 'text notification',
          },
        },
      },
    }

    handlerShowTooltip = ({ key, action, e, id }) => {
      const currentId = id ?? e?.offsetParent?.id;     
      if(action === 'validate'){
        this.props.dispatch(ACTION_CHECK_VALIDATE, true)
      }
      this.setState( state => this.actions({state, key, action, id:currentId }))
      funcDelay(() => this.resetTooltip({ key, action, id:currentId }), 2200)
    }

    resetTooltip = ({ key, action, id }) => this.setState(state => this.actions({state, key, action, id }))
    
    actions = ({state, key, action, id }) => ({
      ...state,
      tooltip: {
        ...state.tooltip,
        [key]: {
          ...state.tooltip[key],
          [action]: {
            ...state.tooltip[key][action],
            id: id,
            isShow: !state.tooltip[key][action].isShow,
          }
        }
      }
    })
    
    render() {
      return (
        <Component
          {...this.props}
          tooltip={this.state.tooltip}
          handlerShowTooltip={this.handlerShowTooltip}
        />
      )
    }
  }
  return connectStoreon( WithTooltipComponent);
}

export default WithTooltip;