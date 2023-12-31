import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS, GROUP_JOIN_FAIL, GROUP_JOIN_REQ, GROUP_JOIN_SUCCESS, QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../constants/joinQueueConstants"

import api from "../api/Api"

export const singleJoinQueueAction = (singlejoindata,setSelectedService,navigate) => async(dispatch) => {
    try {
        dispatch({type:SINGLE_JOINQUEUE_REQ})

        const {data} = await api.post(`/api/queue/singleJoinQueue`,singlejoindata)

        dispatch({
            type:SINGLE_JOINQUEUE_SUCCESS,
            payload:data
        })

        setSelectedService([])
        navigate("/queue")
    } catch (error) {
        dispatch({
            type:SINGLE_JOINQUEUE_FAIL,
            payload: error.response.data
        })

        alert( error.response.data.message)
    }
}

export const queueListAction = (salonid) => async(dispatch) => {
    try {
        dispatch({type:QUELIST_REQ})

        const {data} = await api.get(`/api/queue/getQListBySalonId?salonId=${salonid}`)

        dispatch({
            type:QUELIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:QUELIST_FAIL,
            payload: error.response.data
        })
    }
}


export const autojoinAction = (joindata,navigate) => async(dispatch) => {
    try {
        dispatch({type:AUTOJOIN_REQ})

        const {data} = await api.post(`/api/queue/autoJoin`, joindata)

        dispatch({
            type:AUTOJOIN_SUCCESS,
            payload:data
        })

        navigate("/queue")
    } catch (error) {
        dispatch({
            type:AUTOJOIN_FAIL,
            payload: error.response.data
        })

        alert(error.response.data.message)
    }
}


export const groupjoinAction = (groupjoindata,setSelectedCustomer,navigate) => async(dispatch) => {
    try {
        dispatch({type:GROUP_JOIN_REQ})

        const {data} = await api.post(`/api/queue/groupJoinQueue`, groupjoindata)


        dispatch({
            type:GROUP_JOIN_SUCCESS,
            payload:data
        })

        setSelectedCustomer([])
        navigate("/queue")
        
    } catch (error) {
        dispatch({
            type:GROUP_JOIN_FAIL,
            payload: error.response.data
        })

        alert(error.response.data.message)
    }
}