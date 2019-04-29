import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    isAuth: false
};

export const authClient = (state, action) => {
    return updateObject(state, {
        isAuth: true,
        token: action.token,
        userId: action.userId
    });
};

export const logout = (state, action) => {
    return updateObject(state, {
        isAuth: false,
        token: null,
        userId: null
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOGOUT:
            return logout(state, action);
        case actionTypes.AUTH_CLIENT:
            return authClient(state, action);
        default:
            return state;
    }
};

export default reducer;
