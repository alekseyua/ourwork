import React from 'react';
import Icon from '../Icon/Icon';
import styles from './styles/uploadimage.module.scss';
import stylesAddClass from './styles/uploadimage-addclass.module.scss';
import { useStoreon } from 'storeon/react';
import { rus_to_latin } from '../../helpers/helpers';
import classNames from 'classnames';
import ShowPreviewImages from './Detail/ShowPreviewImages';
import WithPreviewImages from '../../HOC/WithPreviewImages';
import { v4 as uuidV4 } from 'uuid';
import { isAndroid } from '../../helpers/utils';

/**
 * image - setFieldValue('image', files);
 *  
 * @param {
 *  image
 *  label
 *  listImages
 * 
 * *} param0 
 * @returns 
 */
const FormUploadImageV2 = ({
  type = "*",
  // type = ".png, .jpg, .jpeg",
  style = {},
  label,
  title = "Прикрепить изображение",
  image,
  values,
  disabled,
  onClick,
  callback = () => {},
  multiple = false,
  addClass,
  styleIcon = {},
  styleTitle = {},
  styleIconContainer = {},
  isFileName, // добавляет название файла
  setFieldValue = () => {},
  maxCountImage = 7,
  maxSizeImage = null,
  uploadTypeName = "image",
  positionPreview = "over",
  activeButtonBootomForConfirm,

  preview = [],
  deleteImage,
  toolTipAction,
  loadingPreviewImage,
  handlerShowTooltip,
  heandlerAddFilesToPreview,
}) => {
  const { tg, dispatch } = useStoreon("tg");

  return (
    <div
      className={classNames({
        [styles["upload-image__form-upload"]]: true,
        [stylesAddClass[addClass]]: !!addClass,
      })}
    >
      {label ? (
        <p className={styles["upload-image__form-upload-desc"]}>{label}</p>
      ) : null}
      {positionPreview === "over" ? (
        <ShowPreviewImages
          preview={preview}
          loadingPreviewImage={loadingPreviewImage}
          uploadTypeName={uploadTypeName}
          isFileName={isFileName}
          deleteImage={deleteImage}
          toolTipAction={toolTipAction}
          handlerShowTooltip={handlerShowTooltip}
        />
      ) : null}
      <div
        // {...getRootProps()}
        className={styles["upload-image__form-addprod-image"]}
        style={{
          // borderColor: `var(--border-color)`,
          // borderWidth: 1,
          // borderStyle: 'solid',
          backgroundColor: "transparent",
          color: `var(--text-color)`,
          // ...style
        }}
      >
        <div
          className={styles["upload-image__form-addprod-image-wrap"]}
          style={{
            pointerEvents: disabled ? "none" : "all",
          }}
        >
          <div
            className={styles["upload-image__form-upload-button"]}
            style={style}
          >
            {image ? (
              <label
                className={styles["upload-image__form-label"]}
                style={{
                  ...styleIconContainer,
                }}
              >
                <Icon
                 src={image}
                  width={18}
                  height={18}
                  style={{
                    top: 0,
                    ...styleIcon,
                  }}
                  className={styles["upload-image__form-icon"]}
                />
                <span
                  style={{
                    color: `var(--text-color)`,
                    marginLeft: 7,
                    position: "relative",
                    ...styleTitle,
                  }}
                >
                  {title}
                </span>
              </label>
            ) : (
              <label className={styles["upload-image__form-label"]}>
                <Icon
                 src={image}
                  width={25}
                  height={25}
                  invert={0}
                  ml={5}
                  // className={styleIcon}
                  className={styles["upload-image__form-icon"]}
                  style
                />
              </label>
            )}

            <input
              multiple={multiple && !isAndroid()}
              // multiple
              style={{ opacity: 0 }}
              id="image"
              type="file"
              disabled={disabled}
              accept={type}
              name={"image"}
              onClick={onClick}
              onChange={(e) => {
                let files = e.currentTarget.files;
                let newFiles = [];
                if (files.length) {
                  for (const file of files) {
                    console.log({file: file.size})
                    if (maxSizeImage && file.size > maxSizeImage) {
                      // alert(
                      //     `Привышен лимит размера файла, в файле ${file.name} размер ${file.size}b, допустимый максимальный размер ${maxSizeImage}b`)
                      console.log({maxSizeImage})
                      tg.initDataUnsafe?.query_id &&
                        tg.showAlert(
                          `Привышен лимит размера файла, в файле ${file.name} размер ${(file.size / 1024)?.toFixed(2)}kb, допустимый максимальный размер ${maxSizeImage / 1024}kb`
                        );                      
                    }else{
                      newFiles = [
                        ...newFiles,
                        {
                          url: new File([file], rus_to_latin(file.name), {
                            type: file.type,
                          }),
                          id: "local-" + uuidV4(),
                          file_name: file.name,
                          type: file.type,
                        },
                      ];
                    }
                  }
                  function messageLimitAddFiles(maxCountImage){

                    tg.initDataUnsafe?.query_id &&
                      tg.showAlert(
                        `Привышен лимит добавления файлов, максимальное количество ${maxCountImage}`
                      );
                  }
                  const maxCountFile = newFiles.length;
                  if (maxCountFile > maxCountImage - preview.length) {
                    messageLimitAddFiles(maxCountImage);
                    newFiles = newFiles.slice(0, maxCountImage-preview.length);
                  }
                  
                  if (preview.length >= maxCountImage) {
                    messageLimitAddFiles(maxCountImage);
                    return;
                  }
                    heandlerAddFilesToPreview({
                      key: uploadTypeName,
                      files: newFiles,
                    });
                  setFieldValue(uploadTypeName, newFiles);
                  callback({
                    key: uploadTypeName,
                    files: newFiles,
                  });
                  activeButtonBootomForConfirm &&
                    activeButtonBootomForConfirm();
                }
              }}
            />
          </div>
        </div>
      </div>
      {positionPreview === "under" ? (
        <ShowPreviewImages
          preview={preview}
          loadingPreviewImage={loadingPreviewImage}
          uploadTypeName={uploadTypeName}
          isFileName={isFileName}
          deleteImage={deleteImage}
          toolTipAction={toolTipAction}
          handlerShowTooltip={handlerShowTooltip}
        />
      ) : null}
    </div>
  );
};

export default WithPreviewImages(FormUploadImageV2);
