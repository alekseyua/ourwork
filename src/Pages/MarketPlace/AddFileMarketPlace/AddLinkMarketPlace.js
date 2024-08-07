import React from 'react'
import Input from '../../../View/Input/Input';
import ShowPreviewImages from '../../../View/UploadImage/Detail/ShowPreviewImages';
import Offset from '../../../View/Offset';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';
import WithTooltip from '../../../HOC/WithTooltip';


function AddLinkMarketPlace({
  values,
  tooltip,
  valuesPreview,
  handlerDeleteLink,
  handlerChangeData,
  handlerChangeBlur,
  handlerShowTooltip,
  handlerChangeFocus,
  loadingPreviewImage,
}) {
// console.log({ values });
  return (
    <>
      <TooltipComponent
        onClick={e => (valuesPreview.type === 'link' || valuesPreview.type === 'file') && handlerShowTooltip({
          key: 'market_add',
          action: 'link',
          e
        })}
        style={{ bottom: -10, left: -10, }}
        message={tooltip?.market_add?.link?.message}
        isShow={tooltip?.market_add?.link && tooltip?.market_add?.link?.isShow}
      >
        <Input
          disabled={valuesPreview.type === 'link' || valuesPreview.type === 'file'}
          value={values.urlMarket}
          placeholder={'Вставьте ссылку на файл'}
          name={'urlMarket'}
          height={42}
          onFocus={handlerChangeFocus}
          onBlur={handlerChangeBlur}
          distationtop={1}
          id={`url-marketplace-1`}
          style={{
            paddingLeft: 8
          }}
          onChange={e => {
            const value = e.target.value;
            handlerChangeData({ key: 'urlMarket', value });
          }
          }
        />
      </TooltipComponent>
      {
        valuesPreview.urlMarket && valuesPreview.type === 'link' && valuesPreview?.idFiles ?
          <>
            <Offset mb={20} />
            <ShowPreviewImages
              preview={[{
                file_name: valuesPreview['file_name'],
                id: valuesPreview.idFiles,
                type: valuesPreview.type
              }]}
              isFileName
              deleteImage={handlerDeleteLink}
              loadingPreviewImage={loadingPreviewImage}
            />
          </>
          : null
      }
      {
        valuesPreview?.cards_count_link ?
          <>
            <Offset mt={20} />
            <span> Карточек:{' '} {valuesPreview?.cards_count_link}</span>
          </>
          : null
      }
    </>
  )
}
export default WithTooltip(AddLinkMarketPlace);