import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';
import { storeonLogger } from 'storeon/devtools';

import { getPage } from './api-store/getpage';
import { helpers } from './helpers/helpers-store';
import { filtersIncominRequest } from './filters/filtersIncominRequest';
import { requests } from './requests/requests';
import { raitingReview } from './raiting-review/raiting-review';
import { feedback } from './feedback/feedback';
import { access } from './access/access';
import { carSale } from './car-sale/carSale';


export const store = createStoreon([
    access,
    getPage,
    helpers,
    carSale,
    requests,
    feedback,
    raitingReview, 
    filtersIncominRequest,
    
    process.env.NODE_ENV !== 'production' && storeonDevtools,
    // process.env.NODE_ENV !== 'production' && storeonLogger,
])