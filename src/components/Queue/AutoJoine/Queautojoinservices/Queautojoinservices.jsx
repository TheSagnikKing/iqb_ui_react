// import React, { useEffect } from 'react'
// import "./Queautojoinservices.css"
// import { useDispatch, useSelector } from 'react-redux'
// import AdminLayout from '../../../layout/Admin/AdminLayout'
// import { getAllSalonServicesAction } from '../../../../redux/actions/salonAction'
// import { autojoinAction } from '../../../../redux/actions/joinQueueAction'

// const Queautojoinservices = () => {

// const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

// const currentAdminSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

//     const dispatch = useDispatch()

// useEffect(() => {
//     if (currentAdminSalonId) {
//         dispatch(getAllSalonServicesAction(currentAdminSalonId))
//     }
// }, [dispatch, currentAdminSalonId])

// const getAllSalonServices = useSelector(state => state.getAllSalonServices)


//     const autojoinHandler = (serviceId,serviceName,serviceEWT) => {
// const joindata = {
//     userName: "Arghya",
//     name: "Arghya Ghosh",
//     joinedQType: "Auto-Join",
//     methodUsed: "Walk-In",
//     salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
//     services: [
//         {
//             serviceId: serviceId,
//             barberServiceEWT: Number(serviceEWT),
//             serviceName: serviceName
//         }
//     ],
//     isOnline: true
// }

// dispatch(autojoinAction(joindata))
// alert("Auto join successful")

//     }

//     return (
//         <>
//             <AdminLayout />
//             <div className="queselectauto-wrapper">
//                 <p>Select Service</p>

//                 <div className='queselectauto-head'>
//                     <p>Service ID</p>
//                     <p>Service Name</p>
//                     <p>Service Desc</p>
//                     <p>Service Price</p>
//                     <p>Service EWT</p>
//                     <p>Action</p>
//                 </div>

//                 {
//                     getAllSalonServices?.response?.map((s) => (
//                         <div className='queselectauto-content' key={s._id}>
//                             <p>{s.serviceId}</p>
//                             <p>{s.serviceName}</p>
//                             <p>{s.serviceDesc}</p>
//                             <p>{s.servicePrice}</p>
//                             <p>{s.serviceEWT}</p>
//                             <button onClick={() => autojoinHandler(s.serviceId,s.serviceEWT,s.serviceName)}>Join Queue</button>
//                         </div>
//                     ))
//                 }

//             </div>

//         </>
//     )
// }

// export default Queautojoinservices


import React, { useEffect, useState } from 'react'
import "./Queautojoinservices.css"
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router-dom"

import AdminLayout from '../../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../../redux/actions/salonAction'
import { autojoinAction } from '../../../../redux/actions/joinQueueAction'
import { barberAllSalonServicsAction, getbarberServicesbyBarberIdAction } from '../../../../redux/actions/barberAction'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Queautojoinservices = () => {

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const currentAdminSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

  useEffect(() => {
    if (currentAdminSalonId) {
      dispatch(barberAllSalonServicsAction(Number(currentAdminSalonId)))
    }
  }, [dispatch, currentAdminSalonId])

  const barberAllSalonServics = useSelector(state => state.barberAllSalonServics)

  console.log("Auto ", barberAllSalonServics)


  const [selectedbarberId, setSelectedBarberid] = useState(null)
  const [selectedbarberName, setSelectedBarberName] = useState("")
  const [name, setName] = useState("")
  const [customerEmail,setCustomerEmail] = useState("")
  const [customerMobile, setCustomerMobile] = useState("")

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
      const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

      setSelectedService([...selectedService, serviceWithEWT]);
    }
  }

  const selectedServiceDelete = (ser) => {
    const deleteService = selectedService.filter((f) => f._id !== ser._id)
    setSelectedService(deleteService)
  }

  console.log(selectedService)

  const navigate = useNavigate()

  const joinqueueHandler = () => {
    const joindata = {
      name,
      customerEmail,
      customerMobile,
      joinedQType: "Auto-Join",
      methodUsed: "Walk-In",
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      services: selectedService,
      isOnline: true
    }
    console.log(joindata)

    const confirm = window.confirm("Are you Sure ? ")

    if (confirm) {
      dispatch(autojoinAction(joindata,navigate))
    }
  }

  const autojoin = useSelector(state => state.autojoin)

  const darkMode = useSelector(state => state.color.darkmode)

  console.log("Darkmode dashboard",darkMode)

  const currentmode = darkMode === "On"

  return (
    <>

      <AdminLayout />
      <div className={`singlejoin-barber-quebarber-wrapper ${currentmode ? "singlejoin-barber-quebarber-wrapper_dark" : ""}`}>

        <h1 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Auto Join</h1>

        <div className={`barber-single-join ${currentmode ? "barber-single-join_dark" : ""}`}>
          <div>
            <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Customer Name</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter Your Customer Name'
            />
          </div>

          <div>
            <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Customer Email</h3>
            <input
              type="text"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder='Enter Your Customer Email'
            />
          </div>

          <div>
            <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Mobile Number</h3>
            <input 
            type="text" 
            placeholder='Enter Customer Mobile Number'
            value={customerMobile}
            onChange={(e) => setCustomerMobile(e.target.value)}
            />
          </div>

          <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Choose Barber Services</h3>
          <div className={`barber-single-join-services ${currentmode ? 'barber-single-join-services_dark' : ""}`}>
            <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`}>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>
            {
              barberAllSalonServics?.response?.map((b, index) => (
                <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`} key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.serviceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)} style={{
                    border:"1px solid blue",
                    background:"#fff",
                    color:"blue",
                    boxShadow:"0px 0px 4px blue",
                    cursor:"pointer"
                  }}>+</button>
                </div>
              ))
            }

          </div>


          <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Your Selected Services</h3>
          <div className={`barber-single-join-services ${currentmode ? "barber-single-join-services_dark" : ""}`}>

            <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`}>
              <p>Service Id</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>

            {
              selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                <div className={`barber-single-join-quebarberserv-content ${currentmode ? "barber-single-join-quebarberserv-content_dark" : ""}`} key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceDelete(b)} style={{
                    border:"1px solid red",
                    background:"#fff",
                    color:"red",
                    boxShadow:"0px 0px 4px red",
                    cursor:"pointer"
                  }}>-</button>
                </div>
              )) : <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>No Services Available</p>
            }
          </div>

          <button onClick={joinqueueHandler}
          style={{
            background:currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)",
            color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
          }}
          >{
            autojoin?.loading == true ? <h2>loading...</h2> : "Join Queue"
          }</button>
        </div>
        <ToastContainer />

      </div>
    </>
  )
}

export default Queautojoinservices

