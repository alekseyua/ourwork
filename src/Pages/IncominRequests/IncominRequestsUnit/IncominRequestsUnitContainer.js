import React, { PureComponent } from "react";
import { connectStoreon } from "storeon/react";
import WithRouter from "../../../HOC/WithRouter";
import { help } from "../../../images";
import IncominRequestsUnit from "./IncominRequestsUnit";
import {
  API_SEARCH_FILTER,
  DEFAULT_PAGE_SIZE_INCOMING_REQUEST,
  INCOMING_REQUEST_INFO_SETTING,
  INCOMING_REQUEST_MENU,
} from "../../../helpers/config";
import {
  getListPagination,
  getSessionStore,
  setLocaleStore,
  setSessionStore,
} from "../../../helpers/utils";
import {
  ACTION_GET_LIST_FILTERS_BY_TYPE,
  ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE,
  ACTION_SET_CURRENT_PAGE_FILTER,
  ACTION_SET_PREV_PAGE_FILTER,
  ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD,
  ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS,
  ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_NULL,
  ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL,
  GET_TEXT_SEARCH_INCOMING_FILTERS,
  SET_SEARCH_INTO_INCOMING_FILTERS_NULL,
  ACTION_SET_TOGGLE_CURRENT_TAB_LIST,
} from "../../../store/filters/filtersIncominRequest";
import { ACTION_SET_BUTTON_HEADER_ACTION } from "../../../store/helpers/helpers-store";
import { gotoPointScroll } from "../../../helpers/helpers";
let abortControllerFilter;

class IncominRequestsUnitContainer extends PureComponent {
  state = {
    type: "unit_spare",
    listTab: ["brands", "models", "generations"],
    massages: [
      "Чтобы перейти в модельный ряд и поколения: нажмите на пустое поле марки авто. Чтобы получать запросы по всем моделям: выберите категории агрегаты и запчасти. Заявки от покупателей будут отображаться на главном экране.",
      "Чтобы выбрать поколение: нажмите на пустое поле модели авто. Заявки от покупателей будут отображаться на главном экране.",
      "Выберите поколение. Выберите категории заявок. Заявки от покупателей будут отображаться на главном экране.",
    ],
    massagesSelectCard: ["Найдено ", "Найдено моделей", "Найдено поколений"],
    textSearchFilterTab: [
      "Выберите марку авто",
      "Выберите модель",
      "Выберите поколение",
    ],
    toolTipAction: {
      isShow: false,
      id: null,
      message: "",
    },
    urlForSearch: API_SEARCH_FILTER,
    selectFilter: {
      image: "",
      name: "asds",
      count: 0,
    },
    helptext: "",
    listFilters: this.props.filtersListByTypeUnit ?? {
      count: 0,
      results: [],
    },
    currentFilter: 1,
    isLoadingItem: {
      id: null,
      status: false,
    },
    isShowButton: false,
    loadCatalog: false,
    loadCatalogPagination: false,
    renderCount: 0,
    // position_0:0
  };

