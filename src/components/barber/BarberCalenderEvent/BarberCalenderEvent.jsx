import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// const appoinments = [
//     {
//         title: "B",
//         barbername: "John",
//         event: [
//             {
//                 event: "B1",
//                 background: "#87CEEB",//sky blue,
//                 startTime:"8:00",
//                 endTime: "9:00"
//             },
//             {
//                 event: "B2",
//                 background: "#FFA500",//orange,
//                 startTime:"10:00",
//                 endTime: "11:00"
//             },
//             {
//                 event: "B3",
//                 background: "#FA86C4",//pink,
//                 startTime:"12:00",
//                 endTime: "1:00"
//             },
//             {
//                 event: "B4",
//                 background: "#15F4EE", //flurocent blue
//                 startTime:"3:00",
//                 endTime: "4:00"
//             },
//             {
//                 event: "B1",
//                 background: "#c5e3e7", //grayish blue,
//                 startTime:"2:00",
//                 endTime: "2:30"
//             },
//             {
//                 event: "B2",
//                 background: "#87CEEB",//sky blue
//                 startTime:"11:00",
//                 endTime: "11:30"
//             },
//             {
//                 event: "B3",
//                 background: "#FA86C4",//pink
//                 startTime:"5:00",
//                 endTime: "6:00"
//             },
//             {
//                 event: "B4",
//                 background: "#c5e3e7", //grayish blue
//                 startTime:"4:30",
//                 endTime: "5:00"
//             }
//         ]
//     },
//     {
//         title: "C",
//         barbername: "Smith",
//         event: [
//             {
//                 event: "C1",
//                 background: "#FFA500",//orange
//                 startTime:"5:00",
//                 endTime: "6:00"
//             },
//             {
//                 event: "C2",
//                 background: "#FA86C4",//pink
//                 startTime:"11:00",
//                 endTime: "11:30"
//             }
//         ]
//     },
//     {
//         title: "D",
//         barbername: "Dorian",
//         event: [
//             {
//                 event: "D1",
//                 background: "#15F4EE", //flurocent blue
//                 startTime:"4:30",
//                 endTime: "5:00"
//             },
//             {
//                 event: "D2",
//                 background: "#FA86C4",//pink
//                 startTime:"5:00",
//                 endTime: "6:00"
//             },
//             {
//                 event: "D3",
//                 background: "#c5e3e7", //grayish blue
//                 startTime:"2:00",
//                 endTime: "2:30"
//             }
//         ]
//     },
//     {
//         title: "E",
//         barbername: "Mihawk",
//         event: [
//             {
//                 event: "E1",
//                 background: "#c5e3e7", //grayish blue
//                 startTime:"8:00",
//                 endTime: "9:00"
//             },
//             {
//                 event: "E2",
//                 background: "#15F4EE", //flurocent blue
//                 startTime:"10:00",
//                 endTime: "11:00"
//             },
//             {
//                 event: "D3",
//                 background: "#15F4EE", //flurocent blue
//                 startTime:"2:00",
//                 endTime: "2:30"
//             }
//         ]

//     },
//     {
//         title: "F",
//         barbername: "Georgina"

//     },
//     {
//         title: "G",
//         barbername: "Angelo"

//     },
//     {
//         title: "H",
//         barbername: "vinci"

//     }
// ]

import api from "../../../redux/api/Api"
import { useSelector } from 'react-redux';
import Layout from '../../../components/layout/Layout';

const BarberCalenderEvent = () => {

    const location = useLocation()
    console.log(location.state)

    const navigate = useNavigate()

    const listHandler = (date) => {
        navigate('/barber/appoinment/calender/list',{state:date})
    }

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
        <div className='calender-event'>
            <div className='cal-header'>
                <h2>Today : {location.state ? location.state : "Please Select Date"}</h2>
                {/* <div>
                    <button>{"<"}</button>
                    <button>{">"}</button>
                </div> */}
                <div><button onClick={() => listHandler(location.state)}>{location.state ? "list" : "No List"}</button></div>
            </div>

            {
                location.state ? <div className='cal-container'>
                <div className='cal-content'>
                    {
                        appointmentsdata && appointmentsdata.length > 0 ? appointmentsdata?.map((i, u) => {
                            return (

                                <div key={u} className='cal-item'>
                                    <div>
                                        <div>
                                            <img src="https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517168.jpg?size=626&ext=jpg&ga=GA1.1.1806204793.1699434893&semt=ais" alt='j' />
                                        </div>

                                        <p>{i.barbername}</p>
                                    </div>

                                    {
                                        i.appointments && i.appointments.length > 0 ? i.appointments.map((m, index) => (
                                            <div className='appoin' key={index}
                                                style={{ background: m.background,
                                                boxShadow: `0px 0px 8px ${m.background}`
                                                }}
                                            >
                                                <p>{m.startTime}-{m.endTime}</p>
                                                <p>Appointment : {m.appointmentName}</p>
                                            </div>
                                        )) : <p className='noappoin'>No Appoinments</p>
                                    }


                                </div>

                            )
                        }) : <p style={{
                            margin:"30px"
                        }}>No Appoinments</p>
                        
                    }
                </div>
            </div> : <div className='cal-container'
            style={{
                padding:"20px",
                fontSize:"20px",
                fontWeight:"500"
            }}
            >No Data Available </div>
            }
            </div>
        </>
    );
}

export default BarberCalenderEvent;

