import { CREATE_APPOINTMENT_BARBERLIST_FAIL, CREATE_APPOINTMENT_BARBERLIST_REQ, CREATE_APPOINTMENT_BARBERLIST_SUCCESS, CREATE_APPOINTMENT_FAIL, CREATE_APPOINTMENT_REQ, CREATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_FAIL, DELETE_APPOINTMENT_REQ, DELETE_APPOINTMENT_SUCCESS, EDIT_APPOINTMENT_FAIL, EDIT_APPOINTMENT_REQ, EDIT_APPOINTMENT_SUCCESS } from "../constants/AppointmentConstants";

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

export const deleteAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_APPOINTMENT_REQ:
            return { ...state, loading: true };
        case DELETE_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case DELETE_APPOINTMENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const editAppointmentReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_APPOINTMENT_REQ:
            return { ...state, loading: true };
        case EDIT_APPOINTMENT_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case EDIT_APPOINTMENT_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export const appoinmentBarberListReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_APPOINTMENT_BARBERLIST_REQ:
            return { ...state, loading: true };
        case CREATE_APPOINTMENT_BARBERLIST_SUCCESS:
            return { ...state, loading: false, ...action.payload };
        case CREATE_APPOINTMENT_BARBERLIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}