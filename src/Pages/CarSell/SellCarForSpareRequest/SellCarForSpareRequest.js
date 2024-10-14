import { Form, Formik } from "formik";
import WrapContainer from "../../../View/WrapContainer/WrapContainer";
import Label from "../../../View/Label/Label";
import Offset from "../../../View/Offset";
import TextArea from "../../../View/TextArea/TextArea";
import WithWrapContainer from "../../../HOC/WithWrapContainer";
import { addFile } from "../../../images";
import FormUploadImage from "../../../View/UploadImage/FormUploadImage";
import { ACTION_SET_CONTROLL_BUTTON } from "../../../store/helpers/helpers-store";
import restrictionLengthText from "../../../helpers/helpers";

const SellCarForSpareRequest = ({
  dispatch,
  handlerChangeDataValues,
  dataRequst,
}) => {
  return (
    <WrapContainer>
      <Formik
        initialValues={{
          optionsBrand: dataRequst,
          optionsModel: [],
          optionsGeneration: [],
          brand_id: "",
          model_id: "",
          generation_id: "",
          text: "",
          image: null,
          phone_number: null,
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
              <Offset mt={15} />
              <Label style={{ fontWeight: 700 }}>Текст объявления</Label>
              <Offset mt={10} />
              <div>
                <TextArea
                  className={"textarea-application"}
                  value={values.text}
                  placeholder={`Опишите объявление`}
                  height={90}
                  distationtop={290}
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
              <Offset mt={18} />
              <FormUploadImage
                multiple
                src={addFile}
                values={values}
                setFieldValue={setFieldValue}
                maxCountImage={8}
                maxSizeImage={5242880} // 5242880 => 5mb
                uploadTypeName="image"
                positionPreview={"under"}
                onChange={({ key, value, callback }) => {
                  handlerChangeDataValues({ [key]: value });
                }}
              />
              {/* <Offset mt={values?.image?.length ? 38 : 18} /> */}
              <Offset mt={values?.image?.length ? 38 : 10} />
            </Form>
          );
        }}
      </Formik>
      <Offset mt={15} />
    </WrapContainer>
  );
};
export default WithWrapContainer(SellCarForSpareRequest);