
import React from 'react'
import { Dimensions, View } from 'react-native-web'
import { marginSides, widthDesktop } from '../../helpers/config';
import { isElectron } from '../../helpers/utils';

export default function WrapRootContainer({children, style={}}) {
  const width = Dimensions.get('window').width;
  const padding = width/marginSides;
  return (
    <View
      style={{
        position: 'relative',
        width: isElectron()? widthDesktop : width - padding,
        zIndex: 'var(--z-index-root-container)',
        ...style
      }}
    >
      {children}
    </View>
  )
}
