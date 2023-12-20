import React, { useState } from 'react'
import "./SalonSettings.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { salonSettingsAction } from '../../../redux/actions/salonAction'

const SalonSettings = () => {
    const [startTime,setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const dispatch = useDispatch()

    const submitHandler = () => {
        const settingdata = {
            "salonId": LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            "appointmentSettings": {
            "startTime": startTime,
            "endTime": endTime   
          }
        }

        console.log(settingdata)

        dispatch(salonSettingsAction(settingdata))

    }

    return (
        <>
            <AdminLayout />
            <div className="wrapper">
                <div className='salon-wrapper-container'>
                    <h3>Salon Settings</h3>

                    <div>

                        <div>
                            <label htmlFor="">Start Time</label>
                            <input
                                type="text"
                                value={startTime}
                                placeholder='00:00'
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">End Time</label>
                            <input
                                type="text"
                                value={endTime}
                                placeholder='00:00'
                                onChange={(e) => setEndTime(e.target.value)}
                            />
                        </div>

                        <button onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalonSettings