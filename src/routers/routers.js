import {
        createBrowserRouter,
        createRoutesFromElements,
        Route,
} from "react-router-dom";
import React, { Suspense } from "react";

import { MARKETPLACE_ADD_CARDS_FROM_FILE, MARKETPLACE_CREATE_CARD, MARKETPLACE_DETAILY_CARD, MARKETPLACE_EDIT_OWN_CARD, REITING_FULL_INFO, INCOMING_REQUEST_INFO_SETTING, MAKE_REQUEST_MENU, MAKE_REQUEST_OWN_REQUEST, 
        MAKE_REQUEST_RESPAIR, MAKE_REQUEST_SPARE, MAKE_REQUEST_TRANSPORT, MAKE_REQUEST_TRUCK, MAKE_REQUEST_UNIT, MARKETPLACE_MAIN, MARKETPLACE_FAVORITE, MARKETPLACE_FILTER, MARKETPLACE_OWN_CARDS, PROFILE_MENU, 
        PROFILE_EDIT, PROFILE_MY_REVIEW, PROFILE_SUBSCRIBE, INCOMING_REQUEST_MENU, INCOMING_REQUEST_TRUCK, INCOMING_REQUEST_UNIT_SPARE, INCOMING_REQUEST_RESPAIR, INCOMING_REQUEST_TRANSPORT, REITING_MENU, 
        REITING_CREATE, REITING_WARRANT_ADMIN, REITING_WARRANT_MEMBER, PROFILE_INFO, FEEDBACK_GET_MANY_FOR_IDEA, 
        CAR_SALE,
        MAKE_REQUEST_OWN_EDIT_REQUEST,
        FIXEDS_BUGS,
        CHAIN_MOTORS,
        ONE_CARD_CHAIN_MOTOR} from "../helpers/config";
import ErrorHandler from "../Pages/ErrorHandler/ErrorHandler";
import CarSellComponent from "../Pages/CarSell/SpareRequest/CarSellComponent";
import BackgroundPreloader from "../View/Preloaders/BackgroundPreloader";
import OwnRequestEditComponent from "../Pages/Requests/OwnRequestEdit/OwnRequestEditComponent";
import FixBugsContainer from "../Pages/FixBugs/FixBugsContainer";
import CatalogchainMotorsContainer from "../Pages/CatalogchainMotors/CatalogchainMotorsContainer";
import DetaliCardsMotorChainContainer from "../Pages/CatalogchainMotors/DetaliCardsMotorChain/DetaliCardsMotorChainContainer";

const Layout = React.lazy(() => import("../Pages/Layuot/Layout"));
const Main = React.lazy(() => import("../Pages/Main/MainComponent"));

const FeedbackGetMonyForIdeaComponent = React.lazy(() => import("../Components/FeedbackSections/FeedbackGetMonyForIdeaComponent"));

const MarketPlaceContainer = React.lazy(() => import("../Pages/MarketPlace/MarketPlaceContainer"));
const MyFavoriteContainer = React.lazy(() => import("../Pages/MarketPlace/MyFavorite/MyFavoriteContainer"));
const FiltersContainer = React.lazy(() => import("../View/Filters/FiltersContainer"));
const CreateCardMarketPlaceContainer = React.lazy(() => import("../Pages/MarketPlace/CreateCardMarketPlace/CreateCardMarketPlaceContainer"));
const DetailsCardsMPContainer = React.lazy(() => import("../Pages/MarketPlace/DetailsCardsMP/DetailCardsMPContainer"));
const EditCardMarketPlaceContainer = React.lazy(() => import("../Pages/MarketPlace/EditCardMarketPlace/EditCardMarketPlaceContainer"));
const AddFileMarketPlace = React.lazy(() => import("../Components/Component.CreateMarket/Component.AddFileMarketPlace"));
const MyMarketplacePageContainer = React.lazy(() => import("../Pages/MarketPlace/MyMarketPlace/MyMarketplacePageContainer"));
// ******************************************************************
const ProfileContainer = React.lazy(() => import("../Pages/Profile/ProfileContainer"));
const SubscribeContainer = React.lazy(() => import("../Pages/Profile/Subscribe/SubscribeContainer"));
const EditProfileContainer = React.lazy(() => import("../Pages/Profile/EditProfile/EditProfileContainer"));
const OwnProfileReviewComponent = React.lazy(() => import("../Pages/Profile/OwnProfileReview/OwnProfileReviewComponent"));
const InfoPageProfile = React.lazy(() => import("../Pages/Profile/Detail/InfoPageProfile"));
// ******************************************************************
const RaitingAndReviewMainComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewMainComponent"));
const RaitingAndReviewInfoAboutUserComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewInfoAboutUser/RaitingAndReviewInfoAboutUserComponent"));
const RaitingAndReviewCreateReviewComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewCreateReview/RaitingAndReviewCreateReviewComponent"));
const RaitingAndReviewWarrantlyForAdminComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewWarrantlyForAdmin/RaitingAndReviewWarrantlyForAdminComponent"));
const RaitingAndReviewWarrantlyForMembersComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewWarrantlyForMembers/RaitingAndReviewWarrantlyForMembersComponent"));
// ******************************************************************

const RequestsComponent = React.lazy(() => import("../Pages/Requests/RequestsComponent"));
const UnitRequestComponent = React.lazy(() => import("../Pages/Requests/UnitRequest/UnitRequestComponent"));
const SpareRequestComponent = React.lazy(() => import("../Pages/Requests/SpareRequest/SpareRequestComponent"));
const TruckRequestComponent = React.lazy(() => import("../Pages/Requests/TruckRequest/TruckRequestComponent"));
const TransportRequestComponent = React.lazy(() => import("../Pages/Requests/TransportRequest/TransportRequestComponent"));
const OwnRequestComponent = React.lazy(() => import("../Pages/Requests/OwnRequest/OwnRequestComponent"));
const RespairRequestComponent = React.lazy(() => import("../Pages/Requests/RespairRequest/RespairRequestComponent"));
// ******************************************************************
const IncominRequestsComponent = React.lazy(() => import("../Pages/IncominRequests/IncominRequestsComponent"));
const IncominRequestsUnitContainer = React.lazy(() => import("../Pages/IncominRequests/IncominRequestsUnit/IncominRequestsUnitContainer"));
const IncomingRequestRespairComponent = React.lazy(() => import("../Pages/IncominRequests/IncomingRequestRespair/IncomingRequestRespairComponent"));
const IncomingRequestTruckComponent = React.lazy(() => import("../Pages/IncominRequests/IncomingRequestTruck/IncomingRequestTruckComponent"));
const IncomingRequestHowToSetup = React.lazy(() => import("../Pages/IncominRequests/IncomingRequestHowToSetup/IncomingRequestHowToSetup"));
const IncomingRequestTransportComponent = React.lazy(() => import("../Pages/IncominRequests/IncomingRequestTransport/IncomingRequestTransportComponent"));


