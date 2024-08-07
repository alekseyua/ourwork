import React from "react";
import ItemAccordionTitle from "../../Accordion/ItemAccordionTitle";
import Offset from "../../Offset";
import Label from "../../Label/Label";
import Input from "../../Input/Input";
import NativeSelect from "../../Select/NativeSelect/NativeSelect";
import Button from "../../Button/Button";
import { getTitleFilters } from "../../../helpers/helpers";
import TextArea from "../../TextArea/TextArea";
import SearchSectionWithOfferContainer from "../../../Components/SearchSectionWithOffer/SearchSectionWithOfferContainer";
import { ACTION_RESET_TEXT_SEARCH_INTERACTIVE } from "../../../store/marketplace/marketplace";
import WithTooltip from "../../../HOC/WithTooltip";
import TooltipComponent from "../../../Components/Component.Tooltip/TooltipComponent";

function FormInputCommonInfoTabs({
  tooltip,
  handlerShowTooltip,
isEdit,
  citys,
  countrys,

  handlerChangeOptionsData,

  values,
  errors,
  touched,
  handleBlur,
  handleSubmit,
  setFieldValue,
  resetDataForm,
  dispatch,
}) {
  const initValueCommonInfo = [
    { key: "title", value: "" },
    { key: "price", value: "" },
    { key: "description", value: "" },

    { key: "country_id", value: "" },
    { key: "city_id", value: "" },
  ];
  // console.log({ values });
  return (
    <>
      <ItemAccordionTitle
        style={{
          fontWeight: 700,
          pointerEvents: "none",
          fontSize: 16,
          filter: `blur(var(--filter-blur))`,
        }}
      >
        Общая информация
      </ItemAccordionTitle>
      <Offset mb={22} />
      <Label style={{ fontWeight: 500, filter: `blur(var(--filter-blur))` }}>
        {"Название"}
      </Label>
      <Offset mb={5} />
      <Input
        value={values.title}
        // disabled={!values.price}
        height={42}
        onBlur={handleBlur}
        placeholder={"Заголовок для объявления"}
        name={"title"}
        id={`title-1`}
        style={{
          pointerEvents: "all",
          minHeight: 34,
          border: touched?.title && errors?.title ? "1px solid #ff0000" : "",
          filter: `blur(var(--filter-blur))`,
          // border: '',
        }}
        helptext={touched?.title && errors?.title}
        stylehelptext={{
          color: "var(--text-color-red)",
        }}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue("title", value, true);
          handlerChangeOptionsData({
            key: "title",
            value: value,
            buttonForm: handleSubmit,
          });
        }}
      />
      <Offset mb={13} />
      <Label style={{ fontWeight: 500, filter: `blur(var(--filter-blur))` }}>
        {"Описание товара"}
      </Label>
      <Offset mb={2} />
      <TextArea
        className={"textarea-application-background"}
        value={values.description}
        placeholder={"Напишите немного о товаре"}
        height={100}
        style={{
          pointerEvents: "all",
          filter: `blur(var(--filter-blur))`,
          border:
            touched?.description && errors?.description
              ? "1px solid #ff0000"
              : "",
        }}
        id={`textarea-1`}
        name={"description"}
        onBlur={handleBlur}
        helptext={touched?.description && errors?.description}
        stylehelptext={{
          color: "var(--text-color-red)",
        }}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue("description", value, true);
          handlerChangeOptionsData({
            key: "description",
            value: value,
            buttonForm: handleSubmit,
          });
        }}
      />
      <Offset mb={12} />
      <Label style={{ fontWeight: 500, filter: `blur(var(--filter-blur))` }}>
        {"Цена"}
      </Label>
      <Offset mb={4} />
      <Input
        value={values.price}
        type={"number"}
        placeholder={"Любое"}
        height={42}
        id={`price-1`}
        style={{
          pointerEvents: "all",
          minHeight: 34,
          filter: `blur(var(--filter-blur))`,
          border: touched?.price && errors?.price ? "1px solid #ff0000" : "",
        }}
        name={"price"}
        onBlur={handleBlur}
        helptext={touched?.price && errors?.price}
        stylehelptext={{
          color: "var(--text-color-red)",
        }}
        onChange={(e) => {
          const value = e.target.value;
          setFieldValue("price", value, true);
          handlerChangeOptionsData({
            key: "price",
            value: value,
            buttonForm: handleSubmit,
          });
        }}
      />
      {/* ---------------------------- */}
      <Offset mb={12} />
      <Label
        style={{
          filter: `blur(var(--filter-blur))`,
        }}
      >
        {"Страна"}
      </Label>
      <Offset mb={5} />
      <NativeSelect
        data={countrys}
        height={42}
        enabled={true}
        placeholder={getTitleFilters(values?.country_id, countrys) ?? "Все"}
        selectedValue={0}
        width={"100%"}
        style={{
          pointerEvents: "all",
        }}
        styleWrap={{
          filter: `blur(var(--filter-blur))`,
          border:
            touched?.country_id && errors?.country_id
              ? "1px solid #ff0000"
              : "1px solid var(--border-select-color)",
        }}
        onBlur={handleBlur}
        name={"country_id"}
        helptext={touched?.country_id && errors?.country_id}
        stylehelptext={{
          color: "var(--text-color-red)",
        }}
        onChange={(value) => {
          setFieldValue("country_id", value, true);
          handlerChangeOptionsData({
            key: "country_id",
            value: value,
            buttonForm: handleSubmit,
          });
        }}
      />
      <Offset mb={12} />
      <Label
        style={{
          filter: `blur(var(--filter-blur))`,
        }}
      >
        {"Город"}
      </Label>
      <Offset mb={5} />
      {/* <TooltipComponent
        onClick={(e) =>
          isEdit?
            handlerShowTooltip({
            key: "create_edit_mp",
            action: "input_option_city",
            e,
          })
          : !!values?.country_id &&
          handlerShowTooltip({
            key: "create_edit_mp",
            action: "input_option_city",
            e,
          })
        }
        style={{ bottom: -10, left: -10 }}
        message={tooltip.create_edit_mp?.input_option_city?.message}
        isShow={
          tooltip.create_edit_mp?.input_option_city &&
          tooltip.create_edit_mp?.input_option_city?.isShow
        } 
      > */}
      <SearchSectionWithOfferContainer
        isIconLeft={true}
        data={citys}
        disabled={!!!values.country_id}
        value={values.city}
        textToolTip={'"Города с таким названием нет в списке"'}
        isCity={true}
        name={"city"}
        onChange={(value) => {
          setFieldValue("city_id", value, true);
          handlerChangeOptionsData({
            key: "city_id",
            value: value,
            buttonForm: handleSubmit,
          });
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
      {/* </TooltipComponent> */}
      <Offset mb={34} />
      <Button
        addClass={""}
        onClick={() => {
          resetDataForm(setFieldValue, initValueCommonInfo);
          dispatch(ACTION_RESET_TEXT_SEARCH_INTERACTIVE);
          handlerChangeOptionsData({ key: null, value: null, type: "country" });
        }}
        style={{
          color: "var(--text-color-red)",
          pointerEvents: "all",
          textAlign: "justify",
          filter: `blur(var(--filter-blur))`,
        }}
      >
        Сбросить
      </Button>
      <Offset mb={24} />
    </>
  );
}
export default WithTooltip(FormInputCommonInfoTabs);
