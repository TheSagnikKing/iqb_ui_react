import { CREATE_APPOINTMENT_BARBERLIST_FAIL, CREATE_APPOINTMENT_BARBERLIST_REQ, CREATE_APPOINTMENT_BARBERLIST_SUCCESS, CREATE_APPOINTMENT_FAIL, CREATE_APPOINTMENT_REQ, CREATE_APPOINTMENT_SUCCESS, DELETE_APPOINTMENT_FAIL, DELETE_APPOINTMENT_REQ, DELETE_APPOINTMENT_SUCCESS, EDIT_APPOINTMENT_FAIL, EDIT_APPOINTMENT_REQ, EDIT_APPOINTMENT_SUCCESS } from "../constants/AppointmentConstants"

import api from "../api/Api"
import {  toast } from 'react-toastify';

export const createAppointmentAction = (appointmentData,navigate) => async(dispatch) => {
    try {
        dispatch({type:CREATE_APPOINTMENT_REQ})

        const {data} = await api.post("/api/appointments/createAppointment",appointmentData)

        dispatch({
            type:CREATE_APPOINTMENT_SUCCESS,
            payload:data
        })

        navigate("/appoinment")
    } catch (error) {
     
        dispatch({
            type:CREATE_APPOINTMENT_FAIL,
            error: error.response
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
        });
    }
}

export const deleteAppointmentAction = (appointmentData) => async(dispatch) => {
    try {
        dispatch({type:DELETE_APPOINTMENT_REQ})

        const {data} = await api.delete("/api/appointments/deleteAppointments",{
            data:appointmentData
        })

        dispatch({
            type:DELETE_APPOINTMENT_SUCCESS,
            payload:data
        })

        window.location.reload()
    } catch (error) {

        dispatch({
            type:DELETE_APPOINTMENT_FAIL,
            error: error.response
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
        });

    }
}

export const editAppointmentAction = (appointmentData,navigate) => async(dispatch) => {
    try {
        dispatch({type:EDIT_APPOINTMENT_REQ})

        const {data} = await api.put("/api/appointments/editAppointments",appointmentData)

        dispatch({
            type:EDIT_APPOINTMENT_SUCCESS,
            payload:data
        })

        navigate("/appoinment")
    } catch (error) {
       
        dispatch({
            type:EDIT_APPOINTMENT_FAIL,
            error: error.response
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
        });

    }
}


export const appoinmentBarberListAction = (salonId) => async(dispatch) => {
    try {
        dispatch({type:CREATE_APPOINTMENT_BARBERLIST_REQ})

        const {data} = await api.post(`/api/queue/getAvailableBarbersForQ?salonId=${salonId}`)


        dispatch({
            type:CREATE_APPOINTMENT_BARBERLIST_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:CREATE_APPOINTMENT_BARBERLIST_FAIL,
            error: error.response
        })
    }
}