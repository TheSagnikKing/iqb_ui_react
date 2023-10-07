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

import { NEW_PASSWORD_RESET_FAIL, NEW_PASSWORD_RESET_REQ, NEW_PASSWORD_RESET_SUCCESS, PASSWORD_RESET_EMAIL_FAIL, PASSWORD_RESET_EMAIL_REQ, PASSWORD_RESET_EMAIL_SUCCESS} from "../constants/userConstants";



export const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
     return signOut(auth)
}

export const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth,googleAuthProvider)
}


export const passwordResetEmailAction = (email) => async (dispatch) => {
    dispatch({ type: PASSWORD_RESET_EMAIL_REQ });

    try {
        await sendPasswordResetEmail(auth, email, {
            url: "http://localhost:5173"
        })

        dispatch({
            type: PASSWORD_RESET_EMAIL_SUCCESS,
            payload: "Email has been sent to your mailbox."
        })

    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_EMAIL_FAIL,
            payload: error.message,
        });
    }
};


export const newPasswordResetAction = (oobcode,newPassword) => async (dispatch) => {
    dispatch({ type: NEW_PASSWORD_RESET_REQ });

    try {
        await confirmPasswordReset(auth,oobcode,newPassword)

        dispatch({
            type: NEW_PASSWORD_RESET_SUCCESS,
            payload: "Password has been changed successfully"
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_RESET_FAIL,
            payload: error.message,
        });
    }
};





