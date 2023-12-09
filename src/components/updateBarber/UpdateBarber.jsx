import React, { useEffect, useState } from 'react'
import "./UpdateBarber.css"
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BiDownArrowAlt } from 'react-icons/bi'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

import { updateBarberAction } from "../../redux/actions/barberAction"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useLocation } from 'react-router-dom'

const UpdateBarber = () => {

    const [dropdown, setDropdown] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [salonId, setSalonId] = useState("")
    const [barberServices, setBarberServices] = useState([])
    const [error1, setError1] = useState("")


    const [selectedService, setSelectedService] = useState([])

    const [barberserviceEWTMap, setBarberserviceEWTMap] = useState(new Map());

    const updateServiceEWT = (serviceId, value) => {
        setBarberserviceEWTMap(new Map(barberserviceEWTMap.set(serviceId, value)));
    };

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser, serviceEWT: barberserviceEWTMap.get(ser.serviceId) || 0 };
            
            setSelectedService([...selectedService, serviceWithEWT])
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    useEffect(() => {
        try {
            const getServices = async () => {
                const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/salon/allSalonServices?salonId=3`)
                setBarberServices(data)
                setError1(data.message)

                // Set initial values for barberserviceEWTMap
            const initialBarberserviceEWTMap = new Map();
            data?.response?.forEach((ser) => {
                initialBarberserviceEWTMap.set(ser.serviceId, ser.serviceEWT || 0);
            });
            setBarberserviceEWTMap(initialBarberserviceEWTMap);
            }

            getServices()
        } catch (error) {
            console.log(error)
        }

    }, [])

    const dispatch = useDispatch()

    const submitHandler = () => {
        const barberdata = {
            name, email, userName, mobileNumber, dateOfBirth, salonId, barberServices: selectedService
        }
        dispatch(updateBarberAction(barberdata))
        alert("update barber successfully")
    }

    const location = useLocation()
    const barberemail = location?.state?.barberemail;

    useEffect(() => {
        const fetchdetailbarber = async () => {
            const { data } = await axios.post(`https://iqb-backend2.onrender.com/api/barber/getBarberDetailsByEmail`, { email: barberemail })
            
            console.log(data)

            setName(data?.response?.name)
            setUserName(data?.response?.userName)
            setEmail(data?.response?.email)
            setMobileNumber(data?.response?.mobileNumber)
            setDateOfBirth(data?.response?.dateOfBirth)
            setSalonId(data?.response?.salonId)
            // setBarberServices(data?.response?.barberServices)
        }

        fetchdetailbarber()
    }, [])

    console.log(barberServices)


    return (
        <>
            <AdminLayout />
            <div className='upd-wrapper'>
                <p>Update Barber</p>

                <div className='upd-form'>
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
                    <div></div>

                    <button onClick={submitHandler}>Update</button>

                    <div>
                        <div>
                            <label>Services</label>
                            <div onClick={() => setDropdown(!dropdown)}><BiDownArrowAlt /></div>
                        </div>

                        {
                            dropdown && <div className='barber-dropdown'>
                                {
                                    barberServices?.response && barberServices?.response?.length > 0 ? barberServices?.response.map((ser, index) => (
                                        <div key={index} >
                                            <div>
                                                <p>serviceId</p>
                                                <p>111</p>
                                            </div>

                                            <div>
                                                <p>serviceCode</p>
                                                <p>saccas</p>
                                            </div>

                                            <div>
                                                <p>serviceName</p>
                                                <p>ascsajkb</p>
                                            </div>

                                            <div>
                                                <p>serviceEWT</p>
                                                <input
                                                    type="number"
                                                    value={  barberserviceEWTMap.get(ser.serviceId) }
                                                    onChange={(e) => updateServiceEWT(ser.serviceId, e.target.value)}
                                                />
                                                {/* <p>{}</p> */}
                                            </div>

                                            <button onClick={() => selectedServiceHandler(ser, index)}>Add</button>
                                            {/* <p>{error1 && error1}</p> */}
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
                                            <p>111</p>
                                        </div>

                                        <div>
                                            <p>serviceCode</p>
                                            <p>saccas</p>
                                        </div>

                                        <div>
                                            <p>serviceName</p>
                                            <p>ascsajkb</p>
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

export default UpdateBarber