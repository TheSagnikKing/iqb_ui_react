import api from "../api/Api"
import { BARBER_ONLINE_STATUS_FAIL, BARBER_ONLINE_STATUS_REQ, BARBER_ONLINE_STATUS_SUCCESS, BARBER_QUELIST_FAIL, BARBER_QUELIST_REQ, BARBER_QUELIST_SUCCESS } from "../constants/BarberAuthConstants"
import { APPROVE_BARBER_FAIL, APPROVE_BARBER_REQ, APPROVE_BARBER_SUCCESS, BARBER_SERVED_QUEUE_FAIL, BARBER_SERVED_QUEUE_REQ, BARBER_SERVED_QUEUE_SUCCESS, CREATE_BARBER_FAIL, CREATE_BARBER_REQ, CREATE_BARBER_SUCCESS, DELETE_BARBER_FAIL, DELETE_BARBER_REQ, DELETE_BARBER_SUCCESS, GETALLBARBERS_BYSERVICEID_FAIL, GETALLBARBERS_BYSERVICEID_REQ, GETALLBARBERS_BYSERVICEID_SUCCESS, GET_BARBERLIST_FAIL, GET_BARBERLIST_REQ, GET_BARBERLIST_SUCCESS, GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL, GET_BARBERS_BY_MULTIPLE_SERVICES_REQ, GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS, GET_BARBER_SERVICES_FAIL, GET_BARBER_SERVICES_REQ, GET_BARBER_SERVICES_SUCCESS, UPDATE_BARBER_FAIL, UPDATE_BARBER_REQ, UPDATE_BARBER_SUCCESS } from "../constants/barberConstants"

export const barberListAction = (salonId) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBERLIST_REQ})

        const {data} = await api.post(`/api/barber/getAllBarberBySalonId?salonId=${salonId}`)

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

export const createBarberAction = (barberdata,navigate) => async(dispatch) => {
    try {
        dispatch({type:CREATE_BARBER_REQ})

        const {data} = await api.post("/api/barber/createBarberByAdmin",barberdata)

        dispatch({
            type:CREATE_BARBER_SUCCESS,
            payload:data
        })

        navigate("/barber/dashboard2")
    } catch (error) {
        dispatch({
            type:CREATE_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const updateBarberAction = (barberdata,navigate) => async(dispatch) => {
    try {
        dispatch({type:UPDATE_BARBER_REQ})

        const {data} = await api.put("/api/barber/updateBarberByAdmin",barberdata)

        dispatch({
            type:UPDATE_BARBER_SUCCESS,
            payload:data
        })
        navigate("/barber/dashboard2")
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

        const {data} = await api.get(`/api/barber/getBarberServicesByBarberId?barberId=${barberId}`)

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

        const {data} = await api.get(`/api/barber/getAllBarbersByServiceId?serviceId=${serviceid}`)

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

export const barberServedQueueAction = (infodata) => async(dispatch) => {
    try {
        dispatch({type:BARBER_SERVED_QUEUE_REQ})

        const {data} = await api.post("/api/queue/barberServedQueue",infodata)

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


export const deleteBarberAction = (salonId,email) => async(dispatch) => {
    try {
        dispatch({type:DELETE_BARBER_REQ})

        const {data} = await api.post(`/api/barber/deleteBarberByEmail?salonId=${salonId}`,{email:email})

        dispatch({
            type:DELETE_BARBER_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:DELETE_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const approveBarberAction = (approvedata) => async(dispatch) => {
    try {
        dispatch({type:APPROVE_BARBER_REQ})

        const {data} = await api.post(`/api/admin/approvedBarber`,approvedata)

        dispatch({
            type:APPROVE_BARBER_SUCCESS,
            payload:data
        })
        window.location.reload()
    } catch (error) {
        dispatch({
            type:APPROVE_BARBER_FAIL,
            payload: error.response.data
        })
    }
}

export const getBarberByMultipleServicesAction = (salonId,serviceIds) => async(dispatch) => {
    try {
        dispatch({type:GET_BARBERS_BY_MULTIPLE_SERVICES_REQ})

        const {data} = await api.post(`/api/queue/getBarberByMultipleServiceId?salonId=${salonId}&serviceIds=${serviceIds.join(',')}`)

        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:GET_BARBERS_BY_MULTIPLE_SERVICES_FAIL,
            payload: error.response.data
        })
    }
}


export const barberOnlineStatusAction = (barberOnlinedata) => async(dispatch) => {
    try {
        dispatch({type:BARBER_ONLINE_STATUS_REQ})

        const {data} = await api.post("/api/barber/changeBarberOnlineStatus",barberOnlinedata)

        dispatch({
            type:BARBER_ONLINE_STATUS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:BARBER_ONLINE_STATUS_FAIL,
            error: error.response
        })
    }
}

export const barberQueListAction = (barberqueuedata) => async(dispatch) => {
    try {
        dispatch({type:BARBER_QUELIST_REQ})

        const {data} = await api.post("/api/queue/getQlistByBarberId",barberqueuedata)

        dispatch({
            type:BARBER_QUELIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:BARBER_QUELIST_FAIL,
            error: error.response
        })
    }
}

export const barberServedQueAction = (barberqueuedata) => async(dispatch) => {
    try {
        dispatch({type:BARBER_SERVED_QUEUE_REQ})

        const {data} = await api.post("/api/queue/barberServedQueue",barberqueuedata)

        dispatch({
            type:BARBER_SERVED_QUEUE_SUCCESS,
            payload:data
        })

        window.location.reload()
    
    } catch (error) {
        dispatch({
            type:BARBER_SERVED_QUEUE_FAIL,
            error: error.response
        })
    }
}