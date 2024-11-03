import React from 'react'
import { connectStoreon } from 'storeon/react'
import { unicalTextForSearch } from '../helpers/helpers'
import { ACTION_SET_MESSAGE_ERROR_NULL } from '../store/raiting-review/raiting-review'
import { SET_SEARCH_INTO_INCOMING_FILTERS_NULL } from '../store/filters/filtersIncominRequest'

function WithSearch(Component) {
  // isActiveAmountInputLetter = количество символов с какого начинается поиск
  // getResultSearch - получить результат поиска
  // {
  // true  - если введены буквы и их больше 0
  // false - если пустое
  // }
  class Search extends React.Component {
    state = {
      message: "",
      isLoading: false,
      text: "",
      showListInteractive:false,
    };

    componentDidUpdate(prevProps, prevState) {
      console.log(this.props.textSearchError)
      if (this.props.textSearchError !== prevProps.textSearchError) {
        this.setState({
          message: this.props?.textSearchError,
        });
        const timer = setTimeout(() => {
          this.setState({
            message: "",
            isLoading: false,
          });
          this.props.dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
          return clearTimeout(timer);
        }, 3000);
      }
      if (
        this.props?.listResultInteractiveSearch &&
        prevProps?.listResultInteractiveSearch !==
          this.props?.listResultInteractiveSearch
      ) {
        this.setState(state=>({
          ...state,
          showListInteractive: true
        }))
      }
    }

    componentWillUnmount() {
      this.props.dispatch(ACTION_SET_MESSAGE_ERROR_NULL);
      this.props.dispatch(SET_SEARCH_INTO_INCOMING_FILTERS_NULL);
      // console.log('обнуление в маркете поиска заморозил')
    }

    callback = () => {
      this.setState((state) => ({
        ...state,
        isLoading: false,
      }));
    };

    eventInput = (event) => {
      // if (this.props.isInteractive) return;
      if (+event.keyCode === 13) {

        this.props.getResultSearch(this.state.text, {}, this.callback);
        this.setState((state) => ({
          ...state,
          isLoading: this.props.isInteractive? false: true,
          text: "",
          showListInteractive: false,
        }));
      }
    };

    setTextSearch = (text, e) => {
      const newText = unicalTextForSearch(text);
      
      if (this.props.isInteractive) {
        this.props.dispatch(this.props.actionDisptchGetSearch, { q: newText });
        this.props.getResultSearch(newText, e, this.callback);
      } else {
        this.props.dispatch("setCallabckSearch", this.callback);
        this.props.dispatch(this.props.actionDisptchGetSearch, { q: newText });
        if (
          newText &&
          newText.length > (this.props.isActiveAmountInputLetter ?? 0)
        ) {
          this.setState((state) => ({
            ...state,
            text: newText,
          }));
        } else if (text.length === 0 && newText === "") {
          this.setState((state) => ({
            ...state,
            text: newText,
            isLoading: false,
          }));
        }
        return false;
      }
    };

    render() {
      // console.log('this.state.showListInteractive = ',this.state.showListInteractive)
      return (
        <Component
          {...this.props}
          setTextSearch={this.setTextSearch}
          message={this.state.message}
          isLoading={this.state.isLoading}
          eventInput={this.eventInput}
          listResultInteractiveSearch={
            this.state.showListInteractive
              ? this.props.listResultInteractiveSearch
              : []
          }
        />
      );
    }
  }

  return connectStoreon(
    'textSearchError',
    Search
  );
}



export default WithSearch
