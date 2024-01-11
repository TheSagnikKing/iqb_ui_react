import { GET_ALL_NOTIFY_BARBER_FAIL, GET_ALL_NOTIFY_BARBER_REQ, GET_ALL_NOTIFY_BARBER_SUCCESS, MULTIPLE_NOTIFY_BARBER_FAIL, MULTIPLE_NOTIFY_BARBER_REQ, MULTIPLE_NOTIFY_BARBER_SUCCESS, SINGLE_NOTIFY_BARBER_FAIL, SINGLE_NOTIFY_BARBER_REQ, SINGLE_NOTIFY_BARBER_SUCCESS } from "../constants/NotificationConstants"
import api from "../api/Api"

export const singleNotificationAction = (notifydata) => async(dispatch) => {
    try {
        dispatch({type:SINGLE_NOTIFY_BARBER_REQ})

        const {data} = await api.post(`/api/notifications/send-multiple-notification`,notifydata)

        dispatch({
            type:SINGLE_NOTIFY_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SINGLE_NOTIFY_BARBER_FAIL,
            payload: error.response.data
        })
    }
}


export const multipleNotificationAction = (notifydata) => async(dispatch) => {
    try {
        dispatch({type:MULTIPLE_NOTIFY_BARBER_REQ})

        const {data} = await api.post(`/api/notifications/send-multiple-notification`,notifydata)

        dispatch({
            type:MULTIPLE_NOTIFY_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:MULTIPLE_NOTIFY_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const getallNotificationAction = (notifyemail) => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_NOTIFY_BARBER_REQ})

        const {data} = await api.post(`/api/notifications/getAllNotifications`,{email:notifyemail})

        dispatch({
            type:GET_ALL_NOTIFY_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_NOTIFY_BARBER_FAIL,
            payload: error.response.data
        })
    }
}