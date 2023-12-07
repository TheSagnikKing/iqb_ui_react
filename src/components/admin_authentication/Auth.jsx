import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoggedOutMiddlewareAction } from '../../redux/actions/AdminAuthAction'

const Auth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoggedOutMiddlewareAction(navigate))
    }, [])

    return (
        <div>{children}</div>
    )
}

export default Auth