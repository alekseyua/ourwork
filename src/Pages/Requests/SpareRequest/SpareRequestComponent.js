import React, { Component } from 'react'
import { connectStoreon } from 'storeon/react';
import WithRouter from '../../../HOC/WithRouter';
import { myRequest } from '../../../images';

import { MAKE_REQUEST_MENU, MAKE_REQUEST_OWN_REQUEST } from '../../../helpers/config';
import { ACTION_GET_LIST_BRANDS, ACTION_GET_NEW_LIST_DATA, ACTION_GET_PREPARE_PRODUTS, ACTION_SET_VALUE_UNIT_SPARE, ACTION_SET_VALUE_UNIT_SPARE_NULL } from '../../../store/requests/requests';
import { ACTION_SET_BUTTON_HEADER_ACTION, ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import UnitSpareRequest from "../UnitRequest/UnitSpareRequest";
import { getLocaleStore, setLocaleStore } from '../../../helpers/utils';

class SpareRequestComponent extends Component {
  state = {
    type: "spare",
    sub_type: "unit_spare",
    isShowHide: true,
    isAddMultiData: getLocaleStore("isAddMultiData") ?? true,
  };

  componentDidMount() {
    this.props.dispatch(ACTION_GET_LIST_BRANDS);

    this.props.controllerHeaderBand({
      currentTextHandlerBand: "request.request_spare",
      pathBackButton: () =>
        this.handlerChangeScreen({ path: MAKE_REQUEST_MENU }),
    });

    // this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
    //   isVisible: true,
    //   buttons: [
    //     {
    //       action: () =>
    //         this.handlerChangeScreen({ path: MAKE_REQUEST_OWN_REQUEST }),
    //       iconLeft: myRequest,
    //       styleIconsLeft: { height: 12 },
    //       title: "Мои запросы",
    //       className: "button__orange-white",
    //     },
    //   ],
    // });
  }
  handlerChangeScreen = ({ path }) => {
    this.props.navigate(path);
  };

  handlerChangeData = (changeData) =>
    this.props.dispatch(ACTION_GET_NEW_LIST_DATA, { ...changeData });

  handlerChangeDataValues = (values) =>
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE, {
      type: this.state.type,
      sub_type: this.state.sub_type,
      member: this.props.access.user_status,
      ...values,
    });
  componentWillUnmount() {
    this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE_NULL);
    // this.props.dispatch(ACTION_RESET_LIST_PREPARE_PRODUCTS);
    // setLocaleStore("oem", null);
  }

  handlerShowHide = () => {
    this.setState((state) => ({
      ...state,
      isShowHide: !this.state.isShowHide,
    }));
  };

  handlerMorePrepare = (page) => {
    const params = {
      oem: getLocaleStore("oem"),
      page_size: 4,
      page: page + 1,
    };
    this.props.dispatch(ACTION_GET_PREPARE_PRODUTS, params);
  };

  onClickInside = () => {
    this.props.dispatch(ACTION_SET_CONTROLL_BUTTON, { show: false });
  };
  onClickOutside = () => {
    this.props.dispatch(ACTION_SET_CONTROLL_BUTTON, { show: true });
  };
  handlerAddClasses = (setFieldValue) => {
    setFieldValue("model_id", "");
    setFieldValue("generation_id", "");
    setLocaleStore("isAddMultiData", true);

    this.setState((state) => ({
      ...state,
      isAddMultiData: true,
    }));
  };
  deleteClasses = (id, values, setFieldValue) => {
    setFieldValue(
      "classes",
      values.classes.filter((el, i) => i !== id)
    );
    this.handlerChangeDataValues({
      ...values,
      classes: values.classes.filter((el, i) => i !== id),
    });
    console.log({ cla: values.classes });

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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps?.valuesUnitSpare?.classes?.length !==
        this.props?.valuesUnitSpare?.classes?.length &&
      this.props?.valuesUnitSpare?.classes?.length !== 0
    ) {
      setLocaleStore("isAddMultiData", false);
      this.setState((state) => ({
        ...state,
        isAddMultiData: false,
      }));
    }
  }
  changeState = () => {
    setLocaleStore("isAddMultiData", true);
    this.setState((state) => ({
      ...state,
      isAddMultiData: true,
    }));
  };
  render() {
    return (
      <UnitSpareRequest
        valuesUnitSpare={this.props.valuesUnitSpare}
        member={this.props.access?.status_data?.user_status}
        listPhons={this.props.access?.status_data?.phone_list}
        onClickOutside={this.onClickOutside}
        listClasses={this.props.valuesUnitSpare?.classes ?? []}
        dataRequst={this.props.listBrands}
        dispatch={this.props.dispatch}
        handlerChangeData={this.handlerChangeData}
        handlerChangeDataValues={this.handlerChangeDataValues}
        listSectionTabs={this.state.listSectionTabs}
        action_tab={this.state.action_tab}
        handlerShowHide={this.handlerShowHide}
        isShowHide={this.state.isShowHide}
        handlerMorePrepare={this.handlerMorePrepare}
        prepareProducts={this.props.listPrepare}
        deleteClasses={this.deleteClasses}
        isAddMultiData={this.state.isAddMultiData}
        handlerAddClasses={this.handlerAddClasses}
        changeState={this.changeState}
      />
    );
  }
}
export default connectStoreon(
  "access",
  "listBrands",
  "listPrepare",
  "valuesUnitSpare",
  WithRouter(SpareRequestComponent)
);