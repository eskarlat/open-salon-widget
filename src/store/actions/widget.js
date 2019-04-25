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

export const checkPhoneSuccess = () => {
    return {
        type: actionType.CHECK_PHONE_SUCCESS
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
            await axios.post("auth/check_phone", {
                phone
            });
            dispatch(checkPhoneSuccess());
        } catch (error) {
            dispatch(checkPhoneFail(error));
        }
    };
};

export const checkReceivedCodeSuccess = () => {
    return {
        type: actionType.CHECK_RECEIVED_CODE_SUCCESS
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
            await axios.post("auth/check_code", {
                phone,
                code
            });
            dispatch(checkReceivedCodeSuccess());
        } catch (error) {
            dispatch(checkReceivedCodeFail(error));
        }
    };
};
