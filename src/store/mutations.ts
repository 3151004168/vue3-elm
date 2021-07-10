import { stat } from "fs";
import {
  USER_INFO,
  SEARCH_HISTORY,
  HOME_NAV_INFO,
  SEARCH_RESTAURANT,
  PRICE,
} from "./mutation-types";

export default {
  [USER_INFO](state: any, userInfo: object) {
    return (state.userInfo = userInfo);
  },
  [SEARCH_HISTORY](state: any, searchHistory: object) {
    let boo = false;
    if (!state.searchHistory) {
      state.searchHistory = [];
    } else {
      state.searchHistory.forEach((e: object) => {
        if (e == searchHistory) return (boo = true);
      });
    }
    return boo ? state.searchHistory : state.searchHistory.push(searchHistory);
  },
  [HOME_NAV_INFO](state: any, homeNavInfo: object) {
    return (state.homeTitleInfo = homeNavInfo);
  },
  [SEARCH_RESTAURANT](state: any, searchRestaurant: string) {
    let boo = false;
    if (!state.searchRestaurant) {
      state.searchRestaurant = [];
    } else {
      state.searchRestaurant.forEach((e: string) => {
        if (e == searchRestaurant) return (boo = true);
      });
    }
    return boo
      ? state.searchRestaurant
      : state.searchRestaurant.push(searchRestaurant);
  },
  [PRICE](state: any, price: number,id:number) {
    state.price.
    return (state.price = price);
  },
};
