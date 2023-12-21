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
import "../../QueuebarberList/QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router-dom"

import AdminLayout from '../../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../../redux/actions/salonAction'
import { autojoinAction } from '../../../../redux/actions/joinQueueAction'
import { getbarberServicesbyBarberIdAction } from '../../../../redux/actions/barberAction'

const Queautojoinservices = () => {


  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const currentAdminSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

  useEffect(() => {
    if (currentAdminSalonId) {
      dispatch(getAllSalonServicesAction(currentAdminSalonId))
    }
  }, [dispatch, currentAdminSalonId])

  const getAllSalonServices = useSelector(state => state.getAllSalonServices)


  const [selectedbarberId, setSelectedBarberid] = useState(null)
  const [selectedbarberName, setSelectedBarberName] = useState("")
  const [name, setName] = useState("")

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

  const joinqueueHandler = () => {
    const joindata = {
      name,
      joinedQType: "Auto-Join",
      methodUsed: "Walk-In",
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      services: selectedService,
      isOnline: true
    }
    console.log(joindata)

    const confirm = window.confirm("Are you Sure ? ")

    if (confirm) {
      dispatch(autojoinAction(joindata))
    }
  }

  return (
    <>

      <AdminLayout />
      <div className="singlejoin-barber-quebarber-wrapper">

        <h2>Auto Join</h2>

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

          <p>Choose Barber Services</p>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Code</p>
              <p>Barber Service EWT</p>
              <p>Action</p>
            </div>
            {
              getAllSalonServices?.response?.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.serviceCode}</p>
                  <p>{b.serviceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                </div>
              ))
            }

          </div>


          <p>Your Selected Services</p>
          <div className='barber-single-join-services'>

            <div className='barber-single-join-quebarberserv-content'>
              <p>Service Id</p>
              <p>Service Name</p>
              <p>Service Code</p>
              <p>Barber Service EWT</p>
              <p>Action</p>
            </div>

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

          <button onClick={joinqueueHandler}>Join Queue</button>
        </div>
      </div>

    </>
  )
}

export default Queautojoinservices

