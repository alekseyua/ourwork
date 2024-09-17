import React from 'react'
import { imageBanner } from '../../images';
import ImageGalary from '../ViewsImage/ImageGalary';

const Banner = () => {
  return (
    <div>
      <ImageGalary 
        src={imageBanner} 
        width={'100%'}
        height={250}
      />
    </div>
  );
}

export default Banner