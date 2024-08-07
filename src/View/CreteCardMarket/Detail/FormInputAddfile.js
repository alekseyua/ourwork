import React, { useEffect, useState } from 'react'
import ItemAccordionContainer from '../../Accordion/ItemAccordionContainer';
import ItemAccordionContainerTitle from '../../Accordion/ItemAccordionContainerTitle';
import ItemAccordionTitle from '../../Accordion/ItemAccordionTitle';
import ItemAccordionIcon from '../../Accordion/ItemAccordionIcon';
import ItemAccordionDescription from '../../Accordion/ItemAccordionDescription';
import Offset from '../../Offset';
import { addFile } from '../../../images';
import FormUploadImageV2 from '../../UploadImage/FormUploadImageV2';
import { checkErrorForm } from '../../../helpers/utils';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

export default function FormInputAddfile({
  i,
  item,
  values,
  handlerOpen,
  listOpenDesc,
  handlerDeleteImage,
  handlerChangeOptionsData,

  setFieldError = () =>false,
  errors,
  touched,
  resetForm,
  handleBlur,
  handleFocus,
  resetDataForm,
  setFieldValue = () =>false,
}) {
  const [isHasErrorForm, setIsHasErrorForm] = useState(false)
  const initValueOwnInfo = [{ key: 'image', value: [] }];
  useEffect(() => {
    setIsHasErrorForm(checkErrorForm(errors, initValueOwnInfo));  
    setTimeout(() => setIsHasErrorForm(false), 1500)
  }, [errors, touched])
  return (
    <ItemAccordionContainer
      key={i}
      style={{
        border: isHasErrorForm ? '1px solid #ff0000' : '1px solid #dfe2eaa8',
        pointerEvents: 'none',
      }}
    >
      <ItemAccordionContainerTitle
        data_desc={i}
        style={{
          pointerEvents: 'none'
        }}
      >
        <ItemAccordionTitle style={{ fontWeight: 700, pointerEvents: 'none', fontSize: 16 }}>
          {item.title}
        </ItemAccordionTitle>
        <ItemAccordionIcon
          data_desc={i}
          isOpen={listOpenDesc.includes(i)}
          onClick={handlerOpen}
          image={item.icon}
          style={{
            pointerEvents: 'all',
          }}
        />
      </ItemAccordionContainerTitle>
      <ItemAccordionDescription
        isOpen={listOpenDesc.includes(i)}
      >
        <Offset mb={23} />
        <FormUploadImageV2
          multiple
          listImages={values?.image.length ? values?.image : values?.image_urls.length ? values?.image_urls : []}
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
      </ItemAccordionDescription>

    </ItemAccordionContainer>
  )
}

