import * as actionType from "./actionTypes";

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");

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
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authClient(token, userId));
                const expiresIn =
                    (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(expiresIn));
            }
        }
    };
};
