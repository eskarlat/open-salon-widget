import * as actionType from './actionTypes';

export const selectLocation = (location) => {
    return {
        type: actionType.SELECT_LOCATION,
        location: location
    }
};

export const selectService = (services) => {
    return {
        type: actionType.SELECT_SERVICE,
        services: services
    }
};