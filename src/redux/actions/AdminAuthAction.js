import { ADMIN_FORGET_PASSWORD_FAIL, ADMIN_FORGET_PASSWORD_REQ, ADMIN_FORGET_PASSWORD_SUCCESS, ADMIN_GOOGLE_SIGNIN_FAIL, ADMIN_GOOGLE_SIGNIN_REQ, ADMIN_GOOGLE_SIGNIN_SUCCESS, ADMIN_GOOGLE_SIGNUP_FAIL, ADMIN_GOOGLE_SIGNUP_REQ, ADMIN_GOOGLE_SIGNUP_SUCCESS, ADMIN_LOGOUT_FAIL, ADMIN_LOGOUT_REQ, ADMIN_LOGOUT_SUCCESS, ADMIN_RESET_PASSWORD_FAIL, ADMIN_RESET_PASSWORD_REQ, ADMIN_RESET_PASSWORD_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQ, ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNUP_FAIL, ADMIN_SIGNUP_REQ, ADMIN_SIGNUP_SUCCESS, ADMIN_VERIFIED_STATUS_FAIL, ADMIN_VERIFIED_STATUS_REQ, ADMIN_VERIFIED_STATUS_SUCCESS, ADMIN_VERIFY_EMAIL_FAIL, ADMIN_VERIFY_EMAIL_REQ, ADMIN_VERIFY_EMAIL_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_ADMIN_ACCOUNT_DETAILS_FAIL, UPDATE_ADMIN_ACCOUNT_DETAILS_REQ, UPDATE_ADMIN_ACCOUNT_DETAILS_SUCCESS, UPDATE_ADMIN_FAIL, UPDATE_ADMIN_REQ, UPDATE_ADMIN_SUCCESS } from "../constants/AdminAuthConstants";

import api from "../api/Api"
import axios from "axios";
import { toast } from 'react-toastify';

export const AdminRegisterAction = (signupData, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SIGNUP_REQ
        });

        const { data } = await api.post("/api/admin/register", signupData);

        dispatch({
            type: ADMIN_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/adminaccountdetail",{state:data})
    } catch (error) {

        dispatch({
            type: ADMIN_SIGNUP_FAIL,
            payload: error.response.data
        });
    }
};

export const AdminLoginAction = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/login", loginData);

        dispatch({
            type: ADMIN_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "true")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: ADMIN_SIGNIN_FAIL,
            payload: error.response.data
        });


    }
};

export const AdminGoogleloginAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post(`/api/admin/googleAdminLogin?token=${token}`);

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "true")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: ADMIN_GOOGLE_SIGNIN_FAIL,
            payload: error.response.data
        });

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });
    }
};

export const AdminGoogleSignupAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_GOOGLE_SIGNUP_REQ
        });

        const { data } = await api.post(`/api/admin/googleAdminSignUp?token=${token}`);

        dispatch({
            type: ADMIN_GOOGLE_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/adminaccountdetail",{state:data})
    } catch (error) {

        dispatch({
            type: ADMIN_GOOGLE_SIGNUP_FAIL,
            payload: error.response.data
        });

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });
    }
};


export const AdminLogoutAction = (navigate) => async (dispatch) => {

    try {

        dispatch({
            type: ADMIN_SIGNIN_FAIL,
            payload: {}
        })

        dispatch({
            type: ADMIN_SIGNUP_FAIL,
            payload: {}
        })

        dispatch({
            type: ADMIN_LOGOUT_REQ
        })

        const { data } = await api.post("/api/admin/logout")

        dispatch({
            type: ADMIN_LOGOUT_SUCCESS,
            payload: data
        })

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/admin-signin")
    } catch (error) {
        dispatch({
            type: ADMIN_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}

export const AdminForgetPasswordAction = (email, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_FORGET_PASSWORD_REQ
        });

        const { data } = await api.post("/api/admin/forget-password", { email: email });

        dispatch({
            type: ADMIN_FORGET_PASSWORD_SUCCESS,
            payload: data
        });

        alert("Please Check Your Email")
    } catch (error) {

        dispatch({
            type: ADMIN_FORGET_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};

export const AdminResetPasswordAction = (token, password, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_RESET_PASSWORD_REQ
        });

        const { data } = await api.post(`/api/admin/reset-password/${token}`, { password: password });

        dispatch({
            type: ADMIN_RESET_PASSWORD_SUCCESS,
            payload: data
        });

        navigate("/admin-signin")
    } catch (error) {

        dispatch({
            type: ADMIN_RESET_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};


export const LoggedOutMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedoutmiddleware`);

        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_SUCCESS,
            payload: data
        });
    } catch (error) {

        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_FAIL,
            payload: error?.response?.data
        });

        if (error?.response?.data?.message == "Refresh Token not present.Please Login Again") {
            localStorage.setItem("userLoggedIn", "false")
            navigate("/admin-signin")
        }
    }
};


export const LoggedInMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type: LOGGED_IN_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedinmiddleware`);

        console.log("ascascvdffsv", data)

        dispatch({
            type: LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload: data
        });

    } catch (error) {

        if (error?.response?.data?.message === "You are not Authenticated Admin") {
            navigate("/barber-dashboard")
        } else {
            dispatch({
                type: LOGGED_IN_MIDDLEWARE_FAIL,
                payload: error?.response?.data
            });
        }
    }
};


export const updateAdminAction = (profiledata, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ADMIN_REQ
        })
        const { data } = await api.put(`/api/admin/updateAdminAcoountDetails`, profiledata);

        dispatch({
            type: UPDATE_ADMIN_SUCCESS,
            payload: data
        });

        navigate("/admin-dashboard")
        window.location.reload()
    } catch (error) {

        dispatch({
            type: UPDATE_ADMIN_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });

    }
};


export const updateAdminAccountDetailsAction = (navigate, profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ADMIN_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`/api/admin/updateadmin`, profiledata);

        console.log(data)

        dispatch({
            type: UPDATE_ADMIN_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "true")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: UPDATE_ADMIN_ACCOUNT_DETAILS_FAIL,
            payload: error?.response?.data
        });

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });
    }
};

export const adminVerifyEmailAction = (navigate, verifyemail) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_VERIFY_EMAIL_REQ
        })
        const { data } = await api.post(`/api/admin/sendVerificationCodeForAdminEmail`, verifyemail);

        dispatch({
            type: ADMIN_VERIFY_EMAIL_SUCCESS,
            payload: data
        });
        navigate("/admin/verifyemailstatus")
    } catch (error) {

        dispatch({
            type: ADMIN_VERIFY_EMAIL_FAIL,
            payload: error?.response?.data
        });
        // toast.error(adminLoginError?.message, {
        //     position: "top-right"
        // });
    }
};

export const adminVerifiedStatusAction = (navigate, verifystatus) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_VERIFIED_STATUS_REQ
        })
        const { data } = await api.post(`/api/admin/changeEmailVerifiedStatus`, verifystatus);

        dispatch({
            type: ADMIN_VERIFIED_STATUS_SUCCESS,
            payload: data
        });
        navigate("/admin/updateprofile")
        window.location.reload()
    } catch (error) {

        dispatch({
            type: ADMIN_VERIFIED_STATUS_FAIL,
            payload: error?.response?.data
        });
    }
};