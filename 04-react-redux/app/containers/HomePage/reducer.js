import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

const initialState = fromJS({
  constructors: [],
  drivers: [],
});

const fetchConstructorsSuccess = ((state = initialState, action) =>
  state.set('constructors', action.response)
);

const fetchConstructorsError = (() =>
  console.log('FETCH CONSTRUCTORS ERROR')
);

const fetchDrivers = ((state = initialState) =>
  state.set('drivers', [])
);

const fetchDriversSuccess = ((state = initialState, action) =>
  state.set('drivers', action.response.MRData.DriverTable.Drivers)
);

const fetchDriversError = (() =>
  console.log('FETCH DRIVERS ERROR')
);

export const handlers = {
  [Types.FETCH_CONSTRUCTORS_SUCCESS]: fetchConstructorsSuccess,
  [Types.FETCH_CONSTRUCTORS_ERROR]: fetchConstructorsError,
  [Types.FETCH_DRIVERS]: fetchDrivers,
  [Types.FETCH_DRIVERS_SUCCESS]: fetchDriversSuccess,
  [Types.FETCH_DRIVERS_ERROR]: fetchDriversError,
};

export default createReducer(initialState, handlers);
