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
import OptionSelect from "../../../View/Select/OptionSelect/OptionSelect";
import { handlerChangeDataRequest } from "../../../helpers/utils";
import React from "react";
import TooltipComponent from "../../../Components/Component.Tooltip/TooltipComponent";
import WithTooltip from "../../../HOC/WithTooltip";
import { delay } from "../../../helpers/const";

const SellCarForSpareRequest = ({
  tooltip,
  dispatch,
  dataRequst,
  handlerChangeData,
  handlerShowTooltip,
  handlerChangeDataValues,
}) => {
  if (!dataRequst.length) return;
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
                <Label style={{ fontWeight: 700 }}>
                  {"sell_car.label_brand_car"}
                </Label>
                <Offset mt={10} />
                <OptionSelect
                  data={values.optionsBrand}
                  placeholder={"sell_car.placeholder_brand_car"}
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
                    // changeState();
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
                  <Label style={{ fontWeight: 700 }}>
                    {"sell_car.label_model_car"}
                  </Label>
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
                      placeholder={"sell_car.placeholder_model_car"}
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
                    {"sell_car.label_generation_car"}
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
                      placeholder={"sell_car.placeholder_generation_car"}
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
                        // setErrors({ ...errors, generation_id: "" });
                      }}
                    />
                  </TooltipComponent>
                </React.Fragment>
                <Offset mt={15} />
                <Label style={{ fontWeight: 700 }}>
                  {"sell_car.label_adv"}
                </Label>
                <Offset mt={10} />
                <div>
                  <TextArea
                    className={"textarea-application"}
                    value={values.text}
                    placeholder={"sell_car.placeholder_adv"}
                    height={90}
                    distationtop={290}
                    id={`textarea-1`}
                    name={"text"}
                    onBlur={handleBlur}
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
export default WithWrapContainer(WithTooltip(SellCarForSpareRequest));