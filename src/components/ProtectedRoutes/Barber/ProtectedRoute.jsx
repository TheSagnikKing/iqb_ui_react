import React, { useEffect, useState } from 'react';
import api from '../../../redux/api/Api';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGGED_IN_MIDDLEWARE_SUCCESS } from '../../../redux/constants/AdminAuthConstants';

const ProtectedRoute = () => {
    const [loggindata, setloggindata] = useState({});
    const [logginerror, setlogginerror] = useState('');

    const dispatch = useDispatch()

    useEffect(() => {
        const logginbarber = async () => {
            try {
                const { data } = await api.get('/api/barber/barberloggedin');
                setloggindata(data);
                dispatch({
                    type:LOGGED_IN_MIDDLEWARE_SUCCESS,
                    payload:data
                })
            } catch (error) {
                if(error?.response?.data?.message === "UnAuthorized Barber" || error?.response?.data?.message === "Forbidden Barber"){
                    localStorage.setItem("userBarberLoggedIn","false")
                    setlogginerror(error?.response?.data?.message)
                }
                
            }
        };

        logginbarber();
    }, [dispatch]);

    let content;

    const navigate = useNavigate()

    const ErrorClickedHandler = () => {
        localStorage.setItem("userBarberLoggedIn","false")
        navigate("/barber-signin")
    }

    if (Object.keys(loggindata).length > 0) {
        // Data is present, render Outlet
        content = <Outlet />;
    } else {
        // Data is not present, render a button or any other UI element
        content = (
            <div>
                <button
                 onClick={ErrorClickedHandler}
                 style={{padding:"0.5rem",margin:"1rem",cursor:"pointer"}}
                 >{logginerror ? logginerror : "Loading"}</button>
            </div>
        );
    }

    return <div>{content}</div>;
};

export default ProtectedRoute;
