import {BARBER_ACCOUNT_DETAILS_FAIL, BARBER_ACCOUNT_DETAILS_REQ, BARBER_ACCOUNT_DETAILS_SUCCESS, BARBER_FORGET_PASSWORD_FAIL, BARBER_FORGET_PASSWORD_REQ, BARBER_FORGET_PASSWORD_SUCCESS, BARBER_GOOGLE_SIGNIN_FAIL, BARBER_GOOGLE_SIGNIN_REQ, BARBER_GOOGLE_SIGNIN_SUCCESS, BARBER_GOOGLE_SIGNUP_SUCCESS, BARBER_LOGOUT_FAIL, BARBER_LOGOUT_REQ, BARBER_LOGOUT_SUCCESS, BARBER_RESET_PASSWORD_FAIL, BARBER_RESET_PASSWORD_REQ, BARBER_RESET_PASSWORD_SUCCESS, BARBER_SIGNIN_FAIL, BARBER_SIGNIN_REQ, BARBER_SIGNIN_SUCCESS, BARBER_SIGNUP_FAIL, BARBER_SIGNUP_REQ, BARBER_SIGNUP_SUCCESS, BARBER_VERIFIED_STATUS_FAIL, BARBER_VERIFIED_STATUS_REQ, BARBER_VERIFIED_STATUS_SUCCESS, BARBER_VERIFY_EMAIL_FAIL, BARBER_VERIFY_EMAIL_REQ, BARBER_VERIFY_EMAIL_SUCCESS, LOGGED_IN_MIDDLEWARE_FAIL, LOGGED_IN_MIDDLEWARE_REQ, LOGGED_IN_MIDDLEWARE_SUCCESS, LOGGED_OUT_MIDDLEWARE_FAIL, LOGGED_OUT_MIDDLEWARE_REQ, LOGGED_OUT_MIDDLEWARE_SUCCESS, UPDATE_BARBER_ACCOUNT_DETAILS_FAIL, UPDATE_BARBER_ACCOUNT_DETAILS_REQ, UPDATE_BARBER_ACCOUNT_DETAILS_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS} from "../constants/BarberAuthConstants"

import api from "../api/Api"

export const BarberRegisterAction = (signupData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNUP_REQ
        });

        const { data } = await api.post("/api/barber/register", signupData);

        dispatch({
            type: BARBER_SIGNUP_SUCCESS,
            payload: data
        });

        navigate("/barberaccountdetail")
    } catch (error) {

        dispatch({
            type: BARBER_SIGNUP_FAIL,
            payload:error.response.data
        });
    }
};

export const BarberLoginAction = (loginData,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_SIGNIN_REQ
        });

        const { data } = await api.post("/api/barber/login", loginData );

        localStorage.setItem("barberLoggedIn","true")

        dispatch({
            type: BARBER_SIGNIN_SUCCESS,
            payload: data
        });

        navigate("/barber-dashboard")
    } catch (error) {

        dispatch({
            type: BARBER_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const BarberGoogleloginAction = (token,webFcmToken,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_GOOGLE_SIGNIN_REQ
        });

        const { data } = await api.post("/api/barber/google-login",{token:token,webFcmToken:webFcmToken});

        console.log(data)

        localStorage.setItem("barberLoggedIn","true")

        if(data?.message == "Barber registered in successfully"){
            dispatch({
                type: BARBER_GOOGLE_SIGNUP_SUCCESS,
                payload: data
            });
            navigate("/barberaccountdetail")
        }else{
            dispatch({
                type: BARBER_GOOGLE_SIGNIN_SUCCESS,
                payload: data
            });
            navigate("/barber-dashboard")
        }
    } catch (error) {

        dispatch({
            type: BARBER_GOOGLE_SIGNIN_FAIL,
            payload:error.response.data
        });
    }
};

