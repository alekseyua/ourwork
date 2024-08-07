import React from "react";
import styles from './styles/wrappercontainerfilters.module.scss';
import { marginSides } from "../../helpers/config";
import { Dimensions } from "react-native-web";

const WrapContainerFiltersBody = ({
  column,
  children,
  style = {},
  isBlur
}) => {
  const width = Dimensions.get('window').width;
  const padding = (width / marginSides);

  if (isBlur) {
    style = { ...style, filter: `blur(4px)` }
  }
  return (
    <div
      className={styles['wrapper__container-body']}
      style={{...style}}
    >
      {children}
    </div>
  )
}

export default WrapContainerFiltersBody;