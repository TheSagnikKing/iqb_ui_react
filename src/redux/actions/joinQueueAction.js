import axios from "axios"
import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS, QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../constants/joinQueueConstants"

export const singleJoinQueueAction = (singlejoindata) => async(dispatch) => {
    try {
        dispatch({type:SINGLE_JOINQUEUE_REQ})

        const {data} = await axios.post(`https://iqb-backend2.onrender.com/api/queue/singleJoinQueue`,singlejoindata)

        dispatch({
            type:SINGLE_JOINQUEUE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SINGLE_JOINQUEUE_FAIL,
            payload: error.response.data
        })
    }
}

export const queueListAction = (salonid) => async(dispatch) => {
    try {
        dispatch({type:QUELIST_REQ})

        const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/queue/getQListBySalonId?salonId=${salonid}`)

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


export const autojoinAction = (joindata) => async(dispatch) => {
    try {
        dispatch({type:AUTOJOIN_REQ})

        const {data} = await axios.post(`https://iqb-backend2.onrender.com/api/queue/autoJoin`, joindata)

        dispatch({
            type:AUTOJOIN_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:AUTOJOIN_FAIL,
            payload: error.response.data
        })
    }
}