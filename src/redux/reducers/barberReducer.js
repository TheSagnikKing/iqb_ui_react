import { APPROVE_BARBER_FAIL, APPROVE_BARBER_REQ, APPROVE_BARBER_SUCCESS, BARBER_SERVED_QUEUE_FAIL, BARBER_SERVED_QUEUE_REQ, BARBER_SERVED_QUEUE_SUCCESS, CREATE_BARBER_FAIL, CREATE_BARBER_REQ, CREATE_BARBER_SUCCESS, DELETE_BARBER_FAIL, DELETE_BARBER_REQ, DELETE_BARBER_SUCCESS, GETALLBARBERS_BYSERVICEID_FAIL, GETALLBARBERS_BYSERVICEID_REQ, GETALLBARBERS_BYSERVICEID_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, GET_BARBER_SERVICES_FAIL, GET_BARBER_SERVICES_REQ, GET_BARBER_SERVICES_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/barberConstants"

export const barberListReducer = (state = {},action) => {
    switch(action.type){
        case GET_BARBERLIST_REQ:
            return {loading:true}
        case GET_BARBERLIST_SUCCESS:
            return {loading:false,...action.payload}
        case GET_BARBERLIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const createBarberReducer = (state = {},action) => {
    switch(action.type){
        case CREATE_BARBER_REQ:
            return {loading:true}
        case CREATE_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case CREATE_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const updateBarberReducer = (state = {},action) => {
    switch(action.type){
        case UPDATE_BARBER_REQ:
            return {loading:true}
        case UPDATE_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case UPDATE_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getBarberServicesBybarberIdReducer = (state = {},action) => {
    switch(action.type){
        case GET_BARBER_SERVICES_REQ:
            return {loading:true}
        case GET_BARBER_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_BARBER_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getAllBarbersByServiceIdReducer = (state = {},action) => {
    switch(action.type){
        case GETALLBARBERS_BYSERVICEID_REQ:
            return {loading:true}
        case GETALLBARBERS_BYSERVICEID_SUCCESS:
            return {loading:false,...action.payload}
        case GETALLBARBERS_BYSERVICEID_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const barberServedQueueReducer = (state = {},action) => {
    switch(action.type){
        case BARBER_SERVED_QUEUE_REQ:
            return {loading:true}
        case BARBER_SERVED_QUEUE_SUCCESS:
            return {loading:false,...action.payload}
        case BARBER_SERVED_QUEUE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const deleteBarberReducer = (state = {},action) => {
    switch(action.type){
        case DELETE_BARBER_REQ:
            return {loading:true}
        case DELETE_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case DELETE_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const approveBarberReducer = (state = {},action) => {
    switch(action.type){
        case APPROVE_BARBER_REQ:
            return {loading:true}
        case APPROVE_BARBER_SUCCESS:
            return {loading:false,...action.payload}
        case APPROVE_BARBER_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}