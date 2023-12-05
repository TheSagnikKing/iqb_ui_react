import { ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS } from "../constants/AdminAuthConstants";

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