import React from 'react';
import styles from './style/banner-chain.module.scss';
import { aggrigate, aggrigatePng, fog, fone } from '../../../../images';

function FogBanner() {
  return (
    <div
      className={styles["banner-chain__fone-block-fog"]}
      style={{
        backgroundImage: `url(${fog})`,
      }}
    ></div>
  );
}

export default FogBanner;