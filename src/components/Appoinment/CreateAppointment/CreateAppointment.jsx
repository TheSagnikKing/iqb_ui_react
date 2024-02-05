import React, { useEffect, useState } from 'react'
import "./CreateAppointment.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"
import { appoinmentBarberListAction, createAppointmentAction } from '../../../redux/actions/AppointmentAction'
import { useNavigate } from 'react-router-dom'

import Modal from "../../Modal/Modal"
import { FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const CreateAppointment = () => {

    const [name, setName] = useState("")
    const [appointmentNotes, setAppointmentNotes] = useState("")

    const [date, setDate] = useState(null)

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

    useEffect(() => {
        if (salonId) {
            dispatch(appoinmentBarberListAction(Number(salonId)))
        }
    }, [dispatch, salonId])

    const barberList = useSelector(state => state.barberList)

    const [selectedbarberId, setSelectedBarberid] = useState(null)
    const [selectedbarberName, setSelectedBarberName] = useState("")

    const barberServiceCallHandler = (barberId, name) => {
        const selectbarber = window.confirm("Are you sure ?")
        if (selectbarber) {
            setSelectedBarberid(Number(barberId))
            setSelectedBarberName(name)
            dispatch(getbarberServicesbyBarberIdAction(Number(barberId)))
        }

    }

    const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)


    const [selectedService, setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }


    const [timeSlotData, setTimeSlotData] = useState([])

    // console.log(timeSlotData)

    // console.log({
    //     salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
    //     barberId: selectedbarberId,
    //     date
    // })

    useEffect(() => {
        if (date == null && selectedbarberId == null) {

        } else if (date && selectedbarberId) {
            const timeslotfunc = async () => {
                try {
                    const { data } = await api.post("/api/appointments/getEngageBarberTimeSlots", {
                        salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
                        barberId: selectedbarberId,
                        date
                    });
                    setTimeSlotData(data);
                } catch (error) {
                    // Handle the error appropriately, you can log it or show a user-friendly message
                    console.error("Error fetching time slots:", error);
                    alert(error.response.data.message)
                }
            };

            timeslotfunc();
        }

    }, [date, selectedbarberId, LoggedInMiddleware?.user, setTimeSlotData]);

    // useEffect(() => {
    //     const timeslotfunc = async () => {

    //             const { data } = await api.post("/api/appointments/getEngageBarberTimeSlots", {
    //                 salonId: 13,
    //                 barberId: 12,
    //                 date:"2023-12-28"
    //             });
    //             setTimeSlotData(data);

    //     };

    //     timeslotfunc();
    // },[setTimeSlotData])

    const [timeSlotStartTime, setTimeSlotStartTime] = useState("")

    const selectTimeSlotfnc = (timeInterval) => {
        const confirm = window.confirm("Are you Sure?")

        if (confirm) {
            setTimeSlotStartTime(timeInterval)
        }
    }

    const navigate = useNavigate()

    const CreateAppointment = () => {
        const createAppointmentData = {
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            barberId: selectedbarberId,
            serviceId: selectedService.map((s) => s.serviceId),
            appointmentDate: date,
            appointmentNotes: appointmentNotes,
            startTime: timeSlotStartTime,
            // customerEmail: "arg@gmail.com",
            customerName: name,
            customerType: "Walk-In",
            methodUsed: "App"
        }

        // console.log(createAppointmentData)

        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(createAppointmentAction(createAppointmentData, navigate))
        }
    }

    const createAppointment = useSelector(state => state.createAppointment)

    const [showpreview, setShowPreview] = useState(false)


    const appoinmentBarberList = useSelector(state => state.appoinmentBarberList)

    return (
        <>
            <AdminLayout />
            <div className='create-appointment-container'>
                <h1 >Create Appointment</h1>

                <div className='create-form'>
                    <div>
                        <h2>Appointment Note</h2>
                        <input
                            type="text"
                            placeholder='Enter Note'
                            value={appointmentNotes}
                            onChange={(e) => setAppointmentNotes(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Customer Name</h2>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Choose Date</h2>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Barber List</h2>

                        <div style={{overflowY:"scroll",width:"40rem"}}>
                            <div className='barber-single-join-content-bbr'>
                                <p>Email</p>
                                <p>Name</p>
                                <p>Mo. Number</p>
                                <p>Active</p>
                                <p>Action</p>
                            </div>
                            {
                                appoinmentBarberList  ? appoinmentBarberList?.response?.map((barber) => (
                                    <div className='barber-single-join-content-bbr' key={barber._id}>
                                        <p>{barber.email}</p>
                                        <p>{barber.name}</p>
                                        <p>{barber.mobileNumber}</p>
                                        <p>{barber.isActive === true ? "Yes" : "No"}</p>
                                        <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)} style={{
                                            height:"3rem",
                                            border:"1px solid blue",
                                            cursor:"pointer",
                                            background:"#f1f6fc",
                                            color:"blue"
                                        }}><FaPlus /></button>
                                    </div>


                                )) : <p>No Barber Present</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Choose  Services</h2>

                        <div style={{overflowY:"scroll",width:"40rem"}}>
                            <div className='barber-single-join-quebarberserv-content'
                                style={{
                                    fontSize: "11px",
                                }}
                            >
                                <p>Service Name</p>
                                <p>Service Price</p>
                                <p>Estimated Wait Time (mins)</p>
                                <p>Action</p>
                            </div>
                            {
                                getBarberServicesBybarberId?.response?.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        <p>{b.serviceName}</p>
                                        <p>{b.servicePrice}</p>
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceHandler(b, index)} style={{
                                            height:"3rem",
                                            border:"1px solid blue",
                                            cursor:"pointer",
                                            background:"#f1f6fc",
                                            color:"blue"
                                        }}><FaPlus /></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Your Services</h2>

                        <div style={{overflowY:"scroll",width:"40rem"}}>
                            <div className='barber-single-join-quebarberserv-content'
                                style={{
                                    fontSize: "11px"
                                }}
                            >
                                <p>Service Name</p>
                                <p>Service Price</p>
                                <p>Estimated Wait Time(mins)</p>
                                <p>Action</p>
                            </div>
                            {
                                selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        <p>{b.serviceName}</p>
                                        <p>{b.servicePrice}</p>
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceDelete(b)} style={{
                                            height:"3rem",
                                            border:"1px solid red",
                                            cursor:"pointer",
                                            background:"#f1f6fc",
                                            color:"red"
                                        }}><MdDelete /></button>
                                    </div>
                                )) : <p>No Services Available</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Choose  TimeSlots</h2>

                        <div style={{overflowY:"scroll",width:"40rem"}}>
                            {
                                timeSlotData?.timeSlots && timeSlotData?.timeSlots.length > 0 ? (timeSlotData?.timeSlots.map((t, i) => (
                                    <>
                                        <div key={i} className='timeslot'>
                                            <p>{t.timeInterval}</p>
                                            {
                                                t.disabled == true ? <button>Disable</button> : <button onClick={() => selectTimeSlotfnc(t.timeInterval)} style={{
                                                    height:"3rem",
                                                    border:"1px solid blue",
                                                    cursor:"pointer",
                                                    background:"#f1f6fc",
                                                    color:"blue"
                                                }}><FaPlus /></button>
                                            }

                                        </div>
                                    </>
                                ))) : (<p>No TimeSlots</p>)
                            }
                        </div>
                    </div>

                    <button onClick={() => { setShowPreview(true) }}>Preview</button>

                    <Modal isOpen={showpreview} setIsOpen={setShowPreview}>
                        <div className='app-modal-crt'>
                            <h1>Preview Appointment</h1>
                            <div>
                                <p>Appointment Name : {appointmentNotes} </p>
                                <p>Appointment Date : {date} </p>
                                <p>Start Time : {timeSlotStartTime}</p>
                                <p>Customer Name : {name}</p>
                                <p>Customer Type : Walk-In</p>
                                <p>Method Used : App </p>
                            </div>

                            <h2>Your Services</h2>

                            <div style={{overflowY:"scroll" ,width:'45rem'}}>
                                <div className='app-modal-crt-head'>
                                    <p>Service Name</p>
                                    <p>Service Price</p>
                                    <p>Barber Service Estimated Wait Time</p>
                                </div>

                                <div className='app-modal-crt-content'>
                                    {
                                        selectedService.map((s, i) => (
                                            <div key={i}>
                                                <p>{s.serviceName}</p>
                                                <p>{s.servicePrice}</p>
                                                <p>{s.barberServiceEWT}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <button className='app-modal-crt-button' onClick={CreateAppointment} style={{fontSize:"1.2rem"}}>{
                                createAppointment?.loading == true ? <h2>loading...</h2> : "Create Appointment"
                            }</button>
                        </div>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default CreateAppointment