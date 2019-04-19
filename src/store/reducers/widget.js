import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    location: null,
    services: []
}

const selectLocation = (state, action) => {
    return updateObject(state, { 
        location: action.location
    });
};

const selectService = (state, action) => {
    return updateObject(state, { 
        services: action.services
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SELECT_LOCATION: return selectLocation(state, action);
        case actionTypes.SELECT_SERVICE: return selectService(state, action);
        default: return state;
    }
};

export default reducer;