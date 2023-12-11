import {BARBER_FORGET_PASSWORD_FAIL, BARBER_FORGET_PASSWORD_REQ, BARBER_FORGET_PASSWORD_SUCCESS, BARBER_GOOGLE_SIGNIN_FAIL, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS, BARBER_GOOGLE_SIGNUP_SUCCESS, BARBER_LOGOUT_FAIL, BARBER_LOGOUT_REQ, BARBER_LOGOUT_SUCCESS, BARBER_RESET_PASSWORD_FAIL, BARBER_RESET_PASSWORD_REQ, BARBER_RESET_PASSWORD_SUCCESS, BARBER_SIGNIN_FAIL, BARBER_SIGNIN_REQ, BARBER_SIGNIN_SUCCESS, BARBER_SIGNUP_FAIL, BARBER_SIGNUP_REQ, BARBER_SIGNUP_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_BARBER_ACCOUNT_DETAILS_FAIL, UPDATE_BARBER_ACCOUNT_DETAILS_REQ, UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS} from "../constants/BarberAuthConstants"

import api from "../api/Api"

export const AdminRegisterAction = (signupData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNUP_REQ
        });

        const { data } = await api.post("/api/admin/register", signupData);

        dispatch({
            type: BARBER_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/adminaccountdetail")
    } catch (error) {

        dispatch({
            type: BARBER_SIGNUP_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminLoginAction = (loginData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/login", loginData );

        localStorage.setItem("userLoggedIn","true")

        dispatch({
            type: BARBER_SIGNIN_SUCCESS,
            payload: data
        });

        navigate("/admin-dashboard")
    } catch (error) {

        dispatch({
            type: BARBER_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminGoogleloginAction = (token,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post("/api/admin/google-login",{token:token});

        console.log(data)

        localStorage.setItem("userLoggedIn","true")

        if(data?.message == "Admin registered successfully"){
            dispatch({
                type: BARBER_GOOGLE_SIGNUP_SUCCESS,
                payload: data
            });
            navigate("/adminaccountdetail")
        }else{
            dispatch({
                type: BARBER_GOOGLE_SIGNIN_SUCCESS,
                payload: data
            });
            navigate("/admin-dashboard")
        }
    } catch (error) {

        dispatch({
            type: BARBER_GOOGLE_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminLogoutAction = (navigate) => async (dispatch) => {

    try {
         dispatch({
             type: BARBER_LOGOUT_REQ
         })

         const {data} = await api.post("/api/admin/logout")

         dispatch({
             type: BARBER_LOGOUT_SUCCESS,
             payload:data
         })
         localStorage.setItem("userLoggedIn","false")
         navigate("/admin-signin")
    } catch (error) {
         dispatch({
             type: BARBER_LOGOUT_FAIL,
             payload:error.response.data
         })
    }
}

export const AdminForgetPasswordAction = (email,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_FORGET_PASSWORD_REQ
        });

        const { data } = await api.post("/api/admin/forget-password",{email:email});

        dispatch({
            type: BARBER_FORGET_PASSWORD_SUCCESS,
            payload: data
        });

        alert("Please Check Your Email")
    } catch (error) {

        dispatch({
            type: BARBER_FORGET_PASSWORD_FAIL,
            payload:error.response.data
        });
    }
};

export const AdminResetPasswordAction = (token,password,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_RESET_PASSWORD_REQ
        });

        const { data } = await api.post(`/api/admin/reset-password/${token}`, {password:password});

        dispatch({
            type: BARBER_RESET_PASSWORD_SUCCESS,
            payload: data
        });

        navigate("/admin-signin")
    } catch (error) {

        dispatch({
            type: BARBER_RESET_PASSWORD_FAIL,
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


export const LoggedInMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_IN_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/admin/loggedinmiddleware`);

        console.log(data)

        dispatch({
            type: LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload: data
        });
    } catch (error) {
    
        dispatch({
            type: LOGGED_IN_MIDDLEWARE_FAIL,
            payload:error?.response?.data
        });
    }
};


export const updateAdminAction = (profiledata) => async (dispatch) => {
    try {
        dispatch({
            type:UPDATE_BARBER_REQ
        })
        const { data } = await api.put(`https://iqb-backend2.onrender.com/api/admin/updateAdmin`,profiledata);

        dispatch({
            type: UPDATE_BARBER_SUCCESS,
            payload: data
        });
    } catch (error) {
    
        dispatch({
            type: UPDATE_BARBER_FAIL,
            payload:error?.response?.data
        }); 
    }
};


export const updateAdminAccountDetailsAction = (navigate,profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_BARBER_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`https://iqb-backend2.onrender.com/api/admin/updateAdminAcoountDetails`,profiledata);

        console.log(data)
        dispatch({
            type: UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });
        navigate("/admin-dashboard")
    } catch (error) {
    
        dispatch({
            type: UPDATE_BARBER_ACCOUNT_DETAILS_FAIL,
            payload:error?.response?.data
        }); 
    }
};