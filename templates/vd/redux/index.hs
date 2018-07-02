import createReducer from '../createReducer';
import * as types from './{{pascalCased}}.types';
import * as reducers from './{{pascalCased}}.reducers';
import { INITIAL_STATE } from './{{pascalCased}}.state';

export const reducer = createReducer(INITIAL_STATE, {
  [types.FIND]: reducers.find,
  [types.FIND_SUCCESS]: reducers.findSuccess,
  [types.FIND_FAILURE]: reducers.findFailure,
});
