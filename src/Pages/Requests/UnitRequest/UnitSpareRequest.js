import { Form, Formik } from 'formik';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Label from '../../../View/Label/Label';
import Offset from '../../../View/Offset';
import TextArea from '../../../View/TextArea/TextArea';
import WithWrapContainer from '../../../HOC/WithWrapContainer';
import { addFile} from '../../../images';
import FormUploadImage from '../../../View/UploadImage/FormUploadImage';
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations';
import { aggrigateSchema } from '../../../helpers/schemaValidations/schemaValidate';
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import { getLocaleStore, handlerChangeDataRequest, setLocaleStore } from '../../../helpers/utils';
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import WithTooltip from '../../../HOC/WithTooltip';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';
import restrictionLengthText, { getOptionsListPhone } from "../../../helpers/helpers";
import Input from '../../../View/Input/Input';
import FormInputContainer from '../../../View/FormInput/FormInputContainer';
import { delay } from '../../../helpers/const';
import React from 'react';
import SearchSectionWithOfferContainer from '../../../Components/SearchSectionWithOffer/SearchSectionWithOfferContainer';
import OptionSelect from '../../../View/Select/OptionSelect/OptionSelect';

const UnitSpareRequest = ({
  edit,
  tooltip,
  dispatch,
  dataRequst,
  valuesUnitSpare,
  handlerChangeData,
  handlerShowTooltip,
  dataCurrentRequest = {},
  handlerChangeDataValues,
  listPhons,
  handlerDeleteImage = () => {},
  onClickInside = () => {},
  onClickOutside = () => {},
  changeState = () => {},
}) => {
  if ((!edit && !dataRequst?.length)) {
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
          console.log({values})
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
                    placeholder={"request.placeholder_discribe_request"}
                    height={90}
                    label={"request.what_you_find"}
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
                    placeholder={"request.placeholder_oem"}
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
              <Label style={{ fontWeight: 700 }}>{"Марка авто"}</Label>
              <Offset mt={10} />
              <OptionSelect
                data={values.optionsBrand}
                placeholder={"request.placeholder_brand_car"}
                enabled={true}
                name={"brand_id"}
                onBlur={handleBlur}
                helptext={touched?.brand_id && errors?.brand_id}
                stylehelptext={{
                  color: "var(--text-color-red)",
                }}
                onChange={({ value }) => {
                  const type = "model";
                  setFieldValue("brand_id", value);
                  setFieldValue("generation_id", "");
                  setFieldValue("model_id", "");
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
                }}
              />
              <React.Fragment>
                <Offset mt={16} />
                <Label style={{ fontWeight: 700 }}>{"Модель авто"}</Label>
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
                  <OptionSelect
                    data={values.optionsModel}
                    enabled={!!values.brand_id}
                    placeholder={"request.placeholder_model_car"}
                    name={"model_id"}
                    helptext={touched?.model_id && errors?.model_id}
                    // clearValue={setTimeout(()=>true,1000)}
                    clearValue={!values.model_id}
                    stylehelptext={{
                      color: "var(--text-color-red)",
                    }}
                    onChange={({ value }) => {
                      if (!values.brand_id) return;
                      const type = "generation";
                      setFieldValue("model_id", value);
                      setFieldValue("generation_id", "");
                      handlerChangeData({
                        type,
                        model_id: value,
                        brand_id: values.brand_id,
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

              <React.Fragment>
                <Offset mt={18} />

                <Label style={{ fontWeight: 700 }}>
                  {"request.label_generation_car"}
                </Label>
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
                  <OptionSelect
                    data={values.optionsGeneration}
                    enabled={!!values.model_id}
                    clearValue={!values.generation_id}
                    placeholder={"request.placeholder_generation_car"}
                    name={"generation_id"}
                    helptext={touched?.generation_id && errors?.generation_id}
                    stylehelptext={{
                      color: "var(--text-color-red)",
                    }}
                    onChange={async ({ value }) => {
                      setFieldValue("generation_id", value);
                      handlerChangeDataValues({
                        brand_id: values.brand_id,
                        model_id: values.model_id,
                        generation_id: value,
                      });
                      await delay(500);
                      setErrors({ ...errors, generation_id: "" });
                    }}
                  />
                </TooltipComponent>
              </React.Fragment>

              <Offset mt={15} />
              <Label style={{ fontWeight: 700 }}>{"request.label_phone"}</Label>
              <div>
                <SearchSectionWithOfferContainer
                  data={getOptionsListPhone(listPhons) ?? []}
                  textToolTip={""}
                  value={values.phone_number}
                  // showList
                  type={"number"}
                  isIconLeft={false}
                  name={"phone"}
                  placeholder={"+3 (80) 000-00-00"}
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
              <FormUploadImage
                multiple
                src={addFile}
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
