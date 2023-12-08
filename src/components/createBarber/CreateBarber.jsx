import React, { useEffect, useState } from 'react'
import "./CreateBarber.css"
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BiDownArrowAlt } from 'react-icons/bi'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

import { createBarberAction } from "../../redux/actions/barberAction"
import AdminLayout from '../layout/Admin/AdminLayout'

const CreateBarber = () => {

    const [dropdown, setDropdown] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [salonId, setSalonId] = useState("")
    const [barberServices, setBarberServices] = useState([])

    useEffect(() => {
        const getServices = async () => {
            //This are Salon services
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/salon/allSalonServices?salonId=3`)
            setBarberServices(data)
        }

        getServices()
    }, [])

    console.log(barberServices)

    // Use a Map to store serviceEWT for each serviceId
    const [barberserviceEWTMap, setBarberserviceEWTMap] = useState(new Map());

    // Update serviceEWT for a specific serviceId
    const updateServiceEWT = (serviceId, value) => {
        setBarberserviceEWTMap(new Map(barberserviceEWTMap.set(serviceId, value)));
    };

    const [selectedService, setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser, serviceEWT: barberserviceEWTMap.get(ser.serviceId) || 0 };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    const dispatch = useDispatch()

    const submitHandler = () => {
        const barberdata = {
            name, email, userName, mobileNumber, dateOfBirth, salonId, barberServices: selectedService
        }
        dispatch(createBarberAction(barberdata))
        alert("Barber created successfully")
    }




    return (
        <>

            <AdminLayout />
            <div className='crt-wrapper'>
                <p>Create Barber</p>

                <div className='crt-form'>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>User Name</label>
                        <input
                            type="text"
                            placeholder='Enter UserName'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Mobile Number</label>
                        <input
                            type="number"
                            placeholder='Enter MobileNumber'
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Date of birth</label>
                        <input
                            type="text"
                            placeholder='Enter Date of Birth'
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Salon ID</label>
                        <input
                            type="text"
                            placeholder='Enter Salon ID'
                            value={salonId}
                            onChange={(e) => setSalonId(e.target.value)}
                        />
                    </div>
                    <div>

                    </div>

                    <button onClick={submitHandler}>Create</button>

                    <div>
                        <div>
                            <label>Services</label>
                            <div onClick={() => setDropdown(!dropdown)}><BiDownArrowAlt /></div>
                        </div>

                        {
                            dropdown && <div className='barber-dropdown'>
                                {
                                    barberServices && barberServices?.response ? barberServices.response.map((ser, index) => (
                                        <div key={index} >
                                            <div>
                                                <p>serviceId</p>
                                                <p>{ser.serviceId}</p>
                                            </div>

                                            <div>
                                                <p>serviceCode</p>
                                                <p>{ser.serviceCode}</p>
                                            </div>

                                            <div>
                                                <p>serviceName</p>
                                                <p>{ser.serviceName}</p>
                                            </div>

                                            <div>
                                                <p>serviceEWT</p>
                                                <input
                                                    type="number"
                                                    value={barberserviceEWTMap.get(ser.serviceId) || ''}
                                                    onChange={(e) => updateServiceEWT(ser.serviceId, e.target.value)}
                                                />
                                                {/* <p>{}</p> */}
                                            </div>

                                            <button onClick={() => selectedServiceHandler(ser, index)}>Add</button>
                                        </div>
                                    )) : <p>No services present</p>
                                }
                            </div>
                        }

                        <p>Your Services</p>
                        <div className='barber-dropdown-select'>
                            {
                                selectedService ? selectedService.map((ser, index) => (
                                    <div key={index}>
                                        <div>
                                            <p>serviceId</p>
                                            <p>{ser.serviceId}</p>
                                        </div>

                                        <div>
                                            <p>serviceCode</p>
                                            <p>{ser.serviceCode}</p>
                                        </div>

                                        <div>
                                            <p>serviceName</p>
                                            <p>{ser.serviceName}</p>
                                        </div>

                                        <div>
                                            <p>serviceEWT</p>
                                            <p>{ser.serviceEWT}</p>                               
                                        </div>

                                        <div onClick={() => selectedServiceDelete(ser)}><MdDelete /></div>
                                    </div>
                                )) : <p>No services present</p>
                            }

                        </div>

                    </div>



                </div>
            </div>

        </>
    )
}

export default CreateBarber