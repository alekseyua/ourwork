


import React from 'react'
import { Dimensions, SafeAreaView } from 'react-native-web'
import { marginSides, marginSidesDesktop, widthDesktop } from '../helpers/config';
import { getWidthScreen } from '../helpers/helpers';
import { isElectron } from '../helpers/utils';
import { useStoreon } from 'storeon/react';

function WithWrapContainer(Component) {
  return (props) => {
  const { isFocus } = useStoreon('isFocus');
  const width = Dimensions.get('window').width;
  const padding = width / marginSides;
  const paddingDesktop = width / marginSidesDesktop;
  let styles = {}
  if(isFocus){
    styles={
      position: 'fixed',
      // width: '100%',
      // zIndex: 9999,
      // backgroundColor: '#fff',
      // marginLeft: isElectron() ? ((getWidthScreen(width) - widthDesktop) - paddingDesktop) / 2 : 0,
      // marginRight: isElectron() ? ((getWidthScreen(width) - widthDesktop) - paddingDesktop) / 2 : 0,
  }
  }else{
   styles = {
      position: 'relative',
      // marginLeft: isElectron() ? ((getWidthScreen(width) - widthDesktop) - paddingDesktop) / 2 : 0,
      // marginRight: isElectron() ? ((getWidthScreen(width) - widthDesktop) - paddingDesktop) / 2 : 0,
      // flex: 1,
    }
  }
  // class WrapContainer extends React.Component {
  //   style = this.props.style ?? {}
  //   styles = {};
  //   componentDidMount(){
  //   }

    // render() {
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

