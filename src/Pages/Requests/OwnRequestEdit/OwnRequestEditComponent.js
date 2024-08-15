import React, { Component } from 'react'
import { getLocaleStore, handlerChangeDataRequest, setLocaleStore } from '../../../helpers/utils'
import UnitSpareRequest from "../UnitRequest/UnitSpareRequest";
import WithRouter from '../../../HOC/WithRouter';
import { connectStoreon } from 'storeon/react';
import { ACTION_GET_LIST_BRANDS, ACTION_GET_LIST_MY_APPliCATION, ACTION_GET_NEW_LIST_DATA, ACTION_SET_VALUE_UNIT_SPARE } from '../../../store/requests/requests';
import { LAST_PATH_OWN_REQUEST, MAKE_REQUEST_MENU } from '../../../helpers/config';
import { ACTION_OPEN_MODAL, ACTION_SET_BUTTON_HEADER_ACTION } from '../../../store/helpers/helpers-store';
import { plus } from '../../../images';
import { delay } from '../../../helpers/const';

class OwnRequestEditComponent extends Component {
  state = {
    tab: getLocaleStore("itemTabRequest"),
    data: {},
    type: "unit",
    sub_type: "edit",
    delete_request_images: [],
    isAddMultiData: false,
  };
  componentDidMount() {
    const loadData = async () => {
      const loadMyCard = async () => {
        this.props.dispatch(ACTION_GET_LIST_MY_APPliCATION, {
          type: getLocaleStore("itemTabRequest"),
        });
        await delay(500);
        this.dataCurrentRequest();
      };
      if (
        getLocaleStore("itemTabRequest") === "unit" ||
        getLocaleStore("itemTabRequest") === "spare"
      ) {
        this.props.dispatch(ACTION_GET_LIST_BRANDS, {
          callback: async () => {
            console.log("callback work");
            loadMyCard();
          },
        });
      } else if (
        getLocaleStore("itemTabRequest") === "transport" ||
        getLocaleStore("itemTabRequest") === "truck"
      ) {
        loadMyCard();
      }
    };

    loadData();

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Мои запросы",
      pathBackButton: getLocaleStore(LAST_PATH_OWN_REQUEST),
    });

    this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
      isVisible: true,
      buttons: [
        {
          action: () => this.handlerChangeScreen({ path: MAKE_REQUEST_MENU }),
          iconLeft: plus,
          styleIconsLeft: { height: 12 },
          title: "Создать запрос",
          className: "button__controll--red",
        },
      ],
    });
  }

  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };

  handlerChangeData = (changeData) =>
    this.props.dispatch(ACTION_GET_NEW_LIST_DATA, { ...changeData });

  handlerChangeDataValues = (values) => {
    console.log({ ...values });
    if (values?.brand_id) this.dataCurrentRequest(values);
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE, {
      type: getLocaleStore("itemTabRequest"),
      sub_type: this.state.sub_type + "_" + getLocaleStore("itemTabRequest"),
      edit: true,
      request_id: +getLocaleStore("itemIdOwnRequest"),
      ...values,
    });
    if (values.generation_id) {
      setLocaleStore("isAddMultiData", false);
          this.setState((state) => ({
            ...state,
            isAddMultiData: false,
          }));
    }
  };
  dataCurrentRequest = (values) => {
    let res =
      this.props.listMyApplication.results &&
      this.props.listMyApplication.results.filter(
        (el) => el.id === +getLocaleStore("itemIdOwnRequest")
      );

    if (res?.length) {
      if (values?.brand_id) {
        res = {
          ...res[0],
          brand: null,
          model: null,
          generation: null,
        };
      } else {
        res = { ...res[0] };
      }
      // console.log({ res });
      return this.setState((state) => ({
        ...state,
        data: res,
      }));
    }
    return this.setState((state) => ({
      ...state,
      data: {},
    }));
  };
  handlerDeleteImage = (data) => {
    console.log('del image')
    this.setState((state) => ({
      ...state,
      delete_request_images: state.delete_request_images.push(data.id),
    }));
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE, {
      type: getLocaleStore("itemTabRequest"),
      sub_type: this.state.sub_type + "_" + getLocaleStore("itemTabRequest"),
      edit: true,
      delete_request_images: [...this.state.delete_request_images, data.id],
      request_id: +getLocaleStore("itemIdOwnRequest"),
      callback: data.callback,
    });
  };
  deleteClasses = (id, values, setFieldValue) => {
    if(values?.classes.length === 1){
      this.props.dispatch(ACTION_OPEN_MODAL,{
        show: true,
        content: 'Вы не можете удалить \nпоследнее описание марки с сервера'
      })
      return
    }
    setFieldValue(
      "classes",
      values.classes.filter((el, i) => i !== id)
    );
    this.handlerChangeDataValues({
      ...values,
      classes: values.classes.filter((el, i) => i !== id),
    });
    if (values.classes.filter((el, i) => i !== id).length === 0) {
      setFieldValue("model_id", "");
      setFieldValue("generation_id", "");
      setLocaleStore("isAddMultiData", true);
      this.setState((state) => ({
        ...state,
        isAddMultiData: true,
      }));
    }
  };
  handlerAddClasses = (setFieldValue, brand) => {
    const brand_id = this.props.listBrands.filter((el) => el.title === brand)[0]
      .value;
    this.handlerChangeData({
      type: "model",
      brand_id: brand_id,
      handlerChangeDataRequest: (res) => {
        const copyData = res.slice();
        return handlerChangeDataRequest({
          setFieldValue,
          results: copyData,
          type: "model",
        });
      },
    });
    setFieldValue("brand_id", brand_id);
    setFieldValue("model_id", "");
    setFieldValue("generation_id", "");
    setLocaleStore("isAddMultiData", true);

    this.setState((state) => ({
      ...state,
      isAddMultiData: true,
    }));
  };
  changeState = () => {
    setLocaleStore("isAddMultiData", true);
    this.setState((state) => ({
      ...state,
      isAddMultiData: true,
    }));
  };

  render() {
    if (this.state.tab === "unit" || this.state.tab === "spare") {
      return (
        <UnitSpareRequest
          edit
          listPhons={this.props.access?.status_data?.phone_list}
          dataRequst={this.props.listBrands}
          dispatch={this.props.dispatch}
          handlerChangeData={this.handlerChangeData}
          handlerChangeDataValues={this.handlerChangeDataValues}
          dataCurrentRequest={this.state.data}
          handlerDeleteImage={this.handlerDeleteImage}
          isAddMultiData={this.state.isAddMultiData}
          handlerAddClasses={this.handlerAddClasses}
          deleteClasses={this.deleteClasses}
          changeState={this.changeState}
        />
      );
    }
    return <div>OwnRequestEditComponent</div>;
  }
}
export default connectStoreon(
  "access",
  "listBrands",
  "pageMyApplication",
  "listMyApplication",
  WithRouter(OwnRequestEditComponent)
);