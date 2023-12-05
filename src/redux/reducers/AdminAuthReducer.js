import { ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS } from "../constants/AdminAuthConstants";

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