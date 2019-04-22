import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    location: null,
    services: [],
    master: null,
    time: null
};

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

const selectMaster = (state, action) => {
    return updateObject(state, {
        master: action.master
    });
};

const selectTime = (state, action) => {
    return updateObject(state, {
        time: action.time
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_LOCATION:
            return selectLocation(state, action);
        case actionTypes.SELECT_SERVICE:
            return selectService(state, action);
        case actionTypes.SELECT_MASTER:
            return selectMaster(state, action);
        case actionTypes.SELECT_TIME:
            return selectTime(state, action);
        default:
            return state;
    }
};

export default reducer;
