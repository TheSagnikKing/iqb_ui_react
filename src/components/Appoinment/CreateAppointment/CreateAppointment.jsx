import React, { useEffect, useState } from 'react'
import "./CreateAppointment.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"
import { createAppointmentAction } from '../../../redux/actions/AppointmentAction'

const CreateAppointment = () => {

    const [name, setName] = useState("")
    const [appointmentName, setAppointmentName] = useState("")

    const [date, setDate] = useState(null)

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

    useEffect(() => {
        if(salonId){
            dispatch(barberListAction(salonId))
        }
    }, [dispatch,salonId])

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
    }, [date, selectedbarberId,LoggedInMiddleware?.user,alert]);

    const [timeSlotStartTime, setTimeSlotStartTime] = useState("")

    const selectTimeSlotfnc = (timeInterval) => {
        const confirm = window.confirm("Are you Sure?")

        if (confirm) {
            setTimeSlotStartTime(timeInterval)
        }
    }


    const CreateAppointment = () => {
        const createAppointmentData = {
            salonId,
            barberId: selectedbarberId,
            serviceId: selectedService.map((s) => s.serviceId),
            appointmentDate: date,
            appointmentName: appointmentName,
            startTime: timeSlotStartTime,
            // customerEmail: "arg@gmail.com",
            customerName: name,
            customerType: "Walk-In",
            methodUsed: "App"
        }

        console.log(createAppointmentData)

        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            dispatch(createAppointmentAction(createAppointmentData))
        }
    }

    return (
        <>
            <AdminLayout />
            <div className='create-appointment-container'>
                <h2>Create Appointment</h2>

                <div className='create-form'>
                    <div>
                        <label htmlFor="">Appointment Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            value={appointmentName}
                            onChange={(e) => setAppointmentName(e.target.value)}
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

                    <button onClick={CreateAppointment}>Create Appointment</button>
                </div>
            </div>
        </>
    )
}

export default CreateAppointment