import React, { useEffect, useState } from 'react'
import "./UpdateBarber.css"
import Layout from '../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BiDownArrowAlt } from 'react-icons/bi'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'

import {updateBarberAction} from "../../redux/actions/barberAction"
import AdminLayout from '../layout/Admin/AdminLayout'

const UpdateBarber = () => {
    const signin = useSelector(state => state.signin)
    const { user } = signin

    const [dropdown,setDropdown] = useState(false)

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [userName,setUserName] = useState("")
    const [mobileNumber,setMobileNumber] = useState("")
    const [dateOfBirth,setDateOfBirth] = useState("")
    const [salonId,setSalonId] = useState("")
    const [barberServices,setBarberServices] = useState([])
    const [isActive,setIsActive] = useState("")

    useEffect(() => {
        const getServices = async() => {
            const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/salon/allSalonServices?salonId=11`)
            setBarberServices(data)
        }

        getServices()
    },[])

    const [selectedService,setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)
        
        if(!servicepresent){
            setSelectedService([...selectedService,ser])
        } 
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    const dispatch = useDispatch()

    const submitHandler = () => {
        const barberdata = {
            name,email,userName,mobileNumber,dateOfBirth,salonId,isActive,barberServices:selectedService
        }
        dispatch(updateBarberAction(barberdata))
        alert("update barber successfully")
    }
 
    return (
        <>
            {
                user?.isAdmin ? (<>
                    <AdminLayout/>
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

                            <div>
                                <label>Active</label>
                                <input 
                                type="text" 
                                placeholder='Enter Name'
                                value={isActive}
                                onChange={(e) => setIsActive(e.target.value)}
                                />
                            </div>

                            <button onClick={submitHandler}>Update</button>

                            <div>
                                <div>
                                    <label>Services</label>
                                    <div onClick={() => setDropdown(!dropdown)}><BiDownArrowAlt/></div>              
                                </div>

                                {
                                    dropdown && <div className='barber-dropdown'>
                                       {
                                        barberServices && barberServices?.response ? barberServices.response.map((ser,index) => (
                                            <div key={index} onClick={() => selectedServiceHandler(ser,index)}>
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
                                                <p>serviceDesc</p>
                                                <p>desc</p>
                                            </div>

                                            <div>
                                                <p>servicePrice</p>
                                                <p>300</p>
                                            </div>
                                        </div>
                                        )) : <p>No services present</p>
                                       }
                                    </div>
                                }

                                <p>Your Services</p>
                                <div className='barber-dropdown-select'>
                                {
                                        selectedService ? selectedService.map((ser,index) => (
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
                                                <p>serviceDesc</p>
                                                <p>desc</p>
                                            </div>

                                            <div>
                                                <p>servicePrice</p>
                                                <p>300</p>
                                            </div>

                                            <div onClick={() => selectedServiceDelete(ser)}><MdDelete/></div>
                                        </div>
                                        )) : <p>No services present</p>
                                       }

                                </div>
                                
                            </div>

                            

                        </div>
                    </div>
                </>) : (<h1>Only Admins can access this page</h1>)
            }
        </>
    )
}

export default UpdateBarber