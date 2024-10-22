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

const CarSell = ({ dispatch, handlerChangeDataValues }) => {
  return (
    <WrapContainer>
      <Formik
        initialValues={{
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
              <Label style={{ fontWeight: 700 }}>{"sell_car.label_adv"}</Label>
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
export default WithWrapContainer(CarSell);

        // <WrapContainerBlock
        //   style={{
        //     // backgroundColor: "#fde9e9",
        //     fontWeight: 600,
        //     padding: "20px 0 40px",
        //     position: "absolute",
        //     bottom: -150,
        //   }}
        // >
        //   {/* <Label style={{ fontWeight: 700 }}>Посетить группу</Label> */}
        //   <Offset mt={40} />
        //   <LinkGoTo
        //     position={"left"}
        //     url={"https://t.me/avtobayer"}
        //     fontSize={12}
        //     // color={link.color}
        //     style={{
        //       alignItems: "center",
        //       fontWeight: 600,
        //       backgroundColor: "var(--background-color-button-red)",
        //       color: "var(--text-color-white)",
        //       zIndex: 11,
        //       position: "relative",
        //       width: "100%",
        //       minHeight: 46,
        //       justifyContent: "center",
        //       borderRadius: 12
        //     }}
        //   >
        //     {/* <Icon
        //      src={cell_car}
        //       width={15}
        //       height={15}
        //       mr={5}
        //       style={{ top: -2 }}
        //     /> */}
        //     {"Посетить группу"}
        //   </LinkGoTo>
        //   {/* <div
        //     style={{
        //       backgroundColor: "#fde9e9",
        //       position: "absolute",
        //       width: "1000%",
        //       height: "100%",
        //       left: "-20%",
        //       zIndex: -1,
        //       top: 0,
        //     }}
        //   ></div> */}
        // </WrapContainerBlock>