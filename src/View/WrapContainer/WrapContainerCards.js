import React from "react";
import styles from './styles/wrappercontainercards.module.scss';
import { marginSides, marginSidesDesktop, widthDesktop } from "../../helpers/config";
import { Dimensions } from "react-native-web";
import { isElectron } from "../../helpers/utils";

const WrapContainerCards = ({
  children,
  style={},
}) => {
  const width = Dimensions.get('window').width;
  const padding = width / marginSides;
  const widthContainer = isElectron()? widthDesktop : width - padding;
  return (
    <div
      className={styles['wrapper__container']}
      style={{ 
        width: `${widthContainer}px`,
        ...style, 
      }}
    >
      {children}
    </div>
  )
}

export default WrapContainerCards;