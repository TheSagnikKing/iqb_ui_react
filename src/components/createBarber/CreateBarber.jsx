import React, { useEffect, useState } from 'react'
import "./CreateBarber.css"
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BiDownArrowAlt } from 'react-icons/bi'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

import { createBarberAction } from "../../redux/actions/barberAction"
import AdminLayout from '../layout/Admin/AdminLayout'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import api from "../../redux/api/Api"
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";

const CreateBarber = () => {

    const [dropdown, setDropdown] = useState(false)

    const [name, setName] = useState("")
    const [password,setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [nickName, setNickName] = useState("")
    const [mobileNumber, setMobileNumber] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [salonId, setSalonId] = useState(null)
    const [barberServices, setBarberServices] = useState([])

    console.log(barberServices)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
  
    useEffect(() => {
        try {
            const getServices = async () => {
                //This are Salon services and salonId will be dynamic
                const { data } = await api.get(`/api/salon/allSalonServices?salonId=${LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId}`)
                console.log(data)
                setBarberServices(data)


                
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
        
    }, [LoggedInMiddleware?.user])

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
            const serviceWithEWT = { ...ser, barberServiceEWT: barberserviceEWTMap.get(ser.serviceId) || 0 };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const submitHandler = () => {
        //salonid loggin admin theke 
        const barberdata = {
            name, email, nickName, mobileNumber, dateOfBirth, 
            salonId:Number(LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId), 
            barberServices: selectedService
        }

        console.log(barberdata)
        dispatch(createBarberAction(barberdata,navigate))
    }


    // console.log(selectedService)

    const createBarber = useSelector(state => state.createBarber)


    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentMode = darkMode === "On"

    return (
        <>

            <AdminLayout />
            <div className='crt-wrapper'>
                <h1 style={{color:currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Create Barber</h1>

                <div className={`crt-form ${currentMode ? "crt-form_dark" : ""}`}>
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
                            type="text"
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                     <div>
                        <label>Nick Name</label>
                        <input
                            type="text"
                            placeholder='Enter NickName'
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                   <div></div>

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
                            type="date"
                            placeholder='Enter Date of Birth'
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            style={{width:"75vw"}}
                        />
                    </div>

                    {/* <div>
                        <label>Salon ID</label>
                        <input
                            type="number"
                            placeholder='Enter Salon ID'
                            value={LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId}
                        />
                    </div> */}

                    <div></div>

                
                    

                    <div>
                        <div style={{display:"flex", justifyContent:"space-between",paddingInline:"1rem"}}>
                            <h2 style={{color:currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Services</h2>
                            <div onClick={() => setDropdown(!dropdown)} style={{fontWeight:"bolder",fontSize:"2rem",boxShadow:currentMode ? "0px 0px 4px var(--light-secondary-color)" : "0px 0px 4px rgba(0,0,0,0.4)",borderRadius:"50%",width:"3rem",height:"3rem",display:"flex",justifyContent:"center",alignItems:"center",color:currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}><BiDownArrowAlt /></div>
                        </div>

                        {
                            dropdown && <div className={`barber-dropdown ${currentMode ? "barber-dropdown_dark" : ""}`}>
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
                                                <p>Estimated Wait Time (mins)</p>
                                                <input
                                                    type="number"
                                                    value={barberserviceEWTMap.get(ser.serviceId) || ''}
                                                    onChange={(e) => updateServiceEWT(ser.serviceId, e.target.value)}
                                                    style={{width:"5rem",fontSize:"1.4rem"}}
                                                />
                                                {/* <p>{}</p> */}
                                            </div>

                                            <button onClick={() => selectedServiceHandler(ser, index)} style={{
                                                color: "blue",
                                                width:"3.5rem",
                                                height:"3.5rem",
                                                margin:"auto",
                                                display:"flex",
                                                justifyContent:"center",
                                                alignItems:"center",
                                                background:"#fff",
                                                boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",
                                                border:"none",
                                                cursor:"pointer",
                                                borderRadius:"50%"
                                            }}><FaPlus /></button>
                                        </div>
                                    )) : <p>No services present</p>
                                }
                            </div>
                        }

                        <h2 style={{
                            color:currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                        }}>Your Services</h2>
                        <div className={`barber-dropdown-select ${currentMode ? "barber-dropdonw-select_dark" : ""}`}>
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
                                            <p>Estimated Wait Time (mins)</p>
                                            <p>{ser.barberServiceEWT}</p>                               
                                        </div>

                                        <div onClick={() => selectedServiceDelete(ser)} style={{
                                                color: "red",
                                                width:"3.5rem",
                                                height:"3.5rem",
                                                margin:"auto",
                                                display:"flex",
                                                justifyContent:"center",
                                                alignItems:"center",
                                                background:"#fff",
                                                boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",
                                                border:"none",
                                                cursor:"pointer",
                                                borderRadius:"1rem"
                                            }}><MdDelete /></div>
                                    </div>
                                )) : <p>No services present</p>
                            }

                        </div>

                    </div>


                    <button onClick={submitHandler} 
                    style={{
                        background:currentMode ? "var(--dark-primary-color)" : "var(--light-tertiary-color)",
                        color:currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                    }}
                    >{
                        createBarber?.loading == true ? <h2>Loading...</h2> : "Create"
                    }</button>
                </div>

                <ToastContainer />
            </div>

        </>
    )
}

export default CreateBarber

// const serviceWithEWT = { serviceId:ser.serviceId, serviceCode:ser.serviceCode,serviceName:ser.serviceName,serviceEWT: barberserviceEWTMap.get(ser.serviceId) || 0 };