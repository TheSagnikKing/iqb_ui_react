import React, { useEffect, useState } from 'react';
import "./Month.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layout/Admin/AdminLayout';

import api from "../../../redux/api/Api"

function Month() {

    const navigate = useNavigate()

    const handleDateSelect = (selectInfo) => {

        navigate("/appoinment/calender", { state: selectInfo.dateStr })
        // console.log(selectInfo.dateStr); // Log the selected date's start date
    };

    const [appointmentData,setAppointmentData] = useState([])

    useEffect(() => {
        const apfunc = async() => {
            const {data} = await api.post("/api/appointments/getAllAppointmentsBySalonId",{
                salonId: 1
            })
            setAppointmentData(data?.response)
        }

        apfunc();
    },[])

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
            <AdminLayout />
            <div className='calender-month'>

                <Link to="/appoinment/createappointment">Create</Link>

                <div className='demo-app-main'>
                    <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    dateClick={handleDateSelect}
                    events={appointmentData.map((e) => (
                        {
                            title:"Appointment Name " + e.appointmentName, date: e.appointmentDate
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


// let eventGuid = 0
//     let eventGuid2 = 0; 
//     let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
//     let todayStr2 = new Date("2023-12-20").toISOString().replace(/T.*$/, '')

    //  const INITIAL_EVENTS = [
    //     [
    //         {
    //             id: createEventId(),
    //             title: 'Appoinment 1',
    //             start: todayStr + 'T09:0:00',
    //             // end: todayStr + 'T10:00:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 2',
    //             start: todayStr + 'T09:00:00',
    //             // end: todayStr + 'T10:00:00',
    //             color:"#FA8128" //light orange
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 3',
    //             start: todayStr + 'T10:30:00',
    //             end: todayStr + 'T11:00:00',
    //             color:"#FC94AF" //light pink
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 4',
    //             start: todayStr + 'T09:45:00',
    //             end: todayStr + 'T11:00:00',
    //             color:"#40e0d0" //light green
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 5',
    //             start: todayStr + 'T11:00:00',
    //             end: todayStr + 'T12:00:00',
    //             color:"#FC94AF" //light pink
    //           },
            
            
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 6',
    //             start: todayStr + 'T11:00:00',
    //             end: todayStr + 'T12:15:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 7',
    //             start: todayStr + 'T08:00:00',
    //             end: todayStr + 'T9:00:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 8',
    //             start: todayStr + 'T08:00:00',
    //             end: todayStr + 'T9:00:00',
    //             color:"#FA8128" //light orange
    //           },
    //           {
    //             id: createEventId(),
    //             title: 'Appoinment 9',
    //             start: todayStr + 'T08:00:00',
    //             end: todayStr + 'T9:00:00',
    //             color:"#FC94AF" //light pink
    //           }
    //     ],
    //     [
    //         {
    //             id: createEventId2(),
    //             title: 'Appoinment Sagnik',
    //             start: todayStr2 + 'T09:0:00',
    //             // end: todayStr + 'T10:00:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment Arghya',
    //             start: todayStr2 + 'T09:00:00',
    //             // end: todayStr + 'T10:00:00',
    //             color:"#FA8128" //light orange
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment sumit',
    //             start: todayStr2 + 'T10:30:00',
    //             end: todayStr2 + 'T11:00:00',
    //             color:"#FC94AF" //light pink
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 4',
    //             start: todayStr2 + 'T09:45:00',
    //             end: todayStr2 + 'T11:00:00',
    //             color:"#40e0d0" //light green
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 5',
    //             start: todayStr2 + 'T11:00:00',
    //             end: todayStr2 + 'T12:00:00',
    //             color:"#FC94AF" //light pink
    //           },
            
            
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 6',
    //             start: todayStr2 + 'T11:00:00',
    //             end: todayStr2 + 'T12:15:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 7',
    //             start: todayStr2 + 'T08:00:00',
    //             end: todayStr2 + 'T9:00:00',
    //             color:"#7EC8E3" //sky blue
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 8',
    //             start: todayStr2 + 'T08:00:00',
    //             end: todayStr2 + 'T9:00:00',
    //             color:"#FA8128" //light orange
    //           },
    //           {
    //             id: createEventId2(),
    //             title: 'Appoinment 9',
    //             start: todayStr2 + 'T08:00:00',
    //             end: todayStr2 + 'T9:00:00',
    //             color:"#FC94AF" //light pink
    //           }
    //     ],
    //   ];
    // function createEventId() {
    //     return String(eventGuid++)
    // }

    // function createEventId2() {
    //     return String(eventGuid2++)
    // }

    // console.log(INITIAL_EVENTS)

    // events={INITIAL_EVENTS.flat()}


    //=========================

     // let eventGuid = 0;

    // function generateEventsForDate(dateStr) {
    //     return [
    //         {
    //             id: createEventId(),
    //             title: 'Appointment 1',
    //             start: dateStr + 'T09:00:00',
    //             color: "#7EC8E3" // sky blue
    //         },
    //         {
    //             id: createEventId(),
    //             title: 'Appointment 2',
    //             start: dateStr + 'T09:30:00',
    //             color: "#FA8128" // light orange
    //         },
    //         {
    //             id: createEventId(),
    //             title: 'Appointment 3',
    //             start: dateStr + 'T09:30:00',
    //             color: "#FA8128" // light orange
    //         },
    //         // Add more events as needed
    //     ];
    // }
    
    // function createEventId() {
    //     return String(eventGuid++);
    // }
    
    // const dates = ['2023-12-20', '2023-12-18', '2023-12-17', '2023-12-16'];
    
    // const INITIAL_EVENTS = dates.map(date => generateEventsForDate(date));
    
    // console.log(INITIAL_EVENTS);