import { GET_ALL_NOTIFY_BARBER_FAIL, GET_ALL_NOTIFY_BARBER_REQ, GET_ALL_NOTIFY_BARBER_SUCCESS, MULTIPLE_NOTIFY_BARBER_FAIL, MULTIPLE_NOTIFY_BARBER_REQ, MULTIPLE_NOTIFY_BARBER_SUCCESS, SINGLE_NOTIFY_BARBER_FAIL, SINGLE_NOTIFY_BARBER_REQ, SINGLE_NOTIFY_BARBER_SUCCESS } from "../constants/NotificationConstants"

export const singleNotificationReducer = (state = {},action) => {
    switch(action.type){
        case SINGLE_NOTIFY_BARBER_REQ:
            return {loading:true}
        case SINGLE_NOTIFY_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case SINGLE_NOTIFY_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const multipleNotificationReducer = (state = {},action) => {
    switch(action.type){
        case MULTIPLE_NOTIFY_BARBER_REQ:
            return {loading:true}
        case MULTIPLE_NOTIFY_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case MULTIPLE_NOTIFY_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getallNotificationReducer = (state = {},action) => {
    switch(action.type){
        case GET_ALL_NOTIFY_BARBER_REQ:
            return {loading:true}
        case GET_ALL_NOTIFY_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_NOTIFY_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}