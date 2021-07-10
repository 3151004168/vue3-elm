export async function getFoodList(actx: any) {
  const { data } = await actx.$http("/v2/index_entry");
  return data;
}

export async function getDinersList(
  actx: any,
  latitude: number,
  longitude: number
) {
  const { data } = await actx.$http("/shopping/restaurants", {
    params: {
      latitude: latitude,
      longitude: longitude,
    },
  });
  return data;
}

export async function getSearchRestuarant(
  actx: any,
  geohash: string,
  keyword: string
) {
  const { data } = await actx.$http("/v4/restaurants", {
    params: {
      geohash: geohash,
      keyword: keyword,
    },
  });
  return data;
}
export async function getOrders(actx: any, id: string | null) {
  const { data } = await actx.$http(`/bos/v2/users/${id}/orders`, {
    params: {
      limit: 10,
    },
  });
  return data;
}

export async function getShopList(actx: any) {
  const { data } = await actx.$http("/shopping/v2/restaurant/category");
  return data;
}

export async function getRestaurantInfo(actx: any, id: any) {
  const { data } = await actx.$http(`/shopping/restaurant/${id}`);
  return data;
}

export async function getShopCategory(actx: any, id: number) {
  const { data } = await actx.$http(`/shopping/getcategory/${id}`);
  return data;
}
