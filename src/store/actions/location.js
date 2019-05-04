import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchLocationsSuccess = locations => {
    return {
        type: actionTypes.FETCH_LOCATIONS_SUCCESS,
        locations: locations
    };
};

export const fetchLocationsFail = error => {
    return {
        type: actionTypes.FETCH_LOCATIONS_FAIL,
        error: error
    };
};

export const fetchLocationsStart = () => {
    return {
        type: actionTypes.FETCH_LOCATIONS_START
    };
};

export const fetchLocations = salonId => {
    return async dispatch => {
        dispatch(fetchLocationsStart());

        try {
            const locations = await axios.get("widget/locations", {
                params: {
                    salonId
                }
            });
            dispatch(fetchLocationsSuccess(locations.data));
        } catch (error) {
            dispatch(fetchLocationsFail(error));
        }
    };
};
