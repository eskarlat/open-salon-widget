import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchServicesSuccess = services => {
    return {
        type: actionTypes.FETCH_SERVICES_SUCCESS,
        services: services
    };
};

export const fetchServicesFail = error => {
    return {
        type: actionTypes.FETCH_SERVICES_FAIL,
        error: error
    };
};

export const fetchServicesStart = () => {
    return {
        type: actionTypes.FETCH_SERVICES_START
    };
};

export const fetchServices = salonId => {
    return async dispatch => {
        dispatch(fetchServicesStart());

        try {
            const services = await axios.get("widget/services", {
                params: {
                    salonId
                }
            });
            dispatch(fetchServicesSuccess(services.data));
        } catch (error) {
            dispatch(fetchServicesFail(error));
        }
    };
};
