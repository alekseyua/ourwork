import { Dimensions } from "react-native-web";
import {
  arrowRightWhite,
  carSell,
  carSpareSell,
  chat,
  createRequestDefault,
  createRequestCommon,
  editMarket,
  engine,
  fileAdditionOne,
  filter,
  filterActive,
  filterCommon,
  fix_bugs,
  help,
  homeActive,
  homeCommon,
  piston,
  play,
  plusDarkBlue,
  rowVertical,
  securityUser,
  sellCar,
  sellCarCommon,
  shieldTick,
  starStrokeWhite,
  starmenu,
  reviewCommon,
  unitTurbo,
  createRequestActive,
  reviewActive,
  sellCarActive,
} from "../images";

const width = Dimensions.get('window').width;
//  hosting
export const HOST = 'https://garsing.shop/api/v1';

// export const GET_DATA_ACCESS = '/subscription/api_get_page/'; //'/subscription/api_get_page_access/';
export const GET_DATA_ACCESS = '/telegram/user/get_user/'; //'/subscription/api_get_page_access/';
export const API_POST_CHANGE_LANG = "/telegram/user/change_language/";



export const API_DISMISS = "/telegram/api_change_status_popup_phone/"; 

export const API_GET_PAGE = '/telegram/api_get_page/';
// export const API_GET_CARS = '/telegram/api_get_cars/';
export const API_GET_CARS_BRANDS = '/parsing/brands/';
export const API_GET_CARS_MODELS = '/parsing/models/';
export const API_GET_CARS_GENEGATIONS = '/parsing/generations/';
// incomin filters

export const API_SET_FILTER = '/subscription/filters/';
export const API_SEARCH_FILTER = '/telegram/api_search_filters_v2/';
export const API_SEARCH_FILTERS = '/telegram/api_search_filters/';
export const API_GET_FILTER_BRANDS = '/subscription/filters/get_filters_brands/';
export const API_GET_FILTER_MODELS = '/subscription/filters/get_filters_models/';
export const API_GET_FILTER_GENERATION = '/subscription/filters/get_filters_generations/';
// requests
export const API_CREATE_REQUEST_V2 = '/request/requests/';
export const API_GET_REQUEST_BY_TYPE = '/????/';


export const API_GET_USER_RAITING = "/rating/feedbacks/get_user_feedbacks/";

export const API_GET_COUNTRIES = '/telegram/api_get_countrys/';
export const API_DUBLICATE_REQUEST = '/telegram/api_dublicate_request/';
export const API_DELETE_REQUEST = '/telegram/api_delete_request/';
export const API_GET_USER_FEEDBACK = '/telegram/api_get_user_feedbacks_V2/';
export const API_GET_USER_FEEDBACK_RECIEVE = "/telegram/api_get_user_feedbacks_added/";
export const API_DELETE_USER_FEEDBACK_LEFT = "/telegram/api_delete_feedback/";

export const API_GET_USER_FULL_DETAIL_INFO = '/telegram/api_get_user_full_detail_info/';
export const API_GET_CONTEXT = '/telegram/api_get_context/';
export const API_CREATE_REQUEST = '/telegram/api_create_request/';
export const API_UPDATE_REQUEST = "/telegram/api_update_request/";
export const API_CHECK_DELETE_IMAGE_REQUEST = "/telegram/api_check_request_images/";
export const API_CREATE_REVIEW = '/telegram/api_create_review/';
export const API_DELETE_IMAGE_FROM_REQUEST = "/telegram/api_check_request_images/"; // delete

// review
export const API_GET_ALL_GARANT_MEMBERS = '/rating/feedbacks/get_user_feedbacks/';
export const API_CREATE_RAITING = "/rating/feedbacks/";




export const API_GET_LIST_CITIES_WARRANT_MEMBER = '/telegram/api_get_garant_members/';

export const API_GET_ALL_RAITINGS = '/rating/feedbacks/'//"/api_get_all_ratings/" //
export const API_TOP_RAITING = '/rating/feedbacks/';


