import * as actionTypes from "./actionTypes";
import axios from "axios";

export const fetchReservationsSuccess = data => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_SUCCESS,
        reservations: data.reservations,
        client: data.client
    };
};

export const fetchReservationsFail = error => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_FAIL,
        error: error
    };
};

export const fetchReservationsStart = () => {
    return {
        type: actionTypes.FETCH_RESERVATIONS_START
    };
};

export const fetchReservations = (salonId, token) => {
    return async dispatch => {
        dispatch(fetchReservationsStart());

        try {
            const response = await axios.post("clients/reservations", {
                salonId,
                token
            });
            dispatch(fetchReservationsSuccess(response.data));
        } catch (error) {
            dispatch(fetchReservationsFail(error.response.data));
        }
    };
};
