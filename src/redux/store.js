import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { logoutReducer, newPasswordResetReducer, passwordResetEmailReducer, signinReducer, signupReducer } from "./reducers/userReducer";
import { createSalonReducer, getAllSalonServicesReducer, salonListReducer, updateSalonReducer } from "./reducers/salonReducer";
import { barberListReducer, barberServedQueueReducer, createBarberReducer, getAllBarbersByServiceIdReducer, getBarberServicesBybarberIdReducer, updateBarberReducer } from "./reducers/barberReducer";
import { autojoinReducer, queueListReducer, singleJoinQueueReducer } from "./reducers/joinqueueReducer";

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
  barberServedQueue:barberServedQueueReducer
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;