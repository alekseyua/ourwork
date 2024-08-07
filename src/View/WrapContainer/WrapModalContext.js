
import React from 'react'
import { SafeAreaView, View } from 'react-native-web'

export default function WrapModalContext({ children, style = {}, isPadding = true }) {
  return (
    <View
      style={{
        top: 0,
        left: 0,
        overflowY: 'auto',
        maxHeight: '80vh',
        width: '85vw',
        margin:10, 
        padding:10,
        ...style
      }}
    >
      {children}
    </View>
  )
}