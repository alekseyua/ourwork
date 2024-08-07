import React from 'react'
import { fileAdditionOneRed } from '../../../images';
import FormUploadImageV2 from '../../../View/UploadImage/FormUploadImageV2';
import ShowPreviewImages from '../../../View/UploadImage/Detail/ShowPreviewImages';
import Offset from '../../../View/Offset';
import WithTooltip from '../../../HOC/WithTooltip';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';
import Label from '../../../View/Label/Label';

function AddFileMarketPlace({
  values,
  tooltip,
  valuesPreview,
  handlerChangeData,
  handlerDeleteFile,
  handlerShowTooltip,
  loadingPreviewImage,
}) {
  return (
    <>
    <TooltipComponent
        onClick={e => (valuesPreview.type === 'link' || valuesPreview.type === 'file') && handlerShowTooltip({
          key: 'market_add',
          action: 'file',
          e
        })}
        style={{ bottom: -10, left: -10, }}
        message={tooltip?.market_add?.file?.message}
        isShow={tooltip?.market_add?.file && tooltip?.market_add?.file?.isShow}
      >
      <FormUploadImageV2
        // multiple
        disabled={valuesPreview.type === 'link' || valuesPreview.type === 'file' || values?.file?.length}
        isFileName
        addClass={'upload__add-files'}
        listImages={!!!values?.idFiles ? values['file'] : null}

        values={!!!values?.idFiles ? values : null}
        image={fileAdditionOneRed}
        title={'Загрузить'}
        styleTitle={{
          fontSize: 12,
          top: 12,
          fontWeight: 500
        }}
        styleIconContainer={{
          top: 32
        }}
        style={{
          minHeight: 114
        }}
        // type='.xl*,.cs*,.xml'
        maxCountImage={2}
        positionPreview={'under'}
        uploadTypeName={'file'}
        onChange={handlerChangeData}
      />
      <Offset mt={15} />
      <Label>Поддерживаемые типы файлов: xml</Label>

      </TooltipComponent>
      <Offset mt={20} />

      {
        valuesPreview.file_name && valuesPreview.type === 'file' && valuesPreview?.idFiles ?
          <>

            <Offset mb={20} />
            <ShowPreviewImages
              preview={[{
                file_name: valuesPreview['file_name'],
                id: valuesPreview.idFiles,
                type: valuesPreview.type
              }]}
              isFileName
              deleteImage={handlerDeleteFile}
              loadingPreviewImage={loadingPreviewImage}
            />
          </>
          : null
      }

      {
        valuesPreview?.cards_count_file?
        <>
        <Offset mt={20} />
          <span> Карточек:{' '} {valuesPreview?.cards_count_file}</span>
        </>
          : null
      }
    </>
  )
}
export default  WithTooltip(AddFileMarketPlace);