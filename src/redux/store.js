import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { logoutReducer, newPasswordResetReducer, passwordResetEmailReducer, signinReducer, signupReducer } from "./reducers/userReducer";
import { applySalonReducer, connectBarberSalonReducer, createSalonReducer, deleteSalonReducer, getAllSalonIconReducer, getAllSalonServicesReducer, salonListReducer,salonSettingsUpdateReducer, salonStatusOnlineReducer, updateSalonReducer } from "./reducers/salonReducer";
import { approveBarberReducer, barberAllSalonServicsReducer, barberListReducer, barberServedQueueReducer, createBarberReducer, deleteBarberReducer, getAllBarbersByServiceIdReducer, getBarberByMultipleServicesReducer, getBarberServicesBybarberIdReducer, groupBarberServicesByBarberIdReducer, updateBarberReducer } from "./reducers/barberReducer";
import { autojoinReducer, cancelQueueReducer, groupjoinReducer, queueListReducer, singleJoinQueueReducer } from "./reducers/joinqueueReducer";
import { AdminForgetPasswordReducer, AdminGoogleLoginReducer, AdminLoginReducer, AdminLogoutReducer, AdminRegisterReducer, AdminResetPasswordReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer, adminVerifiedStatusReducer, adminVerifyEmailReducer, updateAdminAccountDetailsReducer, updateAdminReducer } from "./reducers/AdminAuthReducer";
import { barberForgetPasswordReducer, barberGoogleLoginReducer, barberLoginReducer, barberLogoutReducer, barberOnlineStatusReducer, barberQuelistReducer, barberRegisterReducer, barberResetPasswordReducer, barberServedQueReducer, barberUpdateAccountReducer, barberVerifyEmailReducer, barberVerifyStatusReducer, updatebarberAccountDetailsReducer, updatebarberReducer } from "./reducers/BarberAuthReducer";
import { appoinmentBarberListReducer, createAppointmentReducer, deleteAppointmentReducer, editAppointmentReducer } from "./reducers/AppointmentReducer";
import { getAllAdvertisementReducer} from "./reducers/AdvertisementReducer";
import { customeremailReducer } from "./reducers/CustomerReducer";
import { getallNotificationReducer, multipleNotificationReducer, singleNotificationReducer } from "./reducers/NotificationReducer";
import { colorReducer } from "./reducers/colorReducer";
import { cityReducers, countryReducers, getAllTimeZonesReducers } from "./reducers/CountryReducers";

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
  editAppointment:editAppointmentReducer,
  adminVerifyEmail:adminVerifyEmailReducer,
  adminVerifiedStatus:adminVerifiedStatusReducer,
  customeremail:customeremailReducer,

  //notification
  singleNotification:singleNotificationReducer,
  multipleNotification:multipleNotificationReducer,
  getallNotification:getallNotificationReducer,

  barberUpdateAccount:barberUpdateAccountReducer,
  barberVerifyEmail:barberVerifyEmailReducer,
  barberVerifyStatus:barberVerifyStatusReducer,
  cancelQueue:cancelQueueReducer,
  appoinmentBarberList:appoinmentBarberListReducer,
  getAllSalonIcon:getAllSalonIconReducer,
  barberAllSalonServics:barberAllSalonServicsReducer,
  groupBarberServicesByBarberId:groupBarberServicesByBarberIdReducer,
  color:colorReducer,

  // country
  country:countryReducers,
  city:cityReducers,
  getAllTimeZones:getAllTimeZonesReducers
});

const initialState = {};



const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,

});

export default store;