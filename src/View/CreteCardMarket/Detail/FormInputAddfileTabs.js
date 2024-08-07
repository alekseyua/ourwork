import React, { useEffect, useState } from 'react'
import ItemAccordionTitle from '../../Accordion/ItemAccordionTitle';
import Offset from '../../Offset';
import { addFile } from '../../../images';
import FormUploadImageV2 from '../../UploadImage/FormUploadImageV2';
import { checkErrorForm } from '../../../helpers/utils';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

export default function FormInputAddfileTabs({
  values,
  handlerDeleteImage,
  handlerChangeOptionsData,

  setFieldError = () =>false,
  errors,
  touched,
  setFieldValue = () =>false,
}) {
  const [isHasErrorForm, setIsHasErrorForm] = useState(false)
  const initValueOwnInfo = [{ key: 'image', value: [] }];
  useEffect(() => {
    setIsHasErrorForm(checkErrorForm(errors, initValueOwnInfo));  
    setTimeout(() => setIsHasErrorForm(false), 1500)
  }, [errors, touched])

  console.log(values)

  return (
<>
        <ItemAccordionTitle style={{ fontWeight: 700, pointerEvents: 'none', fontSize: 16 }}>
          {'Добавьте фотографии'}
        </ItemAccordionTitle>
        <FormUploadImageV2
          multiple
          listImages={ !!values?.image_urls.length ? values?.image_urls : !!values?.image.length ? values?.image : []}
          image={addFile}
          maxCountImage={9999999999}
          type={"image/*"}
          style={{
            marginTop: 10,
            pointerEvents: 'all',
          }}
          positionPreview={'over'}
          uploadTypeName={'image'}
          setFieldValue={(action, file) => {
            setFieldValue(action, file)
            setFieldError(action, '')
          }
          }
          handlerDeleteImage={handlerDeleteImage}
          onChange={handlerChangeOptionsData}
        />
      {
            touched?.image && errors?.image ? <ErrorMessage>{errors?.image} </ErrorMessage>
              : null}
        <Offset mb={20} />

</>
  )
}
