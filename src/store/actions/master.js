import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchMastersSuccess = masters => {
    return {
        type: actionTypes.FETCH_MASTERS_SUCCESS,
        masters: masters
    };
};

export const fetchMastersFail = error => {
    return {
        type: actionTypes.FETCH_MASTERS_FAIL,
        error: error
    };
};

export const fetchMastersStart = () => {
    return {
        type: actionTypes.FETCH_MASTERS_START
    };
};

export const fetchMasters = (salonId, locationId) => {
    return async dispatch => {
        dispatch(fetchMastersStart());

        try {
            const masters = await axios.get("widget/masters", {
                params: {
                    salonId,
                    locationId
                }
            });
            dispatch(fetchMastersSuccess(masters.data));
        } catch (error) {
            dispatch(fetchMastersFail(error));
        }
    };
};
