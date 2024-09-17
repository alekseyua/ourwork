


import React from 'react'
import { SafeAreaView } from 'react-native-web'
import { useStoreon } from 'storeon/react';

function WithWrapContainer(Component) {
  return (props) => {
    const { isFocus } = useStoreon('isFocus');
  let styles = {}
  if(isFocus){
    styles={
      position: 'fixed',
    }
  }else{
   styles = {
      position: 'relative',
    }
  }
      return (
        <SafeAreaView
          id='scroll'
          style={{...styles, ...props?.style ?? {}}}
        >
          <Component {...props} />
        </SafeAreaView>
      )
    // }
  // }
  // return WrapContainer
}
}

export default WithWrapContainer;