export const API_CREATE_UPDATE_REPLY_RAITING ="/telegram/api_create_update_reply/";
export const API_GET_CITY_MEMBERS = '/telegram/api_get_city_members_v2/';//'/api_get_city_members/';
// https:// botrazbor.ru/telegram/api_get_all_users_list/
export const API_GET_RATINGS = "/telegram/api_get_ratings/"
// profile
export const API_GET_CONTEXT_PROFILE = '/telegram/api_get_context_profile/'; // page_id: 31
export const API_GET_PROFILE_DATA = '/telegram/api_get_profile_form/';
export const API_GET_PAYMENT_URL = '/telegram/api_get_pay_url/';
export const API_CHANGE_PROFILE = '/telegram/api_edit_profile/';
export const API_UNSUBSCRIBE_AUTO_PAYMENT = '/telegram/api_cancel_user_auto_payment/';
// sale car  
export const CREATE_CAR_SALE = "/parsing/sale/"; // old request sell auto

export const rateRestriction = 50000000; // ограничения файлва ссылки по загрузке 50mb
export const marginSides = 10;
export const marginSidesDesktop = 50;
export const widthDesktop = 700;
export const widthMobile = width - 30;
export const widthPagination = width;


export const DEFAULT_PAGE_SIZE = 8;
export const DEFAULT_PAGE_SIZE_MARKET = 12;
export const DEFAULT_PAGE_SIZE_INCOMING_REQUEST = 10;

export const MAX_VIEW_ITEM = 5; 
export const MAX_VIEW_ITEM_LAST_PAGE = 7; 



// path
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


export const ROOT = '/'
export const FEEDBACK = '/feedback'
export const FEEDBACK_GET_MANY_FOR_IDEA = '/feedback-get-money-for-idea';
export const FIXEDS_BUGS = '/fixed-bugs';

{/* **********************ФИЛЬТРЫ -> Фильтра ****************** */ }
export const INCOMING_REQUEST_MENU = '/filters';
export const INCOMING_REQUEST_UNIT_SPARE = '/filters/unit-spare';
export const INCOMING_REQUEST_INFO_SETTING = '/filters/info-setting';
export const INCOMING_REQUEST_TRUCK = '/filters/truck';
export const INCOMING_REQUEST_RESPAIR = '/filters/respair';
export const INCOMING_REQUEST_TRANSPORT = '/filters/transport';
{/* *****************Рейтинг*********************** */ }
export const REITING_MENU = '/rating';
export const REITING_FULL_INFO = '/rating/full-info';
export const REITING_CREATE = '/rating/create-rating';
export const REITING_WARRANT_ADMIN = '/rating/garant-admin';
export const REITING_WARRANT_MEMBER = '/rating/garant-members';

{/* *****************Ищу (создать запрос)*********************** */ }
export const MAKE_REQUEST_MENU = '/make-request';
export const MAKE_REQUEST_UNIT = '/make-request/unit';
export const MAKE_REQUEST_SPARE = '/make-request/spare';
export const MAKE_REQUEST_RESPAIR = '/make-request/respairs';
export const MAKE_REQUEST_TRANSPORT = '/make-request/transport';
export const MAKE_REQUEST_TRUCK = '/make-request/trucks';
export const MAKE_REQUEST_OWN_REQUEST = '/make-request/own';
export const MAKE_REQUEST_OWN_EDIT_REQUEST = "/make-request/own/edit";

// {/* ******************"Маркет"********************** */}
export const MARKETPLACE_MAIN = '/marketplace/main';
export const MARKETPLACE_FAVORITE = '/marketplace/favorite';
export const MARKETPLACE_FILTER = '/marketplace/filtersmp';
export const MARKETPLACE_OWN_CARDS = '/marketplace/my-ads-markeplace';
export const MARKETPLACE_CREATE_CARD = '/marketplace/create-marketplace';
export const MARKETPLACE_ADD_CARDS_FROM_FILE = '/marketplace/add-file';
export const MARKETPLACE_DETAILY_CARD = '/marketplace/info-card';
export const MARKETPLACE_EDIT_OWN_CARD = '/marketplace/edit-info-card-markeplace';

// profile
export const PROFILE_MENU = '/profile';
export const PROFILE_EDIT = '/profile/edit-profile';
export const PROFILE_SUBSCRIBE = '/profile/subscribe';
export const PROFILE_MY_REVIEW = '/profile/my-review';
export const PROFILE_INFO = '/info-work-bot';


