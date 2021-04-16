import { all } from 'redux-saga/effects';
import ordersSaga from './ordersSaga';


export default function* root() {
  yield all([
    ...ordersSaga
    // here you can place your sagas
  ]);
}
