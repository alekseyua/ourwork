import React from 'react';
import classNames from 'classnames';

import styles from './styles/index.module.scss';

const Offset = ({ mb = 0, mt=0, mr=0, ml=0, position, children,addClass, style={} }) => {

  return (
    <div
      className={classNames({
        [styles['offset']]: true,
        [addClass]: !!addClass,
        // [styles[`mb--${mb}`]]: !!mb,
        // [styles[`mt--${mt}`]]: !!mt,
        // [styles[`mr--${mr}`]]: !!mr,
        // [styles[`ml--${ml}`]]: !!ml,
        [styles[`position-${position}`]]: !!position,

      })}
      style={{
        ...style,
        marginBottom: mb,
        marginTop: mt,
        marginRight: mr,
        marginLeft: ml,
      }}
    >{children}</div>
  );
};

export default React.memo(Offset);
