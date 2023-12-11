import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoggedOutMiddlewareAction,LoggedInMiddlewareAction } from '../../redux/actions/AdminAuthAction'

const Auth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoggedOutMiddlewareAction(navigate))
    }, [])

    useEffect(() => {
        dispatch(LoggedInMiddlewareAction())
    })

    return (
        <div>{children}</div>
    )
}

export default Auth