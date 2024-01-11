import React, { useState } from 'react'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { multipleNotificationAction } from '../../../../redux/actions/NotificationAction'

const MultipleBarberNotification = () => {

    const location = useLocation();
    const checkboxArray = location?.state

    console.log(checkboxArray)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const dispatch = useDispatch()

    const sendHandler = () => {
        const notifydata = {
            title,
            body,
            emails: checkboxArray
        }

        console.log(notifydata)
        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(multipleNotificationAction(notifydata))
        }

    }



    return (
        <>
            <AdminLayout />
            <div className='notification-container'>
                <div>
                    <h1>Multiple Notification</h1>
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

export default MultipleBarberNotification