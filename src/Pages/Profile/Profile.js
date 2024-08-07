import React from 'react'
import HeaderTitleActionComponent from '../../Components/Component.HeaderTitleAction/HeaderTitleActionComponent'
import Offset from '../../View/Offset'
import WrapContainerBlockBorder from '../../View/Blocks/WrapContainerBlockBorder'
import WrapContainer from '../../View/WrapContainer/WrapContainer'
import WrapTwoColumnGrid from '../../View/Blocks/WrapTwoColumnGrid'
import WrapIconBlock from '../../View/Blocks/WrapIconBlock'
import Icon from '../../View/Icon/Icon'
import { arrowRightRed, attention, penRed, subscribe } from '../../images'
import BlockTitle from '../../View/Blocks/BlockTitle'
import WrapTitleDescBlockOpacity from '../../View/Blocks/WrapTitleDescBlockOpacity'
import WrapRowGrid from '../../View/Blocks/WrapRowGrid'
import Line from '../../View/Line/Line'
import Button from '../../View/Button/Button'
import InfoIconBlock from '../../View/InfoBlock/InfoIconBlock'
import InfoTextBlock from '../../View/InfoBlock/InfoTextBlock'
import InfoContainer from '../../View/InfoBlock/InfoContainer'
import CheckBox from '../../View/CheckBox'
import WrapContainerBlock from '../../View/Blocks/WrapContainerBlock'
import MainFeedbackComponent from '../FeedbackPage/FeedbackPage'
import { PROFILE_EDIT, PROFILE_INFO, PROFILE_SUBSCRIBE, linksFeedback } from '../../helpers/config'
import Menu from '../../View/Menu/Menu'

