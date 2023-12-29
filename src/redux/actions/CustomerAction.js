import { CUSTOMER_EMAIL_FAIL, CUSTOMER_EMAIL_REQ, CUSTOMER_EMAIL_SUCCESS } from "../constants/CustomerConstant";
import api from "../../redux/api/Api"

export const customeremailAction = (emaildata) => async (dispatch) => {
    try {
        dispatch({
            type: CUSTOMER_EMAIL_REQ
        })

        console.log(emaildata)
        const { data } = await api.post(`/api/customer/sendMailToCustomer`,emaildata);

        dispatch({
            type: CUSTOMER_EMAIL_SUCCESS,
            payload: data
        });

        alert(data?.message)

    } catch (error) {
    
        dispatch({
            type: CUSTOMER_EMAIL_FAIL,
            payload:error?.response?.data
        }); 

        // alert(error.response.data.message)
    }
};