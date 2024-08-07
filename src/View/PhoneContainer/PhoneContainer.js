import React from 'react';

import style from './styles/phonecontainer.module.scss';

const PhoneContainer = ({ children }) => {
  return (
    <div
      className={style['phone-container']}
    >{children}</div>
  );
};

export default React.memo(PhoneContainer);
