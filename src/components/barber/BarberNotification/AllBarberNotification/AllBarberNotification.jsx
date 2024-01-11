import React, { useEffect } from 'react'
import "./AllBarberNotification.css"
import Layout from '../../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getallNotificationAction } from '../../../../redux/actions/NotificationAction'

const AllBarberNotification = () => {
    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const dispatch = useDispatch()

    useEffect(() => {
        if(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.email){
            dispatch(getallNotificationAction(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.email))
        }   
    },[LoggedInMiddleware?.user])

    const getallNotification = useSelector(state => state.getallNotification)

    const {response} = getallNotification
  return (
    <>
    <Layout />
    <div className='allbarber-notify-container'>
        <h2>All Notifications</h2>
        <div>
            {
                response?.sentNotifications.map((n) => (
                    <div key={n._id} className='getallnotify'>
                        <h3>{n.title}</h3>
                        <p>{n.body}</p>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default AllBarberNotification