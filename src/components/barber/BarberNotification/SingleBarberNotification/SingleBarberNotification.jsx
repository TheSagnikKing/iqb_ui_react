import React, { useState } from 'react'
import "./SingleBarberNotification.css"
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { singleNotificationAction } from '../../../../redux/actions/NotificationAction'

const SingleBarberNotification = () => {

  const location = useLocation();
  const email = location.state?.barberemail

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const dispatch = useDispatch()

  const sendHandler = () => {
    const notifydata = {
      title,
      body,
      emails: [email]
    }

    console.log(notifydata)
    const confirm = window.confirm("Are you sure ?")

    if(confirm){
      dispatch(singleNotificationAction(notifydata))
    }

  }

  return (
    <>
    <AdminLayout />
    <div className='notification-container'>
        <div>
          <h1>Single Notification</h1>
          <div>
            <label htmlFor="">Title</label>
            <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="">Body</label>
            <input 
            type="text" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <button onClick={() => sendHandler()}>Send</button>
        </div>
    </div>
    </>
  )
}

export default SingleBarberNotification