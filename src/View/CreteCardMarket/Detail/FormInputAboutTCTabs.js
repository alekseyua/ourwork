import React, { useEffect, useState } from 'react'
import Offset from '../../Offset';
import Label from '../../Label/Label';
import NativeSelect from '../../Select/NativeSelect/NativeSelect';
import Button from '../../Button/Button';
import { getTitleFilters } from '../../../helpers/helpers';
import WrapTwoColumnGrid from '../../Blocks/WrapTwoColumnGrid';
import WrapRowGrid from '../../Blocks/WrapRowGrid';
import { checkErrorForm } from '../../../helpers/utils';
import WrapPaddingContainer from '../../WrapContainer/WrapPaddingContainer';

export default function FormInputAboutTCTabs({
  values,

  brands,
  models,
  generations,
  listOptionsCategory,
  
  handlerChangeOptionsData,

  errors,
  touched,
  handleBlur,
  handleSubmit,
  setFieldValue,
  resetDataForm,
}) {

  const [isHasErrorForm, setIsHasErrorForm] = useState(false)
  const initValueAggrigate = [
    { key: 'brand_id', value: '' },
    { key: 'model_id', value: '' },
    { key: 'generation_id', value: '' },
    { key: 'category_id', value: '' },
  ];

  useEffect(() => {
    setIsHasErrorForm(checkErrorForm(errors, initValueAggrigate));
    setTimeout(() => setIsHasErrorForm(false), 1500)
  }, [errors, touched])

  return (
      <WrapPaddingContainer>
        <Offset mb={12} />

        <WrapTwoColumnGrid
          style={{ gap: 10 }}
        >
          <WrapRowGrid>
            <Label style={{ fontWeight: 500 }}>{'Марка'}</Label>
            <NativeSelect
              data={brands}
              height={42}
              enabled={true}
              placeholder={ values?.brand_id && brands.length? getTitleFilters(values.brand_id, brands) : values?.brand? values.brand : null ?? 'Любая'}
              selectedValue={0}
              width={'100%'}
              style={{
                pointerEvents: 'all',
              }}
              styleWrap={{
                border: touched?.brand_id && errors?.brand_id ? '1px solid #ff0000' : '1px solid var(--border-select-color)'
              }}
              name={'brand_id'}
              onBlur={handleBlur}
              helptext={touched?.brand_id && errors?.brand_id}
              stylehelptext={{
                color: 'var(--text-color-red)'
              }}
              onChange={(value) => {
                setFieldValue('brand_id', value, true)
                handlerChangeOptionsData({
                  key: 'brand_id',
                  value: value,
                  buttonForm: handleSubmit
                })
              }}
            />
          </WrapRowGrid>

          <WrapRowGrid>
            <Label style={{ fontWeight: 500 }}>{'Модель'}</Label>
            <NativeSelect
              data={models}
              height={42}
              enabled={!!values?.brand_id}
              placeholder={ values?.model_id && models.length? getTitleFilters(values.model_id, models): values?.model? values.model : null ?? 'Любая'}
              selectedValue={0}
              width={'100%'}
              style={{
                pointerEvents: 'all'
              }}
              styleWrap={{
                border: touched?.model_id && errors?.model_id ? '1px solid #ff0000' : !!values?.brand_id ? '1px solid var(--border-select-color)' : '1px solid var(--border-color)'
              }}
              name={'model_id'}
              onBlur={handleBlur}
              helptext={touched?.model_id && errors?.model_id}
              stylehelptext={{
                color: 'var(--text-color-red)'
              }}
              onChange={(value) => {
                setFieldValue('model_id', value, true)

                handlerChangeOptionsData({
                  key: 'model_id',
                  value: value,
                  buttonForm: handleSubmit
                })
              }}
            />
          </WrapRowGrid>
        </WrapTwoColumnGrid>

        <Offset mb={15} />
        <Label style={{ fontWeight: 500 }}>{'Поколение'}</Label>
        <Offset mb={3} />
        <NativeSelect
          data={generations}
          height={42}
          enabled={!!values?.model_id}
          placeholder={ values?.generation_id && generations.length? getTitleFilters(values.generation_id, generations): values?.generation? values.generation : null ?? 'Любое'}
          selectedValue={0}
          width={'100%'}
          style={{
            pointerEvents: 'all'
          }}
          styleWrap={{
            border: touched?.generation_id && errors?.generation_id ? '1px solid #ff0000' : !!values?.model_id ? '1px solid var(--border-select-color)' : '1px solid var(--border-color)'
          }}
          name={'generation_id'}
          onBlur={handleBlur}
          helptext={touched?.generation_id && errors?.generation_id}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={(value) => {
            setFieldValue('generation_id', value, true)

            handlerChangeOptionsData({
              key: 'generation_id',
              value: value,
              buttonForm: handleSubmit
            })
          }}
        />
        <Offset mb={14} />
        <Label style={{ fontWeight: 500 }}>{'Категория'}</Label>
        <Offset mb={4} />
        <NativeSelect
          data={listOptionsCategory}
          height={42}
          enabled={true}
          placeholder={getTitleFilters(values.category_id, listOptionsCategory) ?? 'Любое'}
          selectedValue={0}

          width={'100%'}
          style={{
            pointerEvents: 'all'
          }}
          styleWrap={{
            border: touched?.category_id && errors?.category_id ? '1px solid #ff0000' : '1px solid var(--border-select-color)'
          }}
          name={'category_id'}
          onBlur={handleBlur}
          helptext={touched?.category_id && errors?.category_id}
          stylehelptext={{
            color: 'var(--text-color-red)'
          }}
          onChange={(value) => {
            setFieldValue('category_id', value, true)

            handlerChangeOptionsData({
              key: 'category_id',
              value: value,
              buttonForm: handleSubmit
            })
          }}
        />
        <Offset mb={32} />

        <Button
          onClick={() => {
            resetDataForm(setFieldValue, initValueAggrigate);
            setFieldValue('brand_id', null)
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

      </WrapPaddingContainer>
  )
}
