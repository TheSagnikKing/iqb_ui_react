import axios from "axios"
import { CREATE_SALON_FAIL, CREATE_SALON_REQ, CREATE_SALON_SUCCESS, GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_SALONLIST_FAIL, GET_SALONLIST_REQ, GET_SALONLIST_SUCCESS, UPDATE_SALON_FAIL, UPDATE_SALON_REQ, UPDATE_SALON_SUCCESS } from "../constants/salonConstants"

export const createSalonAction = (salondata) => async(dispatch) => {
    try {
        // console.log(salondata)
        dispatch({type:CREATE_SALON_REQ})

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/salon/createSalon",salondata)

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

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/barber/getAllBarberBySalonId")

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

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/salon/updateSalonBySalonIdAndAdminEmail",salondata)

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

        const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/salon/allSalonServices?salonId=${salonid}`)

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