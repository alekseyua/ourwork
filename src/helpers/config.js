import { Dimensions } from "react-native-web";
import { arrowRightWhite, chat, createRequestDefault, editMarket, engine, fileAdditionOne, filter, filterWhite, fix_bugs, help, home, homeFooterActive, homeFooterDefault, incomingSetting, 
  marketFooterActive, marketFooterDefault, piston, play, plusDarkBlue, profileFooterActive, profileFooterDefault, rowVertical, securityUser, shieldTick, shoppingCart, 
  starFooterActive, starFooterDefault, starStrokeWhite, starmenu, unitTurbo } from "../images";

const width = Dimensions.get('window').width;
//  hosting
export const HOST = 'https://garsing.shop/api/v1';

// export const GET_DATA_ACCESS = '/subscription/api_get_page/'; //'/subscription/api_get_page_access/';
export const GET_DATA_ACCESS = '/telegram/user/get_user/'; //'/subscription/api_get_page_access/';
export const API_DISMISS = "/telegram/api_change_status_popup_phone/"; 

export const API_GET_PAGE = '/telegram/api_get_page/';
// export const API_GET_CARS = '/telegram/api_get_cars/';
export const API_GET_CARS = '/parsing/brands/';
// incomin filters

export const API_SET_FILTER = '/subscription/filters/';
export const API_SEARCH_FILTER = '/telegram/api_search_filters_v2/';
export const API_SEARCH_FILTERS = '/telegram/api_search_filters/';
export const API_GET_FILTER_BRANDS = '/subscription/filters/get_filters_brands/';
export const API_GET_FILTER_MODELS = '/subscription/filters/get_filters_models/';
export const API_GET_FILTER_GENERATION = '/subscription/filters/get_filters_generations/';
// requests
export const API_CREATE_REQUEST_V2 = '/parsing/parsing/';


export const API_GET_COUNTRIES = '/telegram/api_get_countrys/';
export const API_GET_REQUEST_BY_TYPE = '/telegram/api_get_requests_by_type/';
export const API_DUBLICATE_REQUEST = '/telegram/api_dublicate_request/';
export const API_DELETE_REQUEST = '/telegram/api_delete_request/';
export const API_GET_USER_RAITING = '/telegram/api_get_users_rating/';
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

// marketplace 
export const API_ENGINES_MARKET_GET_STATUS = '/api_engines/engines/get_status_upload/';
export const API_ENGINES_MARKET_DELETE_LINK = '/api_engines/engines/delete_url/';
export const API_ENGINES_MARKET_DELETE_FILE = '/api_engines/engines/delete_file/';
export const API_ENGINES_MARKET_REDIRECT = '/api_engines/';
export const API_ENGINES_DELETE_IMAGE_FROM_CARD_MARKET = '/api_engines/engines/delete_image/';
export const DELETE_MY_CARDS_MARKETPLACE = '/api_engines/engines/delete_one_card/';
export const API_ENGINES_ADD_FAVORITE = '/api_engines/add_favorite/';
export const API_GET_LIST_MY_CARDS_MARKETPLACE = "/api_engines/engines/get_my_ads/"; 


export const API_ENGINES_MARKET = '/api_engines/engines/';
export const API_ENGINES_CHANGE_ONE_CARD_MARKET = '/api_engines/engines/change_one_card/';
export const API_ENGINES_GET_ONE_CARD_MP = '/api_engines/engines/get_one_card/';

export const API_ENGINES_ADD_FILE_CARDS_MP = '/api_engines/upload_file/';
export const API_GET_CATEGORY = `/api_engines/get_categories/`;
export const API_ENGINES_ADD_URL_CARDS_MP = '/api_engines/upload_url/';

export const API_ENGINE_SEARCH_DROP_OPTION = '/api_engines/search_citys/';
export const API_OPTIONS_LIST_ENGINES = '/api_engines/get_';

// review
export const API_GET_ALL_RAITINGS = '/telegram/api_get_all_users_list/'//"/api_get_all_ratings/" //
export const API_CREATE_RAITING = '/telegram/api_create_rating/';
export const API_CREATE_UPDATE_REPLY_RAITING ="/telegram/api_create_update_reply/";
export const API_TOP_RAITING = '/telegram/api_top_rating/';
export const API_GET_ALL_GARANT_MEMBERS = '/telegram/api_get_all_garant_members/';
export const API_GET_CITY_MEMBERS = '/telegram/api_get_city_members_v2/';//'/api_get_city_members/';
export const API_GET_LIST_CITIES_WARRANT_MEMBER = '/telegram/api_get_garant_members/';
// https://botrazbor.ru/telegram/api_get_all_users_list/
export const API_GET_RATINGS = "/telegram/api_get_ratings/"
// profile
export const API_GET_CONTEXT_PROFILE = '/telegram/api_get_context_profile/'; // page_id: 31
export const API_GET_PROFILE_DATA = '/telegram/api_get_profile_form/';
export const API_GET_PAYMENT_URL = '/telegram/api_get_pay_url/';
export const API_CHANGE_PROFILE = '/telegram/api_edit_profile/';
export const API_UNSUBSCRIBE_AUTO_PAYMENT = '/telegram/api_cancel_user_auto_payment/';
// sale car  
export const CREATE_CAR_SALE = '/telegram/api_create_sale/'; // old request sell auto

