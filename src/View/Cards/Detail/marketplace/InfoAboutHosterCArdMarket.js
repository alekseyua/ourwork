import React from 'react'
import WrapTwoColumnGrid from '../../../Blocks/WrapTwoColumnGrid'
import WrapIconBlock from '../../../Blocks/WrapIconBlock'
import Icon from '../../../Icon/Icon'
import { subscribe } from '../../../../images'
import WrapRowGrid from '../../../Blocks/WrapRowGrid'
import BlockTitle from '../../../Blocks/BlockTitle'
import WrapTitleDescBlockOpacity from '../../../Blocks/WrapTitleDescBlockOpacity'
import WrapContainerBlockBorder from '../../../Blocks/WrapContainerBlockBorder'
import Offset from '../../../Offset'
import Line from '../../../Line/Line'
import Button from '../../../Button/Button'
import { openURl } from '../../../../helpers/helpers'
import { MARKETPLACE_EDIT_OWN_CARD } from '../../../../helpers/config'
import { Link } from 'react-router-dom'
import { ACTION_OPEN_MODAL } from '../../../../store/helpers/helpers-store'

export default function InfoAboutHosterCArdMarket({
  userUrl,
  userDesc,
  dispatch,
  userProfile,
  dayInService,
  locationUser,
  userTelegramId,
  userPhoneNumber,
  handlerChangeScreen,
}) {
  return (
    <WrapContainerBlockBorder>
      <WrapTwoColumnGrid
        style={{
          gridTemplateColumns: `17% 83%`
        }}
        onClick={()=>handlerChangeScreen({id: userTelegramId})}
      >
        <WrapIconBlock
          style={{
            left: 12
          }}
        >
          <Icon
            addClass={'icon__bg-roze-38'}
            width={14}
            height={14}
            image={subscribe}
          />
        </WrapIconBlock>
        <WrapRowGrid>
          <BlockTitle style={{ fontWeight: 500 }}>
            {userProfile}
          </BlockTitle>
          <WrapTitleDescBlockOpacity style={{ fontSize: 14 }}>
            {userUrl}
          </WrapTitleDescBlockOpacity>
        </WrapRowGrid>
      </WrapTwoColumnGrid>
      <Offset mb={16} />
      <Line />
      <Offset mb={14} />
      <WrapTwoColumnGrid
        style={{
          gridTemplateColumns: `40% 60%`,
          minHeight: 40,
          alignItems: 'start'
        }}
      >
        <WrapRowGrid >
          <WrapTitleDescBlockOpacity>
            Город:
          </WrapTitleDescBlockOpacity>
          <BlockTitle style={{ fontWeight: 500 }}>
            {locationUser}
          </BlockTitle>
        </WrapRowGrid>
        <WrapRowGrid>
          <WrapTitleDescBlockOpacity>
            Кол-во дней в сервисе:
          </WrapTitleDescBlockOpacity>
          <BlockTitle style={{ fontWeight: 500 }}>
            {dayInService}
          </BlockTitle>
        </WrapRowGrid>
      </WrapTwoColumnGrid>
      <Offset mb={8} />
      <WrapRowGrid>
        <WrapTitleDescBlockOpacity
          style={{ fontWeight: 400 }}
        >
          О продавце:
        </WrapTitleDescBlockOpacity>
        {
          userDesc ?
            <BlockTitle style={{ fontWeight: 500 }}>
              {userDesc}
            </BlockTitle>
            : <Offset mb={16} />
        }
      </WrapRowGrid>
      <Offset mb={24} />

      <WrapTwoColumnGrid
      style={{
        justifyItems: 'center',
        gap: '10px'
      }}
      >
        <Button
          addClass={'button__controll--red'}
          // iconLeft={penRed}
          // styleIconsLeft={{
          //   width: 12,
          //   height: 12
          // }}
          style={{
            justifyContent: 'center',
            width: '100%'
          }}
          onClick={() => openURl(userUrl, `Написать ${userProfile}`, dispatch, true)}
        >
          Написать продавцу
        </Button>

        <Button
          addClass={'button__controll--roze'}
          // iconLeft={penRed}
          // styleIconsLeft={{
          //   width: 12,
          //   height: 12
          // }}
          style={{
            justifyContent: 'center',
            width: '100%'

          }}
          onClick={() => !userPhoneNumber && dispatch(ACTION_OPEN_MODAL, {
            show: true,
            content: 'У владельца объявления не привязан номер телефона',
            contentBtn: 'Ок',
            error: false,
            hideIcon: true
          })}
        >
          {
            userPhoneNumber ?
              <Link
                to={`tel:${userPhoneNumber} `}
                target="_blank"
              >
                Позвонить
              </Link>
              : 'Позвонить'
          }
        </Button>

      </WrapTwoColumnGrid>

    </WrapContainerBlockBorder>
  )
}