export default function Profile({
  listMenu,
  infoPayment,
  statusPayment,
  profileInfoData,
  handlerChangeScreen,
  headerTitleUsefulInfo,
  headerTitleInfoAboutProduct,
}) {

  return (
    <WrapContainer>
      <Menu list={listMenu} iconSize={18} handlerScreen={handlerChangeScreen} />
      <Offset mb={13} />
      <WrapContainerBlockBorder>
        <Offset mb={4} />

        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: `15% 85%`,
            left: 12,
          }}
        >
          <WrapIconBlock>
            <Icon
              addClass={"icon__bg-roze-38"}
              // style={{
              //   left: 7,
              // }}
              width={14}
              height={14}
              image={subscribe}
            />
          </WrapIconBlock>
          <WrapRowGrid
            style={{
              margenLeft: -7,
            }}
          >
            <BlockTitle style={{ fontWeight: 500 }}>
              {profileInfoData.name}
            </BlockTitle>
            <WrapTitleDescBlockOpacity>
              {profileInfoData.organization}
            </WrapTitleDescBlockOpacity>
          </WrapRowGrid>
        </WrapTwoColumnGrid>
        <Offset mb={12} />
        <Line />
        <Offset mb={15} />
        <WrapTwoColumnGrid
          style={{
            gridTemplateColumns: `35% 65%`,
          }}
        >
          <WrapRowGrid>
            <WrapTitleDescBlockOpacity>Ваш город:</WrapTitleDescBlockOpacity>
            <BlockTitle style={{ fontWeight: 500, minHeight: 20 }}>
              {profileInfoData.city}
            </BlockTitle>
          </WrapRowGrid>
          <WrapRowGrid>
            <WrapTitleDescBlockOpacity>Ваш телефон:</WrapTitleDescBlockOpacity>
            <BlockTitle style={{ fontWeight: 500, minHeight: 20 }}>
              {profileInfoData.phone}
            </BlockTitle>
          </WrapRowGrid>
        </WrapTwoColumnGrid>
        <Offset mb={8} />
        <WrapRowGrid>
          <WrapTitleDescBlockOpacity>
            Ссылка на авито/дром:
          </WrapTitleDescBlockOpacity>
          <BlockTitle
            style={{ fontWeight: 500, color: "var(--text-color-red)" }}
          >
            {profileInfoData.avito_prom}
          </BlockTitle>
        </WrapRowGrid>
        <Offset mb={10} />
        <WrapRowGrid>
          <WrapTitleDescBlockOpacity>
            Доп. информация:
          </WrapTitleDescBlockOpacity>
          <BlockTitle style={{ fontWeight: 500 }}>
            {profileInfoData.add_info}
          </BlockTitle>
        </WrapRowGrid>
        <Offset mb={18} />
        <Button
          addClass={"button__edit-my-profile"}
          iconLeft={penRed}
          styleIconsLeft={{
            width: 12,
            height: 12,
          }}
          onClick={() => handlerChangeScreen({ path: PROFILE_EDIT })}
        >
          Редактировать профиль
        </Button>
      </WrapContainerBlockBorder>

      <Offset mb={36} />

      <HeaderTitleActionComponent list={headerTitleInfoAboutProduct} />

      <Offset mb={14} />
      <WrapContainerBlockBorder>
        <WrapRowGrid>
          <Offset mb={6} />
          <WrapTitleDescBlockOpacity>Текущий доступ:</WrapTitleDescBlockOpacity>
          <BlockTitle style={{ fontWeight: 500 }}>
            {infoPayment.user_status}
          </BlockTitle>
          <Offset mb={3} />
          <WrapTitleDescBlockOpacity>Действует до:</WrapTitleDescBlockOpacity>
          <BlockTitle style={{ fontWeight: 500 }}>
            {infoPayment.user_date_end}
          </BlockTitle>
          <Offset mb={8} />
          <InfoContainer>
            <InfoIconBlock>
              <Icon width={14} height={14} image={attention} />
            </InfoIconBlock>
            <InfoTextBlock
              style={{ fontWeight: 500, color: "var(--text-color-red)" }}
            >
              {statusPayment
                ? "У вас подключен автоплатеж"
                : "У вас отключен автоплатеж"}
            </InfoTextBlock>
          </InfoContainer>
        </WrapRowGrid>
        <Offset mb={24} />

        <WrapTwoColumnGrid>
          <Button
            addClass={"button__controll--red"}
            onClick={() => handlerChangeScreen({ path: PROFILE_SUBSCRIBE })}
            style={{
              justifyContent: "center",
              paddingTop: 4,
            }}
          >
            Продлить подписку
          </Button>
          {/* <CheckBox
            checked={statusPayment}
            variant={'auto-payment'}
            onChange={res => handlerChangeSubscribe(res)}
            name={'payment'}
            helptext={'Автоплатеж'}
            helpTextStyle={{
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px'
            }}
          /> */}
        </WrapTwoColumnGrid>
      </WrapContainerBlockBorder>

      <Offset mb={34} />
      <HeaderTitleActionComponent list={headerTitleUsefulInfo} />

      <WrapContainerBlock>
        <Offset mb={18} />
        <WrapContainerBlockBorder
          onClick={() => {}}
          style={{
            padding: `13px 15px`,
          }}
        >
          <WrapTwoColumnGrid
            style={{
              gridTemplateColumns: `95% 5%`,
            }}
            onClick={() => handlerChangeScreen({ path: PROFILE_INFO })}
          >
            <BlockTitle style={{ fontWeight: 500 }}>
              Инструкция по работе с ботом
            </BlockTitle>
            <WrapIconBlock>
              <Icon width={14} height={14} image={arrowRightRed} />
            </WrapIconBlock>
          </WrapTwoColumnGrid>
        </WrapContainerBlockBorder>
        <Offset mb={8} />
        <WrapContainerBlockBorder
          onClick={() => {}}
          style={{
            padding: `13px 15px`,
          }}
        >
          <WrapTwoColumnGrid
            style={{
              gridTemplateColumns: `95% 5%`,
            }}
            onClick={() =>
              handlerChangeScreen({
                url: "https://youtube.com/shorts/MBrA-iGZvWY?feature=share",
              })
            }
          >
            <BlockTitle style={{ fontWeight: 500 }}>
              Промо-ролик для друзей
            </BlockTitle>
            <WrapIconBlock>
              <Icon width={14} height={14} image={arrowRightRed} />
            </WrapIconBlock>
          </WrapTwoColumnGrid>
        </WrapContainerBlockBorder>
        <Offset mb={8} />
        <WrapContainerBlockBorder
          onClick={() => {}}
          style={{
            padding: `13px 15px`,
          }}
        >
          <WrapTwoColumnGrid
            style={{
              gridTemplateColumns: `95% 5%`,
            }}
          >
            <BlockTitle style={{ fontWeight: 500 }}>
              Видео о верификации
            </BlockTitle>
            <WrapIconBlock>
              <Icon width={14} height={14} image={arrowRightRed} />
            </WrapIconBlock>
          </WrapTwoColumnGrid>
        </WrapContainerBlockBorder>
      </WrapContainerBlock>
      <Offset mb={24} />
      <MainFeedbackComponent list={linksFeedback} />
    </WrapContainer>
  );
}
