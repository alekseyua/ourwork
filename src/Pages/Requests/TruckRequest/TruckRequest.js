import { Form, Formik } from 'formik';
import WrapContainer from '../../../View/WrapContainer/WrapContainer';
import Label from '../../../View/Label/Label';
import Offset from '../../../View/Offset';
import TextArea from '../../../View/TextArea/TextArea';
import WithWrapContainer from '../../../HOC/WithWrapContainer';
import WithRouter from '../../../HOC/WithRouter';

import { addFile } from '../../../images';
import FormUploadImageV2 from '../../../View/UploadImage/FormUploadImageV2';
import { truckSchema } from '../../../helpers/schemaValidations/schemaValidate';
import { messageErrorValidation } from '../../../helpers/schemaValidations/messgeSchemaValidations';
import { ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import restrictionLengthText from '../../../helpers/helpers';
import WrapContainerPreloader from '../../../View/Preloaders/WrapContainerPreloader';
import Preloader from '../../../View/Preloaders/Preloader';

const TruckRequest = ({
  edit,
  dispatch,
  handlerChangeDataValues,
  dataCurrentRequest,
}) => {
    if (edit && !Object.keys(dataCurrentRequest).length) {
      return (
        <WrapContainerPreloader>
          Загрузка ... <Preloader /> <Offset mb={30} />{" "}
        </WrapContainerPreloader>
      );
    }
  return (
    <WrapContainer>
      <Formik
        validationSchema={truckSchema(messageErrorValidation)}
        initialValues={{
          type: "truck",
          text: dataCurrentRequest?.text ?? "",
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          touched,
          handleBlur,
          setFieldValue,
        }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, { buttonForm: handleSubmit });

          return (
            <Form>
              <Offset mt={16} />
              <Label style={{ fontWeight: 700 }}>Что вы ищете</Label>

              <Offset mt={6} />
              <div>
                <TextArea
                  className={"textarea-application"}
                  value={values.text}
                  placeholder={`Опишите ваш запрос.\nВ тексте укажите город`}
                  height={90}
                  id={`textarea-1`}
                  name={"text"}
                  onBlur={handleBlur}
                  helptext={touched?.text && errors?.text}
                  style={{
                    border:
                      touched?.text && errors?.text ? "1px solid #ff0000" : "",
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
                />
              </div>

              <Offset mt={7} />
              <FormUploadImageV2
                multiple
                image={addFile}
                listImages={dataCurrentRequest?.images ?? []}
                values={values}
                setFieldValue={setFieldValue}
                uploadTypeName="image"
                positionPreview={"under"}
                onChange={({ key, value, callback }) => {
                  handlerChangeDataValues({ [key]: value });
                }}
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
export default WithWrapContainer(WithRouter(TruckRequest));
