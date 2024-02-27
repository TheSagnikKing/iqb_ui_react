import React, { useEffect, useRef, useState } from 'react';
import "./Month.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layout/Admin/AdminLayout';

import api from "../../../redux/api/Api"
import { useSelector } from 'react-redux';

function Month() {

    const navigate = useNavigate()

    const handleDateSelect = (selectInfo) => {

        navigate("/appoinment/calender", { state: selectInfo.dateStr })
        // console.log(selectInfo.dateStr); // Log the selected date's start date
    };

    const [appointmentData, setAppointmentData] = useState([])

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const AppointmentRef = useRef(null);

    useEffect(() => {

        if (AppointmentRef.current) {
            AppointmentRef.current.abort(); // Abort previous request if it exists
        }

        const newController = new AbortController();
        AppointmentRef.current = newController;

        const signal = newController.signal;

        const apfunc = async () => {
            const { data } = await api.post("/api/appointments/getAllAppointmentsBySalonId", {
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId
            }, { signal })
            setAppointmentData(data?.response)
        }

        apfunc();

        return () => {
            AppointmentRef.current.abort();
        };

    }, [LoggedInMiddleware?.user])

    console.log(appointmentData)

    //Demo Events for testing
    // const totalEvents = [
    //     { title: 'event 1', date: '2023-12-18',color:"red"},
    //     { title: 'event 2', date: '2023-12-18' ,color:"red" },
    //     { title: 'event 3', date: '2023-12-18' ,color:"red"},
    //     { title: 'event 2', date: '2023-12-20',color:"yellow" },
    //     { title: 'event Sagnik', date: '2023-12-22',color:"orange" }
    //   ]


    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <>
            <AdminLayout />
            <div className={`calender-month ${currentmode ? "calender-month_dark" : ""}`}>

                <h2 style={{ marginBottom: "2rem" }}>Appointment</h2>

                <Link to="/appoinment/createappointment" style={{ background:currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)", border: "1px solid black",
                 color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)", fontSize: "1.4rem", 
                 padding: "0.8rem 1.2rem",
                 textDecoration: "none"
                  }}>Create</Link>

                <div className='demo-app-main' style={{ marginTop: "2rem" }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView='dayGridMonth'
                        dateClick={handleDateSelect}
                        events={appointmentData?.map((e) => (
                            {
                                title: e.appointmentNotes, date: e.appointmentDate
                            }
                        ))}
                        dayMaxEvents={true}
                    />
                </div>
            </div>
        </>
    );
}

export default Month;

