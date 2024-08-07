import React from 'react';
import styles from './style/banner-chain.module.scss';
import { aggrigate, aggrigatePng, fone, foneGradient } from '../../../../images';

function FoneBannerGradient() {
  return (
    <div
      className={styles["banner-chain__fone-gradient-block"]}
      style={{
        backgroundImage: `url(${foneGradient})`,
      }}
    ></div>
  );
}

export default FoneBannerGradient;