import {
        createBrowserRouter,
        createRoutesFromElements,
        Route,
} from "react-router-dom";
import React, { Suspense } from "react";

import { MAKE_REQUEST_MENU, MAKE_REQUEST_OWN_REQUEST, 
        MAKE_REQUEST_UNIT,
         INCOMING_REQUEST_UNIT_SPARE,REITING_MENU, 
        REITING_CREATE,
        CAR_SALE,
        MAKE_REQUEST_OWN_EDIT_REQUEST,
        CAR_SALE_MENU,
        MAKE_REQUEST_SPARE,
        CAR_SALE_SPARE} from "../helpers/config";
import ErrorHandler from "../Pages/ErrorHandler/ErrorHandler";
import CarSellComponent from "../Pages/CarSell/SellCarForSellRequest/CarSellComponent";
import BackgroundPreloader from "../View/Preloaders/BackgroundPreloader";
import OwnRequestEditComponent from "../Pages/Requests/OwnRequestEdit/OwnRequestEditComponent";
import CarSellMenuComponent from "../Pages/CarSell/CarSellMenu/CarSellMenuComponent";
import SellCarForSpareRequestComponent from "../Pages/CarSell/SellCarForSpareRequest/SellCarForSpareRequestComponent";

const Layout = React.lazy(() => import("../Pages/Layuot/Layout"));
const Main = React.lazy(() => import("../Pages/Main/MainComponent"));
const RequestsComponent = React.lazy(() => import("../Pages/Requests/RequestsComponent"));

// ******************************************************************
const RaitingAndReviewMainComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewMainComponent"));
const RaitingAndReviewCreateReviewComponent = React.lazy(() => import("../Pages/RaitingAndReview/RaitingAndReviewCreateReview/RaitingAndReviewCreateReviewComponent"));
// ******************************************************************

const UnitRequestComponent = React.lazy(() => import("../Pages/Requests/UnitRequest/UnitRequestComponent"));
const SpareRequestComponent = React.lazy(() => import("../Pages/Requests/SpareRequest/SpareRequestComponent"));
const OwnRequestComponent = React.lazy(() => import("../Pages/Requests/OwnRequest/OwnRequestComponent"));
// ******************************************************************
const IncominRequestsUnitContainer = React.lazy(() => import("../Pages/IncominRequests/IncominRequestsUnit/IncominRequestsUnitContainer"));


export const router = createBrowserRouter(
        createRoutesFromElements(
                <Route path="/" element={<Suspense fallback={<BackgroundPreloader />}> <ErrorHandler><Layout /></ErrorHandler></Suspense>}>
                        <Route path="/" element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><Main /></ErrorHandler></Suspense>} />


                        {/* **********************ФИЛЬТРЫ -> Входящие заявки ****************** */}
                        <Route path={INCOMING_REQUEST_UNIT_SPARE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><IncominRequestsUnitContainer /></ErrorHandler></Suspense>} /> //Только Агрегаты +
                        {/* *****************СОЗДАТЬ ЗАПРОС*********************** */}
                        <Route path={MAKE_REQUEST_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RequestsComponent /></ErrorHandler></Suspense>} /> // СОЗДАТЬ ЗАПРОС  menu++
                        <Route path={MAKE_REQUEST_UNIT} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><UnitRequestComponent /></ErrorHandler></Suspense>} /> //Запрос на агрегат +
                        <Route path={MAKE_REQUEST_SPARE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><SpareRequestComponent /></ErrorHandler></Suspense>} /> //ЗАПРОС НА ЗАПЧАСТЬ +
                        <Route path={MAKE_REQUEST_OWN_REQUEST} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><OwnRequestComponent /></ErrorHandler></Suspense>} /> // мои заявоки +
                        <Route path={MAKE_REQUEST_OWN_EDIT_REQUEST} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><OwnRequestEditComponent/></ErrorHandler></Suspense>} /> // мои заявоки edit
                        {/* *****************продажа авто*********************** */}
                        <Route path={CAR_SALE_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><CarSellMenuComponent /></ErrorHandler></Suspense>} /> //продажа авто
                        <Route path={CAR_SALE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><CarSellComponent /></ErrorHandler></Suspense>} /> //продажа авто
                        <Route path={CAR_SALE_SPARE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><SellCarForSpareRequestComponent /></ErrorHandler></Suspense>} /> //НАПИСАТЬ ОТЗЫВ  - нет ключа info +

                   
                        {/* *****************РЕЙТИНГ И ОТЗЫВЫ*********************** */}
                        <Route path={REITING_MENU} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewMainComponent /></ErrorHandler></Suspense>} /> //РЕЙТИНГ И ОТЗЫВЫ  +
                        <Route path={REITING_CREATE} element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><RaitingAndReviewCreateReviewComponent /></ErrorHandler></Suspense>} /> //НАПИСАТЬ ОТЗЫВ  - нет ключа info +

                        <Route path="*" element={<Suspense fallback={<BackgroundPreloader />}><ErrorHandler><Main /></ErrorHandler></Suspense>} />
                </Route>
        )
);