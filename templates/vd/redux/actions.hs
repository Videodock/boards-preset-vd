import * as types from './{{pascalCased}}.types';

export const find = () => ({ type: types.FIND });

export const findSuccess = () => ({ type: types.FIND_SUCCESS });

export const findFailure = () => ({ type: types.FIND_FAILURE });
