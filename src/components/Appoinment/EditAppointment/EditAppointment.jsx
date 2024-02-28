import React, { useEffect, useState } from 'react'
import "./EditAppointment.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"
import { appoinmentBarberListAction, createAppointmentAction, editAppointmentAction } from '../../../redux/actions/AppointmentAction'
import { useLocation, useNavigate } from 'react-router-dom'
import Modal from '../../Modal/Modal'
import { FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { ImCross } from 'react-icons/im'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditAppointment = () => {

    const location = useLocation()
    console.log("editApp", location?.state)

    useEffect(() => {
        if (location?.state) {
            setAppointmentNotes(location?.state.appointmentNotes)
            setName(location?.state.customerName)
            setTimeSlotStartTime(location?.state.startTime)
            setDate(location?.state.appointmentDate.slice(0, 10))
            setAppointmentId(location?.state._id)
            setSelectedService(location?.state.services)
        }
    }, [location?.state])

    const [name, setName] = useState("")
    const [appointmentNotes, setAppointmentNotes] = useState("")
    const [appointmentId, setAppointmentId] = useState(null);

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
        const servicepresent = selectedService.find((s) => s.serviceId === ser.serviceId)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f.serviceId !== ser.serviceId)
        setSelectedService(deleteService)
    }


    const [timeSlotData, setTimeSlotData] = useState([])

    // console.log(timeSlotData)

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

    const [timeSlotStartTime, setTimeSlotStartTime] = useState("")

    const selectTimeSlotfnc = (timeInterval) => {
        const confirm = window.confirm("Are you Sure?")

        if (confirm) {
            setTimeSlotStartTime(timeInterval)
        }
    }

    const navigate = useNavigate()

    const UpdateAppointment = () => {
        const editAppointmentData = {
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            barberId: selectedbarberId,
            serviceId: selectedService.map((s) => s.serviceId),
            appointmentDate: date,
            appointmentId,
            appointmentNotes: appointmentNotes,
            startTime: timeSlotStartTime,
        }

        console.log("saas", editAppointmentData)

        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(editAppointmentAction(editAppointmentData, navigate))
        }
    }

    const editAppointment = useSelector(state => state.editAppointment)

    const [showpreview, setShowPreview] = useState(false)

    const appoinmentBarberList = useSelector(state => state.appoinmentBarberList)

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <>
            <AdminLayout />
            <div className={`create-appointment-container ${currentmode ? "create-appointment-container_dark" : ""}`}>
                <h1>Edit Appointment</h1>

                <div className={`create-form ${currentmode ? "create-form_dark" : ""}`}>
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

                        <div style={{
                            overflowY: "scroll", width: "40rem",
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)"
                        }}>
                            <div className={`barber-single-join-content-bbr ${currentmode ? "barber-single-join-content-bbr_dark" : ""}`}>
                                <p>Email</p>
                                <p>Name</p>
                                <p>Mo. Number</p>
                                <p>Active</p>
                                <p>Action</p>
                            </div>
                            {
                                appoinmentBarberList ? appoinmentBarberList?.response?.map((barber) => (
                                    <div className={`barber-single-join-content-bbr ${currentmode ? "barber-single-join-content-bbr_dark" : ""}`} key={barber._id}>
                                        <p>{barber.email}</p>
                                        <p>{barber.name}</p>
                                        {/* <p>{barber.userName}</p> */}
                                        <p>{barber.mobileNumber}</p>
                                        <p>{barber.isActive === true ? "Yes" : "No"}</p>
                                        <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)} style={{
                                            width: "5rem",
                                            height: "3rem",
                                            border: "1px solid blue",
                                            cursor: "pointer",
                                            background: "#f1f6fc",
                                            color: "blue"
                                        }}><FaPlus /></button>
                                    </div>


                                )) : <p>No Barber Present</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Choose  Services</h2>

                        <div style={{ overflowY: "scroll", width: "40rem", background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)" }}>
                            <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`}
                                style={{
                                    fontSize: "11px"
                                }}
                            >
                                {/* <p>ServiceID</p> */}
                                <p>ServiceName</p>
                                {/* <p>ServiceCode</p> */}
                                <p>Service Price</p>
                                <p>Estimated Wait Time(mins)</p>
                                <p>Action</p>
                            </div>
                            {
                                getBarberServicesBybarberId?.response?.map((b, index) => (
                                    <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`} key={b._id}>
                                        {/* <p>{b.serviceId}</p> */}
                                        <p>{b.serviceName}</p>
                                        {/* <p>{b.serviceCode}</p> */}
                                        <p>{b.servicePrice}</p>
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceHandler(b, index)} style={{
                                            width: "5rem",
                                            height: "3rem",
                                            border: "1px solid blue",
                                            cursor: "pointer",
                                            background: "#f1f6fc",
                                            color: "blue"
                                        }}><FaPlus /></button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Your Services</h2>

                        <div style={{ overflowY: "scroll", width: "40rem", background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)" }}>
                            <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`}
                                style={{
                                    fontSize: "11px"
                                }}
                            >
                                {/* <p>ServiceID</p> */}
                                <p>ServiceName</p>
                                {/* <p>ServiceCode</p> */}
                                <p>Service Price</p>
                                <p>Estimated Wait Time(mins)</p>
                                <p>Action</p>
                            </div>
                            {
                                selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                    <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`} key={b._id}>
                                        {/* <p>{b.serviceId}</p> */}
                                        <p>{b.serviceName}</p>
                                        {/* <p>{b.serviceCode}</p> */}
                                        <p>{b.servicePrice}</p>
                                        {/* barberServiceEWT chilo but arghya atake serviceEWT boleche korte */}
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceDelete(b)} style={{
                                            width: "5rem",
                                            height: "3rem",
                                            border: "1px solid red",
                                            cursor: "pointer",
                                            background: "#f1f6fc",
                                            color: "red"
                                        }}><MdDelete /></button>
                                    </div>
                                )) : <p>No Services Available</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h2>Choose  TimeSlots</h2>

                        <div style={{ overflowY: "scroll", width: "40rem", background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)" }}>
                            {
                                timeSlotData?.timeSlots && timeSlotData?.timeSlots.length > 0 ? (timeSlotData?.timeSlots.map((t, i) => (
                                    <>
                                        <div key={i} className={`timeslot ${currentmode ? "timeslot_dark" : ""}`}>
                                            <p>{t.timeInterval}</p>
                                            {
                                                t.disabled == true ? <button style={{ color: "red", border: "none", background: "#f1f6fc", border: "1px solid red", display: "flex", justifyContent: "center", alignItems: "center", height: "3rem", width: "3.5rem" }}><ImCross /></button> : <button onClick={() => selectTimeSlotfnc(t.timeInterval)} style={{
                                                    height: "3rem",
                                                    border: "1px solid blue",
                                                    cursor: "pointer",
                                                    background: "#f1f6fc",
                                                    color: "blue"
                                                }}><FaPlus /></button>
                                            }

                                        </div>
                                    </>
                                ))) : (<p>No TimeSlots</p>)
                            }
                        </div>
                    </div>

                    <button onClick={() => { setShowPreview(true) }}
                        style={{
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)",
                            color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                        }}
                    >Preview</button>

                    <Modal isOpen={showpreview} setIsOpen={setShowPreview}>
                        <div className={`app-modal-crt ${currentmode ? "app-modal-crt_dark" : ""}`}>
                            <h1 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Preview Appointment</h1>
                            <div>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Appointment Name : {appointmentNotes} </p>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Appointment Date : {date} </p>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Start Time : {timeSlotStartTime}</p>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Customer Name : {name}</p>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Customer Type : Walk-In</p>
                                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Method Used : App </p>
                            </div>

                            <h2>Your Services</h2>

                            <div style={{
                                background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)"
                            }}>
                                <div className={`app-modal-crt-head ${currentmode ? "app-modal-crt-head_dark" : ""}`}>
                                    <p>Service Name</p>
                                    <p>Service Price</p>
                                    <p>Barber Service Estimated Wait Time</p>
                                </div>

                                <div className={`app-modal-crt-content ${currentmode ? "app-modal-crt-content_dark" : ""}`}>
                                    {
                                        selectedService.map((s, i) => (
                                            <div key={i} style={{background:darkMode === "On" ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"}}>
                                                <p>{s.serviceName}</p>
                                                <p>{s.servicePrice}</p>
                                                <p>{s.barberServiceEWT}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <button className='app-modal-crt-button' onClick={UpdateAppointment} style={{
                                background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)",
                                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)",
                                fontSize: "1.2rem"
                            }}>{
                                    editAppointment?.loading == true ? <h2>loading...</h2> : "Update Appointment"
                                }</button>
                        </div>
                    </Modal>

                    {/* <div>
                        <h3 htmlFor="">Preview</h3>
                        <div>
                            <p>Appointment Name : <b>{appointmentNotes}</b></p>
                            <p>Appointment Date : <b>{date}</b></p>
                            <p>Start Time : <b>{timeSlotStartTime}</b></p>
                            <p>Customer Name : <b>{name}</b></p>
                            <p>Customer Type :<b>Walk-In</b></p>
                            <p>Method Used : <b>App</b></p>
                            <p><b>Services :</b></p>
                            {
                                selectedService.map((c, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        gap: "1rem",
                                        marginBlock: "10px",
                                        width: "30%",
                                        padding: "5px",
                                        boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                        borderRadius: "3px"
                                    }}>
                                        <p>{c.serviceName}</p>
                                        <p>{c.servicePrice}</p>
                                        <p>{c.barberServiceEWT}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <button onClick={UpdateAppointment}
                            style={{
                                backgroundColor: "#f1f6fc",
                                width: "50%",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                borderRadius: "4px",
                                height: "35px"
                            }}
                        >{
                                editAppointment?.loading == true ? <h2>Loading...</h2> : "Edit Appointment"
                            }</button>
                    </div> */}

                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default EditAppointment