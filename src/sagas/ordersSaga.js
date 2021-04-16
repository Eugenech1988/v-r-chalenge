import * as types from 'actionTypes';
import * as actions from 'actions';
import { fetchOrdersApi } from '../api';
import { call, put, takeLatest } from 'redux-saga/effects';


function* fetchOrders() {
  try {
    const response = yield call(fetchOrdersApi);
    yield put(actions.fetchOrdersSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(actions.fetchOrdersError(error));
  }
}

export default [
  takeLatest(types.FETCH_ORDERS_REQUEST, fetchOrders)
];