// chain motors
export const API_GET_CARDS_MOTORS = '/api_engines/cards/';
export const API_GET_ONE_CARD_MOTOR = "/api_engines/cards/get_one_card/";

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

// Chain motors
export const CHAIN_MOTORS = "/china-motors";
export const ONE_CARD_CHAIN_MOTOR = '/card-china-motors'

// menu

export const menuTop = [
  {
    name: "Фильтра",
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
    name: "Ищу (создать запрос)",
    slug: MAKE_REQUEST_MENU,
    id: 2,
    text: "Ищу (создать запрос)",
    image: createRequestDefault,
    type: "page_make_requests",
    url: null,
    isActive: true,
    isFooter: false,
  },
  {
    name: "Рейтинг",
    slug: REITING_MENU,
    id: 9,
    text: "Рейтинг",
    image: starmenu,
    type: "page_rating",
    url: null,
    isActive: true,
    isFooter: false,
  },
];

export const menuFooter = [
  {
    "name": "",
    "slug": ROOT,
    "id": 1,
    "text": "Главная",
    "image": home,
    "type": "page_main",
    "url": null,
    isActive: true,
    isFooter: true,
  },
  {
    name: "Фильтра",
    slug: INCOMING_REQUEST_UNIT_SPARE,
    id: 8,
    text: "Фильтра",
    image: filterWhite,
    type: "page_filters",
    url: null,
    isActive: true,
    isFooter: true,
  },
  {
    "name": "Ищу (создать запрос)",
    "slug": MAKE_REQUEST_MENU,
    "id": 2,
    "text": "Ищу (создать запрос)",
    "image": createRequestDefault,
    "type": "page_make_requests",
    "url": null,
    isActive: true,
    isFooter: true,
  }, 
  {
    "name": "Рейтинг",
    "slug": REITING_MENU,
    "id": 9,
    "text": "Рейтинг",
    "image": [starFooterActive, starFooterDefault],
    "type": "page_rating",
    "url": null,
    isActive: true,
    isFooter: true,
  },
  
]

