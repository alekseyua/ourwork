import React, { Component } from 'react'
import IncominRequests from './IncominRequests'
import { connectStoreon } from 'storeon/react';
import { help } from '../../images';
import WithRouter from '../../HOC/WithRouter';
import { INCOMING_REQUEST_INFO_SETTING, ROOT, menuIncomingRequest } from '../../helpers/config';
import { ACTION_SET_BUTTON_HEADER_ACTION } from '../../store/helpers/helpers-store';

class IncominRequestsComponent extends Component {
    state = {
        hardColorBlockById: [
            {
                id: 0,
                colorBackground: 'var(--background-color-mirage-blue)',
                color: 'var(--text-color-white)',
            },
            {
                id: 1,
                colorBackground: 'var(--background-color-mirage-blue)',
                color: 'var(--text-color-white)'
            },
        ],
        message: ['Выберите раздел для настройки входящих заявок. Заявки от покупателей будут отображаться на главном экране.'],
    }

    componentDidMount() {
        this.props.controllerHeaderBand({
            currentTextHandlerBand: 'Входящие заявки',
            pathBackButton: ROOT,       
        });

        // this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
        //     isVisible: true,
        //     buttons: [
        //         {
        //             action: () => this.handlerChangeScreen({path: INCOMING_REQUEST_INFO_SETTING}),
        //             iconLeft: help,
        //             styleIconsLeft: { height: 12 },
        //             title: 'Как настроить?',
        //             className: 'button__orange-white'
        //         },
        //     ]
        // })
    }

    handlerChangeScreen = ({path}) => this.props.navigate(path);

    render() {
        return (
            <IncominRequests
                list={menuIncomingRequest}
                message={this.state.message}
                hardColorBlockById={this.state.hardColorBlockById}
                handlerChangeScreen={this.handlerChangeScreen}
                isLoadingMainContext={this.props.isLoadingMainIncommingFilters}
            />
        )
    }
}

export default connectStoreon(
    WithRouter(IncominRequestsComponent)
)