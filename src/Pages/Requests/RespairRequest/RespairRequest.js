import React from 'react';
import { Form, Formik } from 'formik';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Label from '../../../View/Label/Label';
import restrictionLengthText, { getOptions } from '../../../helpers/helpers';
import NativeSelect from '../../../View/Select/NativeSelect/NativeSelect';
import Offset from '../../../View/Offset';
import TextArea from '../../../View/TextArea/TextArea';
import WithWrapContainer from '../../../HOC/WithWrapContainer';
import { addFile } from '../../../images';
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';
import FormUploadImageV2 from '../../../View/UploadImage/FormUploadImageV2';
import { respairSchema } from '../../../helpers/schemaValidations/schemaValidate';
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations';
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import WithTooltip from '../../../HOC/WithTooltip';
import TooltipComponent from '../../../Components/Component.Tooltip/TooltipComponent';
import SearchSectionWithOfferContainer from '../../../Components/SearchSectionWithOffer/SearchSectionWithOfferContainer';

const RespairRequest = ({
  tooltip,
  dispatch,
  listCountries,
  handlerShowTooltip,
  handlerChangeDataValues,
}) => {

  if (!listCountries.length) return (<WrapContainerPreloader>Загрузка ... <Preloader /><Offset mb={30} /></WrapContainerPreloader>);

  return (
    <WrapContainer>
      <Formik
        validationSchema={respairSchema(messageErrorValidation)}
        initialValues={{
          optionsCountries: listCountries,
          optionsCities: [],
          activeCity: false,
          type: 'respair',
          country_id: null,
          city_id: null,
          text: '',
        }}
      >
        {({ values, errors, handleSubmit, touched, handleBlur, setFieldValue }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, { buttonForm: handleSubmit });
          const handlerChangeDataRequest = (data) => {
            let options = getOptions(data);
            return options;
          };

          return (
            <Form>
              <Offset mt={15} />
              <Label style={{ fontWeight: 700 }}>Ваша проблема</Label>
              <Offset mt={10} />
              <div>
                <TextArea
                  className={"textarea-application"}
                  value={values.text}
                  placeholder={`Опишите вашу проблему, в чем суть\nполомки и с чем придется работать`}
                  height={90}
                  distationtop={200}
                  id={`textarea-1`}
                  onBlur={handleBlur}
                  name={"text"}
                  style={{
                    border:
                      touched?.text && errors?.text ? "1px solid #ff0000" : "",
                  }}
                  styleWrap={{
                    border:
                      touched?.text && errors?.text
                        ? "1px solid #ff0000"
                        : "1px solid var(--border-select-color)",
                  }}
                  helptext={touched?.text && errors?.text}
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
                />
              </div>
              <Offset mt={17} />

              <Label style={{ fontWeight: 700 }}>Страна</Label>
              <Offset mt={9} />
              <NativeSelect
                data={getOptions(values.optionsCountries)}
                enabled={true}
                selectedValue={values.country_id}
                placeholder={"Выберите страну"}
                onBlur={handleBlur}
                name={"country_id"}
                styleWrap={{
                  //&& isHasErrorBlock?.country_id
                  border:
                    touched?.country_id && errors?.country_id
                      ? "1px solid #ff0000"
                      : "1px solid var(--border-select-color)",
                }}
                helptext={touched?.country_id && errors?.country_id}
                stylehelptext={{
                  color: "var(--text-color-red)",
                }}
                onChange={(value) => {
                  const sities = handlerChangeDataRequest(
                    values.optionsCountries
                      .map((el) => {
                        if (el.id === +value) return el.citys;
                      })
                      .filter((el) => el !== undefined)[0]
                  );
                  setFieldValue("country_id", value);
                  setFieldValue("optionsCities", sities);
                  setFieldValue("city_id", null);
                  handlerChangeDataValues({ country_id: value });
                }}
              />
              <Offset mt={18} />
              <Label style={{ fontWeight: 700 }}>Ваш город</Label>
              <Offset mt={8} />
              <TooltipComponent
                onClick={(e) =>
                  !!!values.optionsCities.length &&
                  handlerShowTooltip({
                    key: "request",
                    action: "city",
                    e,
                  })
                }
                style={{ bottom: -10, left: -10 }}
                message={tooltip?.request?.city?.message}
                isShow={
                  tooltip?.request?.city && tooltip?.request?.city?.isShow
                }
              >
                <SearchSectionWithOfferContainer
                  textToolTip={'"Города с таким названием нет в списке"'}
                  isCity={true}
                  isIconLeft={true}
                  data={values.optionsCities}
                  disabled={!!!values.country_id}
                  value={values.city}
                  name={"city"}
                  onChange={(value) => {
                    setFieldValue("city_id", value);
                    handlerChangeDataValues({ city_id: value });
                  }}
                  styleWrap={{
                    border:
                      touched?.city_id && errors?.city_id
                        ? "1px solid #ff0000"
                        : !!values?.country_id
                        ? "1px solid var(--border-select-color)"
                        : "1px solid var(--border-color)",
                  }}
                  helptext={touched?.city_id && errors?.city_id}
                  stylehelptext={{
                    color: "var(--text-color-red)",
                  }}
                />
              </TooltipComponent>

              <Offset mt={3} />
              <FormUploadImageV2
                multiple
                image={addFile}
                values={values}
                maxCountImage={8}
                maxSizeImage={5242880} // 5242880 => 5mb
                setFieldValue={setFieldValue}
                uploadTypeName="image"
                positionPreview={"under"}
                onChange={({ key, value, callback }) => {
                  handlerChangeDataValues({ [key]: value });
                }}
              />
            </Form>
          );
        }}
      </Formik>
      <Offset mt={37} />
    </WrapContainer>
  );
};
export default WithWrapContainer(WithTooltip(RespairRequest));