export const BarberLogoutAction = (navigate) => async (dispatch) => {

    try {
         dispatch({
             type: BARBER_LOGOUT_REQ
         })

         const {data} = await api.post("/api/barber/logout")

         dispatch({
             type: BARBER_LOGOUT_SUCCESS,
             payload:data
         })
         localStorage.setItem("barberLoggedIn","false")
         navigate("/admin-signin")
    } catch (error) {
         dispatch({
             type: BARBER_LOGOUT_FAIL,
             payload:error.response.data
         })
    }
}

export const BarberForgetPasswordAction = (email,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_FORGET_PASSWORD_REQ
        });

        const { data } = await api.post("/api/barber/forget-password",{email:email});

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

export const BarberResetPasswordAction = (token,password,navigate) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_RESET_PASSWORD_REQ
        });

        const { data } = await api.post(`/api/barber/reset-password/${token}`, {password:password});

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


export const BarberLoggedOutMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_OUT_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/barber/barberLoggedoutmiddleware`);

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
            localStorage.setItem("barberLoggedIn", "false")
            navigate("/admin-signin")
        }
    }
};


export const BarberLoggedInMiddlewareAction = (navigate) => async (dispatch) => {
    try {
        dispatch({
            type:LOGGED_IN_MIDDLEWARE_REQ
        })
        const { data } = await api.get(`/api/barber/barberLoggedinmiddleware`);

        console.log("barber",data.user)

        dispatch({
            type: LOGGED_IN_MIDDLEWARE_SUCCESS,
            payload: data
        });

        const barberLoggedIn = localStorage.getItem("barberLoggedIn")

        if(data && data.user && data.user[0] == null && barberLoggedIn == "false"){
            console.log("From Barber Auth ")
            navigate("/admin-dashboard")
            window.location.reload()
        }
   
    } catch (error) {
    
        dispatch({
            type: LOGGED_IN_MIDDLEWARE_FAIL,
            payload:error?.response?.data
        });
    }
};


export const updateBarberAction = (profiledata) => async (dispatch) => {
    try {
        dispatch({
            type:UPDATE_BARBER_REQ
        })
        const { data } = await api.put(`/api/barber/updateAdmin`,profiledata);

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


export const updateBarberSignupAccountDetailsAction = (navigate,profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`/api/barber/updateBarberAccountDetails`,profiledata);

        console.log(data)
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });
        navigate("/barber-dashboard")
    } catch (error) {
    
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_FAIL,
            payload:error?.response?.data
        }); 

        alert(error.response.data.message)
    }
};


export const updateBarberAccountDetailsAction = (profiledata) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_REQ
        })
        const { data } = await api.put(`/api/barber/updateBarberAccountDetails`,profiledata);

        console.log(data)
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
    
        dispatch({
            type: BARBER_ACCOUNT_DETAILS_FAIL,
            payload:error?.response?.data
        }); 

        alert(error.response.data.message)
    }
};




export const barberVerifyEmailAction = (navigate,verifyemail) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_VERIFY_EMAIL_REQ
        })
        const { data } = await api.post(`https://iqb-backend2.onrender.com/api/barber/sendVerificationCodeForBarberEmail`,verifyemail);

        dispatch({
            type: BARBER_VERIFY_EMAIL_SUCCESS,
            payload: data
        });
        navigate("/barber/verifyemailstatus")
    } catch (error) {
    
        dispatch({
            type: BARBER_VERIFY_EMAIL_FAIL,
            payload:error?.response?.data
        }); 
    }
};

export const barberVerifiedStatusAction = (navigate,verifystatus) => async (dispatch) => {
    try {
        dispatch({
            type: BARBER_VERIFIED_STATUS_REQ
        })
        const { data } = await api.post(`https://iqb-backend2.onrender.com/api/barber/changeBarberEmailVerifiedStatus`,verifystatus);

        dispatch({
            type: BARBER_VERIFIED_STATUS_SUCCESS,
            payload: data
        });
        navigate("/barber/updateprofile")
    } catch (error) {
    
        dispatch({
            type: BARBER_VERIFIED_STATUS_FAIL,
            payload:error?.response?.data
        }); 
    }
};