import React, { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Link, useNavigate } from 'react-router-dom';


import api from "../../../redux/api/Api"
import { useSelector } from 'react-redux';
import Layout from '../../../components/layout/Layout';

// import Layout from '../../components/barber/layout/Layout'

function BarberAppointment() {

    const navigate = useNavigate()

    const handleDateSelect = (selectInfo) => {

        navigate("/barber/appoinment/calender", { state: selectInfo.dateStr })
        // console.log(selectInfo.dateStr); // Log the selected date's start date
    };

    const [appointmentData,setAppointmentData] = useState([])

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    useEffect(() => {
        const apfunc = async() => {
            const {data} = await api.post("/api/appointments/getAllAppointmentsByBarberId",{
                // salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
                barberId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].barberId
            })
            setAppointmentData(data?.response)
        }

        apfunc();
    },[LoggedInMiddleware?.user])

    console.log(appointmentData)

    //Demo Events for testing
    // const totalEvents = [
    //     { title: 'event 1', date: '2023-12-18',color:"red"},
    //     { title: 'event 2', date: '2023-12-18' ,color:"red" },
    //     { title: 'event 3', date: '2023-12-18' ,color:"red"},
    //     { title: 'event 2', date: '2023-12-20',color:"yellow" },
    //     { title: 'event Sagnik', date: '2023-12-22',color:"orange" }
    //   ]

    return (
        <>
            <Layout/>
            <div className='calender-month'>

                <div className='demo-app-main'>
                    <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    dateClick={handleDateSelect}
                    events={appointmentData.map((e) => (
                        {
                            title:e.appointmentNotes, date: e.appointmentDate
                        }
                    ))}
                    dayMaxEvents={true}
                />
                </div>
            </div>
        </>
    );
}

export default BarberAppointment;

