// import axios from 'axios';

// const BASE_URL = 'https://iqb-backend2.onrender.com';
// // const BASE_URL = 'http://localhost:8080';

// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials:true
// });

// const useRefreshToken = async () => {
//     try {
//         // Send a request to your server to refresh the token using the HTTP-only cookie
//        await axios.post("https://iqb-backend2.onrender.com/api/admin/refresh-token",{},{withCredentials:true});

//     } catch (error) {
//         console.log(error);
//     }
// }

// axiosPrivate.interceptors.request.use(
//     config => {
//         // No need to manually attach the token; it will be included automatically
//         // if the server sets the appropriate HTTP-only cookie
//         return config;
//     },
//     error => Promise.reject(error)
// );

// axiosPrivate.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const prevRequest = error?.config;
//         if (error?.response?.status === 500 && !prevRequest?.sent) {
//             prevRequest.sent = true;
//             try {
//                 await useRefreshToken();

//                 return axios(prevRequest);
//             } catch (refreshError) {
//                 // Handle refresh token error, e.g., log it or redirect to login
//                 return Promise.reject(refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosPrivate;



import axios from 'axios';

const BASE_URL = 'https://iqb-backend2.onrender.com';
// const BASE_URL = '/'

export const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials:true
});

export default api;



