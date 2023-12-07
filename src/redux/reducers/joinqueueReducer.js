import { AUTOJOIN_FAIL, AUTOJOIN_REQ, AUTOJOIN_SUCCESS,GROUP_JOIN_FAIL,GROUP_JOIN_REQ,GROUP_JOIN_SUCCESS,QUELIST_FAIL, QUELIST_REQ, QUELIST_SUCCESS, SINGLE_JOINQUEUE_FAIL, SINGLE_JOINQUEUE_REQ, SINGLE_JOINQUEUE_SUCCESS } from "../constants/joinQueueConstants"

export const singleJoinQueueReducer = (state = {},action) => {
    switch(action.type){
        case SINGLE_JOINQUEUE_REQ:
            return {loading:true}
        case SINGLE_JOINQUEUE_SUCCESS:
            return {loading:false,...action.payload}
        case SINGLE_JOINQUEUE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const queueListReducer = (state = {},action) => {
    switch(action.type){
        case QUELIST_REQ:
            return {loading:true}
        case QUELIST_SUCCESS:
            return {loading:false,...action.payload}
        case QUELIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const autojoinReducer = (state = {},action) => {
    switch(action.type){
        case AUTOJOIN_REQ:
            return {loading:true}
        case AUTOJOIN_SUCCESS:
            return {loading:false,...action.payload}
        case AUTOJOIN_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}


export const groupjoinReducer = (state = {},action) => {
    switch(action.type){
        case GROUP_JOIN_REQ:
            return {loading:true}
        case GROUP_JOIN_SUCCESS:
            return {loading:false,...action.payload}
        case GROUP_JOIN_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}
