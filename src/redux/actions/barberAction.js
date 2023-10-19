import axios from "axios"
import { CREATE_BARBER_FAIL, CREATE_BARBER_REQ, CREATE_BARBER_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/barberConstants"

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