import { ADMIN_FORGET_PASSWORD_FAIL, ADMIN_FORGET_PASSWORD_REQ, ADMIN_FORGET_PASSWORD_SUCCESS, ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_GOOGLE_SIGNUP_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_RESET_PASSWORD_FAIL, ADMIN_RESET_PASSWORD_REQ, ADMIN_RESET_PASSWORD_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS, ADMIN_VERIFIED_STATUS_FAIL, ADMIN_VERIFIED_STATUS_REQ, ADMIN_VERIFIED_STATUS_SUCCESS, ADMIN_VERIFY_EMAIL_FAIL, ADMIN_VERIFY_EMAIL_REQ, ADMIN_VERIFY_EMAIL_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_ADMIN_ACCOUNT_DETAILS_FAIL, UPDATE_ADMIN_ACCOUNT_DETAILS_REQ, UPDATE_ADMIN_ACCOUNT_DETAILS_SUCCESS, UPDATE_ADMIN_FAIL, UPDATE_ADMIN_REQ, UPDATE_ADMIN_SUCCESS } from "../constants/AdminAuthConstants";

export const AdminRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_SIGNUP_REQ:
            return { ...state, loading: true };
        case ADMIN_SIGNUP_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_SIGNUP_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AdminLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_SIGNIN_REQ:
            return { ...state, loading: true };
        case ADMIN_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AdminGoogleLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_GOOGLE_SIGNIN_REQ:
            return { ...state, loading: true };
        case ADMIN_GOOGLE_SIGNIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_GOOGLE_SIGNUP_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_GOOGLE_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const AdminLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_LOGOUT_REQ:
            return { ...state, loading: true };
        case ADMIN_LOGOUT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_LOGOUT_FAIL:
            return { ...state, loading: false, error: action.payload }; 
        default:
            return state;
    }
};

export const AdminForgetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_FORGET_PASSWORD_REQ:
            return { ...state, loading: true };
        case ADMIN_FORGET_PASSWORD_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_FORGET_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const AdminResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_RESET_PASSWORD_REQ:
            return { ...state, loading: true };
        case ADMIN_RESET_PASSWORD_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_RESET_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

//Global refresh token not present error handling middleware
export const LoggedOutMiddlewareReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGGED_OUT_MIDDLEWARE_REQ:
            return { ...state, loading: true };
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
            return { ...state, loading: true };
        case LOGGED_IN_MIDDLEWARE_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case LOGGED_IN_MIDDLEWARE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};



export const updateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADMIN_REQ:
            return { ...state, loading: true };
        case UPDATE_ADMIN_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case UPDATE_ADMIN_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const updateAdminAccountDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ADMIN_ACCOUNT_DETAILS_REQ:
            return { ...state, loading: true };
        case UPDATE_ADMIN_ACCOUNT_DETAILS_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case UPDATE_ADMIN_ACCOUNT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminVerifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_VERIFY_EMAIL_REQ:
            return { ...state, loading: true };
        case ADMIN_VERIFY_EMAIL_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_VERIFY_EMAIL_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const adminVerifiedStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_VERIFIED_STATUS_REQ:
            return { ...state, loading: true };
        case ADMIN_VERIFIED_STATUS_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case ADMIN_VERIFIED_STATUS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};