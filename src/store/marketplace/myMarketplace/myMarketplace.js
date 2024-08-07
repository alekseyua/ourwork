import { handlerWarningInfoMessageResponse } from "../../../helpers/helpers"
import { DEFAULT_PAGE_SIZE_MARKET, DELETE_MY_CARDS_MARKETPLACE } from "../../../helpers/config"
import { ACTION_DELETE, _INIT } from "../../api-store/getpage";

export const ACTION_SET_CARDS_MY_MARKET = 'setMyMarketplace*'
export const ACTION_GET_CARD_MY_MARKET = "getMyMarketplace*";
export const ACTION_DELETE_CARD_FROM_MY_MARKET = 'deleteMyCard*'
export const ACTION_SET_CURRENT_PAGE_MY_MARKET = 'setMarketplaceCurrentPage*';
export const myMarketplace = store => {
  
  
  const initMyMarketplaceCurrentPage = 1;
  store.on(_INIT, () => ({ myMarketplaceCurrentPage: initMyMarketplaceCurrentPage }))
  store.on(ACTION_SET_CURRENT_PAGE_MY_MARKET, ({ _ }, data) => ({ myMarketplaceCurrentPage: data }));

  const initMyMarketplace = {
    count: 0,
    results: []
  }
  store.on(_INIT, () => ({ myMarketplace: initMyMarketplace }))
  store.on(ACTION_SET_CARDS_MY_MARKET, ({ _ }, data) => ({ myMarketplace: data }));


  store.on(ACTION_DELETE_CARD_FROM_MY_MARKET, async ({ myMarketplaceCurrentPage }, data, { dispatch }) => {
    const page = data?.page ?? myMarketplaceCurrentPage ?? 1;
    const params = {
      url: DELETE_MY_CARDS_MARKETPLACE,
      page: page,
      page_size: DEFAULT_PAGE_SIZE_MARKET,
      ...data,
      dataRequst: res => {
        if (res === undefined) return;
        const isWarning = handlerWarningInfoMessageResponse(res, dispatch);
        if (isWarning) return;

        return dispatch(ACTION_SET_CARDS_MY_MARKET, res)
      }
    }
    dispatch(ACTION_DELETE, params);
  })

}