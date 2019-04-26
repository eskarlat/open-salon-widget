import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    location: null,
    services: [],
    master: null,
    time: null,
    clientId: null,
    loading: false,
    error: null,
    clientExist: true,
    receivedCodeValid: false,
    bookingSuccess: false
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

const resetData = (state, action) => {
    return updateObject(state, initialState);
};

export const checkPhoneSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        clientExist: action.clientExist,
        error: null
    });
};

export const checkPhoneFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

export const checkPhoneStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

export const checkReceivedCodeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        receivedCodeValid: action.status
    });
};

export const checkReceivedCodeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

export const checkReceivedCodeStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

export const bookingSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        bookingSuccess: action.status
    });
};

export const bookingFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

export const bookingStart = (state, action) => {
    return updateObject(state, {
        loading: true
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
        case actionTypes.RESET_DATA:
            return resetData(state, action);
        case actionTypes.CHECK_PHONE_SUCCESS:
            return checkPhoneSuccess(state, action);
        case actionTypes.CHECK_PHONE_FAIL:
            return checkPhoneFail(state, action);
        case actionTypes.CHECK_PHONE_START:
            return checkPhoneStart(state, action);
        case actionTypes.CHECK_RECEIVED_CODE_SUCCESS:
            return checkReceivedCodeSuccess(state, action);
        case actionTypes.CHECK_RECEIVED_CODE_START:
            return checkReceivedCodeStart(state, action);
        case actionTypes.CHECK_RECEIVED_CODE_FAIL:
            return checkReceivedCodeFail(state, action);
        case actionTypes.BOOKING_SUCCESS:
            return bookingSuccess(state, action);
        case actionTypes.BOOKING_START:
            return bookingStart(state, action);
        case actionTypes.BOOKING_FAIL:
            return bookingFail(state, action);
        default:
            return state;
    }
};

export default reducer;
