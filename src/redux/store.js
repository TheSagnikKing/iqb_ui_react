import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { logoutReducer, newPasswordResetReducer, passwordResetEmailReducer, signinReducer, signupReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  signup:signupReducer,
  signin:signinReducer,
  logout:logoutReducer,
  passwordResetEmail:passwordResetEmailReducer,
  newPasswordReset:newPasswordResetReducer
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;