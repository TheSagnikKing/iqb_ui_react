import axios from "axios"

// const baseURL = "https://iqb-backend2.onrender.com"
const baseURL = "http://localhost:8080"

export const validateSigninUser = async(token,barber,name) => {
    const res = await axios.post(
        `http://localhost:8080/api/barber/login`,
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