// sale car  
export const CAR_SALE = '/create-car-sale';
export const CAR_SALE_MENU = '/create-car-sale-menu';

// Chain motors
export const CHAIN_MOTORS = "/china-motors";
export const ONE_CARD_CHAIN_MOTOR = '/card-china-motors'

// menu

export const mainMenuInit = [
  {
    name: "filters",
    slug: INCOMING_REQUEST_UNIT_SPARE,
    id: 8,
    text: "Фильтра",
    image: filter,
    type: "page_filters",
    url: null,
    isActive: true,
    isFooter: false,
  },
  {
    name: "create_request",
    slug: MAKE_REQUEST_MENU,
    id: 2,
    text: "Создать запрос",
    image: createRequestDefault,
    type: "page_make_requests",
    url: null,
    isActive: true,
    isFooter: false,
  },
  {
    name: "raiting",
    slug: REITING_MENU,
    id: 9,
    text: "Рейтинг",
    image: starmenu,
    type: "page_rating",
    url: null,
    isActive: true,
    isFooter: false,
  },
  {
    name: "sell",
    slug: CAR_SALE_MENU,
    id: 10,
    text: "Продать",
    image: sellCar,
    type: "page_sell",
    url: null,
    isActive: true,
    isFooter: false,
  },
];

export const menuFooter = [
  {
    name: "",
    slug: ROOT,
    id: 1,
    text: "main",
    image: {
      active: homeActive,
      common: homeCommon,
    },
    type: "page_main",
    url: null,
    isActive: true,
    isFooter: true,
  },
  {
    name: "Фильтра",
    slug: INCOMING_REQUEST_UNIT_SPARE,
    id: 8,
    text: "filters",
    image: {
      active: filterActive,
      common: filterCommon,
    },
    type: "page_filters",
    url: null,
    isActive: true,
    isFooter: true,
  },
  {
    name: "Создать",
    slug: MAKE_REQUEST_MENU,
    id: 2,
    text: "create",
    image: {
      active: createRequestActive,
      common: createRequestCommon,
    },
    type: "page_make_requests",
    url: null,
    isActive: true,
    isFooter: true,
  },
  {
    name: "Рейтинг",
    slug: REITING_MENU,
    id: 9,
    text: "raiting",
    image: {
      active: reviewActive,
      common: reviewCommon,
    },
    type: "page_rating",
    url: null,
    isActive: true,
    isFooter: true,
  },
  {
    name: "Продать",
    slug: CAR_SALE_MENU,
    id: 10,
    text: "sell",
    image: {
      active: sellCarActive,
      common: sellCarCommon,
    },
    type: "page_sell",
    url: null,
    isActive: true,
    isFooter: true,
  },
];

export const menuRequests = [
  {
    "name": "Запрос на агрегат",
    "slug": MAKE_REQUEST_UNIT,
    "id": 8,
    "text": "Запрос \n на агрегат",
    "image": engine,
    "type": "Запрос",
    "url": "",
    isActive: true,
    isSlider: false
  },
  {
    "name": "Запрос на запчасть",
    "slug": MAKE_REQUEST_SPARE,
    "id": 9,
    "text": "Запрос на запчасть",
    "image": piston,
    "type": "Запрос",
    "url": "",
    isActive: true,
    isSlider: false
  }, 
]
export const menuCarSell = [
  {
    "name": "Авто в разборе",
    "slug": CAR_SALE,
    "id": 8,
    "text": "Авто \n в разборе",
    "image": carSpareSell,
    "type": "sell-spare",
    "url": "",
    isActive: true,
    isSlider: false
  },
  {
    "name": "Продам авто",
    "slug": 'https://t.me/sell_autoua',
    "id": 9,
    "text": "Продам авто",
    "image": carSell,
    "type": "sell",
    "url": "",
    isActive: true,
    isSlider: false
  }, 
]

