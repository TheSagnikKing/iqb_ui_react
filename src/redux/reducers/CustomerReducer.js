import { CUSTOMER_EMAIL_FAIL, CUSTOMER_EMAIL_REQ, CUSTOMER_EMAIL_SUCCESS } from "../constants/CustomerConstant"

export const customeremailReducer = (state = {},action) => {
    switch(action.type){
        case CUSTOMER_EMAIL_REQ:
            return {loading:true}
        case CUSTOMER_EMAIL_SUCCESS:
            return {loading:false,...action.payload}
        case CUSTOMER_EMAIL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}
