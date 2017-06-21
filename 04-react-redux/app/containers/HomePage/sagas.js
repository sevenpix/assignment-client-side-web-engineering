import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { Types, Creators } from './actions';

export function* fetchConstructors(action) {
  try {
    const response = yield call(request, 'http://ergast.com/api/f1/constructors.json');
    const promises = [];

    const pageSize = 30;
    const total = response.MRData.total;
    let offset = 0;

    let constructors = response.MRData.ConstructorTable.Constructors;

    while (offset < total) {
      offset += pageSize;
      promises.push(fetch(`http://ergast.com/api/f1/constructors.json?offset=${offset}`));
    }

    yield Promise.all(promises).then((responses) => {
      responses.forEach((resp) => {
        const promise = resp.json();

        promise.then((data) => {
          constructors = constructors.concat(data.MRData.ConstructorTable.Constructors);
        });
      });
    });
    yield put(Creators.fetchConstructorsSuccess(constructors));
  } catch (err) {
    yield put(Creators.fetchConstructorsError(err));
  }
}

export function* fetchDrivers(action) {
  try {
    const url = `http://ergast.com/api/f1/constructors/${action.constructorId}/drivers.json?limit=1000`;
    const response = yield call(request, url);
    yield put(Creators.fetchDriversSuccess(response));
  } catch (err) {
    yield put(Creators.fetchDriversError(err));
  }
}

export function* sagaManager() {
  const watcher = yield [
    takeLatest(Types.FETCH_CONSTRUCTORS, fetchConstructors),
    takeLatest(Types.FETCH_DRIVERS, fetchDrivers),
  ];

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  sagaManager,
];
