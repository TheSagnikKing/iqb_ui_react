import React, { useEffect, useState } from 'react'
import "./QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { barberListAction, getBarberByMultipleServicesAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
import { useNavigate } from "react-router-dom"
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'
import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'

const QueuebarberList = () => {

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

  const fetchAllBarbers = () => {
    const confirm = window.confirm("Are you sure?")

    if(confirm){
      dispatch(barberListAction(salonId))
    }
  }

  // useEffect(() => {
  //   if (salonId) {
  //     dispatch(barberListAction(salonId))
  //   }
  // }, [dispatch, salonId])

  const barberList = useSelector(state => state.barberList)

  const [selectedbarberId, setSelectedBarberid] = useState(null)
  const [selectedbarberName, setSelectedBarberName] = useState("")
  const [name, setName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerMobile, setCustomerMobile] = useState("")

  const barberServiceCallHandler = (barberId, name) => {
    const selectbarber = window.confirm("Are you sure ?")
    if (selectbarber) {
      setSelectedBarberid(Number(barberId))
      setSelectedBarberName(name)
      dispatch(getbarberServicesbyBarberIdAction(Number(barberId)))
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

  console.log("Recent",selectedService)

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

  const barberServiceCallHandler2 = (barberId,barbername) => {
    const confirm = window.confirm(`Selected barber ${barbername}`)
    if(confirm){
      setSelectedBarberid(Number(barberId))
      setSelectedBarberName(barbername)
    }
    
  }


  const fetchSelectedServices = () => {
    const serviceIds = selectedService.map(item => item.serviceId);
    console.log(serviceIds,salonId)

    dispatch(getBarberByMultipleServicesAction(salonId, serviceIds))
  }


  const getBarberByMultipleServices = useSelector(state => state.getBarberByMultipleServices)
  // console.log("frrrr",getBarberByMultipleServices)

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
              <h2>Choose  Barber</h2>
              {selectedService.length > 0 ?  <button onClick={() => fetchSelectedServices()}>Selected Barber</button> : <button onClick={() => fetchAllBarbers()} style={{
                background:"#f1f6fc",
                border:"none",
                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                padding:"0.6rem",
                borderRadius:"0.5rem",
                cursor:"pointer"
              }}>Show Barbers</button>}
            
            </div>

            <div className='barber-single-join-dropdown'>
              <h3>Choose  Services</h3>
              <button onClick={() => fetchAllServices()}>Show Services</button>
            </div>

          </div>


          <div style={{
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
                {/* <p>UserName</p> */}
                <p>Estimated Wait Time</p>
                <p>Active</p>
                <p>Action</p>
              </div>
              {
                barberList?.getAllBarbers?.map((barber) => (
                  <div className='barber-single-join-content-bbr' key={barber._id}>
                    <p>{barber.email}</p>
                    <p >{barber.name}</p>
                    {/* <p>{barber.userName}</p> */}
                    <p>{barber.barberEWT}</p>
                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                    <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)}>Select</button>
                  </div>


                )) || getBarberByMultipleServices?.response?.map((barber) => (
                  <div className='barber-single-join-content-bbr' key={barber._id}>
                    <p>{barber.email}</p>
                    <p>{barber.name}</p>
                    {/* <p>{barber.userName}</p> */}
                    <p>{barber.barberEWT}</p>
                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                    <button onClick={() => barberServiceCallHandler2(barber.barberId, barber.name)}>Select</button>
                  </div>


                )) 
              }
            </div>
            {/* ============== */}
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
                  {/* <button onClick={() => selectedBarberHandler()}>Select</button> */}
                </div>
              ))
            }

          </div>
          </div>

          {/* <div className='barber-single-join-dropdown'>
            <p>Choose  Barber</p>
            {/* <button onClick={() => setBarberDrop(!barberDrop)}>drop</button> 
          </div> */}



          {/* <p>Choose  Services</p>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Barber Service EWT</p>
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
              ))
            }

          </div> */}


          <h2>Your Selected Services</h2>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'
            style={{
              fontSize:"12px"
            }}
            >
              <p>Service Id</p>
              <p>Service Name</p>
              <p>Service Code</p>
              <p>Estimated Wait Time</p>
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

          <button onClick={joinqueueHandler}>{
            singleJoinQueue?.loading == true ? <h2>Loading...</h2> : "Join Queue"
          }</button>
        </div>
      </div>

    </>
  )
}

export default QueuebarberList


