import * as actionType from "./actionTypes";

export const logout = () => {
    localStorage.removeItem("os-widget-token");
    localStorage.removeItem("os-widget-expirationDate");
    localStorage.removeItem("os-widget-userId");

    return {
        type: actionType.AUTH_LOGOUT
    };
};

export const authClient = (token, userId) => {
    return {
        type: actionType.AUTH_CLIENT,
        token: token,
        userId: userId
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("os-widget-token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("os-widget-expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("os-widget-userId");
                dispatch(authClient(token, userId));
                const expiresIn =
                    (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expiresIn));
            }
        }
    };
};
