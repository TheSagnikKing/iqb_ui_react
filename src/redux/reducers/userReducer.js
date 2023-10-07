import { NEW_PASSWORD_RESET_FAIL, NEW_PASSWORD_RESET_REQ, NEW_PASSWORD_RESET_SUCCESS, PASSWORD_RESET_EMAIL_FAIL, PASSWORD_RESET_EMAIL_REQ, PASSWORD_RESET_EMAIL_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQ, USER_LOGOUT_RESET, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQ, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS } from "../constants/userConstants"

export const signupReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNUP_REQ:
            return {loading:true}
        case USER_SIGNUP_SUCCESS:
            return {success:true,...action.payload}
        case USER_SIGNUP_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
} 

export const signinReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNIN_REQ:
            return {loading:true}
        case USER_SIGNIN_SUCCESS:
            return {...action.payload}
        case USER_SIGNIN_FAIL:
            return {loading:false, error:action.payload}
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state
    }
} 

export const logoutReducer = (state = {}, action) => {
    switch(action.type){
        case USER_LOGOUT_REQ:
            return {loading:true}
        case USER_LOGOUT_SUCCESS:
            return {success:true}
        case USER_LOGOUT_FAIL:
            return {loading:false, error:action.payload}
        case USER_LOGOUT_RESET:
            return {}
        default:
            return state
    }
} 

export const passwordResetEmailReducer = (state = {}, action) => {
    switch(action.type){
        case PASSWORD_RESET_EMAIL_REQ:
            return {loading:true}
        case PASSWORD_RESET_EMAIL_SUCCESS:
            return {success:true, message:action.payload}
        case PASSWORD_RESET_EMAIL_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
} 

export const newPasswordResetReducer = (state = {}, action) => {
    switch(action.type){
        case NEW_PASSWORD_RESET_REQ:
            return {loading:true}
        case NEW_PASSWORD_RESET_SUCCESS:
            return {success:true, message:action.payload}
        case NEW_PASSWORD_RESET_FAIL:
            return {loading:false, error:action.payload}
        default:
            return state
    }
} 