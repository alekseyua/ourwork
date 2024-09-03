import React from 'react';
import styles from '../styles/uploadimage.module.scss';
import Icon from '../../Icon/Icon';
import { fileSuccess, settingRedRotation, stop } from '../../../images';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';


export default function ShowPreviewImages({
  preview,
  iconDel,
  isFileName,
  deleteImage = () => { },
  toolTipAction,
  uploadTypeName,
  handlerShowTooltip = () => { },
  loadingPreviewImage,
}) {
  return (<ul className={styles['upload-image__form-upload-list']}>
    {
      preview &&
      !!preview.length &&
      preview.map((el, i) => {
        //jpg, jpeg, jpe jif, jfif, jfi, png, gif, webp, tiff, tif, heif, heic, raw, arw, cr, rw2, nrw, k25, svg, svgz,
        return (
          <TooltipComponent
            message={toolTipAction?.message}
            isShow={toolTipAction?.isShow}
            key={el?.id ?? i}
          >
            <li
              className={styles['upload-image__form-upload-item']}
              style={{
                height: el?.type && el?.type?.includes('image') ? 73 :  96
              }}
            >

              <div
                className={styles['upload-image__form-image-container']}
                style={{
                  border:  el?.type && el?.type.includes('image') ? 'none' : '1px solid var(--border-color)',
                  top:  el?.type && el?.type.includes('image') ? 12 : 0,
                  
                }}
              >
                <img
                  className={styles['upload-image__form-upload-image']}
                  style={{
                    width: el?.type && el?.type.includes('image') ? 74 : 20,
                  }}
                  src={
                    el?.type && el?.type?.includes('image') ? el?.url : fileSuccess
                  }
                />
              </div>
              {
                isFileName && el?.file_name ?
                  <div
                    className={styles['upload-image__form-image-title']}
                    style={{
                      top:  el?.type && el?.type?.includes('image') ? 12 : 10,
                    }}
                  >{el.file_name}</div>
                  : null
              }
              <div
                className={styles['upload-image__form-image--delete']}
                onClick={() => loadingPreviewImage?.includes(el.id) ? handlerShowTooltip('no click') : deleteImage({ id: el?.id, key: uploadTypeName })}
              >
                {
                  el?.id && <Icon
                    className={styles['upload-image__form-image-icon--delete']}
                   src={iconDel ?? stop}
                    width={20}
                    height={20}
                  />
                }
              </div>
              {
                loadingPreviewImage?.includes(el.id) ?
                  <span
                    className={styles['upload-image__loading-preview']}
                    style={{
                      top:  el?.type && el?.type?.includes('image') ? 12 : -1,
                    }}
                  >
                    <Icon
                     src={settingRedRotation}
                      width={20}
                      height={20}
                    />
                  </span>
                  : null
              }
            </li>
          </TooltipComponent>
        );
      })
    }
  </ul>)
}
