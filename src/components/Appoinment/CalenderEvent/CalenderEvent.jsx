import React, { useEffect, useState } from 'react';
import "./CalenderEvent.css";
import { useLocation, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layout/Admin/AdminLayout';

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import api from "../../../redux/api/Api"
import { useDispatch, useSelector } from 'react-redux';
import { deleteAppointmentAction } from '../../../redux/actions/AppointmentAction';

const CalenderEvent = () => {

    const location = useLocation()
    console.log(location.state)

    const navigate = useNavigate()

    const listHandler = (date) => {
        navigate('/appoinment/calender/list', { state: date })
    }

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const [appointmentsdata, setAppointmentsdata] = useState([])

    useEffect(() => {
        const apfunc = async () => {
            const { data } = await api.post("/api/appointments/getAllAppointmentsBySalonIdAndDate", {
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
                appointmentDate: location.state
            })
            setAppointmentsdata(data?.response)
        }

        apfunc();
    }, [LoggedInMiddleware?.user, location.state])

    console.log("App",appointmentsdata)


    const editHandler = (appointmentdata) => {
        navigate("/appoinment/editappointment", {state:appointmentdata})
    }

    const dispatch = useDispatch()

    const deleteHandler = (m) => {
        const confirm = window.confirm("Are you sure ?")
        
        if(confirm){
            dispatch(deleteAppointmentAction({
                salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
                appointmentId: m._id
            }))
        }
    }

    console.log(appointmentsdata)

    return (
        <>
            <AdminLayout />
            <div className='calender-event'>
                <div className='cal-header'>
                    <h2>Today : {location.state ? location.state : "Please Select Date"}</h2>

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

                                                <p style={{fontSize:"1.4rem"}}>{i.barbername}</p>
                                            </div>

                                            {
                                                i.appointments && i.appointments.length > 0 ? i.appointments.map((m, index) => (
                                                    <div key={index}
                                                    ><div className='appoin' style={{
                                                        background: m.background,
                                                        boxShadow: `0px 0px 8px ${m.background}`,
                                                        fontSize:"1.4rem"
                                                    }}>
                                                            <p>{m.startTime}-{m.endTime}</p>
                                                            <p>Customer : {m.customerName}</p>
                                                            <p style={{fontWeight:"500"}}>Services : </p>
                                                            
                                                            <div className='app-btn-div'>
                                                                <button onClick={() => editHandler(m)}><MdEdit/></button>
                                                                <button onClick={() => deleteHandler(m)}><MdDelete/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) : <p className='noappoin'>No Appoinments</p>
                                            }


                                        </div>

                                    )
                                }) : <p style={{
                                    margin: "3rem"
                                }}>No Appoinments</p>

                            }
                        </div>
                    </div> : <div className='cal-container'
                        style={{
                            padding: "2rem",
                            fontSize: "2rem",
                            fontWeight: "500"
                        }}
                    >No Data Available </div>
                }
            </div>
        </>
    );
}

export default CalenderEvent;

