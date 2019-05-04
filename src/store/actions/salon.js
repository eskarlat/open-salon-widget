import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getSalonInfoSuccess = salon => {
    return {
        type: actionTypes.GET_SALON_INFO_SUCCESS,
        salon: salon
    };
};

export const getSalonInfoFail = error => {
    return {
        type: actionTypes.GET_SALON_INFO_FAIL,
        error: error
    };
};

export const getSalonInfoStart = () => {
    return {
        type: actionTypes.GET_SALON_INFO_START
    };
};

export const getSalonInfo = salonId => {
    return async dispatch => {
        dispatch(getSalonInfoStart());

        try {
            const response = await axios.get("widget/salons", {
                params: {
                    salonId
                }
            });
            dispatch(getSalonInfoSuccess(response.data));
        } catch (error) {
            dispatch(getSalonInfoFail(error));
        }
    };
};
