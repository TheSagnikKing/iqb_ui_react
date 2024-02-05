import React, { useEffect, useState } from 'react'
import "./SalonSettings.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { salonSettingsUpdateAction } from '../../../redux/actions/salonAction'

import api from "../../../redux/api/Api"
import { useNavigate } from 'react-router-dom'

const SalonSettings = () => {
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const dispatch = useDispatch()

    const salonSettingsUpdate = useSelector(state => state.salonSettingsUpdate)
    const navigate = useNavigate()

    const submitHandler = () => {
        const settingdata = {
            "salonId": LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            "appointmentSettings": {
                "startTime": startTime,
                "endTime": endTime
            }
        }

        console.log(settingdata)

        dispatch(salonSettingsUpdateAction(settingdata,navigate))

    }   

    useEffect(() => {
        const getsalonfnc = async () => {

            const { data } = await api.post("/api/salonSettings/getSalonSettings", {
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId
                // Add other data properties as needed
            })

            console.log(data)
            setStartTime(data?.response?.appointmentSettings?.appointmentStartTime)
            setEndTime(data?.response?.appointmentSettings?.appointmentEndTime)

        }
        getsalonfnc()


    }, [LoggedInMiddleware?.user])


    const [timeOptions, setTimeOptions] = useState([]);

    // Function to add leading zero for single-digit hours and minutes
    const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

    // Function to generate time options
    const generateTimeOptions = () => {
        const options = [];

        // Loop through hours (0 to 23)
        for (let hour = 0; hour < 24; hour++) {
            // Loop through minutes (0 and 30)
            for (let minute = 0; minute < 60; minute += 30) {
                // Format the time as HH:mm
                const time = addLeadingZero(hour) + ':' + addLeadingZero(minute);
                options.push({ value: time, label: time });
            }
        }

        setTimeOptions(options);
    };

    // Call the function to generate time options when the component mounts
    useEffect(() => {
        generateTimeOptions();
    }, []);

    return (
        <>
            <AdminLayout />
            <div className="wrapper">
                <div className='salon-wrapper-container'>
                    <h3>Salon Settings</h3>

                    <div>

                        <div>
                            <h2>Start Time:</h2>
                            <select name="startTime" id="startTime" style={{
                                height: "3.5rem",
                                borderRadius: "0.5rem",
                                paddingInline: "1rem",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "1.6rem"
                            }}
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                            >
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h2>End Time:</h2>
                            <select name="endTime" id="endTime" style={{
                                height: "3.5rem",
                                borderRadius: "0.5rem",
                                paddingInline: "1rem",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "1.6rem"
                            }} onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}>
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <h2>Appointment Start Time:</h2>
                            <select name="startTime" id="startTime" style={{
                                height: "3.5rem",
                                borderRadius: "0.5rem",
                                paddingInline: "1rem",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "1.6rem"
                            }}
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                            >
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <h2>Appointment End Time:</h2>
                            <select name="endTime" id="endTime" style={{
                                height: "3.5rem",
                                borderRadius: "0.5rem",
                                paddingInline: "1rem",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "1.6rem"
                            }} onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}>
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={submitHandler}>{
                            salonSettingsUpdate?.loading == true ? <h2>Loading...</h2> : "Submit"
                        }</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalonSettings
