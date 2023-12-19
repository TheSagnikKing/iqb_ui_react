import { CREATE_APPOINTMENT_FAIL, CREATE_APPOINTMENT_REQ, CREATE_APPOINTMENT_SUCCESS } from "../constants/AppointmentConstants"

import api from "../api/Api"

export const createAppointmentAction = (appointmentData) => async(dispatch) => {
    try {
        dispatch({type:CREATE_APPOINTMENT_REQ})

        const {data} = await api.post("/api/appointments/createAppointment",appointmentData)

        dispatch({
            type:CREATE_APPOINTMENT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_APPOINTMENT_FAIL,
            error: error.response
        })
    }
}