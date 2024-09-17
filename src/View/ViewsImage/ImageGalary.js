import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from "./styles/viewsimage.module.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { widthMobile } from "../../helpers/config";

const ImageGalary = ({
  src,
  style,
  height = ((widthMobile-22) / 2),//154,
  width = ((widthMobile-22) / 2), //154,
  scrollPosition,
}) => {

  return (
    <div className={styles["viewsimage__galaty-container"]} style={style}>
      <LazyLoadImage
        alt={"image.alt"}
        effect="blur"
        src={src}
        scrollPosition={scrollPosition}
        style={{
          objectFit: "cover",
          height: height,
          maxHeight: height,
          minHeight: height,
          borderRadius: "14px",
          width: width,
        }}
      />
    </div>
  );
}

export default ImageGalary;