import React from 'react'
import BannerContentContainer from '../Detali/BannerContentContainer';
import BannerContentTitle from '../Detali/BannerContentTitle';
import BannerControllerContainer from '../Detali/BannerControllerContainer';
import Icon from '../../Icon/Icon';
import { aggrigate, aggrigatePng, arrowRightWhite } from '../../../images';
import Button from '../../Button/Button';
import SellBlock from './detali/SellBlock';
import FoneBanner from './detali/FoneBanner';
import FoneBannerGradient from './detali/FoneBannerGradient';
import FogBanner from './detali/FogBanner';
import { CHAIN_MOTORS } from '../../../helpers/config';


export default function BannerChain({ handlerChangeScreen }) {
  return (
    <BannerContentContainer
      onClick={() => handlerChangeScreen({ path: CHAIN_MOTORS })}
    >
      <BannerContentTitle>Новые китайские двигатели</BannerContentTitle>
      <BannerControllerContainer>
        <Button
          addClass={"button__banner--arrow-right"}
          iconLeft={arrowRightWhite}
          styleIconsLeft={{ width: 14, height: 14 }}
        />
      </BannerControllerContainer>
      <Icon
        image={aggrigatePng}
        width={200}
        height={200}
        style={{
          position: "absolute",
          right: -15,
          bottom: -85,
          zIndex: 9,
        }}
      />
      <SellBlock />
      <FoneBanner />
      <FoneBannerGradient />
      <FogBanner />
      {/* <Image
        source={{
          uri: 'https://botrazbor.ru/media/market/basket-shop.svg'
        }}
        style={{
          width: 138,
          height: 138,
          position: 'absolute',
          right: 1,
          bottom: 0,
        }}
      /> */}
    </BannerContentContainer>
  );
}
