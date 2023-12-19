import { CONNECT_BARBER_SALON_FAIL, CONNECT_BARBER_SALON_REQ, CONNECT_BARBER_SALON_SUCCESS, CREATE_SALON_FAIL, CREATE_SALON_REQ, CREATE_SALON_SUCCESS, DELETE_SALON_FAIL, DELETE_SALON_REQ, DELETE_SALON_SUCCESS, GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_SALONLIST_FAIL, GET_SALONLIST_REQ, GET_SALONLIST_SUCCESS, UPDATE_SALON_FAIL, UPDATE_SALON_REQ, UPDATE_SALON_SUCCESS } from "../constants/salonConstants"

import api from "../api/Api"

export const createSalonAction = (salondata) => async(dispatch) => {
    try {
        // console.log(salondata)
        dispatch({type:CREATE_SALON_REQ})

        const {data} = await api.post("/api/salon/createSalonByAdmin",salondata)
        
        dispatch({
            type:CREATE_SALON_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_SALON_FAIL,
            payload: error.response.data
        })
    }
}

export const salonListAction = () => async(dispatch) => {
    try {
        dispatch({type:GET_SALONLIST_REQ})

        const {data} = await api.post("/api/barber/getAllBarberBySalonId")

        dispatch({
            type:GET_SALONLIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_SALONLIST_FAIL,
            payload: error.response.data
        })
    }
}

export const updateSalonAction = (salondata) => async(dispatch) => {
    try {
        dispatch({type:UPDATE_SALON_REQ})

        const {data} = await api.put("/api/salon/updateSalonBySalonIdAndAdminEmail",salondata)

        dispatch({
            type:UPDATE_SALON_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_SALON_FAIL,
            payload: error.response.data
        })
    }
}

export const getAllSalonServicesAction = (salonid) => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_SALON_SERVICES_REQ})

        const {data} = await api.get(`/api/salon/allSalonServices?salonId=${salonid}`)

        dispatch({
            type:GET_ALL_SALON_SERVICES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_SALON_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}

export const deleteSalonAction = (salonId) => async(dispatch) => {
    try {
        dispatch({type:DELETE_SALON_REQ})

        const {data} = await api.post(`/api/salon/deleteSalon`,{salonId:salonId})
        window.location.reload()

        dispatch({
            type:DELETE_SALON_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_SALON_FAIL,
            payload: error.response.data
        })
    }
}

export const connectSalonBarberAction = (barberData) => async(dispatch) => {
    try {
        dispatch({type:CONNECT_BARBER_SALON_REQ})

        const {data} = await api.post(`/api/barber/connectBarberToSalon`,barberData)
        window.alert("Barber is successfuly connected to Salon")
        // window.location.reload()

        dispatch({
            type:CONNECT_BARBER_SALON_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CONNECT_BARBER_SALON_FAIL,
            payload: error.response.data
        })
    }
}

