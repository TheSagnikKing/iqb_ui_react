import { BARBER_ACCOUNT_DETAILS_FAIL, BARBER_ACCOUNT_DETAILS_REQ, BARBER_ACCOUNT_DETAILS_SUCCESS, BARBER_FORGET_PASSWORD_FAIL, BARBER_FORGET_PASSWORD_REQ, BARBER_FORGET_PASSWORD_SUCCESS, BARBER_GOOGLE_SIGNIN_FAIL, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS, BARBER_GOOGLE_SIGNUP_FAIL, BARBER_GOOGLE_SIGNUP_REQ, BARBER_GOOGLE_SIGNUP_SUCCESS, BARBER_LOGOUT_FAIL, BARBER_LOGOUT_REQ, BARBER_LOGOUT_SUCCESS, BARBER_RESET_PASSWORD_FAIL, BARBER_RESET_PASSWORD_REQ, BARBER_RESET_PASSWORD_SUCCESS, BARBER_SIGNIN_FAIL, BARBER_SIGNIN_REQ, BARBER_SIGNIN_SUCCESS, BARBER_SIGNUP_FAIL, BARBER_SIGNUP_REQ, BARBER_SIGNUP_SUCCESS, BARBER_VERIFIED_STATUS_FAIL, BARBER_VERIFIED_STATUS_REQ, BARBER_VERIFIED_STATUS_SUCCESS, BARBER_VERIFY_EMAIL_FAIL, BARBER_VERIFY_EMAIL_REQ, BARBER_VERIFY_EMAIL_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_BARBER_ACCOUNT_DETAILS_FAIL, UPDATE_BARBER_ACCOUNT_DETAILS_REQ, UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/BarberAuthConstants"

import api from "../api/Api"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BarberRegisterAction = (signupData, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNUP_REQ
        });

        const { data } = await api.post("/api/barber/register", signupData);

        dispatch({
            type: BARBER_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/barberaccountdetail", { state: data })
    } catch (error) {

        dispatch({
            type: BARBER_SIGNUP_FAIL,
            payload: error.response.data
        });
    }
};

export const BarberLoginAction = (loginData, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNIN_REQ
        });

        const { data } = await api.post("/api/barber/login", loginData);

        dispatch({
            type: BARBER_SIGNIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "true")

        navigate("/barber-dashboard")
    } catch (error) {

        dispatch({
            type: BARBER_SIGNIN_FAIL,
            payload: error.response.data
        });
    }
};

export const BarberGoogleloginAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post(`/api/barber/googleBarberLogin?token=${token}`);

        console.log(data)

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "true")

        navigate("/barber-dashboard")

    } catch (error) {

        dispatch({
            type: BARBER_GOOGLE_SIGNIN_FAIL,
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

export const BarberGoogleSignupAction = (token, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_GOOGLE_SIGNUP_REQ
        });

        const { data } = await api.post(`/api/barber/googleBarberSignUp?token=${token}`);

        dispatch({
            type: BARBER_GOOGLE_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/barberaccountdetail",{state:data})
    } catch (error) {

        dispatch({
            type: BARBER_GOOGLE_SIGNUP_FAIL,
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

export const BarberLogoutAction = (navigate) => async (dispatch) => {
    
    try {
        dispatch({
            type: BARBER_LOGOUT_REQ
        })

        const { data } = await api.post("/api/barber/logout")

        dispatch({
            type: BARBER_LOGOUT_SUCCESS,
            payload: data
        })

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "false")

        navigate("/barber-signin")
    } catch (error) {
        dispatch({
            type: BARBER_LOGOUT_FAIL,
            payload: error.response.data
        })
    }
}

export const BarberForgetPasswordAction = (email, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_FORGET_PASSWORD_REQ
        });

        const { data } = await api.post("/api/barber/forget-password", { email: email });

        dispatch({
            type: BARBER_FORGET_PASSWORD_SUCCESS,
            payload: data
        });

        alert("Please Check Your Email")
    } catch (error) {

        dispatch({
            type: BARBER_FORGET_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};

export const BarberResetPasswordAction = (token, password, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_RESET_PASSWORD_REQ
        });

        const { data } = await api.post(`/api/barber/reset-password/${token}`, { password: password });

        dispatch({
            type: BARBER_RESET_PASSWORD_SUCCESS,
            payload: data
        });

        navigate("/admin-signin")
    } catch (error) {

        dispatch({
            type: BARBER_RESET_PASSWORD_FAIL,
            payload: error.response.data
        });
    }
};


export const BarberLoggedOutMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type: LOGGED_OUT_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/barber/barberLoggedoutmiddleware`);

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
            localStorage.setItem("barberLoggedIn", "false")
            navigate("/barber-signin")
        }
    }
};


export const BarberLoggedInMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type: LOGGED_IN_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/barber/barberLoggedinmiddleware`);

        console.log("barber", data.user)

        dispatch({
            type: LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload: data
        });


    } catch (error) {
        if (error?.response?.data?.message === "You are not Authenticated Barber") {
            navigate("/admin-dashboard")
        } else {
            dispatch({
                type: LOGGED_IN_MIDDLEWARE_FAIL,
                payload: error?.response?.data
            });
        }
    }
};


export const updateBarberAction = (profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_BARBER_REQ
        })
        const { data } = await api.put(`/api/barber/updateAdmin`, profiledata);

        dispatch({
            type: UPDATE_BARBER_SUCCESS,
            payload: data
        });
    } catch (error) {

        dispatch({
            type: UPDATE_BARBER_FAIL,
            payload: error?.response?.data
        });
    }
};


export const updateBarberSignupAccountDetailsAction = (navigate, profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`/api/barber/updateBarber`, profiledata);

        console.log(data)
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });

        localStorage.setItem("userAdminLoggedIn", "false")
        localStorage.setItem("userBarberLoggedIn", "true")

        navigate("/barber-dashboard")
    } catch (error) {

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });

        dispatch({
            type: BARBER_ACCOUNT_DETAILS_FAIL,
            payload: error?.response?.data
        });
    }
};


export const updateBarberAccountDetailsAction = (profiledata, navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`/api/barber/updateBarberAccountDetails`, profiledata);

        console.log(data)
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });

        navigate("/barber-dashboard")
        window.location.reload()

    } catch (error) {

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style: {
                background: "#000"
            }
        });

        dispatch({
            type: BARBER_ACCOUNT_DETAILS_FAIL,
            payload: error?.response?.data
        });
    }
};




export const barberVerifyEmailAction = (navigate, verifyemail) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_VERIFY_EMAIL_REQ
        })
        const { data } = await api.post(`/api/barber/sendVerificationCodeForBarberEmail`, verifyemail);

        dispatch({
            type: BARBER_VERIFY_EMAIL_SUCCESS,
            payload: data
        });
        navigate("/barber/verifyemailstatus")
    } catch (error) {

        dispatch({
            type: BARBER_VERIFY_EMAIL_FAIL,
            payload: error?.response?.data
        });
    }
};

export const barberVerifiedStatusAction = (navigate, verifystatus) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_VERIFIED_STATUS_REQ
        })
        const { data } = await api.post(`/api/barber/changeBarberEmailVerifiedStatus`, verifystatus);

        dispatch({
            type: BARBER_VERIFIED_STATUS_SUCCESS,
            payload: data
        });
        navigate("/barber/updateprofile")
        window.location.reload()
    } catch (error) {

        dispatch({
            type: BARBER_VERIFIED_STATUS_FAIL,
            payload: error?.response?.data
        });
    }
};