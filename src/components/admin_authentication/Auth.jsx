import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoggedOutMiddlewareAction,LoggedInMiddlewareAction } from '../../redux/actions/AdminAuthAction'

const Auth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoggedInMiddlewareAction(navigate))
    },[dispatch,navigate])

    useEffect(() => {
        dispatch(LoggedOutMiddlewareAction(navigate))
    }, [dispatch,navigate])

    return (
        <div>{children}</div>
    )
}

export default Auth