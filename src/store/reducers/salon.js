import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    salon: {},
    loading: false
};

const getSalonInfoStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const getSalonInfoSuccess = (state, action) => {
    return updateObject(state, {
        salon: action.salon,
        loading: false
    });
};

const getSalonInfoFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SALON_INFO_START:
            return getSalonInfoStart(state, action);
        case actionTypes.GET_SALON_INFO_SUCCESS:
            return getSalonInfoSuccess(state, action);
        case actionTypes.GET_SALON_INFO_FAIL:
            return getSalonInfoFail(state, action);
        default:
            return state;
    }
};

export default reducer;
