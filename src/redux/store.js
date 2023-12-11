import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { logoutReducer, newPasswordResetReducer, passwordResetEmailReducer, signinReducer, signupReducer } from "./reducers/userReducer";
import { createSalonReducer, deleteSalonReducer, getAllSalonServicesReducer, salonListReducer, updateSalonReducer } from "./reducers/salonReducer";
import { approveBarberReducer, barberListReducer, barberServedQueueReducer, createBarberReducer, deleteBarberReducer, getAllBarbersByServiceIdReducer, getBarberServicesBybarberIdReducer, updateBarberReducer } from "./reducers/barberReducer";
import { autojoinReducer, groupjoinReducer, queueListReducer, singleJoinQueueReducer } from "./reducers/joinqueueReducer";
import { AdminForgetPasswordReducer, AdminGoogleLoginReducer, AdminLoginReducer, AdminLogoutReducer, AdminRegisterReducer, AdminResetPasswordReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer, updateAdminAccountDetailsReducer, updateAdminReducer } from "./reducers/AdminAuthReducer";

const rootReducer = combineReducers({
  signup:signupReducer,
  signin:signinReducer,
  logout:logoutReducer,
  passwordResetEmail:passwordResetEmailReducer,
  newPasswordReset:newPasswordResetReducer,
  createSalon:createSalonReducer,
  salonList:salonListReducer,
  barberList:barberListReducer,
  createBarber:createBarberReducer,
  updateBarber:updateBarberReducer,
  updateSalon:updateSalonReducer,
  getBarberServicesBybarberId:getBarberServicesBybarberIdReducer,
  singleJoinQueue:singleJoinQueueReducer,
  getAllSalonServices:getAllSalonServicesReducer,
  getAllBarbersByServiceId:getAllBarbersByServiceIdReducer,
  queueList:queueListReducer,
  autojoin:autojoinReducer,
  barberServedQueue:barberServedQueueReducer,

  //admin auth
  AdminRegister:AdminRegisterReducer,
  AdminLogin:AdminLoginReducer,
  AdminLogout:AdminLogoutReducer,
  AdminGoogleLogin:AdminGoogleLoginReducer,
  AdminForgetPassword:AdminForgetPasswordReducer,
  AdminResetPassword:AdminResetPasswordReducer,

  //middleware
  LoggedOutMiddleware:LoggedOutMiddlewareReducer,
  LoggedInMiddleware:LoggedInMiddlewareReducer,

  deleteBarber:deleteBarberReducer,
  approveBarber:approveBarberReducer,
  deleteSalon:deleteSalonReducer,

  updateAdmin:updateAdminReducer,
  groupjoin:groupjoinReducer,
  updateAdminAccountDetails:updateAdminAccountDetailsReducer
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;