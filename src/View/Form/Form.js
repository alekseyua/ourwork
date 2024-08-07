import React from 'react'
import { View } from 'react-native-web'

export default function Form({formId,children, style={}}) {
  return (
    <View 
      id={formId}
      style={style}
    >
      {children}
    </View>
  )
}