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

    console.log(timeSlotData)

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

    return (
        <>
            <AdminLayout />
            <div className='create-appointment-container'>
                <h1>Edit Appointment</h1>

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
                                appoinmentBarberList ? appoinmentBarberList?.response?.map((barber) => (
                                    <div className='barber-single-join-content-bbr' key={barber._id}>
                                        <p>{barber.email}</p>
                                        <p>{barber.name}</p>
                                        {/* <p>{barber.userName}</p> */}
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
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        {/* <p>{b.serviceId}</p> */}
                                        <p>{b.serviceName}</p>
                                        {/* <p>{b.serviceCode}</p> */}
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
                                fontSize:"11px"
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
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        {/* <p>{b.serviceId}</p> */}
                                        <p>{b.serviceName}</p>
                                        {/* <p>{b.serviceCode}</p> */}
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

                            <div>
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

                            <button className='app-modal-crt-button' onClick={UpdateAppointment} style={{fontSize:"1.2rem"}}>{
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
            </div>
        </>
    )
}

export default EditAppointment