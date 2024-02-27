import api from "../api/Api"
import { GET_ALL_CITIES_FAIL, GET_ALL_CITIES_REQ, GET_ALL_CITIES_SUCCESS, GET_ALL_COUNTRIES_FAIL, GET_ALL_COUNTRIES_REQ, GET_ALL_COUNTRIES_SUCCESS, GET_ALL_TIMEZONES_REQ, GET_ALL_TIMEZONES_SUCCESS, GET_ALL_TIMEZONE_FAIL } from "../constants/CountryConstants"

export const getAllCountriesAction = (countryname) => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_COUNTRIES_REQ})

        const {data} = await api.post(`/api/country/getAllCountries?name=${countryname}`)

        dispatch({
            type:GET_ALL_COUNTRIES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_COUNTRIES_FAIL,
            payload: error.response.data
        })
    }
}


export const getAllCitiesAction = (cityname,countrycode) => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_CITIES_REQ})

        const {data} = await api.post(`/api/country/getAllCities?countryCode=${countrycode}&cityName=${cityname}`)

        dispatch({
            type:GET_ALL_CITIES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_CITIES_FAIL,
            payload: error.response.data
        })
    }
}


export const getAllTimezonesAction = (countrycode) => async(dispatch) => {
    try {
        dispatch({type:GET_ALL_TIMEZONES_REQ})

        const {data} = await api.post(`/api/country/getAllTimeZones?countryCode=${countrycode}`)

        dispatch({
            type:GET_ALL_TIMEZONES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_TIMEZONE_FAIL,
            payload: error.response.data
        })
    }
}


