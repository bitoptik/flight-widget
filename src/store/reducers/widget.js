import * as actionTypes from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
    selected: 'all'
};

const selectCarrier = (state, { payload }) => ({
    ...state,
    selected: payload,
});

export default createReducer(initialState, {
    [actionTypes.SELECT_CARRIER]: selectCarrier
});