export const menuRequests = [
  {
    "name": "Запрос на агрегат",
    "slug": MAKE_REQUEST_UNIT,
    "id": 8,
    "text": "Запрос \n на агрегат",
    "image": engine,
    "type": "Запрос",
    "url": "https://botrazbor.ru/telegram/api_get_cars/",
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
    "url": "https://botrazbor.ru/telegram/api_get_cars/",
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

export const menuProfile = [
  {
    "name": "Мои отзывы",
    "image": starStrokeWhite,
    "slug": PROFILE_MY_REVIEW,
    isSlider: true,
    isActive: true,
  },
  {
    "name": "Мои объявления",
    "image": rowVertical,
    "slug": MARKETPLACE_OWN_CARDS,
    isSlider: true,
    isActive: true,
  },

]
export const menuMarketCreateCard = [
  {
    id: 2,
    "name": "Создать объявление вручную",
    "image": null,
    "images": [editMarket],
    "slug": MARKETPLACE_CREATE_CARD,
    oneBigSlide: true,
    isSlider: false,
    isActive: true,
    height: 128,
    tab: 'hand',
  },
  {
    id: 1,
    "name": "Загрузить",
    "images": [fileAdditionOne],
    "slug": MARKETPLACE_ADD_CARDS_FROM_FILE,
    tab: 'file',
    oneBigSlide: true,
    height: 128,
    isSlider: false,
    isActive: true,
  },
]

export const menuMarketInnerCreateCard = [
  {
    id: 2,
    "name": "Создать вручную",
    "image": null,
    "images": [editMarket],
    "slug": MARKETPLACE_CREATE_CARD,
    isSlider: false ,
    oneBigSlide: true,
    tab: 'hand',
    isDisable: false,
    isActive: true,
  },
]
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
// list elementov for create market card
export const listItemsCreateMarketCardNew = {
  'common-info': [{
    title: 'Общая информация',
    id: 0,
    icon: plusDarkBlue,
    type: 'country',
    section: [
      {
        key: 'title',
        type: 'country',
        title: 'Название',
        placeholder: 'Заголовок для объявления',
        distationtop: [90]
      },
      {
        key: 'country_id',
        type: 'country',
        title: 'Страна',
        placeholder: 'Все',
      },
      {
        key: 'city_id',
        type: 'country',
        title: 'Город',
        placeholder: 'Все',
      },
    ]
  }],
  'aggrigate': [{
    title: 'Применимость',
    id: 1,
    icon: plusDarkBlue,
    type: 'aggrigate',
    section: [
      {
        title: 'Марка',
        placeholder: 'Любая',
        key: 'brand_id'
      },
      {
        title: 'Модель',
        placeholder: 'Любая',
        key: 'model_id'
      },
      {
        title: 'Поколение',
        placeholder: 'Любое',
        key: 'generation_id'
      },
      {
        title: 'Категория',
        placeholder: 'Любое',
        key: 'category_id'
      },


      
      {
        title: 'Цена',
        placeholder: 'Любое',
        key: 'price'
      },
      {
        title: 'Номер каталога(OEM)',
        placeholder: 'Любое',
        key: 'oem',
      },
      {
        title: 'Состояние',
        placeholder: 'Любое',
        key: 'condition',
      },
      {
        title: 'Количество',
        placeholder: 'Любое',
        key: 'count',
      },
      {
        title: 'Описание товара',
        placeholder: 'Напишите немного о товаре',
        key: 'description',
      },
    ]

  }],
  'own-info': [{
    title: 'Личная информация',
    id: 2,
    icon: plusDarkBlue,
    type: 'self-info',
    section: [
      {
        title: 'Телефон',
        placeholder: '+7 (000) 000-00-00',
        key: 'phone'
      },
      {
        title: 'Адрес',
        placeholder: 'Например, Ленина 23/а',
        key: 'address'
      },
    ]
  }],
  'add-files': [{
    title: 'Добавьте фотографии',
    id: 3,
    icon: plusDarkBlue,
    type: 'add-photo',
    section: [
      {
        title: 'Url изображения (необязательно)',
        placeholder: 'Ссылка',
        key: 'link'
      },
    ]
  }],

}

export const listItemsCreateMarketCard = [
  {
    title: 'Общая информация',
    id: 0,
    icon: plusDarkBlue,
    type: 'country',
    section: [
      {
        title: 'Название',
        placeholder: 'Заголовок для объявления',
        key: 'title'
      },
      {
        title: 'Страна',
        placeholder: 'Все',
        key: 'country_id'
      },
      {
        title: 'Город',
        placeholder: 'Все',
        key: 'city_id'
      },
    ]
  },
  {
    title: 'Применимость',
    id: 1,
    icon: plusDarkBlue,
    type: 'aggrigate',
    section: [
      {
        title: 'Марка',
        placeholder: 'Любая',
        key: 'brand_id'
      },
      {
        title: 'Модель',
        placeholder: 'Любая',
        key: 'model_id'
      },
      {
        title: 'Поколение',
        placeholder: 'Любое',
        key: 'generation_id'
      },
      {
        title: 'Категория',
        placeholder: 'Любое',
        key: 'category_id'
      },
      {
        title: 'Цена',
        placeholder: 'Любое',
        key: 'price'
      },
      {
        title: 'Номер каталога(OEM)',
        placeholder: 'Любое',
        key: 'oem',
      },
      {
        title: 'Состояние',
        placeholder: 'Любое',
        key: 'condition',
      },
      {
        title: 'Количество',
        placeholder: 'Любое',
        key: 'count',
      },
      {
        title: 'Описание товара',
        placeholder: 'Напишите немного о товаре',
        key: 'description',
      },
    ]

  },
  {
    title: 'Личная информация',
    id: 2,
    icon: plusDarkBlue,
    type: 'self-info',
    section: [
      {
        title: 'Телефон',
        placeholder: '+7 (000) 000-00-00',
        key: 'phone'
      },
      {
        title: 'Адрес',
        placeholder: 'Например, Ленина 23/а',
        key: 'address'
      },
    ]
  },
  {
    title: 'Добавьте фотографии',
    id: 3,
    icon: plusDarkBlue,
    type: 'add-photo',
    section: [
      {
        title: 'Url изображения (необязательно)',
        placeholder: 'Ссылка',
        key: 'link'
      },
    ]
  },

]

// const localStorage
// save last url
export const LAST_PATH_FEEDBACK = 'lastPathFeedback';
export const LAST_PATH_CREATE_ADV = 'lastPathCreateAdv';
export const LAST_PATH_DETAIL_CARD = 'lastPathDetailCard';
export const LAST_PATH_FILTER_MARKET = 'lastPathFilterMarket';
export const LAST_PATH_MY_FAVORITE_CARDS = 'lastPathMyFavoriteCards';
export const LAST_PATH_SEND_REVIEW = 'lastPathSendReview';
export const LAST_PATH_OWN_REQUEST = 'lastPathOwnRequest';
export const LAST_PATH_HOW_TO_SETUP = 'lastPathHowToSetup';
export const LAST_PATH_FULL_INFO = 'lastPathFullInfo';
export const MARKET_CURRENT_TAB_ADD_CARDS = 'marketCurrentTabsAddCards';
export const CITY_ID_FOR_WARANTLY_MEMBER = 'city-id-warantly-mamber';
export const MARKET_PAGE_CATALOG = 'market-page-catalog';
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