import React from 'react'
import BannerContentContainer from './BannerContentContainer';
import BannerContentTitle from './BannerContentTitle';
import Button from '../../../View/Button/Button';
import { arrowRightWhite, basketShop } from '../../../images';
import BannerControllerContainer from './BannerControllerContainer';
import Icon from '../../../View/Icon/Icon';
import { MARKETPLACE_MAIN } from '../../../helpers/config';

export default function BannerContent({
  handlerChangeScreen
}) {
  return (
    <BannerContentContainer>
      <BannerContentTitle>
      Продавай и покупай на площадке RUUUM
      </BannerContentTitle>

      <BannerControllerContainer>
        <Button
          addClass={'button__banner--arrow-right'}
          iconLeft={arrowRightWhite}
          styleIconsLeft={{ width: 14, height: 14 }}
          onClick={() => handlerChangeScreen({path: MARKETPLACE_MAIN})}
        />
      </BannerControllerContainer>
      <Icon
       src={basketShop}
        width={150}
        height={150}
        style={{
          position: 'absolute',
          right: 0,
          bottom: -5,

        }}
      />
    </BannerContentContainer>
  )
}
