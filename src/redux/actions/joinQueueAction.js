import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS, CANCEL_QUEUE_FAIL, CANCEL_QUEUE_REQ, CANCEL_QUEUE_SUCCESS, GROUP_JOIN_FAIL, GROUP_JOIN_REQ, GROUP_JOIN_SUCCESS, QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../constants/joinQueueConstants"

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

export const queueListAction = (salonid,signal) => async(dispatch) => {
    try {
        dispatch({type:QUELIST_REQ})

        const {data} = await api.get(`/api/queue/getQListBySalonId?salonId=${salonid}`,{signal})

        dispatch({
            type:QUELIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
            console.log("Request Canceled");
        }else{
            dispatch({
                type:QUELIST_FAIL,
                payload: error.response.data
            })
        }
        
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


export const cancelQueueAtion = (canceldata,signal) => async(dispatch) => {
    try {
        dispatch({type:CANCEL_QUEUE_REQ})

        const {data} = await api.post(`/api/queue/cancelQ`, canceldata,{signal})

        dispatch({
            type:CANCEL_QUEUE_SUCCESS,
            payload:data
        })

        window.location.reload()
    } catch (error) {
        if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
            console.log("Request Canceled");
        }else{
            dispatch({
                type:CANCEL_QUEUE_FAIL,
                payload: error.response.data
            })
        }
        

        alert(error.response.data.message)
    }
}