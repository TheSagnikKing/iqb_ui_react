import { APPLY_SALON_FAIL, APPLY_SALON_REQ, APPLY_SALON_SUCCESS, CONNECT_BARBER_SALON_FAIL, CONNECT_BARBER_SALON_REQ, CONNECT_BARBER_SALON_SUCCESS, CREATE_SALON_FAIL, CREATE_SALON_REQ, CREATE_SALON_SUCCESS, DELETE_SALON_FAIL, DELETE_SALON_REQ, DELETE_SALON_SUCCESS, GETALLSALON_ICONS_FAIL, GETALLSALON_ICONS_REQ, GETALLSALON_ICONS_SUCCESS, GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_SALONLIST_FAIL, GET_SALONLIST_REQ, GET_SALONLIST_SUCCESS, SALON_ONLINE_STATUS_FAIL, SALON_ONLINE_STATUS_REQ, SALON_ONLINE_STATUS_SUCCESS, SALON_SETTINGS_UPDATE_FAIL, SALON_SETTINGS_UPDATE_REQ, SALON_SETTINGS_UPDATE_SUCCESS, UPDATE_SALON_FAIL, UPDATE_SALON_REQ, UPDATE_SALON_SUCCESS } from "../constants/salonConstants";

export const createSalonReducer = (state = {},action) => {
    switch(action.type){
        case CREATE_SALON_REQ:
            return {loading:true}
        case CREATE_SALON_SUCCESS:
            return {loading:false,...action.payload}
        case CREATE_SALON_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const salonListReducer = (state = {},action) => {
    switch(action.type){
        case GET_SALONLIST_REQ:
            return {loading:true}
        case GET_SALONLIST_SUCCESS:
            return {loading:false,...action.payload}
        case GET_SALONLIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const updateSalonReducer = (state = {},action) => {
    switch(action.type){
        case UPDATE_SALON_REQ:
            return {loading:true}
        case UPDATE_SALON_SUCCESS:
            return {loading:false,...action.payload}
        case UPDATE_SALON_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getAllSalonServicesReducer = (state = {},action) => {
    switch(action.type){
        case GET_ALL_SALON_SERVICES_REQ:
            return {loading:true}
        case GET_ALL_SALON_SERVICES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_SALON_SERVICES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const deleteSalonReducer = (state = {},action) => {
    switch(action.type){
        case DELETE_SALON_REQ:
            return {loading:true}
        case DELETE_SALON_SUCCESS:
            return {loading:false,...action.payload}
        case DELETE_SALON_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const connectBarberSalonReducer = (state = {},action) => {
    switch(action.type){
        case CONNECT_BARBER_SALON_REQ:
            return {loading:true}
        case CONNECT_BARBER_SALON_SUCCESS:
            return {loading:false,...action.payload}
        case CONNECT_BARBER_SALON_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const salonSettingsUpdateReducer = (state = {},action) => {
    switch(action.type){
        case SALON_SETTINGS_UPDATE_REQ:
            return {loading:true}
        case SALON_SETTINGS_UPDATE_SUCCESS:
            return {loading:false,...action.payload}
        case SALON_SETTINGS_UPDATE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const applySalonReducer = (state = {},action) => {
    switch(action.type){
        case APPLY_SALON_REQ:
            return {loading:true}
        case APPLY_SALON_SUCCESS:
            return {loading:false,...action.payload}
        case APPLY_SALON_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const salonStatusOnlineReducer = (state = {},action) => {
    switch(action.type){
        case SALON_ONLINE_STATUS_REQ:
            return {loading:true}
        case SALON_ONLINE_STATUS_SUCCESS:
            return {loading:false,...action.payload}
        case SALON_ONLINE_STATUS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const getAllSalonIconReducer = (state = {},action) => {
    switch(action.type){
        case GETALLSALON_ICONS_REQ:
            return {loading:true}
        case GETALLSALON_ICONS_SUCCESS:
            return {loading:false,...action.payload}
        case GETALLSALON_ICONS_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}