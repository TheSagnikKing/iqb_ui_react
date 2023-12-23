import React, { useEffect, useState } from 'react'
import "./SalonSettings.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { salonSettingsUpdateAction } from '../../../redux/actions/salonAction'

import api from "../../../redux/api/Api"

const SalonSettings = () => {
    const [startTime, setStartTime] = useState("")
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

        dispatch(salonSettingsUpdateAction(settingdata))

    }

    useEffect(() => {
        const getsalonfnc = async () => {
            const { data } = await api.post("/api/salonSettings/getSalonSettings", {
                salonId: 4
                // Add other data properties as needed
            })

            console.log(data)
            setStartTime(data?.response?.appointmentSettings?.appointmentStartTime)
            setEndTime(data?.response?.appointmentSettings?.appointmentEndTime)
        }
        getsalonfnc()


    }, [])


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
                            <label for="cars">Start Time:</label>
                            <select name="startTime" id="startTime" style={{
                                height: "35px",
                                borderRadius: "5px",
                                paddingInline: "10px",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "16px"
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
                            <label for="cars">End Time:</label>
                            <select name="endTime" id="endTime" style={{
                                height: "35px",
                                borderRadius: "5px",
                                paddingInline: "10px",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "16px"
                            }} onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}>
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={submitHandler}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalonSettings
