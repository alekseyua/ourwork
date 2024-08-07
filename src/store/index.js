import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { storeonLogger } from 'storeon/devtools';

import { getPage } from './api-store/getpage';
import { helpers } from './helpers/helpers-store';
import { marketplace } from './marketplace/marketplace';
import { uploadFileCard } from './marketplace/uploadFileCard/uploadFileCard';
import { createCardMarketPlace } from './marketplace/createCardMarketPlace/createCardMarketPlace';
import { filtersIncominRequest } from './filters/filtersIncominRequest';
import { filtermarketplace } from './marketplace/filtermarketplace/filtermarketplace';
import { myMarketplace } from './marketplace/myMarketplace/myMarketplace';
import { profile } from './profile/profile';
import { requests } from './requests/requests';
import { raitingReview } from './raiting-review/raiting-review';
import { feedback } from './feedback/feedback';
import { access } from './access/access';
import { carSale } from './car-sale/carSale';
import { chainMotors } from './chain-motors/chain-motors';


export const store = createStoreon([
    access,
    getPage,
    helpers,
    profile,
    carSale,
    requests,
    feedback,
    chainMotors,
    raitingReview, 
    
    marketplace,
    myMarketplace,
    uploadFileCard,
    filtermarketplace,
    filtersIncominRequest,
    createCardMarketPlace,
    
    process.env.NODE_ENV !== 'production' && storeonDevtools,
    // process.env.NODE_ENV !== 'production' && storeonLogger,
])