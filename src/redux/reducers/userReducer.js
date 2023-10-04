import { USER_LOGOUT_FAIL, USER_LOGOUT_REQ, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQ, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS } from "../constants/userConstants"

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
        default:
            return state
    }
} 