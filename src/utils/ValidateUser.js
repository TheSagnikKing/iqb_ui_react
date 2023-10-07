import axios from "axios"

const baseURL = "http://localhost:8000"

export const validateSigninUser = async(token,barber) => {
    const res = await axios.post(
        `${baseURL}/api/login`,
        { barber},
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Explicitly set the content type
            },
        }
    );    

    return res.data
}

export const validateSigninAdmin = async(token,admin) => {
    const res = await axios.post(
        `${baseURL}/api/admin/login`,
        { admin},
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Explicitly set the content type
            },
        }
    );    

    return res.data
}


