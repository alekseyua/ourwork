import React, { useEffect, useState } from 'react'
import Label from '../../Label/Label';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { autoFocusFormInput, checkErrorForm, removeFocusFormInput, setSessionStore } from '../../../helpers/utils';
import Offset from '../../Offset';
import PhoneContainer from '../../PhoneContainer/PhoneContainer';
import Phone, { isPossiblePhoneNumber, formatPhoneNumber } from 'react-phone-number-input/input'
import NativeSelect from '../../Select/NativeSelect/NativeSelect';
import { getTitleFilters } from '../../../helpers/helpers';
import ItemAccordionTitle from '../../Accordion/ItemAccordionTitle';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';


export default function $FormInputAboutTCDescTabs({
  values,
  handlerChangeOptionsData,
  errors,
  touched,
  dispatch,
  handleBlur,
  handleSubmit,
  setFieldValue,
  resetDataForm,
}) {
  const [isValidNumber, setIsValidNumber] = useState(false)
  const [isHasErrorForm, setIsHasErrorForm] = useState(false)
  const initValueAggrigate = [
    { key: 'oem', value: '' },
    { key: 'condition', value: '' },
    { key: 'count', value: '' },
    { key: 'phone', value: '' }, 
    { key: 'address', value: '' },
  ];

  useEffect(() => {
    setIsHasErrorForm(checkErrorForm(errors, initValueAggrigate));
    setTimeout(() => setIsHasErrorForm(false), 1500)
  }, [errors, touched])
  const listOptionCondition = [{
    title:'Новое',
    value:'Новое',
    id: 0,
  }, 
  {
    title: 'Б/У',
    value: 'Б/У',
    id:1
  }
  ]
  const listOptionCount = [{
    title: 1,
    value: 1,
    id: 1,
  }, 
  {
    title: 2,
    value: 2,
    id:2,
  },
  {
    title: 3,
    value: 3,
    id:3,
  },
  {
    title: 4,
    value: 4,
    id:4,
  },
  {
    title: 5,
    value: 5,
    id:5,
  },
  {
    title: 6,
    value: 6,
    id:6,
  },
  {
    title: 7,
    value: 7,
    id:7,
  },
  {
    title: 8,
    value: 8,
    id:8,
  },
  {
    title: 9,
    value: 9,
    id:9,
  },
  {
    title: 10,
    value: 10,
    id:10,
  },
  ]
  return (
      <>
       <ItemAccordionTitle style={{ fontWeight: 700, pointerEvents: 'none', fontSize: 16 }}>
       Подробности
        </ItemAccordionTitle>
        <Offset mb={21} />
        <Label style={{ fontWeight: 500 }}>{'Телефон'}</Label>
        <Offset mb={4} />
        <PhoneContainer>
          <Phone
            placeholder={'+7 (000) 000-00-00'}
            value={values.phone}
            className={'form-input-number-phone-marketplace'}
            id={'phone-mp'}
            autoComplete={'off'}
            style={{
              height: 42,
              width: '100%',
              borderRadius: 8,
              border: touched?.phone && errors?.phone ? '1px solid #ff0000' : `1px solid var(--border-color)`,
              borderWidth: 1,
              color: `var(--placeholder-color)`,
              padding: '10px 13px',
              // padding: '0.5em',
              pointerEvents: 'all',
              position: 'relative'
            }}

            name={'phone'}
            onFocus={(e) => {
              setSessionStore('isOpenKeyboard')
              autoFocusFormInput(e, dispatch)
            }}
            onBlur={e =>{
              removeFocusFormInput(e, dispatch)
              return handleBlur(e)
            }}
            helptext={touched?.phone && errors?.phone}
            stylehelptext={{
              color: 'var(--text-color-red)'
            }}
            rules={{ validate: isPossiblePhoneNumber }}
            onChange={(phone) => {
              try {
                setIsValidNumber(isPossiblePhoneNumber(phone))
              } catch (error) {
                setIsValidNumber(false)
              }

              setFieldValue('phone', phone, true)
              handlerChangeOptionsData({
                key: 'phone',
                value: phone,
              })
            }}
          />
          {
            touched?.phone && errors?.phone ? <ErrorMessage>{errors?.phone} </ErrorMessage>
              // : !isValidNumber?
              //   <ErrorMessage>{'Номер телефона недействителен'}</ErrorMessage>
                : null}
        </PhoneContainer>

        <Offset mb={14} />
        <Label style={{ fontWeight: 500 }}>{'Адрес'}</Label>
        <Offset mb={4} />
        <Input
          value={values.address}
          placeholder={'Например, Ленина 23/а'}
          height={42}
          id={`address-1`}
          onBlur={handleBlur}
          style={{
            minHeight: 34,
            border: touched?.address && errors?.address ? '1px solid #ff0000' : ''

          }}
          name={'address'}
          helptext={touched?.address && errors?.address}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={e => {
            const value = e.target.value;
            setFieldValue('address', value, true)
            handlerChangeOptionsData({
              key: 'address',
              value: value,
            })
          }}
        />
        <Offset mb={14} />
        <Label style={{ fontWeight: 500 }}>{'Номер каталога(OEM)'}</Label>
        <Offset mb={4} />
        <Input
          value={values.oem}
          placeholder={'Любое'}
          id={`oem-1`}
          height={42}
          style={{
            pointerEvents: 'all',
            minHeight: 34,
            border: touched?.oem && errors?.oem ? '1px solid #ff0000' : '',
          }}
          name={'oem'}
          onBlur={handleBlur}
          helptext={touched?.oem && errors?.oem}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={e => {
            const value = e.target.value;
            setFieldValue('oem', value, true)
            handlerChangeOptionsData({
              key: 'oem',
              value: value,
              buttonForm: handleSubmit
            })
          }
          }
        />


        <Offset mb={13} />
        <Label style={{ fontWeight: 500, fontSize: 14 }}>{'Состояние'}</Label>
        <Offset mb={4} />
        <NativeSelect
          data={listOptionCondition}
          height={42}
          enabled={true}
          placeholder={getTitleFilters(values?.condition, listOptionCondition)}
          selectedValue={0}
          width={'100%'}
          style={{
            pointerEvents: 'all'
          }}
          styleWrap={{
            border: touched?.condition && errors?.condition ? '1px solid #ff0000' : '1px solid var(--border-select-color)',
          }}
          onBlur={handleBlur}
          name={'condition'}
          helptext={touched?.condition && errors?.condition}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={(value) => {
            setFieldValue('condition', value, true)
            handlerChangeOptionsData({
              key: 'condition',
              value: value,
              buttonForm: handleSubmit
            })
          }}
        />
    
        <Offset mb={13} />
        <Label style={{ fontWeight: 500 }}>{'Количество'}</Label>
        <Offset mb={4} />
        <NativeSelect
          data={listOptionCount}
          height={42}
          enabled={true}
          placeholder={getTitleFilters(values?.count,listOptionCount)}
          selectedValue={0}
          width={'100%'}
          style={{
            pointerEvents: 'all'
          }}
          styleWrap={{
            border: touched?.count && errors?.count ? '1px solid #ff0000' : '1px solid var(--border-select-color)',
          }}
          onBlur={handleBlur}
          name={'count'}
          helptext={touched?.count && errors?.count}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={(value) => {
            setFieldValue('count', value, true)
            handlerChangeOptionsData({
              key: 'count',
              value: value,
              buttonForm: handleSubmit
            })
          }}
        />
        <Offset mb={32} />

        <Button
          onClick={() => {
            resetDataForm(setFieldValue, initValueAggrigate);
            handlerChangeOptionsData({ key: null, value: null, type: 'aggrigate' })
          }
          }
          style={{
            color: 'var(--text-color-red)',
            pointerEvents: 'all',
            textAlign: 'justify'
          }}
        >
          Сбросить
        </Button>
        <Offset mb={24} />

      </>
  )
}
