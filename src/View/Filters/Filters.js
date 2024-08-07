import React, { useId } from 'react';
import styles from './styles/filter.module.scss'
import { getOptionsFiltersMP, getTitleFilters } from '../../helpers/helpers';
import Label from '../Label/Label';
import Button from '../Button/Button';
import NativeSelect from '../Select/NativeSelect/NativeSelect';
import WrapTwoColumnGrid from '../Blocks/WrapTwoColumnGrid';
import WrapRowGrid from '../Blocks/WrapRowGrid';
import Offset from '../Offset';
import Input from '../Input/Input';

import Icon from '../Icon/Icon';
import { cross, settingRedRotation } from '../../images';
import {View } from 'react-native-web';
import Form from '../Form/Form';
import WrapContainer from '../WrapContainer/WrapContainer';

function Filters({
  handlerChangeFilters,
  handlerResetFilters,
  listOptionsCategory,
  listOptionsLowHigh,
  listOptionsCountry,
  handlerShowFilters,
  listOptionsAuto,
  countCards,
  isLoading,
  option,

  heightBlockInput
}) {
  const formId = useId();
  const selectBrandId = useId();
  const selectModelId = useId();
  const selectGenerationId = useId();
  const selectCategoryId = useId();
  const selectCauntryId = useId();
  const selectCityId = useId();
  const inputPriceId = useId();
  const selectSortId = useId();

  
  return (
    <>
      <Offset mb={10} />
      <WrapContainer
        style={{
          padding: 20,
          backgroundColor: 'var(--background-color-block)',
          borderRadius: 14,
          // top: -65,
          zIndex: 9999999,
        }}
      >
        <View>
          <div
            className={styles['filter__container-controller-top']}
          >
            <div
              className={styles['filter__item-top-controller']}
            >
              <Button
                onClick={() => handlerShowFilters(false)}
              >
                <Icon
                  image={cross}
                  width={14}
                  height={14}
                />
              </Button>
            </div>
            <div
              className={styles['filter__item-top-controller']}
            >
              Параметры
            </div>
            <div
              className={styles['filter__item-top-controller']}
            >
              <Button
                style={{ color: 'var(--text-color-red)', fontSize: 12, fontWeight: 600, top: 0 }}
                onClick={handlerResetFilters}
              >
                Сбросить
              </Button>
            </div>
          </div>
          <Form id={formId}>
            <Offset mb={10} />
            <Label htmlFor={inputPriceId} style={{ fontWeight: 500 }}>Цена</Label>
            <Offset mb={5} />
            <WrapTwoColumnGrid
              style={{ gap: 10 }}
            >
              <WrapRowGrid>
                <Input
                  value={option?.price_from ?? ''}
                  placeholder={'От  50 000'}
                  // height={changeDimentionheight(40)}
                  height={heightBlockInput}
                  id={inputPriceId}
                  onChange={e => {
                    const value = e.target.value;
                    handlerChangeFilters({
                      key: 'price_from',
                      id: value
                    })
                  }}
                />
              </WrapRowGrid>
              <WrapRowGrid>
                <Input
                  height={heightBlockInput}
                  // height={40}
                  value={option?.price_to ?? ''}
                  placeholder={'До  1 000 000'}
                  onChange={e => {
                    const value = e.target.value;
                    handlerChangeFilters({
                      key: 'price_to',
                      id: value
                    })
                  }}
                />
              </WrapRowGrid>
            </WrapTwoColumnGrid>
            <div
              className={styles['filter__container-location']}
            >
              <Label htmlFor={selectCauntryId} style={{ fontWeight: 500 }}>Страна</Label>
              <Offset mb={6} />
              <NativeSelect
                data={getOptionsFiltersMP(listOptionsCountry.countrys)}
                height={heightBlockInput}
                id={selectCauntryId}
                enabled={true}
                placeholder={(option?.country && getTitleFilters(option.country, getOptionsFiltersMP(listOptionsCountry.countrys))) ?? 'Все'}
                selectedValue={0}
                width={'100%'}
                onChange={(value) => {
                  handlerChangeFilters({
                    key: 'country',
                    value: value
                  })
                }}
              />
              <Offset mb={10} />
              <Label htmlFor={selectCityId} style={{ fontWeight: 500 }}>Город</Label>
              <Offset mb={6} />
              <NativeSelect
                data={(listOptionsCountry?.citys && getOptionsFiltersMP(listOptionsCountry.citys)) ?? []}
                height={heightBlockInput}
                enabled={!!option?.country}
                placeholder={(option?.city && getTitleFilters(option?.city, getOptionsFiltersMP(listOptionsCountry?.citys))) ?? 'Все'}
                selectedValue={0}
                width={'100%'}
                onChange={value => {
                  handlerChangeFilters({
                    key: 'city',
                    value: value
                  })
                }}
              />
            </div>
            <Offset mb={14} />
            <div
              className={styles['filter__container-car']}
            >
              <WrapTwoColumnGrid
                style={{ gap: 10 }}
              >
                <WrapRowGrid>
                  <Label htmlFor={selectBrandId} style={{ fontWeight: 500 }}>Марка</Label>
                  <NativeSelect
                    data={getOptionsFiltersMP(listOptionsAuto.brands)}
                    height={heightBlockInput}
                    id={selectBrandId}
                    enabled={true}
                    placeholder={getTitleFilters(option.brand, getOptionsFiltersMP(listOptionsAuto.brands)) ?? 'Все'}
                    selectedValue={0}
                    width={'100%'}
                    onChange={(value) => {
                      handlerChangeFilters({
                        key: 'brand',
                        value: value
                      })
                    }}
                  />
                </WrapRowGrid>
                <WrapRowGrid>
                  <Label htmlFor={selectModelId} style={{ fontWeight: 500 }}>Модель</Label>
                  <NativeSelect
                    data={(listOptionsAuto?.models && getOptionsFiltersMP(listOptionsAuto.models)) ?? []}
                    height={heightBlockInput}
                    id={selectModelId}
                    enabled={!!option?.brand}
                    placeholder={getTitleFilters(option.model, getOptionsFiltersMP(listOptionsAuto.models)) ?? 'Все'}
                    selectedValue={0}
                    width={'100%'}
                    onChange={(value) => {
                      handlerChangeFilters({
                        key: 'model',
                        value: value
                      })
                    }}
                  />
                </WrapRowGrid>
              </WrapTwoColumnGrid>
              <Offset mb={9} />
              <Label htmlFor={selectGenerationId} style={{ fontWeight: 500 }}>Поколение </Label>
              <Offset mb={3} />
              <NativeSelect
                data={(listOptionsAuto?.generations && getOptionsFiltersMP(listOptionsAuto.generations)) ?? []}
                height={heightBlockInput}
                id={selectGenerationId}
                enabled={!!option?.model}
                placeholder={getTitleFilters(option.generation, getOptionsFiltersMP(listOptionsAuto.generations)) ?? 'Любое'}
                selectedValue={0}
                width={'100%'}
                onChange={(value) => {
                  handlerChangeFilters({
                    key: 'generation',
                    value: value
                  })
                }}
              />
            </div>

            <Offset mb={9} />
            <Label htmlFor={selectCategoryId} style={{ fontWeight: 500 }}>Категории</Label>
            <Offset mb={5} />
            <NativeSelect
              data={getOptionsFiltersMP(listOptionsCategory)}
              height={heightBlockInput}
              id={selectCategoryId}
              enabled={true}
              placeholder={(option?.category && getTitleFilters(option.category, getOptionsFiltersMP(listOptionsCategory))) ?? 'Все'}
              selectedValue={0}
              // width={'100%'}
              onChange={(value) => {
                handlerChangeFilters({
                  key: 'category',
                  value: value
                })
              }}
            />


            {/* <div
            className={styles['filter__container-car']}
          >
            <Offset mb={14} />
            <Label htmlFor={selectSortId} style={{ fontWeight: 500 }}>Сортироваь по</Label>
            <Offset mb={5} />
            <NativeSelect
              data={getOptionsFiltersMP(listOptionsLowHigh.lowHigh.filter(el => +el.id !== +option.optinsFastFilter))}
              height={42}
              id={selectSortId}
              enabled={true}
              placeholder={(option?.optinsFastFilter && listOptionsLowHigh?.lowHigh.filter(el => +el.id === +option.optinsFastFilter)[0].name) ?? 'Сортировка: по умол...'}
              selectedValue={0}
              width={'100%'}
              onChange={(value) => {
                handlerChangeFilters({
                  key: listOptionsLowHigh.lowHigh.filter(el => +el.id === +value)[0].key,
                  id: true,
                  value
                })
              }}
            />
          </div> */}

            <Offset mb={24} />

            <Button
              addClass={'button__controll--red--full'}
              form={formId}
              style={{
                borderRadius: 12,
                fontSize: 14
              }}
              onClick={() => handlerShowFilters(false)}
              disabled={isLoading || !countCards}
            >
              {
                isLoading ? 'Поиск объявлений' : !!countCards ? `Показать ${countCards} объявлений` : `Найдено ${countCards} объявлений`
              }
              {
                isLoading ?
                  <Icon
                    image={settingRedRotation}
                    width={20}
                    height={20}
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 15,
                    }}
                  />
                  : null
              }
              {/* {
              && <Preloader
                style={{
                  position: 'absolute',
                  right: '0'
                }}
              />
            } */}

            </Button>
          </Form>
        </View>
      </WrapContainer>
    </>
  )
}

export default Filters;