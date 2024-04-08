import React, { useEffect, useRef, useState } from 'react'
import "./UpdateBarber.css"
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BiDownArrowAlt } from 'react-icons/bi'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

import { updateBarberAction } from "../../redux/actions/barberAction"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useLocation, useNavigate } from 'react-router-dom'

import api from "../../redux/api/Api"
import { FaPlus } from 'react-icons/fa'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBarber = () => {

    const [dropdown, setDropdown] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [nickName, setNickName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [salonId, setSalonId] = useState("")
    const [barberServices, setBarberServices] = useState([])
    const [error1, setError1] = useState("")


    const [selectedService, setSelectedService] = useState([])
    console.log(selectedService)

    const [barberserviceEWTMap, setBarberserviceEWTMap] = useState(new Map());

    const updateServiceEWT = (serviceId, value) => {
        setBarberserviceEWTMap(new Map(barberserviceEWTMap.set(serviceId, value)));
    };

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser, barberServiceEWT: barberserviceEWTMap.get(ser.serviceId) || 0 };

            setSelectedService([...selectedService, serviceWithEWT])
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    //Salon Id dynamic thakbe
    const currentSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    useEffect(() => {
        try {
            const getServices = async () => {
                //salonid will be dynamic
                const { data } = await api.get(`/api/admin/allSalonServices?salonId=${currentSalonId}`)
                setBarberServices(data)
                setError1(data.message)


                // console.log(data)

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

    }, [currentSalonId])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const controllerRef = useRef(null);

    const submitHandler = () => {

        if (controllerRef.current) {
            controllerRef.current.abort(); // Abort previous request if it exists
        }

        const newController = new AbortController();
        controllerRef.current = newController;

        const signal = newController.signal;

        const barberdata = {
            name,
            email, nickName, mobileNumber, dateOfBirth, salonId, barberServices: selectedService
        }
        // console.log(barberdata)
        dispatch(updateBarberAction(barberdata, navigate, signal))
    }

    const location = useLocation()
    const barberemail = location?.state?.barberemail;

    const fetchdetailbarberRef = useRef(null);

    useEffect(() => {

        if (fetchdetailbarberRef.current) {
            fetchdetailbarberRef.current.abort(); // Abort previous request if it exists
        }

        const newController = new AbortController();
        fetchdetailbarberRef.current = newController;

        const signal = newController.signal;

        const fetchdetailbarber = async () => {
            const { data } = await api.post(`/api/admin/getBarberDetailsByEmail`, { email: barberemail }, { signal })

            console.log("scsdvsdvdsvddssd", data)

            setName(data?.response?.name)
            setNickName(data?.response?.nickName)
            setEmail(data?.response?.email)
            setMobileNumber(data?.response?.mobileNumber)
            setDateOfBirth(data?.response?.dateOfBirth.split("T")[0])
            setSalonId(data?.response?.salonId)
            setSelectedService(data?.response?.barberServices)
            // setBarberServices(data?.response?.barberServices)
        }

        fetchdetailbarber()

        return () => {
            fetchdetailbarberRef.current.abort();
        };

    }, [])

    // console.log(barberServices)

    const updateBarber = useSelector(state => state.updateBarber)

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <>
            <AdminLayout />
            <div className='upd-wrapper'>
                <h3 style={{
                    color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                }}>Update Barber</h3>

                <div className={`upd-form ${currentmode ? "upd-form_dark" : ""}`}>
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
                        <label>Nick Name</label>
                        <input
                            type="text"
                            placeholder='Enter UserName'
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
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
                            type="date"
                            placeholder='Enter Date of Birth'
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            style={{ width: "75vw" }}
                        />
                    </div>

                    {/* <div>
                        <label>Salon ID</label>
                        <input
                            type="text"
                            placeholder='Enter Salon ID'
                            value={salonId}
                        />
                    </div> */}

                    <div></div>
                    <div></div>



                    {/* { updateBarber?.loading == true ? <button>Loading...</button> : <button onClick={submitHandler}>
                         Update
                    </button>} */}

                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingInline: "1rem" }}>
                            <h1 style={{
                                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}>Services</h1>
                            <div onClick={() => setDropdown(!dropdown)} style={{
                                fontWeight: "bolder", fontSize: "2rem", boxShadow: currentmode ? "0px 0px 4px var(--light-secondary-color)" : "0px 0px 4px rgba(0,0,0,0.4)", borderRadius: "50%", width: "3rem", height: "3rem", display: "flex", justifyContent: "center", alignItems: "center",
                                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}><BiDownArrowAlt /></div>
                        </div>

                        {
                            dropdown && <div className={`barber-dropdown ${currentmode ? "barber-dropdown_dark" : ""}`}>
                                {
                                    barberServices?.response && barberServices?.response?.length > 0 ? barberServices?.response.map((ser, index) => (
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
                                                <p>service Type</p>
                                                <p>{ser.vipService ? "Vip" : "Regualr"}</p>
                                            </div>

                                            <div>
                                                <p>Estimated Wait Time (mins)</p>
                                                <input
                                                    type="number"
                                                    value={barberserviceEWTMap.get(ser.serviceId)}
                                                    onChange={(e) => updateServiceEWT(ser.serviceId, e.target.value)}
                                                    className='serviceEWT'
                                                    style={{ width: "5rem" }}
                                                />
                                                {/* <p>{}</p> */}
                                            </div>

                                            <button onClick={() => selectedServiceHandler(ser, index)} style={{
                                                color: "blue",
                                                width: "3.5rem",
                                                height: "3.5rem",
                                                margin: "auto",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#fff",
                                                boxShadow: "0px 0px 6px rgba(0,0,0,0.4)",
                                                border: "none",
                                                cursor: "pointer",
                                                borderRadius: "50%"
                                            }}><FaPlus /></button>
                                            {/* <p>{error1 && error1}</p> */}
                                        </div>
                                    )) : <p>No services present</p>
                                }
                            </div>
                        }

                        <h2 style={{
                                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}>Your Services</h2>
                        <div className={`barber-dropdown-select ${currentmode ? "barber-dropdown-select_dark" : ""}`}>
                            {
                                selectedService ? selectedService.map((ser, index) => (
                                    <div key={index}>
                                        <div>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>serviceId</p>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{ser.serviceId}</p>
                                        </div>

                                        <div>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>serviceCode</p>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{ser.serviceCode}</p>
                                        </div>

                                        <div>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>serviceName</p>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{ser.serviceName}</p>
                                        </div>

                                        <div>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>serviceType</p>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{ser.vipService ? "Vip" : "Regular"}</p>
                                        </div>

                                        <div>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Estimated Wait Time (mins)</p>
                                            <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{ser.barberServiceEWT}</p>
                                        </div>

                                        <div onClick={() => selectedServiceDelete(ser)} style={{
                                            color: "red",
                                            width: "3.5rem",
                                            height: "3.5rem",
                                            margin: "auto",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            background: "#fff",
                                            boxShadow: "0px 0px 6px rgba(0,0,0,0.4)",
                                            border: "none",
                                            cursor: "pointer",
                                            borderRadius: "1rem"
                                        }}><MdDelete /></div>
                                    </div>
                                )) : <p>No services present</p>
                            }

                        </div>

                    </div>

                    {updateBarber?.loading == true ? <button style={{ fontWeight: "500" }}>Loader</button> : <button onClick={submitHandler}
                        style={{
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-tertiary-color)",
                            color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                        }}
                    >Update</button>}

                </div>

                <ToastContainer />
            </div>

        </>
    )
}

export default UpdateBarber