import React from "react";
import WrapContainerAccordion from "../Accordion/WrapContainerAccordion";
import WithAccordion from "../../HOC/WithAccordion";
import Offset from "../Offset";
import { Formik } from "formik";
import { createMarket } from "../../helpers/schemaValidations/schemaValidate";
import { messageErrorValidation } from "../../helpers/schemaValidations/messgeSchemaValidations";
import { checkEmptyDataObject, resetDataForm } from "../../helpers/utils";
import { useStoreon } from "storeon/react";
import { ACTION_SET_CONTROLL_BUTTON } from "../../store/helpers/helpers-store";
import WrapContainer from "../WrapContainer/WrapContainer";
import FormInputCommonInfoTabs from "./Detail/FormInputCommonInfoTabs";
import NavigationSelectRequest from "../Navigation/NavigationMyApplication/NavigationSelectRequest";
import FormInputAboutTCTabs from "./Detail/FormInputAboutTCTabs";
import FormInputAboutTCDescTabs from "./Detail/FormInputAboutTCDescTabs";
import FormInputAddfileTabs from "./Detail/FormInputAddfileTabs";
import WrapContainerPreloader from "../Preloaders/WrapContainerPreloader";
import Preloader from "../Preloaders/Preloader";

function MarketCardTabs({
  isEdit,
  citys,
  brands,
  models,
  values,
  countrys,
  action_tab,
  generations,
  listSectionTabs,
  handlerDeleteImage,
  listOptionsCategory,
  handlerChangeSection,
  handlerChangeOptionsData,
}) {
  // this create and edit
  const { dispatch } = useStoreon();
  if (isEdit && checkEmptyDataObject(values))
    return (
      <WrapContainerPreloader>
        Загрузка ... <Preloader />
        <Offset mb={30} />
      </WrapContainerPreloader>
    );
  return (
    <WrapContainer>
      <Offset mt={15} />

      <NavigationSelectRequest
        sections={4}
        handlerChangeSection={handlerChangeSection}
        listSection={listSectionTabs}
      />
      <Offset mb={15} />

      <Formik
        initialValues={values}
        validationSchema={createMarket(messageErrorValidation)}
        handleChange={handlerChangeOptionsData}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({
          values,
          errors,
          resetForm,
          handleSubmit,
          touched,
          validateField,
          handleBlur,
          handleReset,
          setFieldValue,
          setFieldError,
        }) => {
          dispatch(ACTION_SET_CONTROLL_BUTTON, { buttonForm: handleSubmit });
          return (
            <WrapContainerAccordion>
              {action_tab === listSectionTabs[0].type ? (
                <FormInputCommonInfoTabs // Общяя инф
                  citys={citys}
                  isEdit={isEdit}
                  countrys={countrys}
                  handlerChangeOptionsData={handlerChangeOptionsData}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                  resetDataForm={resetDataForm}
                  dispatch={dispatch}
                />
              ) : action_tab === listSectionTabs[1].type ? (
                <FormInputAboutTCTabs //Применимость
                  brands={brands}
                  models={models}
                  generations={generations}
                  listOptionsCategory={listOptionsCategory}
                  handlerChangeOptionsData={handlerChangeOptionsData}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                  resetDataForm={resetDataForm}
                />
              ) : action_tab === listSectionTabs[2].type ? (
                <FormInputAboutTCDescTabs // Подробности
                  handlerChangeOptionsData={handlerChangeOptionsData}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                  resetDataForm={resetDataForm}
                  dispatch={dispatch}
                />
              ) : action_tab === listSectionTabs[3].type ? (
                <FormInputAddfileTabs
                  values={values}
                  handlerDeleteImage={handlerDeleteImage}
                  handlerChangeOptionsData={handlerChangeOptionsData}
                  setFieldError={setFieldError}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              ) : null}
            </WrapContainerAccordion>
          );
        }}
      </Formik>
    </WrapContainer>
  );
}

export default WithAccordion(MarketCardTabs);
