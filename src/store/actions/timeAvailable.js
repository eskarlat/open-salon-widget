import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchTimeAvailableSuccess = time => {
    return {
        type: actionTypes.FETCH_TIME_AVAILABLE_SUCCESS,
        time: time
    };
};

export const fetchTimeAvailableFail = error => {
    return {
        type: actionTypes.FETCH_TIME_AVAILABLE_FAIL,
        error: error
    };
};

export const fetchTimeAvailableStart = () => {
    return {
        type: actionTypes.FETCH_TIME_AVAILABLE_START
    };
};

export const fetchTimeAvailable = ({ date, salonId, locationId, masterId }) => {
    return async dispatch => {
        dispatch(fetchTimeAvailableStart());

        const data = { date, salonId, locationId, masterId };

        try {
            const timeAvailable = await axios.post(
                "salons/available_time",
                data
            );
            dispatch(fetchTimeAvailableSuccess(timeAvailable.data));
        } catch (error) {
            dispatch(fetchTimeAvailableFail(error));
        }
    };
};
