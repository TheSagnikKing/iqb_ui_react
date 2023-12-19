import { CREATE_APPOINTMENT_FAIL, CREATE_APPOINTMENT_REQ, CREATE_APPOINTMENT_SUCCESS } from "../constants/AppointmentConstants";

export const createAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_REQ:
            return { ...state, loading: true };
        case CREATE_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case CREATE_APPOINTMENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};