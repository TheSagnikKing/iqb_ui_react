import { CREATE_BARBER_FAIL, CREATE_BARBER_REQ, CREATE_BARBER_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/barberConstants"

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