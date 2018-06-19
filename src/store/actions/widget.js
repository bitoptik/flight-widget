import * as actionTypes from './actionTypes';

const selectCarrier = (newState) => ({
    type: actionTypes.SELECT_CARRIER,
    payload: newState,
});

export {
    selectCarrier
};
