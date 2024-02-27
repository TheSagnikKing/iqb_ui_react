import { GET_ALL_CITIES_FAIL, GET_ALL_CITIES_REQ, GET_ALL_CITIES_SUCCESS, GET_ALL_COUNTRIES_FAIL, GET_ALL_COUNTRIES_REQ, GET_ALL_COUNTRIES_SUCCESS, GET_ALL_TIMEZONES_REQ, GET_ALL_TIMEZONES_SUCCESS, GET_ALL_TIMEZONE_FAIL } from "../constants/CountryConstants"

export const countryReducers = (state = {},action) => {
    switch(action.type){
        case GET_ALL_COUNTRIES_REQ:
            return {loading:true}
        case GET_ALL_COUNTRIES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_COUNTRIES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const cityReducers = (state = {},action) => {
    switch(action.type){
        case GET_ALL_CITIES_REQ:
            return {loading:true}
        case GET_ALL_CITIES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_CITIES_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const getAllTimeZonesReducers = (state = {},action) => {
    switch(action.type){
        case GET_ALL_TIMEZONES_REQ:
            return {loading:true}
        case GET_ALL_TIMEZONES_SUCCESS:
            return {loading:false,...action.payload}
        case GET_ALL_TIMEZONE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

