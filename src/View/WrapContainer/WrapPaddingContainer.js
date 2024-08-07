
import React from 'react'
import { Dimensions, View } from 'react-native-web'
import { getWidthScreen } from '../../helpers/helpers';
import { isElectron } from '../../helpers/utils';
import { marginSides, marginSidesDesktop, widthDesktop } from '../../helpers/config';

export default function WrapPaddingContainer({ children, style = {}, isPadding = true }) {
  // const width = Dimensions.get('window').width;
  // const padding = width / marginSidesDesktop;

  const width = Dimensions.get('window').width;
  const padding = (width / marginSides);
  return (
    <View
      style={{
        position: 'relative',
        // width: '100%',
        width: `${width - padding}px`,
        zIndex: 1,
        ...style
      }}
    >
      {children}
    </View>
  )
}
