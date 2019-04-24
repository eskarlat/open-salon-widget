import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    time: [],
    loading: false
};

const fetchTimeAvailableStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchTimeAvailableSuccess = (state, action) => {
    return updateObject(state, {
        time: action.time,
        loading: false
    });
};

const fetchTimeAvailableFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIME_AVAILABLE_START:
            return fetchTimeAvailableStart(state, action);
        case actionTypes.FETCH_TIME_AVAILABLE_SUCCESS:
            return fetchTimeAvailableSuccess(state, action);
        case actionTypes.FETCH_TIME_AVAILABLE_FAIL:
            return fetchTimeAvailableFail(state, action);
        default:
            return state;
    }
};

export default reducer;
