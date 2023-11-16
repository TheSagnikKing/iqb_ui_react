import axios from "axios"
import { BARBER_SERVED_QUEUE_FAIL, BARBER_SERVED_QUEUE_REQ, BARBER_SERVED_QUEUE_SUCCESS, CREATE_BARBER_FAIL, CREATE_BARBER_REQ, CREATE_BARBER_SUCCESS, GETALLBARBERS_BYSERVICEID_FAIL, GETALLBARBERS_BYSERVICEID_REQ, GETALLBARBERS_BYSERVICEID_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, GET_BARBER_SERVICES_FAIL, GET_BARBER_SERVICES_REQ, GET_BARBER_SERVICES_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/barberConstants"

export const barberListAction = () => async(dispatch) => {
    try {
        dispatch({type:GET_BARBERLIST_REQ})

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/barber/getAllBarberBySalonId")

        dispatch({
            type:GET_BARBERLIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_BARBERLIST_FAIL,
            error: error.response
        })
    }
}

export const createBarberAction = (barberdata) => async(dispatch) => {
    try {
        dispatch({type:CREATE_BARBER_REQ})

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/barber/registerBarberByAdmin",barberdata)

        dispatch({
            type:CREATE_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:CREATE_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const updateBarberAction = (barberdata) => async(dispatch) => {
    try {
        dispatch({type:UPDATE_BARBER_REQ})

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/barber/updateBarberByEmail",barberdata)

        dispatch({
            type:UPDATE_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const getbarberServicesbyBarberIdAction = (barberId) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBER_SERVICES_REQ})

        const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/barber/getBarberServicesByBarberId?barberId=${barberId}`)

        dispatch({
            type:GET_BARBER_SERVICES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_BARBER_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}

export const getAllBarbersByServiceIdAction = (serviceid) => async(dispatch) => {
    try {
        dispatch({type:GETALLBARBERS_BYSERVICEID_REQ})

        const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/barber/getAllBarbersByServiceId?serviceId=12`)

        dispatch({
            type:GETALLBARBERS_BYSERVICEID_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GETALLBARBERS_BYSERVICEID_FAIL,
            payload: error.response.data
        })
    }
}

export const  barberServedQueueAction = (infodata) => async(dispatch) => {
    try {
        dispatch({type:BARBER_SERVED_QUEUE_REQ})

        const {data} = await axios.post("https://iqb-backend2.onrender.com/api/queue/barberServedQueue",infodata)

        dispatch({
            type:BARBER_SERVED_QUEUE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:BARBER_SERVED_QUEUE_FAIL,
            payload: error.response.data
        })
    }
}