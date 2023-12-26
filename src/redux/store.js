import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { logoutReducer, newPasswordResetReducer, passwordResetEmailReducer, signinReducer, signupReducer } from "./reducers/userReducer";
import { applySalonReducer, connectBarberSalonReducer, createSalonReducer, deleteSalonReducer, getAllSalonServicesReducer, salonListReducer,salonSettingsUpdateReducer, salonStatusOnlineReducer, updateSalonReducer } from "./reducers/salonReducer";
import { approveBarberReducer, barberListReducer, barberServedQueueReducer, createBarberReducer, deleteBarberReducer, getAllBarbersByServiceIdReducer, getBarberByMultipleServicesReducer, getBarberServicesBybarberIdReducer, updateBarberReducer } from "./reducers/barberReducer";
import { autojoinReducer, groupjoinReducer, queueListReducer, singleJoinQueueReducer } from "./reducers/joinqueueReducer";
import { AdminForgetPasswordReducer, AdminGoogleLoginReducer, AdminLoginReducer, AdminLogoutReducer, AdminRegisterReducer, AdminResetPasswordReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer, updateAdminAccountDetailsReducer, updateAdminReducer } from "./reducers/AdminAuthReducer";
import { barberForgetPasswordReducer, barberGoogleLoginReducer, barberLoginReducer, barberLogoutReducer, barberOnlineStatusReducer, barberQuelistReducer, barberRegisterReducer, barberResetPasswordReducer, barberServedQueReducer, updatebarberAccountDetailsReducer, updatebarberReducer } from "./reducers/BarberAuthReducer";
import { createAppointmentReducer, deleteAppointmentReducer, editAppointmentReducer } from "./reducers/AppointmentReducer";
import { getAllAdvertisementReducer} from "./reducers/AdvertisementReducer";

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
  updateAdminAccountDetails:updateAdminAccountDetailsReducer,


  //barber auth
  //admin auth
  BarberRegister:barberRegisterReducer,
  BarberLogin:barberLoginReducer,
  BarberLogout:barberLogoutReducer,
  BarberGoogleLogin:barberGoogleLoginReducer,
  BarberForgetPassword:barberForgetPasswordReducer,
  BarberResetPassword:barberResetPasswordReducer,

  //middleware
  LoggedOutMiddleware:LoggedOutMiddlewareReducer,
  LoggedInMiddleware:LoggedInMiddlewareReducer,

  updateBarber:updatebarberReducer,
  updateBarberAccountDetails:updatebarberAccountDetailsReducer,
  getBarberByMultipleServices:getBarberByMultipleServicesReducer,

  createAppointment:createAppointmentReducer,
  barberOnlineStatus:barberOnlineStatusReducer,
  barberQuelist:barberQuelistReducer,
  connectBarberSalon:connectBarberSalonReducer,
  salonSettingsUpdate:salonSettingsUpdateReducer,
  applySalon:applySalonReducer,
  salonStatusOnline:salonStatusOnlineReducer,
  getAllAdvertisement:getAllAdvertisementReducer,
  deleteAppointment:deleteAppointmentReducer,
  barberServedQue:barberServedQueReducer,
  editAppointment:editAppointmentReducer
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;