import React, { Component } from "react";
import { connectStoreon } from "storeon/react";
import WithRouter from "../../../HOC/WithRouter";
import { myRequest } from "../../../images";
import UnitSpareRequest from "./UnitSpareRequest";
import {
  MAKE_REQUEST_MENU,
  MAKE_REQUEST_OWN_REQUEST,
} from "../../../helpers/config";
import {
  ACTION_GET_LIST_BRANDS,
  ACTION_GET_NEW_LIST_DATA,
  ACTION_SET_VALUE_UNIT_SPARE,
  ACTION_SET_VALUE_UNIT_SPARE_NULL,
  ACTION_GET_PREPARE_PRODUTS,
} from "../../../store/requests/requests";
import { ACTION_SET_BUTTON_HEADER_ACTION, ACTION_SET_CONTROLL_BUTTON } from '../../../store/helpers/helpers-store';
import { getLocaleStore, setLocaleStore } from "../../../helpers/utils";

class UnitRequestComponent extends Component {
  state = {
    type: "unit",
    sub_type: "unit_spare",
    isShowHide: true,
  };

  componentDidMount() {
    this.props.dispatch(ACTION_GET_LIST_BRANDS, {page_size:99999});
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Запрос на агрегат",
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
        window.onbeforeunload = () => {
          setLocaleStore("isAddMultiData", null);
        };
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
    // this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE_NULL);
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
    // this.props.dispatch(ACTION_SET_VALUE_UNIT_SPARE_NULL);
  }
  onClickInside = () => {
        this.props.dispatch(ACTION_SET_CONTROLL_BUTTON, { show: false });
  }
  onClickOutside = () => {
        this.props.dispatch(ACTION_SET_CONTROLL_BUTTON, { show: true });
  }


  render() {
    console.log(this.props.listBrands)
    return (
      <UnitSpareRequest
        onClickOutside={this.onClickOutside}
        member={this.props.access?.status_data?.user_status}
        listPhons={this.props.access?.status_data?.phone_list}
        dataRequst={this.props.listBrands}
        valuesUnitSpare={this.props.valuesUnitSpare}
        dispatch={this.props.dispatch}
        handlerChangeData={this.handlerChangeData}
        handlerChangeDataValues={this.handlerChangeDataValues}
        handlerShowHide={this.handlerShowHide}
        isShowHide={this.state.isShowHide}
        handlerMorePrepare={this.handlerMorePrepare}
        prepareProducts={this.props.listPrepare}
        onClickInside={this.onClickInside}
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
  WithRouter(UnitRequestComponent)
);
