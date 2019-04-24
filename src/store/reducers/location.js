import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    locations: [],
    loading: false
};

const fetchLocationsStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchLocationsSuccess = (state, action) => {
    return updateObject(state, {
        locations: action.locations,
        loading: false
    });
};

const fetchLocationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_LOCATIONS_START:
            return fetchLocationsStart(state, action);
        case actionTypes.FETCH_LOCATIONS_SUCCESS:
            return fetchLocationsSuccess(state, action);
        case actionTypes.FETCH_LOCATIONS_FAIL:
            return fetchLocationsFail(state, action);
        default:
            return state;
    }
};

export default reducer;
