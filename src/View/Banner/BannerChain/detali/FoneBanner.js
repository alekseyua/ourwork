import React from 'react';
import styles from './style/banner-chain.module.scss';
import { aggrigate, aggrigatePng, fone } from '../../../../images';

function FoneBanner() {
  return (
    <div
      className={styles["banner-chain__fone-block"]}
      style={{
        // backgroundImage: `url(${fone})`,
      }}
    ></div>
  );
}

export default FoneBanner;