  componentDidMount() {
    window.addEventListener("scroll", this.downloadForscrolling);

    window.onbeforeunload = () => {
      setSessionStore("position-0", 0);
      setSessionStore("position-1", 0);
      setSessionStore("position-2", 0);
    };
    this.props.controllerHeaderBand({
      currentTextHandlerBand: "Агрегаты и запчасти",
      pathBackButton: () => this.comebackPrevFilters(-1),
    });

    // this.props.dispatch(ACTION_SET_BUTTON_HEADER_ACTION, {
    //   isVisible: true,
    //   buttons: [
    //     {
    //       action: () =>
    //         this.handlerChangeScreen({ path: INCOMING_REQUEST_INFO_SETTING }),
    //       iconLeft: help,
    //       styleIconsLeft: { height: 12 },
    //       title: "Как настроить?",
    //       className: "button__controll--roze",
    //     },
    //   ],
    // });
    this.setState((state) => ({
      ...state,
      loadCatalog: true,
      loadCatalogPagination: true,
    }));
    this.props.dispatch(
      ACTION_SET_TOGGLE_CURRENT_TAB_LIST,
      this.state.listTab[this.props.toggleCurrentTabFilters]
    );
    this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
      type: this.state.type,
      page: 1,
      current_tab: this.props.toggleCurrentTabFilters,
      list: this.state.listTab[this.props.toggleCurrentTabFilters],
      callback: () => this.callbackBrand(1),
    });
  }

  callback = async (position) => {
    this.setState((state) => ({
      ...state,
      loadCatalog: false,
    }));
    console.log({position})
    if (position) return gotoPointScroll(position);
  };
  callbackBrand = (page) => {
    if (+this.props.toggleCurrentTabFilters === 0) {
      setSessionStore("position-1", 0);
    }
    this.setState((state) => ({
      ...state,
      loadCatalog: false,
      loadCatalogPagination: false,
    }));
    if (page === undefined) return;
    setSessionStore("currentPageFilters", page);
  };

  downloadForscrolling = async (event) => {
    try {
      const selector = '[data-item="block-item"]';
      // this.setState((state) => ({
      //   ...state,
      //   position_0: window.scrollY
      // }));
      setSessionStore(
        "position-" + this.props.toggleCurrentTabFilters,
        window.scrollY
      );
      let countBlocks = event.target.querySelectorAll(selector).length;
      let distance = event.target
        .querySelectorAll(selector)
        [countBlocks - 4].getBoundingClientRect().bottom;
      // > 10
      if (
        +getSessionStore("currentPageFilters") >
        +this.props.listCardsByType[
          `${this.state.type}_${this.props.toggleCurrentTabFilters}`
        ].count_pages
      ) {
        this.setState((state) => ({
          ...state,
          loadCatalog: false,
          loadCatalogPagination: false,
        }));
      }

      if (
        distance < 700 &&
        !this.state.loadCatalogPagination &&
        this.props.toggleCurrentTabFilters === 0
      ) {
        if (
          this.props.listCardsByType[
            `${this.state.type}_${this.props.toggleCurrentTabFilters}`
          ].count -
            1 >
          this.props.listCardsByType[
            `${this.state.type}_${this.props.toggleCurrentTabFilters}`
          ].results.length
        ) {
          let currentPage = +getSessionStore("currentPageFilters") + 1;
          setSessionStore(ACTION_SET_PREV_PAGE_FILTER, currentPage);
          this.setState((state) => ({
            ...state,
            loadCatalog: true,
            loadCatalogPagination: true,
          }));
          abortControllerFilter = new AbortController();
          this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
            type: this.state.type,
            current_tab: this.props.toggleCurrentTabFilters,
            list: this.state.listTab[this.props.toggleCurrentTabFilters],
            page: currentPage,
            autoload: true,
            abortControllerFilter: abortControllerFilter,
            callback: () => this.callbackBrand(currentPage),
          });
        }
      }
    } catch (error) {}
  };

  componentDidUpdate() {
    // window.addEventListener("scroll", this.downloadForscrolling);
  }

  componentWillUnmount() {
    this.setState((state) => ({
      ...state,
      loadCatalog: false,
      loadCatalogPagination: false,
    }));
    abortControllerFilter && abortControllerFilter.abort();

    setSessionStore("currentPageFilters", 1);
    setSessionStore("position-0", 0);
    setSessionStore("position-1", 0);
    setSessionStore("position-2", 0);
    setSessionStore(ACTION_SET_PREV_PAGE_FILTER, 0);
    this.props.dispatch(ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS_NULL);
    this.props.dispatch(ACTION_SET_CURRENT_PAGE_FILTER, 1);
    this.props.dispatch(ACTION_SET_PREV_PAGE_FILTER, 0);
    this.props.dispatch(ACTION_SET_VALUE_INTO_LIST_CARDS_SELECTS_FILTER_NULL);
    window.removeEventListener("scroll", this.downloadForscrolling);
  }

  comebackPrevFilters = (action) => {
    const currentTab = this.props.toggleCurrentTabFilters;
    const position = +getSessionStore("position-" + (currentTab - 1));
    if (!this.state.loadCatalog) {
      this.props.dispatch(SET_SEARCH_INTO_INCOMING_FILTERS_NULL);
      // проверяем если текущая вкладка 1, то выходим в меню
      if (action === -1 && currentTab === 0) {
        this.props.navigate(INCOMING_REQUEST_MENU);
        this.setState((state) => ({
          ...state,
          renderCount: state.renderCount + 1,
        }));
        return;
      }
      // добавляем юрл бэка для поиска
      let urlSearch = {};
      if (action === -1 && currentTab === 1) {
        urlSearch = {
          urlForSearch: API_SEARCH_FILTER,
        };
      }
      this.setState((state) => ({
        ...state,
        ...urlSearch,
        loadCatalog: true,
      }));

      // переключение вкладок фильтров
      this.props.dispatch(
        ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS,
        currentTab + action
      );
      // получаем список фильтров относительно текущей вкладки
      this.props.dispatch(
        ACTION_SET_TOGGLE_CURRENT_TAB_LIST,
        this.state.listTab[currentTab + action]
      );
      let currentPage = +getSessionStore("currentPageFilters");

      let params = {
        type: this.state.type,
        current_tab: currentTab + action,
        list: this.state.listTab[currentTab + action],
        page_size:
          action === -1 && currentTab === 2
            ? 99999
            : DEFAULT_PAGE_SIZE_INCOMING_REQUEST,
        page: 1,
        callback: () => {
          this.callback(position);
        },
      };
      console.log({ currentTab, currentPage });
      if (currentTab === 1) {
        // проблема с обновлением контента
        // решаем костылем узнаём сколько загружено из общего количества
        const amountPages = Math.round(
          this.props.listCardsByType[`${this.state.type}_0`].results.length /
            DEFAULT_PAGE_SIZE_INCOMING_REQUEST
        );
        // console.log({
        //   fff: `${this.props.toggleCurrentTabFilters}`,
        //   amountPages,
        // });
        if (amountPages > 1) {
          currentPage = amountPages;
        }

        getListPagination({
          action: ACTION_GET_LIST_FILTERS_BY_TYPE,
          amountPages: currentPage,
          params,
          dispatch: this.props.dispatch,
        });
        this.callback(position)
      } else {
        this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, params);
      }
    }
  };

  handlerChangeScreen = ({
    path,
    type,
    typePage,
    id,
    image_card = "",
    name_card = "",
  }) => {
    this.props.dispatch(SET_SEARCH_INTO_INCOMING_FILTERS_NULL);
    if (path) {
      return this.props.navigate(path);
    }

    if (type === this.state.listTab[this.props.toggleCurrentTabFilters]) {
      this.setState((state) => ({
        ...state,
        urlForSearch: "",
        loadCatalog: true,
      }));

      this.props.dispatch(
        ACTION_SET_TOGGLE_CURRENT_TAB_FILTERS,
        this.props.toggleCurrentTabFilters + 1
      );
      setLocaleStore(type, id);
      this.props.dispatch(ACTION_SET_RESULT_SELECT_FILTER_INTO_CARD, {
        ...this.props.resSelectCard,
        [this.props.toggleCurrentTabFilters + 1]: {
          name: name_card,
          image: image_card,
          count: 0,
        },
      });
      // setSessionStore("currentPageFilters", 1);
      // setSessionStore(ACTION_SET_PREV_PAGE_FILTER, 0);
      this.props.dispatch(
        ACTION_SET_TOGGLE_CURRENT_TAB_LIST,
        this.state.listTab[this.props.toggleCurrentTabFilters + 1]
      );

      this.props.dispatch(ACTION_GET_LIST_FILTERS_BY_TYPE, {
        type: this.state.type,
        current_tab: this.props.toggleCurrentTabFilters + 1,
        list: this.state.listTab[this.props.toggleCurrentTabFilters + 1],
        page_size: 99999,
        page: 1,
        callback: this.callback,
      });
    }
  };

  handlerSelectItemFilter = ({ id, sub_type, type, checked }) =>
    this.props.dispatch(ACTION_SAVE_LIST_FILTERS_BY_TYPE_INTO_STORE, {
      id,
      sub_type,
      type,
      checked,
      type_screen: this.state.type,
      current_tab: this.props.toggleCurrentTabFilters,
    });

  handlerTextSearch = (text, callback) => {
    this.props.dispatch(
      ACTION_SET_TOGGLE_CURRENT_TAB_LIST,
      this.state.listTab[this.props.toggleCurrentTabFilters]
    );
    this.props.dispatch(GET_TEXT_SEARCH_INCOMING_FILTERS, {
      type: this.state.type,
      list: this.state.listTab[this.props.toggleCurrentTabFilters],
      current_tab: this.props.toggleCurrentTabFilters,
      url: this.state.urlForSearch,
      text,
      callback,
    });
  };

  handlerShowTooltip = ({ action, id }) => {
    switch (action) {
      case "disabled":
        this.setState((state) => ({
          ...state,
          toolTipAction: {
            isShow: true,
            message:
              "Внутренние фильтры по моделям и поколениям установлены автоматически",
            id,
          },
        }));
        break;
      case "disabled-check-brands":
        this.setState((state) => ({
          ...state,
          toolTipAction: {
            isShow: true,
            message:
              "Вы не можете снять внутренний фильтр, фильтр выставлен по всем брендам",
            id,
          },
        }));
        break;
      case "disabled-check-models":
        this.setState((state) => ({
          ...state,
          toolTipAction: {
            isShow: true,
            message:
              "Вы не можете снять внутренний фильтр, выставлен по брендам",
            id,
          },
        }));
        break;
      case "disabled-check-generations":
        this.setState((state) => ({
          ...state,
          toolTipAction: {
            isShow: true,
            message:
              "Вы не можете снять внутренний фильтр, выставлен по моделям",
            id,
          },
        }));
        break;
      default:
    }
    const timer = setTimeout(() => {
      this.setState((state) => ({
        ...state,
        toolTipAction: {
          isShow: false,
          message: "",
          id: null,
        },
      }));
      return () => clearTimeout(timer);
    }, 15000);
  };

  render() {
    // console.log("this.props.controllButton = ", this.props.controllButton);
    return (
      <IncominRequestsUnit
        message={this.state.massages}
        listTab={this.state.listTab}
        currentTab={this.props.toggleCurrentTabFilters}
        listCardsFilter={
          this.props.listCardsByType[
            `${this.state.type}_${this.props.toggleCurrentTabFilters}`
          ]
        }
        toolTipAction={this.state.toolTipAction}
        textSearchFilterTab={this.state.textSearchFilterTab}
        textInputSearch={this.props.textSearchIncominFilter}
        resSelectCard={this.props.resSelectCard}
        massagesSelectCard={this.state.massagesSelectCard}
        type={this.state.type}
        typePage={this.props.type_page}
        helptext={this.state.helptext}
        isLoadingItem={this.state.isLoadingItem}
        selectFilters={this.props.selectFilters}
        isShowButton={this.state.isShowButton}
        loadCatalog={this.state.loadCatalog}
        handlerShowTooltip={this.handlerShowTooltip}
        comebackPrevFilters={this.comebackPrevFilters}
        handlerTextSearch={this.handlerTextSearch}
        handlerSelectItemFilter={this.handlerSelectItemFilter}
        handlerChangeScreen={this.handlerChangeScreen}
        statusLoadingData={this.props.controllButton.isFetch}
      />
    );
  }
}

export default connectStoreon(
  "resSelectCard",
  "prevPageBrandFilter",
  "controllButton",
  "listCardsByType",
  "listOfSelectedFilters",
  "currentPageBrandFilter",
  "textSearchIncominFilter",
  "toggleCurrentTabFilters",
  WithRouter(IncominRequestsUnitContainer)
);
