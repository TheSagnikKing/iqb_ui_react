import { ADMIN_FORGET_PASSWORD_FAIL, ADMIN_FORGET_PASSWORD_REQ, ADMIN_FORGET_PASSWORD_SUCCESS, ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_RESET_PASSWORD_FAIL, ADMIN_RESET_PASSWORD_REQ, ADMIN_RESET_PASSWORD_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS } from "../constants/AdminAuthConstants";

import api from "../api/Api"

export const AdminRegisterAction = (signupData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SIGNUP_REQ
        });

        const { data } = await api.post("/api/admin/register", signupData);

        dispatch({
            type: ADMIN_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/admin-signin")
    } catch (error) {

        dispatch({
            type: ADMIN_SIGNUP_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminLoginAction = (loginData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/login", loginData );

        localStorage.setItem("userLoggedIn","true")

        dispatch({
            type: ADMIN_SIGNIN_SUCCESS,
            payload: data
        });

        // dispatch({
        //     type: PROFILE_FAIL,
        //     payload:{}
        // });

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: LOGIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminGoogleloginAction = (token,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/google-login",{token:token});

        console.log(data)

        localStorage.setItem("userLoggedIn","true")

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_SUCCESS,
            payload: data
        });

        // dispatch({
        //     type: PROFILE_FAIL,
        //     payload:{}
        // });

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminLogoutAction = (navigate) => async (dispatch) => {

    try {
         dispatch({
             type: ADMIN_LOGOUT_REQ
         })

         const {data} = await api.post("/api/admin/logout")

         dispatch({
             type: ADMIN_LOGOUT_SUCCESS,
             payload:data
         })
         localStorage.setItem("userLoggedIn","false")
         navigate("/admin-signin")
    } catch (error) {
         dispatch({
             type: ADMIN_LOGOUT_FAIL,
             payload:error.response.data
         })
    }
}

export const AdminForgetPasswordAction = (email,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_FORGET_PASSWORD_REQ
        });

        const { data } = await api.post("/api/admin/forget-password",{email:email});

        dispatch({
            type: ADMIN_FORGET_PASSWORD_SUCCESS,
            payload: data
        });

        alert("Please Check Your Email")
    } catch (error) {

        dispatch({
            type: ADMIN_FORGET_PASSWORD_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminResetPasswordAction = (token,password,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_RESET_PASSWORD_REQ
        });

        const { data } = await api.post(`/api/admin/reset-password/${token}`, {password:password});

        dispatch({
            type: ADMIN_RESET_PASSWORD_SUCCESS,
            payload: data
        });

        navigate("/admin-signin")
    } catch (error) {

        dispatch({
            type: ADMIN_RESET_PASSWORD_FAIL,
            payload:error.response.data
        });
    }
};


export const LoggedOutMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_OUT_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedoutmiddleware`);

        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_SUCCESS,
            payload: data
        });
    } catch (error) {
    
        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_FAIL,
            payload:error?.response?.data
        });

        if(error?.response?.data?.message == "Refresh Token not present.Please Login Again"){
            localStorage.setItem("userLoggedIn", "false")
            navigate("/admin-signin")
        }
    }
};


