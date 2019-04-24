import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    masters: [],
    loading: false
};

const fetchMastersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchMastersSuccess = (state, action) => {
    return updateObject(state, {
        masters: action.masters,
        loading: false
    });
};

const fetchMastersFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_MASTERS_START:
            return fetchMastersStart(state, action);
        case actionTypes.FETCH_MASTERS_SUCCESS:
            return fetchMastersSuccess(state, action);
        case actionTypes.FETCH_MASTERS_FAIL:
            return fetchMastersFail(state, action);
        default:
            return state;
    }
};

export default reducer;
