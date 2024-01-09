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
// import AdminLayout from '../../layout/Admin/AdminLayout'
// import { barberListAction, getBarberByMultipleServicesAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
// import { useNavigate } from "react-router-dom"
// import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'
// import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'

const Kyosks = () => {

    //search barber
    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId


    const [model1, setModel1] = useState(false)
    const [model1services, setModelservices] = useState(false)

    const fetchAllBarbers = () => {
        const confirm = window.confirm("Are you sure?")

        if (confirm) {
            dispatch(barberListAction(salonId, setModel1))
        }
    }


    const barberList = useSelector(state => state.barberList)

    const [selectedbarberId, setSelectedBarberid] = useState(null)
    const [selectedbarberName, setSelectedBarberName] = useState("")
    const [name, setName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerMobile, setCustomerMobile] = useState("")

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

    const fetchAllServices = () => {
        dispatch(getAllSalonServicesAction(salonId))
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

    console.log("Recent model2", selectedService)

    const navigate = useNavigate()

    const joinqueueHandler = () => {
        const queuedata = {
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            name,
            customerEmail,
            customerMobile,
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            barberName: selectedbarberName,
            barberId: selectedbarberId,
            services: selectedService
        }

        // console.log(queuedata)

        const confirm = window.confirm("Are you sure ? ")

        if (confirm) {
            console.log(queuedata)
            dispatch(singleJoinQueueAction(queuedata, setSelectedService, navigate))
            setName("")
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


    const fetchSelectedServices = () => {
        const serviceIds = selectedService.map(item => item.serviceId);
        console.log(serviceIds, salonId)

        dispatch(getBarberByMultipleServicesAction(salonId, serviceIds))
    }


    const getBarberByMultipleServices = useSelector(state => state.getBarberByMultipleServices)
    // console.log("frrrr",getBarberByMultipleServices)

    return (
        <>

            <AdminLayout />
            <div className="singlejoin-barber-quebarber-wrapper">

                <h2>Single Join</h2>

                <div className='barber-single-join'>
                    <div>
                        <p>Customer Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Your Customer Name'
                        />
                    </div>

                    <div>
                        <p>Customer Email</p>
                        <input
                            type="text"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder='Enter Your Customer Email'
                        />
                    </div>

                    <div>
                        <p>Mobile Number</p>
                        <input
                            type="text"
                            placeholder='Enter Customer Mobile Number'
                            value={customerMobile}
                            onChange={(e) => setCustomerMobile(e.target.value)}
                        />
                    </div>


                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2rem"
                    }}>
                        <div className='barber-single-join-dropdown'>
                            <p>Barber Name : <b>{currentbarberName && currentbarberName}</b></p>

                            <button onClick={() => fetchAllBarbers()}>Search Barber</button>

                        </div>

                        <div className='barber-single-join-dropdown'>
                            <p>Choose  Services</p>
                            <button onClick={() => fetchAllServices()}>Show Services</button>
                        </div>

                    </div>

                    <div className='model-container'>
                        {
                            model1 == true ? <div className='model1'>

                                {barberList?.getAllBarbers?.map((barber) => (
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
                                                fontSize: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                color: "green",
                                                height: "30px",
                                                width: "30px",
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
                                ))}


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
                                                                fontSize: "30px",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "green",
                                                                height: "30px",
                                                                width: "30px",
                                                                borderRadius: "50%",
                                                                boxShadow: "0px 0px 4px rgba(0,0,0,0.5)"

                                                            }}><TiTick /></div>
                                                            <div style={{
                                                                fontSize: "30px",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                color: "red",
                                                                height: "30px",
                                                                width: "30px",
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



                    {/* <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem"
          }}>
            <div className='barber-single-join-dropdown-list'>

              <div className='barber-single-join-content-bbr'
              style={{
                fontSize:"12px"
              }}
              >
                <p>Email</p>
                <p>Name</p>
                <p>Estimated Wait Time</p>
                <p>Active</p>
                <p>Action</p>
              </div>
              {
                barberList?.getAllBarbers?.map((barber) => (
                  <div className='barber-single-join-content-bbr' key={barber._id}>
                    <p>{barber.email}</p>
                    <p >{barber.name}</p>
                    <p>{barber.barberEWT}</p>
                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                    <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)}>Select</button>
                  </div>


                )) || getBarberByMultipleServices?.response?.map((barber) => (
                  <div className='barber-single-join-content-bbr' key={barber._id}>
                    <p>{barber.email}</p>
                    <p>{barber.name}</p>
                    <p>{barber.barberEWT}</p>
                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                    <button onClick={() => barberServiceCallHandler2(barber.barberId, barber.name)}>Select</button>
                  </div>


                )) 
              }
            </div>
            <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'
            style={{
              fontSize:"12px"
            }}
            >
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>
            {
              getBarberServicesBybarberId?.response?.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                </div>
              )) || getAllSalonServices?.response?.map((b,index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                </div>
              ))
            }

          </div>
          </div> */}

                    <button onClick={joinqueueHandler}>{
                        singleJoinQueue?.loading == true ? <h2>Loading...</h2> : "Join Queue"
                    }</button>
                </div>
            </div>

        </>
    )
}

export default Kyosks


