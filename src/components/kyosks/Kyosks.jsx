import React, { useEffect, useState } from 'react'
import "./Kyosks.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../layout/Admin/AdminLayout'
import { barberListAction, getBarberByMultipleServicesAction, getbarberServicesbyBarberIdAction } from '../../redux/actions/barberAction'
import { getAllSalonServicesAction } from '../../redux/actions/salonAction'
import { singleJoinQueueAction } from '../../redux/actions/joinQueueAction'
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircle } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Kyosks = () => {

    //search barber
    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId


    const [model1, setModel1] = useState(false)
    const [model1services, setModelservices] = useState(false)

    const [model2, setModel2] = useState(false)
    const [model2barber, setModel2barber] = useState(false)

    const fetchAllBarbers = () => {
        const confirm = window.confirm("Are you sure?")
        
        if (confirm) {
            setCurrentbarberName("")
            dispatch(barberListAction(salonId, setModel1 ,setModel2, setModel2barber ))
        }
    }


    const barberList = useSelector(state => state.barberList)

    const [selectedbarberId, setSelectedBarberid] = useState(null)
    const [selectedbarberName, setSelectedBarberName] = useState("")
    const [name, setName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")

    const [currentbarberName, setCurrentbarberName] = useState("")

    const barberServiceCallHandler = (barberId, name) => {
        const selectbarber = window.confirm("Are you sure ?")
        if (selectbarber) {
            setSelectedBarberid(Number(barberId))
            setSelectedBarberName(name)
            setCurrentbarberName(name)
            dispatch(getbarberServicesbyBarberIdAction(Number(barberId), setModelservices))
            setSelectedService([])
        }

    }


    // console.log("currrrreeeeeennnnnttt" ,currentbarberName)

    const fetchAllServices = () => {
        dispatch(getAllSalonServicesAction(Number(salonId), setModel1, setModelservices,setCurrentbarberName,setModel2))
        setSelectedService([])
    }

    const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)
    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    // console.log(getAllSalonServices && getAllSalonServices)

    // console.log(getBarberServicesBybarberId)

    const [selectedService, setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        // const servicepresent = selectedService.find((s) => s._id === ser._id)

        // if (!servicepresent) {
        //     const serviceWithEWT = { ...ser };

        //     setSelectedService([...selectedService, serviceWithEWT]);
        // }
        setSelectedService((prevSelected) => {
            const servicePresent = prevSelected.find((s) => s._id === ser._id);

            if (!servicePresent) {
                return [...prevSelected, ser];
            }

            return prevSelected;
        });
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    // console.log("Recent model2", selectedService)

    const getBarberByMultipleServices = useSelector(state => state.getBarberByMultipleServices)

    const navigate = useNavigate()

    const joinqueueHandler = () => {

        const queuedata = {
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            name,
            customerEmail,
            mobileNumber,
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            barberName: selectedbarberName || currentbarberName,
            barberId: selectedbarberId,
            services: selectedService 
        }

        // console.log(queuedata)

        const confirm = window.confirm("Are you sure ? ")

        if (confirm) {
            console.log(queuedata)
            dispatch(singleJoinQueueAction(queuedata, setSelectedService, navigate))
        }

    }

    const singleJoinQueue = useSelector(state => state.singleJoinQueue)

    // console.log("sdvd", getBarberServicesBybarberId)

    const barberServiceCallHandler2 = (barberId, barbername) => {
        const confirm = window.confirm(`Selected barber ${barbername}`)
        if (confirm) {
            setSelectedBarberid(Number(barberId))
            setSelectedBarberName(barbername)
        }

    }

    const [fetchSelectedSearch, setfetchSelectedSearch] = useState(false)

    const fetchSelectedServices = () => {
        setfetchSelectedSearch(true)
        const serviceIds = selectedService.map(item => item.serviceId);
        // console.log(serviceIds, salonId)

        setCurrentbarberName("")
        dispatch(getBarberByMultipleServicesAction(salonId, serviceIds,setModel2barber,setfetchSelectedSearch))
    }


    return (
        <>

            <AdminLayout />
            <div className="singlejoin-barber-quebarber-wrapper">

                <h1>Single Join</h1>

                <div className='barber-single-join'>
                    <div>
                        <h2>Customer Name</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Your Customer Name'
                        />
                    </div>

                    <div>
                        <h2>Customer Email</h2>
                        <input
                            type="text"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder='Enter Your Customer Email'
                        />
                    </div>

                    <div>
                        <h2>Mobile Number</h2>
                        <input
                            type="text"
                            placeholder='Enter Customer Mobile Number'
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>


                    <div  className='mobile-kyosk-cont'>
                        <div className='barber-single-join-dropdown'>
                            <h3>Barber Name : <b>{currentbarberName && currentbarberName}</b></h3>

                            <button onClick={() => fetchAllBarbers()} style={{
                                background:"#f1f6fc",
                                border:"none",
                                padding:"0.8rem",
                                cursor:"pointer",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                borderRadius:"5px",
                                fontSize:"1rem"
                            }}>Show Barber</button>

                        </div>

                        <div className='barber-single-join-dropdown'>
                            <h3>Choose  Services</h3>
                            <button onClick={() => fetchAllServices()} style={{
                                background:"#f1f6fc",
                                border:"none",
                                padding:"0.8rem",
                                cursor:"pointer",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                borderRadius:"5px",
                                 fontSize:"1rem",
                                 width:"10rem"
                            }}>Show Services</button>
                        </div>

                    </div>

                    <div className='model-container'>
                        {
                            model1 == true ? <div className='model1'>

                                {barberList?.response?.length > 0 ? barberList?.response?.map((barber) => (
                                    <div key={barber._id}>
                                        <div >
                                            <div>
                                                <div><img src="https://png.pngtree.com/background/20230530/original/pngtree-man-looking-for-a-good-mens-beauty-look-picture-image_2791625.jpg" alt="" /></div>

                                                <div>
                                                    <h3>{barber.name}</h3>
                                                    <p>(4.5)</p>
                                                    <p>Cutting, Styling,Hair color, Hair Straightening</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>Queued</p>
                                                <h2>{barber.queueCount}</h2>
                                            </div>

                                            {currentbarberName == barber.name ? <div style={{
                                                fontSize: "3rem",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "green",
                                                height: "3rem",
                                                width: "3rem",
                                                borderRadius: "50%",
                                                boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
                                            }}><TiTick /></div> : <div onClick={() => barberServiceCallHandler(barber.barberId, barber.name)}>
                                                <IoIosAddCircle />
                                            </div>}

                                        </div>

                                        <div>
                                            <div>
                                                <p>Next available position</p>
                                                <h2>3</h2>
                                            </div>
                                            <div>
                                                <p>Estimated Time</p>
                                                <h2>{barber.barberEWT} mins</h2>
                                            </div>
                                        </div>

                                    </div>
                                )) : <h1>No barber Available or Barber is not Online</h1>}


                            </div> : <div></div>
                        }

                        {
                            model1services == true && <div className='model2'>
                                {
                                    getBarberServicesBybarberId?.response?.map((b, index) => (
                                        <div key={b._id}>
                                            <div>
                                                <div>
                                                    <h3>{b.serviceName}</h3>
                                                    <p>(4.0) 20  reviews</p>
                                                </div>

                                                {/* <div onClick={() => selectedServiceHandler(b, index)}>
                                                    <IoIosAddCircle />
                                                </div> */}

                                                {
                                                    selectedService.includes(b) ? (
                                                        <div className='model1-barber-icons'>
                                                            <div style={{
                                                                fontSize: "3rem",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "green",
                                                                height: "3rem",
                                                                width: "3rem",
                                                                borderRadius: "50%",
                                                                boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"

                                                            }}><TiTick /></div>
                                                            <div style={{
                                                                fontSize: "3rem",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "red",
                                                                height: "3rem",
                                                                width: "3rem",
                                                                borderRadius: "50%",
                                                                boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
                                                            }} onClick={() => selectedServiceDelete(b)}><RxCross2 /></div>
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => selectedServiceHandler(b)}>
                                                            <IoIosAddCircle />
                                                        </div>
                                                    )
                                                }


                                            </div>

                                            <div>
                                                <div>
                                                    <p>Hair cut</p>
                                                    <p>Hair Spa</p>
                                                </div>

                                                <div>
                                                    <h2>${b.servicePrice}</h2>
                                                    <div>
                                                        <div><FaRegClock /></div>
                                                        <p>{b.barberServiceEWT} mins</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        }
                    </div>


                        {/* //model services  =============================== */} 
                    <div className='model-container'>
                        {
                            model2barber == true ? <div className='model1'>

                            {getBarberByMultipleServices?.response?.map((barber) => (
                                <div key={barber._id}>
                                    <div >
                                        <div>
                                            <div><img src="https://png.pngtree.com/background/20230530/original/pngtree-man-looking-for-a-good-mens-beauty-look-picture-image_2791625.jpg" alt="" /></div>

                                            <div>
                                                <h3>{barber.name}</h3>
                                                <p>(4.5)</p>
                                                <p>Cutting, Styling,Hair color, Hair Straightening</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Queued</p>
                                            <h2>{barber.queueCount}</h2>
                                        </div>

                                        {currentbarberName == barber.name ? <div style={{
                                            fontSize: "3rem",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "green",
                                            height: "3rem",
                                            width: "3rem",
                                            borderRadius: "50%",
                                            boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
                                        }}><TiTick /></div> : <div onClick={() => {
                                            setCurrentbarberName(barber.name)
                                            setSelectedBarberid(barber.barberId)
                                        }}>
                                            <IoIosAddCircle />
                                        </div>}

                                    </div>

                                    <div>
                                        <div>
                                            <p>Next available position</p>
                                            <h2>3</h2>
                                        </div>
                                        <div>
                                            <p>Estimated Time</p>
                                            <h2>{barber.barberEWT} mins</h2>
                                        </div>
                                    </div>

                                </div>
                            ))}


                        </div> : <div></div>
                        }

                        {
                            model2 == true && <div className='model2'>
                                 {
                                selectedService.length > 0 && <button onClick={() => fetchSelectedServices()} className='services-search-btn' >{fetchSelectedSearch === true ? <ClipLoader/> : <p style={{fontSize:"1.3rem"}}>Search</p>}</button>
                            }
                            {
                                getAllSalonServices?.response?.map((b, index) => (
                                    <div key={b._id}>
                                        <div>
                                            <div>
                                                <h3>{b.serviceName}</h3>
                                                <p>(4.0) 20  reviews</p>
                                            </div>

                                            {/* <div onClick={() => selectedServiceHandler(b, index)}>
                                                <IoIosAddCircle />
                                            </div> */}

                                            {
                                                selectedService.includes(b) ? (
                                                    <div className='model1-barber-icons'>
                                                        <div style={{
                                                            fontSize: "3rem",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "green",
                                                            height: "3rem",
                                                            width: "3rem",
                                                            borderRadius: "50%",
                                                            boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"

                                                        }}><TiTick /></div>
                                                        <div style={{
                                                            fontSize: "3rem",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            color: "red",
                                                            height: "3rem",
                                                            width: "3rem",
                                                            borderRadius: "50%",
                                                            boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"
                                                        }} onClick={() => selectedServiceDelete(b)}><RxCross2 /></div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => selectedServiceHandler(b)}>
                                                        <IoIosAddCircle />
                                                    </div>
                                                )
                                            }


                                        </div>

                                        <div>
                                            <div>
                                                <p>Hair cut</p>
                                                <p>Hair Spa</p>
                                            </div>

                                            <div>
                                                <h2>${b.servicePrice}</h2>
                                                <div>
                                                    <div><FaRegClock /></div>
                                                    <p>{b.barberServiceEWT} mins</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                           
                                
                        </div>
                        }


                    </div>

                    


                    
                    <button onClick={joinqueueHandler}>{
                        singleJoinQueue?.loading == true ? <h2>Loading...</h2> : "Join Queue"
                    }</button>
                </div>

                <ToastContainer />
            </div>

        </>
    )
}

export default Kyosks


