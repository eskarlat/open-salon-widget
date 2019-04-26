import * as actionType from "./actionTypes";
import axios from "axios";

export const selectLocation = location => {
    return {
        type: actionType.SELECT_LOCATION,
        location: location
    };
};

export const selectService = services => {
    return {
        type: actionType.SELECT_SERVICE,
        services: services
    };
};

export const selectMaster = master => {
    return {
        type: actionType.SELECT_MASTER,
        master: master
    };
};

export const selectTime = time => {
    return {
        type: actionType.SELECT_TIME,
        time: time
    };
};

export const resetData = () => {
    return {
        type: actionType.RESET_DATA
    };
};

export const checkPhoneSuccess = data => {
    return {
        type: actionType.CHECK_PHONE_SUCCESS,
        clientExist: data.clientExist
    };
};

export const checkPhoneFail = error => {
    return {
        type: actionType.CHECK_PHONE_FAIL,
        error: error
    };
};

export const checkPhoneStart = () => {
    return {
        type: actionType.CHECK_PHONE_START
    };
};

export const checkPhone = phone => {
    return async dispatch => {
        dispatch(checkPhoneStart());

        try {
            const result = await axios.post("auth/check_phone", {
                phone
            });
            dispatch(checkPhoneSuccess(result.data));
        } catch (error) {
            dispatch(checkPhoneFail(error.data));
        }
    };
};

export const checkReceivedCodeSuccess = status => {
    return {
        type: actionType.CHECK_RECEIVED_CODE_SUCCESS,
        status: status
    };
};

export const checkReceivedCodeFail = error => {
    return {
        type: actionType.CHECK_RECEIVED_CODE_FAIL,
        error: error
    };
};

export const checkReceivedCodeStart = () => {
    return {
        type: actionType.CHECK_RECEIVED_CODE_START
    };
};

export const checkReceivedCode = (phone, code) => {
    return async dispatch => {
        dispatch(checkReceivedCodeStart());

        try {
            const result = await axios.post("auth/check_code", {
                phone,
                code
            });
            dispatch(checkReceivedCodeSuccess(result.data.valid));
        } catch (error) {
            dispatch(checkReceivedCodeFail(error.response.data));
        }
    };
};

export const bookingSuccess = () => {
    return {
        type: actionType.BOOKING_SUCCESS,
        status: true
    };
};

export const bookingFail = error => {
    return {
        type: actionType.BOOKING_FAIL,
        error: error
    };
};

export const bookingStart = () => {
    return {
        type: actionType.BOOKING_START
    };
};

export const booking = (booking, user) => {
    return async dispatch => {
        dispatch(bookingStart());

        try {
            await axios.post("reservations/create", {
                booking,
                user
            });
            dispatch(bookingSuccess());
        } catch (error) {
            dispatch(bookingFail(error.response.data));
        }
    };
};
