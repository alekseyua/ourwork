import React from 'react';
import styles from './styles/progressbar.module.scss'
import Label from '../Label/Label';
import Icon from '../Icon/Icon';
import { checked } from '../../images';


function DownloadProgressBar({
  percentage = 0
}) {
  return (
    <React.Fragment>
      {
        percentage && percentage !== 100 ?
          <div
            className={styles['progressbar__container']}
          >
            <span
              className={styles['progressbar__rate']}
              style={{
                width: `${percentage}%`
              }}
            ></span>

            Загрузка {percentage} %
          </div>
          : null
      }
      {
        percentage === 100?
        <div
        className={styles['progressbar__success-load']}
      >
            <Icon 
             src={checked}
              width={45}
              height={35}
            />
            Загрузка завершена
            </div>
          : null
      }
    </React.Fragment>
  )
}

export default DownloadProgressBar