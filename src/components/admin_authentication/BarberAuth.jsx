import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BarberLoggedInMiddlewareAction, BarberLoggedOutMiddlewareAction } from '../../redux/actions/BarberAuthAction'

const BarberAuth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(BarberLoggedOutMiddlewareAction(navigate))
    }, [])

    useEffect(() => {
        dispatch(BarberLoggedInMiddlewareAction(navigate))
    },[])

    return (
        <div>{children}</div>
    )
}

export default BarberAuth