export const menuRaitingAndReview = [
  {
    "name": "Гаранты-участники",
    "slug": REITING_WARRANT_MEMBER,
    "id": 26,
    "text": "Гаранты-участники",
    "image": securityUser,
    "type": "Запрос",
    "url": null,
    isActive: true,
    isSlider: true
  },
  {
    "name": "Безопасная сделка",
    "slug": REITING_WARRANT_ADMIN,
    "id": 25,
    "text": "Безопасная сделка",
    "image": shieldTick,
    "type": "Страница",
    "url": null,
    isActive: true,
    isSlider: true
  }
]

export const menuIncomingRequest = [
  {
    name: "Агрегаты и запчасти",
    image: null,
    images: [unitTurbo, piston],
    slug: INCOMING_REQUEST_UNIT_SPARE,
    type: "unit_spare",
    isSlider: false,
    oneBigSlide: true,
    height: 154,
    isActive: true,
  },
  {
    name: "Грузовые",
    image: arrowRightWhite,
    slug: INCOMING_REQUEST_TRUCK,
    type: "truck",
    isSlider: true,
    isActive: true,
  },
  {
    name: "Услуги по ремонту",
    image: arrowRightWhite,
    slug: INCOMING_REQUEST_RESPAIR,
    type: "respair",
    isSlider: true,
    isActive: true,
  },
  {
    name: "Услуги по грузоперевозкам",
    image: arrowRightWhite,
    slug: INCOMING_REQUEST_TRANSPORT,
    type: "transport",
    isSlider: true,
    isActive: true,
  },
];
// link feedback
export const linksFeedback = [
  {
    id: 0,
    title: "Получить деньги за идею",
    url: FEEDBACK_GET_MANY_FOR_IDEA,
    position: "flex-start",
    color: "#ff0000",
    fontSize: "12",
    icon: help,
  },
  {
    id: 1,
    title: "Написать администратору",
    url: "https://t.me/admrazborov",
    position: "flex-start",
    color: "#ff0000",
    fontSize: "12",
    icon: chat,
  },
  {
    id: 2,
    title: "Обновления портала RUUUM",
    url: FIXEDS_BUGS,
    position: "flex-start",
    color: "#ff0000",
    fontSize: "12",
    icon: fix_bugs,
  },
  {
    id: 2,
    title: "Инструкция: создать объявление",
    url: "https://youtube.com/shorts/MBrA-iGZvWY?feature=share",
    position: "flex-start",
    color: "#ff0000",
    fontSize: "12",
    icon: play,
  },
];
export const linksFeedbackWarantAdmin = [
  {
    id: 0,
    title: 'Получить деньги за идею',
    url: FEEDBACK_GET_MANY_FOR_IDEA,
    position: 'flex-start',
    color: '#ff0000',
    fontSize: '12',
    icon: help,
  },
  {
    id: 1,
    title: 'Написать администратору',
    url: 'https://t.me/admrazborov',
    position: 'flex-start',
    color: '#ff0000',
    fontSize: '12',
    icon: chat,

  },
]

// const localStorage
// save last url
export const LAST_PATH_FEEDBACK = 'lastPathFeedback';
export const LAST_PATH_CREATE_ADV = 'lastPathCreateAdv';
export const LAST_PATH_DETAIL_CARD = 'lastPathDetailCard';
export const LAST_PATH_MY_FAVORITE_CARDS = 'lastPathMyFavoriteCards';
export const LAST_PATH_SEND_REVIEW = 'lastPathSendReview';
export const LAST_PATH_OWN_REQUEST = 'lastPathOwnRequest';
export const LAST_PATH_HOW_TO_SETUP = 'lastPathHowToSetup';
export const LAST_PATH_FULL_INFO = 'lastPathFullInfo';
export const CITY_ID_FOR_WARANTLY_MEMBER = 'city-id-warantly-mamber';
export const INCOMING_CURRENT_TAB_SERVICE = 'incoming-cur-service';
export const USERNAME = 'username';
export const PREVURL = 'prevUrl';
export const ID_TELEGRAM_USER = 'id_user_full';
export const SELF_ID_TELEGRAM = 'telegram_id';
export const ID_USER_FOR_REVIEW = 'idUserForReview';
export const TYPE_REVIEW = "TYPE_REVIEW";
export const LASTURL = 'lastUrl';
export const CURRENT_PATH_TO_FULL_INFO= 'currentPathToFullInfo';
export const IS_DETAIL= 'isDetail';