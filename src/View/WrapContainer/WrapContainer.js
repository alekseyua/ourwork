
import React from 'react'
import { Dimensions, View } from 'react-native-web'
import { marginSides, widthDesktop } from '../../helpers/config';
import { isElectron } from '../../helpers/utils';

export default function WrapContainer({children, style={}}) {
  const width = Dimensions.get('window').width;
  const padding = width/marginSides; 
  return (
    <View
      style={{
        position: 'relative',
        width: isElectron()? widthDesktop : width - padding,
        zIndex: 1,
        borderRadius: 7,
        ...style
      }}
    >
      {children}
    </View>
  )
}
