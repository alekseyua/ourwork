import React, { Component } from "react";
import SearchComponent from "../SearchSection/SearchComponent";
import { connectStoreon } from "storeon/react";
import { checkCurrentCityInListCitys } from "../../helpers/helpers";
import { ACTION_OPEN_MODAL, ACTION_SET_TEXT_SEARCH_INTERACTIVE } from "../../store/helpers/helpers-store";

class SearchSectionWithOfferContainer extends Component {
  state = {
    resultSearch: [],
    helpText: "",
    idCurrentSearch: null,
  };

  handlerTextSearch = (text, e, callback) => {
    if (!!!text.length && !e?.target?.id) {
      callback();
      return this.setState((state) => ({
        ...state,
        resultSearch: [],
      }));
    }
    if (!!!text.length) {
      callback();
      return this.setState((state) => ({
        ...state,
        resultSearch: this.props?.data,
        idCurrentSearch: e.target.id,
      }));
    }
    this.setState((state) => ({
      ...state,
      idCurrentSearch: e.target.id,
      resultSearch:
        this.props?.data?.filter((el) =>
          el?.title?.toUpperCase().trim().includes(text.toUpperCase().trim())
        ) ?? [],
    }));
  };

  handlerClickOptions = (e, removeFocuse) => {
    console.log("click select options");
    const name = e.target.getAttribute("name");
    const value = e.target.getAttribute("value");
    const country_id = e.target.getAttribute("value");
    this.props.dispatch(ACTION_SET_TEXT_SEARCH_INTERACTIVE, {
      q: name,
      country_id,
    });
    this.props.onChange(value, e);
    this.setState((state) => ({
      ...state,
      resultSearch: [],
      helpText: "",
    }));
    removeFocuse();
  };

  onFocus = (e) => {
    this.props?.onFocus && this.props?.onFocus(e);
    if (!!!this.props.textInputInteractive) console.log("focus");
    return this.setState((state) => ({
      ...state,
      resultSearch: this.props?.data,
    }));
  };

  clearOptionsForm = () => {
    this.setState((state) => ({
      ...state,
      resultSearch: [],
      helpText: "",
    }));
  };

  onBlur = (e) => {};
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.textInputInteractive !== this.props.textInputInteractive &&
      this.props.data.length
    ) {
      const resCheck = checkCurrentCityInListCitys(
        this.props.textInputInteractive,
        this.props.data
      );
      if(this.props.isCity){

        if (!resCheck.city) {
          this.state?.idCurrentSearch &&
          document
            .querySelector(`[name="city"]`)
            ?.style?.setProperty("color", "red");
          this.setState((state) => ({
            ...state,
            helpText: this.props?.textToolTip ?? "",
          }));

          this.props.onChange(" ");
        } else {
          document
            .querySelector(`[name="city"]`)
            ?.style?.setProperty("color", null);
          this.setState((state) => ({
            ...state,
            helpText: "",
          }));
          this.props.onChange(resCheck.id, null);
        }
      }else{
        if(this.props.type === 'number'){
          let newText = '';
          let text = this.props.textInputInteractive;
          if(text.split('+').length>1){
            newText = text.split('+')[1]
          }else{
            newText = text.split('+')[0]
          }
          console.log(newText);
          let isNumber = /^\d+$/.test(newText);
          if(!isNumber){
            this.setState((state) => ({
              ...state,
              helpText: "Не похоже на число",
            }));
          }else{
            this.setState((state) => ({
              ...state,
              helpText: "",
            }));
          }
        }
        if(this.props.textInputInteractive){
          this.props.onChange(this.props.textInputInteractive, null);
        }else{
          this.props.onChange(" ", null);
        }
      }
    }
    if (prevProps.data.length !== this.props.data.length) {
      this.props.dispatch(ACTION_SET_TEXT_SEARCH_INTERACTIVE, { q: "" });
    }
    if (
      prevProps.textInputInteractive !== this.props.textInputInteractive &&
      !!!this.props.textInputInteractive
    ) {
      const timer = setTimeout(() => {
        this.setState((state) => ({
          ...state,
          helpText: "",
        }));
        return clearTimeout(timer);
      }, 700);
    }
  }

  onClickInside = (e) => {
    console.log("click INSIDE");
  };
  onClickOutside = (e) => {
    // console.log("click outside", e.target, ' - - - ', e.target.getAttribute("data-type") === null);
    // что бы коректно работало нужно обавлять data-type = {"wrap-input"}
    if (e.target.getAttribute("data-type") === "wrap-input") return;
    console.log("click reset");

    this.setState((state) => ({
      ...state,
      resultSearch: [],
      helpText: "",
    }));
  };

  render() {
    return (
      <div>
        <SearchComponent
          style={{
            width: `100% `,
            minHeight: 42,
            fontSize: 12,
          }}
          mode={this.props.mode}
          isIconLeft={this.props.isIconLeft}
          value={this.props.value}
          onFocus={this.onFocus}
          helptext={this.state.helpText}
          stylehelptext={this.props?.stylehelptext}
          styleWrap={this.props?.styleWrap ?? {}}
          onBlur={this.onBlur}
          // disabled={!!!this.props.data.length}
          placeholder={
            this.props?.value ?? this.props?.placeholder ?? "Впишите город"
          }
          name={this.props.name}
          isInteractive={true}
          isActiveAmountInputLetter={2}
          isUpblock={true}
          isUpblockDesktop={true}
          enteredText={this.props.textInputInteractive} // текущий текст
          getResultSearch={this.handlerTextSearch} // функция обработки запроса
          actionDisptchGetSearch={ACTION_SET_TEXT_SEARCH_INTERACTIVE} // где хроним текст
          handlerClickOptions={this.handlerClickOptions}
          // listResultInteractiveSearch={this.props?.data} // для стилизации
          listResultInteractiveSearch={this.state.resultSearch}
          onClickInside={this.onClickInside}
          onClickOutside={this.onClickOutside}
        />
      </div>
    );
  }
}
export default connectStoreon(
  "textInputInteractive",
  SearchSectionWithOfferContainer
);
