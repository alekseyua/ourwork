import React from 'react';
import styles from './styles/forminputcontainer.module.scss';
import { Dimensions } from 'react-native-web';
import { marginSides } from '../../helpers/config';

export default function FormInputContainer({children, style={}}) {  
  // const width = Dimensions.get('window').width;
  // const padding = width/marginSides;
  return (
    <div
      className={styles['form-input__container']}
      style={{
        ...style
      }}
    >
      <div>{children}</div>
    </div>
  )
}
