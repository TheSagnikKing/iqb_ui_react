import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from "../../../redux/api/Api"
import Layout from '../../../components/layout/Layout'

const BarberCalenderList = () => {

    const location = useLocation()
    console.log(location.state)


    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const [appointmentsdata, setAppointmentsdata] = useState([])

    useEffect(() => {
        const apfunc = async() => {
            const {data} = await api.post("/api/appointments/getAllAppointmentsByBarberIdAndDate",{
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
                barberId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].barberId,
                appointmentDate: location.state
            })
            setAppointmentsdata(data?.response)
        }

        apfunc();
    },[LoggedInMiddleware?.user,location.state])

    console.log(appointmentsdata)

    return (
        <>
        <Layout/>
        <div className='calender-list'>
            <div className='list-header'>
                <h2>Date : {location.state ? location.state : "Please Select Your Date"}</h2>
            </div>
            <div className='list-cont'>
                {
                    appointmentsdata.map((app, index) => (
                        <div className='list-content-box'>
                            <div>
                                <div>
                                    <div><img src="https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517168.jpg?size=626&ext=jpg&ga=GA1.1.1806204793.1699434893&semt=ais" alt="H" /></div>
                                    <p>{app.barbername}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    app.appointments ? app.appointments.map((evt, ind) => (
                                        <div>
                                            <div style={{
                                                // background: evt.background,
                                            }}></div><p>Appointment {evt.appointmentNotes} {` (${evt.appointmentStartTime}-${evt.appointmentEndTime})`}</p>
                                        </div>
                                    )) : <p className='noappoin2'>No Appoinments</p>
                                }

                                {/* <div>
                                    <div></div><p>Event 2</p>
                                </div>
                                <div>
                                    <div></div><p>Event 3</p>
                                </div> */}
                            </div>
                        </div>
                    ))
                }

            </div>
            </div>
        </>
    )
}

export default BarberCalenderList