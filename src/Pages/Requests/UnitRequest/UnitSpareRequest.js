import { Form, Formik } from 'formik';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Label from '../../../View/Label/Label';
import NativeSelect from '../../../View/Select/NativeSelect/NativeSelect';
import Offset from '../../../View/Offset';
import TextArea from '../../../View/TextArea/TextArea';
import WithWrapContainer from '../../../HOC/WithWrapContainer';
import { addFile, listRemove, plus, 
  // listRemove
 } from '../../../images';
import FormUploadImageV2 from '../../../View/UploadImage/FormUploadImageV2';
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations';
import { aggrigateSchema } from '../../../helpers/schemaValidations/schemaValidate';
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import { autoFocusFormInput, getLocaleStore, handlerChangeDataRequest, removeFocusFormInput, setLocaleStore } from '../../../helpers/utils';
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import WithTooltip from '../../../HOC/WithTooltip';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';
import restrictionLengthText, { getOptionsListPhone } from "../../../helpers/helpers";
import Input from '../../../View/Input/Input';
import FormInputContainer from '../../../View/FormInput/FormInputContainer';
import Icon from '../../../View/Icon/Icon';
import WrapTwoColumnGrid from '../../../View/Blocks/WrapTwoColumnGrid';
import WrapRowGrid from '../../../View/Blocks/WrapRowGrid';
import { delay } from '../../../helpers/const';
import ButtonMore from '../../../View/ButtonMore/ButtonMore';
import CardOEM from '../../../View/Cards/CardOEM/CardOEM';
import React from 'react';
import ButtonHide from '../../../View/ButtonHide/ButtonHide';
import PhoneContainer from '../../../View/PhoneContainer/PhoneContainer';
import Phone from 'react-phone-number-input/input';
import SearchSectionWithOfferContainer from '../../../Components/SearchSectionWithOffer/SearchSectionWithOfferContainer';

const UnitSpareRequest = ({
  edit,
  member,
  tooltip,
  dispatch,
  dataRequst,
  listClasses,
  isShowHide,
  valuesUnitSpare,
  prepareProducts,
  isAddMultiData,
  handlerChangeData,
  handlerShowTooltip,
  dataCurrentRequest = {},
  handlerChangeDataValues,
  listPhons,
  
  handlerMorePrepare = () => {},
  handlerDeleteImage = () => {},
  handlerShowHide = () => {},
  onClickInside = () => {},
  onClickOutside = () => {},
  handlerAddClasses = () => {},
  deleteClasses = () => {},
  changeState = () => {},
}) => {
  if (!edit && !dataRequst?.length) {
    return (
      <WrapContainerPreloader>
        Загрузка ... <Preloader /> <Offset mb={30} />{" "}
      </WrapContainerPreloader>
    );
  }
  if (edit && !Object.keys(dataCurrentRequest).length) {
    return (
      <WrapContainerPreloader>
        Загрузка ... <Preloader /> <Offset mb={30} />{" "}
      </WrapContainerPreloader>
    );
  }
  // console.log({ ...dataCurrentRequest });
  return (
    <WrapContainer>
      <Formik
        validationSchema={aggrigateSchema(messageErrorValidation)}
        initialValues={{
          optionsBrand: dataRequst,
          optionsModel: JSON.parse(getLocaleStore("optionsModel")) ?? [],
          optionsGeneration:
            JSON.parse(getLocaleStore("optionsGeneration")) ?? [],
          type: "unit",
          brand_id: valuesUnitSpare?.brand_id ?? "",
          model_id: valuesUnitSpare?.model_id ?? "",
          generation_id: valuesUnitSpare?.generation_id ?? "",
          classes:
            // listClasses={this.props.valuesUnitSpare?.classes ?? []}
            dataCurrentRequest?.classes ?? valuesUnitSpare?.classes ?? [], //
          text: dataCurrentRequest?.text ?? valuesUnitSpare?.text ?? "",
          image: dataCurrentRequest?.image ?? valuesUnitSpare?.image ?? null,
          oem: dataCurrentRequest?.oem ?? valuesUnitSpare?.oem ?? "",
          phone_number:
            dataCurrentRequest?.phone_number ??
            valuesUnitSpare?.phone_number ??
            null,
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          touched,
          handleBlur,
          setFieldValue,
          setErrors,
        }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, {
            buttonForm: !edit ? handleSubmit : () => {},
          });
          const handlerBlur = (e) => {
            handleBlur(e);
          };
          // console.log({values})
          return (
            <Form data-type="wrap-input">
              <Offset mt={15} />
              {/* <Label style={{ fontWeight: 700 }}>Что вы ищете</Label> */}
              <div
                style={{
                  padding: 0,
                  width: `100%`,
                  transition: `all .5s`,
                }}
              >
                <div>
                  <TextArea
                    className={"textarea-application"}
                    value={values.text}
                    placeholder={`Опишите ваш запрос.\nВ тексте укажите город`}
                    height={90}
                    label={"Что вы ищете"}
                    // isUpblockDesktop={true}
                    isUpblock={true}
                    topFormInput={73}
                    distationtop={290}
                    id={`textarea-1`}
                    name={"text"}
                    onClickInside={onClickInside}
                    onClickOutside={onClickOutside}
                    onBlur={handlerBlur}
                    helptext={touched?.text && errors?.text}
                    style={{
                      border:
                        touched?.text && errors?.text
                          ? "1px solid #ff0000"
                          : "",
                    }}
                    stylehelptext={{
                      color: "var(--text-color-red)",
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      const restrict = restrictionLengthText(
                        value,
                        4096,
                        dispatch
                      );
                      if (!restrict) return;
                      setFieldValue("text", value);
                      handlerChangeDataValues({ text: value });
                    }}
                    styleLabel={{
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>
              {/* OEM\VIN */}
              <Offset mb={14} />
              <div>
                <FormInputContainer
                  style={{
                    padding: 0,
                    width: `100%`,
                    top: 0,
                  }}
                >
                  {/* <Label style={{ fontWeight: 500 }}>OEM\VIN</Label>
                <Offset mb={7} /> */}
                  <Input
                    value={values.oem}
                    isUpblockDesktop={true}
                    isUpblock={true}
                    placeholder={"Введите OEM или VIN"}
                    name={"oem"}
                    height={50}
                    label={"OEM\\VIN"}
                    widthFormInput={`calc(100% - 38px)`}
                    topFormInput={70}
                    onChange={(e) => {
                      const value = e.target.value;
                      const key = e.target.name;
                      setFieldValue([key], value);
                      handlerChangeDataValues({ oem: value });
                      setLocaleStore("oem", value);
                    }}
                    styleLabel={{
                      fontWeight: 700,
                    }}
                    onClickInside={onClickInside}
                    onClickOutside={onClickOutside}
                  />
                </FormInputContainer>
              </div>
              <Offset mt={10} />
              {
                // показать список карточек
                // добавить кнопку скрыть
                // добавить кнопку показать ещё (ok)
                !!prepareProducts?.count ? (
                  <ButtonHide onClick={handlerShowHide} isShow={isShowHide} />
                ) : null
              }
              {isShowHide && !!prepareProducts?.count ? (
                <React.Fragment>
                  <CardOEM list={prepareProducts.results} />
                  <Offset mt={10} />
                </React.Fragment>
              ) : null}
              {isShowHide &&
              prepareProducts?.count > 4 &&
              prepareProducts?.count !== prepareProducts.results.length ? (
                <React.Fragment>
                  <ButtonMore
                    currentPage={prepareProducts.current_page}
                    countCards={prepareProducts?.count}
                    onClick={handlerMorePrepare}
                  />
                  <Offset mt={18} />
                </React.Fragment>
              ) : null}
              <Label style={{ fontWeight: 700 }}>Марка авто</Label>
              <Offset mt={10} />
              <NativeSelect
                data={values.optionsBrand}
                enabled={true}
                selectedValue={values.brand_id}
                placeholder={dataCurrentRequest?.brand ?? "Выберите марку авто"}
                onBlur={handleBlur}
                name={"brand_id"}
                styleWrap={{
                  border:
                    touched?.brand_id && errors?.brand_id
                      ? "1px solid #ff0000"
                      : "1px solid var(--border-select-color)",
                }}
                helptext={touched?.brand_id && errors?.brand_id}
                stylehelptext={{
                  color: "var(--text-color-red)",
                }}
                onChange={(value) => {
                  const type = "model";
                  setFieldValue("brand_id", value);
                  setFieldValue("generation_id", "");
                  setFieldValue("model_id", "");
                  setFieldValue("classes", []);
                  changeState();
                  handlerChangeData({
                    type,
                    brand_id: value,
                    handlerChangeDataRequest: (res) => {
                      const copyData = res.slice();
                      return handlerChangeDataRequest({
                        setFieldValue,
                        results: copyData,
                        type: type,
                      });
                    },
                  });
                  handlerChangeDataValues({
                    brand_id: value,
                    classes: [],
                  });
                }}
              />
              {isAddMultiData && (
                <React.Fragment>
                  <Offset mt={16} />
                  <Label style={{ fontWeight: 700 }}>Модель авто</Label>
                  <Offset mt={8} />
                  <TooltipComponent
                    onClick={(e) =>
                      !values.brand_id &&
                      handlerShowTooltip({
                        key: "request",
                        action: "model",
                        e,
                      })
                    }
                    // id={useId()}
                    style={{ bottom: -10, left: -10 }}
                    message={tooltip?.request?.model?.message}
                    isShow={
                      tooltip?.request?.model && tooltip?.request?.model?.isShow
                    }
                  >
                    <NativeSelect
                      data={values.optionsModel}
                      enabled={!!values.brand_id}
                      placeholder={
                        dataCurrentRequest?.model ?? "Выберите модель авто"
                      }
                      selectedValue={values.model_id}
                      onBlur={handleBlur}
                      name={"model_id"}
                      helptext={touched?.model_id && errors?.model_id}
                      styleWrap={{
                        border:
                          touched?.model_id && errors?.model_id
                            ? "1px solid #ff0000"
                            : "1px solid var(--border-select-color)",
                      }}
                      stylehelptext={{
                        color: "var(--text-color-red)",
                      }}
                      onChange={(value) => {
                        const type = "generation";
                        setFieldValue("model_id", value);
                        setFieldValue("generation_id", "");
                        handlerChangeData({
                          type,
                          model_id: value,
                          handlerChangeDataRequest: (res) => {
                            const copyData = res.slice();
                            handlerChangeDataRequest({
                              setFieldValue,
                              results: copyData,
                              type: type,
                            });
                          },
                        });
                        handlerChangeDataValues({
                          model_id: value,
                          brand_id: values.brand_id,
                        });
                      }}
                    />
                  </TooltipComponent>
                </React.Fragment>
              )}
              {isAddMultiData && (
                <React.Fragment>
                  <Offset mt={18} />

                  <Label style={{ fontWeight: 700 }}>Год выпуска авто</Label>
                  <Offset mt={8} />
                  <TooltipComponent
                    onClick={(e) =>
                      !values.model_id &&
                      handlerShowTooltip({
                        key: "request",
                        action: "generation",
                        e,
                      })
                    }
                    // id={useId()}
                    style={{ bottom: -10, left: -10 }}
                    message={tooltip?.request?.generation?.message}
                    isShow={
                      tooltip?.request?.generation &&
                      tooltip?.request?.generation?.isShow
                    }
                  >
                    <NativeSelect
                      data={values.optionsGeneration}
                      enabled={!!values.model_id}
                      selectedValue={values.generation_id}
                      placeholder={
                        dataCurrentRequest?.generation ??
                        "Выберите год выпуска авто"
                      }
                      onBlur={handleBlur}
                      name={"generation_id"}
                      helptext={touched?.generation_id && errors?.generation_id}
                      styleWrap={{
                        border:
                          touched?.generation_id && errors?.generation_id
                            ? "1px solid #ff0000"
                            : "1px solid var(--border-select-color)",
                      }}
                      stylehelptext={{
                        color: "var(--text-color-red)",
                      }}
                      onChange={async (value) => {
                        setFieldValue("generation_id", value);
                        setFieldValue("classes", [
                          ...values.classes,
                          {
                            model_id: values.model_id,
                            generation_id: value,
                            model_name: values.optionsModel.filter(
                              (el) => el.value === +values.model_id
                            )[0]?.title,
                            generation_name: values.optionsGeneration.filter(
                              (el) => el.value === +value
                            )[0]?.title,
                          },
                        ]);
                        handlerChangeDataValues({
                          brand_id: values.brand_id,
                          model_id: value.model_id,
                          generation_id: value,

                          classes: [
                            ...values.classes,
                            {
                              model_id: values.model_id,
                              generation_id: value,
                              model_name: values.optionsModel.filter(
                                (el) => el.value === +values.model_id
                              )[0]?.title,
                              generation_name: values.optionsGeneration.filter(
                                (el) => el.value === +value
                              )[0]?.title,
                            },
                          ],
                        });
                        await delay(500);
                        setErrors({ ...errors, generation_id: "" });
                      }}
                    />
                  </TooltipComponent>
                </React.Fragment>
              )}

              {!isAddMultiData && (
                <React.Fragment>
                  <Offset mt={15} />

                  <WrapTwoColumnGrid
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <WrapRowGrid>Добавить ещё модель?</WrapRowGrid>{" "}
                    <Icon
                      image={plus}
                      onClick={() =>
                        handlerAddClasses(
                          setFieldValue,
                          dataCurrentRequest?.brand
                        )
                      }
                      style={{
                        filter: "brightness(0.4)",
                        // filter: "blur(var(--filter-blur))",
                      }}
                    />
                  </WrapTwoColumnGrid>
                  <Offset mt={15} />
                </React.Fragment>
              )}
              <Offset mt={15} />
              {values?.classes?.length
                ? values.classes.map((item, i) => {
                    return (
                      <WrapTwoColumnGrid
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <WrapRowGrid>
                          {i + 1}. {item?.model ?? item?.model_name} ---{" "}
                          {item?.generation ?? item.generation_name}{" "}
                        </WrapRowGrid>
                        <Icon
                          image={listRemove}
                          style={{
                            filter: "blur(var(--filter-blur))",
                          }}
                          onClick={() =>
                            deleteClasses(i, values, setFieldValue)
                          }
                        />
                      </WrapTwoColumnGrid>
                    );
                  })
                : null}
              <Offset mt={15} />
              <Label style={{ fontWeight: 700 }}>Телефон</Label>
              <div>
                <SearchSectionWithOfferContainer
                  data={getOptionsListPhone(listPhons) ?? []}
                  textToolTip={""}
                  value={values.phone_number}
                  // showList
                  type={"number"}
                  isIconLeft={false}
                  name={"phone"}
                  placeholder={"+7 (000) 000-00-00"}
                  onChange={(phone) => {
                    console.log({ phone });
                    setFieldValue("phone_number", phone);

                    if (phone?.length === 2) {
                      handlerChangeDataValues({
                        phone_number: null,
                      });
                    } else {
                      handlerChangeDataValues({
                        phone_number: phone,
                      });
                    }
                  }}
                  onFocus={(e) => {
                    e?.target?.select();
                  }}
                  stylehelptext={{
                    color: "var(--text-color-red)",
                  }}
                />
              </div>
              <Offset mt={2} />
              <FormUploadImageV2
                multiple
                image={addFile}
                listImages={dataCurrentRequest?.images ?? values.image ?? []}
                values={values}
                setFieldValue={setFieldValue}
                maxCountImage={8}
                maxSizeImage={5242880} // 5242880 => 5mb
                uploadTypeName="image"
                positionPreview={"under"}
                onChange={({ key, value, callback }) => {
                  handlerChangeDataValues({ [key]: value });
                }}
                handlerDeleteImage={handlerDeleteImage}
              />
              <Offset mt={values?.image?.length ? 38 : 18} />
              {dataCurrentRequest?.images?.length ? <Offset mt={18} /> : null}
            </Form>
          );
        }}
      </Formik>
    </WrapContainer>
  );
};
export default WithWrapContainer(WithTooltip(UnitSpareRequest));
