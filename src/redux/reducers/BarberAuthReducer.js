import { BARBER_FORGET_PASSWORD_FAIL, BARBER_FORGET_PASSWORD_REQ, BARBER_FORGET_PASSWORD_SUCCESS, BARBER_GOOGLE_SIGNIN_FAIL, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS, BARBER_GOOGLE_SIGNUP_SUCCESS, BARBER_LOGOUT_FAIL, BARBER_LOGOUT_REQ, BARBER_LOGOUT_SUCCESS, BARBER_ONLINE_STATUS_FAIL, BARBER_ONLINE_STATUS_REQ, BARBER_ONLINE_STATUS_SUCCESS, BARBER_QUELIST_FAIL, BARBER_QUELIST_REQ, BARBER_QUELIST_SUCCESS, BARBER_RESET_PASSWORD_FAIL, BARBER_RESET_PASSWORD_REQ, BARBER_RESET_PASSWORD_SUCCESS, BARBER_SIGNIN_FAIL, BARBER_SIGNIN_REQ, BARBER_SIGNIN_SUCCESS, BARBER_SIGNUP_FAIL, BARBER_SIGNUP_REQ, BARBER_SIGNUP_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_BARBER_ACCOUNT_DETAILS_FAIL, UPDATE_BARBER_ACCOUNT_DETAILS_REQ, UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/BarberAuthConstants";
import { BARBER_SERVED_QUEUE_FAIL, BARBER_SERVED_QUEUE_REQ, BARBER_SERVED_QUEUE_SUCCESS } from "../constants/barberConstants";

export const barberRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_SIGNUP_REQ:
            return { ...state, loading: true };
        case BARBER_SIGNUP_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_SIGNUP_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_SIGNIN_REQ:
            return { ...state, loading: true };
        case BARBER_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberGoogleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_GOOGLE_SIGNIN_REQ:
            return { ...state, loading: true };
        case BARBER_GOOGLE_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_GOOGLE_SIGNUP_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_GOOGLE_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const barberLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_LOGOUT_REQ:
            return { ...state, loading: true };
        case BARBER_LOGOUT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload }; 
        default:
            return state;
    }
};

export const barberForgetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_FORGET_PASSWORD_REQ:
            return { ...state, loading: true };
        case BARBER_FORGET_PASSWORD_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_FORGET_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_RESET_PASSWORD_REQ:
            return { ...state, loading: true };
        case BARBER_RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_RESET_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

//Global refresh token not present error handling middleware
export const LoggedOutMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_OUT_MIDDLEWARE_REQ:
            return { ...state, loading: false };
        case LOGGED_OUT_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case LOGGED_OUT_MIDDLEWARE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const LoggedInMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_IN_MIDDLEWARE_REQ:
            return { ...state, loading: false };
        case LOGGED_IN_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case LOGGED_IN_MIDDLEWARE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};



export const updatebarberReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BARBER_REQ:
            return { ...state, loading: true };
        case UPDATE_BARBER_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case UPDATE_BARBER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const updatebarberAccountDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BARBER_ACCOUNT_DETAILS_REQ:
            return { ...state, loading: true };
        case UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case UPDATE_BARBER_ACCOUNT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberOnlineStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_ONLINE_STATUS_REQ:
            return { ...state, loading: true };
        case BARBER_ONLINE_STATUS_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_ONLINE_STATUS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberQuelistReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_QUELIST_REQ:
            return { ...state, loading: true };
        case BARBER_QUELIST_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_QUELIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const barberServedQueReducer = (state = {}, action) => {
    switch (action.type) {
        case BARBER_SERVED_QUEUE_REQ:
            return { ...state, loading: true };
        case BARBER_SERVED_QUEUE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case BARBER_SERVED_QUEUE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};