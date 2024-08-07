import React from "react";
import styles from './styles/wrappercontainerfilters.module.scss';
import { marginSides, widthDesktop } from "../../helpers/config";
import { Dimensions } from "react-native-web";
import { isElectron } from "../../helpers/utils";

const WrapContainerFilters = ({
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
      className={styles['wrapper__container']}
      style={{
        width: isElectron() ?  widthDesktop : `${width - padding}px`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default WrapContainerFilters;