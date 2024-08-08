import React from 'react'
import BannerContentContainer from './BannerContentContainer';
import BannerContentTitle from './BannerContentTitle';
import Button from '../../../View/Button/Button';
import { arrowRightWhite } from '../../../images';
import BannerControllerContainer from './BannerControllerContainer';
import Icon from '../../../View/Icon/Icon';
import { MARKETPLACE_MAIN } from '../../../helpers/config';

export default function BannerContent({
  handlerChangeScreen
}) {
  return (
    <BannerContentContainer
      onClick={() => handlerChangeScreen({path: MARKETPLACE_MAIN})}
    
    >
      <BannerContentTitle>
      Продавай и покупай на площадке RUUUM
      </BannerContentTitle>

      <BannerControllerContainer>
        <Button
          addClass={'button__banner--arrow-right'}
          iconLeft={arrowRightWhite}
          styleIconsLeft={{ width: 14, height: 14 }}
        />
      </BannerControllerContainer>
      <Icon
        image={'https://garsing.shop/media/market/basket-shop.svg'}
        width={ 138}
        height={138}
        style={{
          position: 'absolute',
          right: 0,
          bottom: -5,
        }}
      />
      {/* <Image
        source={{
          uri: 'https://garsing.shop/media/market/basket-shop.svg'
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
  )
}
