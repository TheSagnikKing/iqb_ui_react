import React, { useEffect, useState } from 'react'
import "./CreateAppointment.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"
import { createAppointmentAction } from '../../../redux/actions/AppointmentAction'
import { useNavigate } from 'react-router-dom'

const CreateAppointment = () => {

    const [name, setName] = useState("")
    const [appointmentNotes, setAppointmentNotes] = useState("")

    const [date, setDate] = useState(null)

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

    useEffect(() => {
        if (salonId) {
            dispatch(barberListAction(salonId))
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

        } else if(date && selectedbarberId){
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

    }, [date, selectedbarberId, LoggedInMiddleware?.user,setTimeSlotData]);

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

    return (
        <>
            <AdminLayout />
            <div className='create-appointment-container'>
                <h2>Create Appointment</h2>

                <div className='create-form'>
                    <div>
                        <label htmlFor="">Appointment Note</label>
                        <input
                            type="text"
                            placeholder='Enter Note'
                            value={appointmentNotes}
                            onChange={(e) => setAppointmentNotes(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Customer Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Choose Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Barber List</label>

                        <div>
                            {
                                barberList ? barberList?.getAllBarbers?.map((barber) => (
                                    <div className='barber-single-join-content-bbr' key={barber._id}>
                                        <p>{barber.email}</p>
                                        <p>{barber.name}</p>
                                        <p>{barber.userName}</p>
                                        <p>{barber.mobileNumber}</p>
                                        <p>{barber.isActive === true ? "Yes" : "No"}</p>
                                        <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)}>Select</button>
                                    </div>


                                )) : <p>No Barber Present</p>
                            }
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Choose  Services</label>

                        <div>
                            {
                                getBarberServicesBybarberId?.response?.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        <p>{b.serviceId}</p>
                                        <p>{b.serviceName}</p>
                                        <p>{b.serviceCode}</p>
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Your Services</label>

                        <div>
                            {
                                selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                        <p>{b.serviceId}</p>
                                        <p>{b.serviceName}</p>
                                        <p>{b.serviceCode}</p>
                                        <p>{b.barberServiceEWT}</p>
                                        <button onClick={() => selectedServiceDelete(b)}>Del</button>
                                    </div>
                                )) : <p>No Services Available</p>
                            }
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Choose  TimeSlots</label>

                        <div>
                            {
                                timeSlotData?.timeSlots && timeSlotData?.timeSlots.length > 0 ? (timeSlotData?.timeSlots.map((t, i) => (
                                    <>
                                        <div key={i} className='timeslot'>
                                            <p>{t.timeInterval}</p>
                                            {
                                                t.disabled == true ? <button>Disable</button> : <button onClick={() => selectTimeSlotfnc(t.timeInterval)}>select</button>
                                            }

                                        </div>
                                    </>
                                ))) : (<p>No TimeSlots</p>)
                            }
                        </div>
                    </div>

                    <div>
                        <h3 htmlFor="">Preview</h3>

                        {/* appointmentName: appointmentName,
            startTime: timeSlotStartTime,
            // customerEmail: "arg@gmail.com",
            customerName: name,
            customerType: "Walk-In",
            methodUsed: "App" */}

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
                                        <p>{c.barberServiceEWT}</p>
                                        <p>{c.serviceId}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <button onClick={CreateAppointment}
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
                            createAppointment?.loading == true ? <h2>loading...</h2> : "Create Appointment"
                        }</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CreateAppointment