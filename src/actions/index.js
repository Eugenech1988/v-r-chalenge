import * as types from 'actionTypes';


export const fetchOrdersRequest = () => ({ type: types.FETCH_ORDERS_REQUEST });
export const fetchOrdersSuccess = (payload) => ({ type: types.FETCH_ORDERS_SUCCESS, payload });
export const fetchOrdersError = (error) => ({ type: types.FETCH_ORDERS_ERROR, error });

export const searchOrders = (payload) => ({ type: types.SEARCH_ORDERS, payload });

export const setSearchField = (payload) => ({ type: types.SET_SEARCH_FIELD, payload });

export const setCurrentPage = (payload) => ({ type: types.SET_CURRENT_PAGE, payload });

export const setTableSorting = (name, dest) => ({ type: types.SET_TABLE_SORTING, name, dest });

export const toggleOrderCard = (payload) => ({ type: types.TOGGLE_ORDER_CARD, payload });
