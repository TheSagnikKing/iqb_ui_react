import { auth } from "../../config.js/firebase.config"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";

import { GOOGLE_SIGNIN_REQ, USER_LOGOUT_FAIL, USER_LOGOUT_REQ, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQ, USER_SIGNIN_RESET, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQ, USER_SIGNUP_SUCCESS } from "../constants/userConstants";


export const signupAction = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQ });

    try {
        const currentuser = await createUserWithEmailAndPassword(auth, email, password);
        window.localStorage.setItem("auth","true")
        dispatch({
            type:USER_SIGNUP_SUCCESS,
            payload:currentuser
        })
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:currentuser
        })
        dispatch({type:USER_SIGNIN_RESET})
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.message,
        });
    }
};

export const signinAction = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQ });

    try {
        const currentuser = await signInWithEmailAndPassword(auth, email, password);
        window.localStorage.setItem("auth","true")
        dispatch({
            type:USER_SIGNIN_SUCCESS,
            payload:currentuser
        })
        dispatch({type:USER_SIGNIN_RESET})
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.message,
        });
    }
};

export const googleSigninAction = () => async (dispatch) => {
    dispatch({ type: GOOGLE_SIGNIN_REQ });

    try {
        const googleAuthProvider = new GoogleAuthProvider()
        await signInWithPopup(auth,googleAuthProvider)
        // window.localStorage.setItem("auth","true")
        // dispatch({
        //     type:USER_SIGNIN_SUCCESS,
        //     payload:currentuser
        // })
        dispatch({type:USER_SIGNIN_RESET})
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.message,
        });
    }
};

export const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth,googleAuthProvider)
}

export const logoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQ });

    try {
        await signOut(auth)
        window.localStorage.setItem("auth","false")
        dispatch({
            type:USER_LOGOUT_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.message,
        });
    }
};







