import { APPLY_SALON_FAIL, APPLY_SALON_REQ, APPLY_SALON_SUCCESS, CONNECT_BARBER_SALON_FAIL, CONNECT_BARBER_SALON_REQ, CONNECT_BARBER_SALON_SUCCESS, CREATE_SALON_FAIL, CREATE_SALON_REQ, CREATE_SALON_SUCCESS, DELETE_SALON_FAIL, DELETE_SALON_REQ, DELETE_SALON_SUCCESS, GETALLSALON_ICONS_FAIL, GETALLSALON_ICONS_REQ, GETALLSALON_ICONS_SUCCESS, GET_ALL_SALON_SERVICES_FAIL, GET_ALL_SALON_SERVICES_REQ, GET_ALL_SALON_SERVICES_SUCCESS, GET_SALONLIST_FAIL, GET_SALONLIST_REQ, GET_SALONLIST_SUCCESS, SALON_ONLINE_STATUS_FAIL, SALON_ONLINE_STATUS_REQ, SALON_ONLINE_STATUS_SUCCESS, SALON_SETTINGS_UPDATE_FAIL, SALON_SETTINGS_UPDATE_REQ, SALON_SETTINGS_UPDATE_SUCCESS, UPDATE_SALON_FAIL, UPDATE_SALON_REQ, UPDATE_SALON_SUCCESS } from "../constants/salonConstants"

import api from "../api/Api"
import { GET_BARBERLIST_SUCCESS, GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS, GET_BARBER_SERVICES_SUCCESS } from "../constants/barberConstants"
import {  toast } from 'react-toastify';


export const createSalonAction = (salondata,navigate) => async(dispatch) => {
    try {
        // console.log(salondata)
        dispatch({type:CREATE_SALON_REQ})

        const {data} = await api.post("/api/salon/createSalonByAdmin",salondata)
        
        dispatch({
            type:CREATE_SALON_SUCCESS,
            payload:data
        })
        navigate("/salon/salonlist")
    } catch (error) {

        dispatch({
            type:CREATE_SALON_FAIL,
            payload: error?.response?.data
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#131E3A"
            }
          });

    }
}

export const salonListAction = () => async(dispatch) => {
    try {
        dispatch({type:GET_SALONLIST_REQ})

        const {data} = await api.post("/api/barber/getAllBarberBySalonId")

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

export const updateSalonAction = (salondata,navigate) => async(dispatch) => {
    try {
        dispatch({type:UPDATE_SALON_REQ})

        const {data} = await api.put("/api/salon/updateSalonBySalonIdAndAdminEmail",salondata)

        dispatch({
            type:UPDATE_SALON_SUCCESS,
            payload:data
        })

        navigate("/salon/salonlist")
    } catch (error) {
     
        dispatch({
            type:UPDATE_SALON_FAIL,
            payload: error.response.data
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
          });
    }
}

export const getAllSalonServicesAction = (salonid,setModel1,setModelservices,setCurrentbarberName,setModel2) => async(dispatch) => {
    // without kyosks
    // try {
    //     dispatch({type:GET_ALL_SALON_SERVICES_REQ})

    //     const {data} = await api.get(`/api/salon/allSalonServices?salonId=${salonid}`)

    //     dispatch({
    //         type:GET_BARBER_SERVICES_SUCCESS,
    //         payload:{}
    //     })

    //     dispatch({
    //         type:GET_BARBERLIST_SUCCESS,
    //         payload:{}
    //     })

    //     dispatch({
    //         type:GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
    //         payload:{}
    //     })

    //     dispatch({
    //         type:GET_ALL_SALON_SERVICES_SUCCESS,
    //         payload:data
    //     })
    // } catch (error) {
    //     dispatch({
    //         type:GET_ALL_SALON_SERVICES_FAIL,
    //         payload: error.response.data
    //     })
    // }


    try {
        dispatch({type:GET_ALL_SALON_SERVICES_REQ})

        const {data} = await api.get(`/api/salon/allSalonServices?salonId=${salonid}`)

        dispatch({
            type:GET_BARBER_SERVICES_SUCCESS,
            payload:{}
        })

        dispatch({
            type:GET_BARBERLIST_SUCCESS,
            payload:{}
        })

        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
            payload:{}
        })

        setModel1(false)
        setModelservices(false)
        setCurrentbarberName("")

        setModel2(true)

        dispatch({
            type:GET_ALL_SALON_SERVICES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_ALL_SALON_SERVICES_FAIL,
            payload: error.response.data
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
        });
    }
}

export const deleteSalonAction = (salonId) => async(dispatch) => {
    try {
        dispatch({type:DELETE_SALON_REQ})

        const {data} = await api.post(`/api/salon/deleteSalon`,{salonId:salonId})
        window.location.reload()

        dispatch({
            type:DELETE_SALON_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_SALON_FAIL,
            payload: error.response.data
        })
    }
}

export const connectSalonBarberAction = (barberData) => async(dispatch) => {
    try {
        dispatch({type:CONNECT_BARBER_SALON_REQ})

        const {data} = await api.post(`/api/barber/connectBarberToSalon`,barberData)
        window.alert("Barber is successfuly connected to Salon")
        // window.location.reload()

        dispatch({
            type:CONNECT_BARBER_SALON_SUCCESS,
            payload:data
        })

        window.location.reload()
    } catch (error) {
        dispatch({
            type:CONNECT_BARBER_SALON_FAIL,
            payload: error.response.data
        })
    }
}


export const salonSettingsUpdateAction = (salonsettingsData,navigate) => async(dispatch) => {
    try {
        dispatch({type:SALON_SETTINGS_UPDATE_REQ})

        const {data} = await api.put(`/api/salonSettings/updateSalonSettings`, salonsettingsData)

        dispatch({
            type:SALON_SETTINGS_UPDATE_SUCCESS,
            payload:data
        })

        navigate("/salon/salonlist")
    } catch (error) {

        dispatch({
            type:SALON_SETTINGS_UPDATE_FAIL,
            payload: error.response.data
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right",
            style:{
                background:"#000"
            }
        });
    }
}



export const applySalonAction = (applySalondata) => async(dispatch) => {
    try {
        dispatch({type:APPLY_SALON_REQ})

        const {data} = await api.post(`/api/admin/changeDefaultSalonIdofAdmin`,applySalondata)

        dispatch({
            type:APPLY_SALON_SUCCESS,
            payload:data
        })
        
        window.location.reload()
    } catch (error) {
        dispatch({
            type:APPLY_SALON_FAIL,
            payload: error.response.data
        })

        toast.error(error?.response?.data?.message, {
            position: "top-right"
          });
    }
}


export const salonStatusOnlineAction = (salonStatusdata) => async(dispatch) => {
    try {
        dispatch({type:SALON_ONLINE_STATUS_REQ})

        const {data} = await api.post(`/api/salon/changeSalonOnlineStatus`, salonStatusdata)

        dispatch({
            type:SALON_ONLINE_STATUS_SUCCESS,
            payload:data
        })
        
        // window.location.reload()
    } catch (error) {
        dispatch({
            type:SALON_ONLINE_STATUS_FAIL,
            payload: error.response.data
        })
    }
}

export const getAllSalonIconAction = () => async(dispatch) => {
    try {
        dispatch({type:GETALLSALON_ICONS_REQ})

        const {data} = await api.get(`/api/icons/getAllIcons`)

        dispatch({
            type:GETALLSALON_ICONS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:GETALLSALON_ICONS_FAIL,
            payload: error.response.data
        })
    }
}