export const router = createBrowserRouter(
        createRoutesFromElements(
                <Route path="/" element={<Suspense fallback={<BackgroundPreloader />}> <ErrorHandler><Layout /></ErrorHandler></Suspense>}>
                        <Route path="/" element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><Main /></ErrorHandler></Suspense>} />

                        <Route path={FEEDBACK_GET_MANY_FOR_IDEA} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><FeedbackGetMonyForIdeaComponent /></ErrorHandler></Suspense>} />
                        <Route path={FIXEDS_BUGS} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><FixBugsContainer /></ErrorHandler></Suspense>} />

                        {/* ******************"Маркет"********************** */}
                        <Route path={MARKETPLACE_MAIN} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><MarketPlaceContainer /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_FAVORITE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><MyFavoriteContainer /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_FILTER} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><FiltersContainer /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_DETAILY_CARD} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><DetailsCardsMPContainer /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_ADD_CARDS_FROM_FILE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><AddFileMarketPlace /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_OWN_CARDS} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><MyMarketplacePageContainer /></ErrorHandler></Suspense>} />
                        <Route path={MARKETPLACE_CREATE_CARD} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><CreateCardMarketPlaceContainer /></ErrorHandler></Suspense>} />
                        <Route path={`${MARKETPLACE_EDIT_OWN_CARD}/:id`} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><EditCardMarketPlaceContainer /></ErrorHandler></Suspense>} />

                        {/* ******************Профиль и Информация********************** */}
                
                        <Route path={PROFILE_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><ProfileContainer /></ErrorHandler></Suspense>} /> // Профиль  +
                        <Route path={PROFILE_SUBSCRIBE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><SubscribeContainer /></ErrorHandler></Suspense>} /> // Профиль  +
                        <Route path={PROFILE_EDIT} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><EditProfileContainer /></ErrorHandler></Suspense>} /> //Информация
                        <Route path={PROFILE_MY_REVIEW} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><OwnProfileReviewComponent /></ErrorHandler></Suspense>} /> //мои отзывы
                        <Route path={PROFILE_INFO} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><InfoPageProfile /></ErrorHandler></Suspense>} /> //инфо о работе бота

                        {/* *****************СОЗДАТЬ ЗАПРОС*********************** */}
                        <Route path={MAKE_REQUEST_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RequestsComponent /></ErrorHandler></Suspense>} /> // СОЗДАТЬ ЗАПРОС  ++
                        <Route path={MAKE_REQUEST_UNIT} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><UnitRequestComponent /></ErrorHandler></Suspense>} /> //Запрос на агрегат +
                        <Route path={MAKE_REQUEST_SPARE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><SpareRequestComponent /></ErrorHandler></Suspense>} /> //ЗАПРОС НА ЗАПЧАСТЬ +
                        <Route path={MAKE_REQUEST_RESPAIR} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RespairRequestComponent /></ErrorHandler></Suspense>} /> //ЗАПРОС НА РЕМОНТ +
                        <Route path={MAKE_REQUEST_TRANSPORT} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><TransportRequestComponent /></ErrorHandler></Suspense>} /> //ЗАПРОС НА ГРУЗОВЫЕ  +
                        <Route path={MAKE_REQUEST_TRUCK} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><TruckRequestComponent /></ErrorHandler></Suspense>} /> // ЗАПРОС НА ГРУЗОПЕРЕВОЗКИ +
                        <Route path={MAKE_REQUEST_OWN_REQUEST} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><OwnRequestComponent /></ErrorHandler></Suspense>} /> // мои заявоки +
                        <Route path={MAKE_REQUEST_OWN_EDIT_REQUEST} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><OwnRequestEditComponent/></ErrorHandler></Suspense>} /> // мои заявоки +

                        {/* **********************ФИЛЬТРЫ -> Входящие заявки ****************** */}
                        <Route path={INCOMING_REQUEST_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncominRequestsComponent /></ErrorHandler></Suspense>} /> // ФИЛЬТРЫ +
                        <Route path={INCOMING_REQUEST_UNIT_SPARE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncominRequestsUnitContainer /></ErrorHandler></Suspense>} /> //Только Агрегаты +
                        <Route path={INCOMING_REQUEST_TRUCK} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncomingRequestTruckComponent /></ErrorHandler></Suspense>} /> // ГРУЗОВЫЕ +
                        <Route path={INCOMING_REQUEST_RESPAIR} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncomingRequestRespairComponent /></ErrorHandler></Suspense>} /> // Услуги по ремонту +
                        <Route path={INCOMING_REQUEST_TRANSPORT} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncomingRequestTransportComponent /></ErrorHandler></Suspense>} /> // Услуги по грузоперевозкам +
                        <Route path={INCOMING_REQUEST_INFO_SETTING} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncomingRequestHowToSetup /></ErrorHandler></Suspense>} /> // справка
                        {/* *****************РЕЙТИНГ И ОТЗЫВЫ*********************** */}
                        <Route path={REITING_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewMainComponent /></ErrorHandler></Suspense>} /> //РЕЙТИНГ И ОТЗЫВЫ  +
                        <Route path={REITING_FULL_INFO + '/:id'} element={<Suspense fallback={<BackgroundPreloader />}><RaitingAndReviewInfoAboutUserComponent /></Suspense>} /> //РЕЙТИНГ И ОТЗЫВЫ  +
                        <Route path={REITING_CREATE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewCreateReviewComponent /></ErrorHandler></Suspense>} /> //НАПИСАТЬ ОТЗЫВ  - нет ключа info +
                        <Route path={REITING_WARRANT_ADMIN} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewWarrantlyForAdminComponent /></ErrorHandler></Suspense>} /> //ГАРАНТ ОТ АДМИНИСТРАЦИИ +
                        <Route path={REITING_WARRANT_MEMBER} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewWarrantlyForMembersComponent /></ErrorHandler></Suspense>} /> //Наши гаранты участники +
                        {/* *****************продажа авто*********************** */}
                        <Route path={CAR_SALE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><CarSellComponent /></ErrorHandler></Suspense>} /> //продажа авто
                        {/* *****************Китайские моторы*********************** */}
                        <Route path={CHAIN_MOTORS} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><CatalogchainMotorsContainer /></ErrorHandler></Suspense>} /> //список маторов из китая
                        <Route path={ONE_CARD_CHAIN_MOTOR} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><DetaliCardsMotorChainContainer/></ErrorHandler></Suspense>} /> //развернутая карточка мотор из китая
                        
                        <Route path="*" element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><Main /></ErrorHandler></Suspense>} />
                </Route>
        )
);