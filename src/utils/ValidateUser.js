import axios from "axios"

// const baseURL = "https://iqb-backend2.onrender.com"
const baseURL = "http://localhost:8080"

export const validateSigninUser = async(token,barber,name) => {
    const res = await axios.post(
        `${baseURL}/api/barber/login`,
        {barber,name},
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Explicitly set the content type
            },
        }
    );    

    return res.data
}

export const validateSigninAdmin = async(token,admin,name) => {
    const res = await axios.post(
        `${baseURL}/api/admin/login`,
        { admin,name},
        {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Explicitly set the content type
            },
        }
    );    

    return res.data
}


