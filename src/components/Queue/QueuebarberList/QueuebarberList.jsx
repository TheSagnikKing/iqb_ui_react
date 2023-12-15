import React, { useEffect, useState } from 'react'
import "./QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
import { useNavigate } from "react-router-dom"
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'

const QueuebarberList = () => {


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(barberListAction())
  }, [dispatch])

  const barberList = useSelector(state => state.barberList)

  const [selectedbarberId,setSelectedBarberid] = useState(null)
  const [selectedbarberName,setSelectedBarberName] = useState("")
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
      const serviceWithEWT = { ...ser };

      setSelectedService([...selectedService, serviceWithEWT]);
    }
  }

  const selectedServiceDelete = (ser) => {
    const deleteService = selectedService.filter((f) => f._id !== ser._id)
    setSelectedService(deleteService)
  }

  console.log(selectedService)

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const joinqueueHandler = () => {
    const queuedata = {
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      name,
      joinedQType: "Single-Join",
      methodUsed: "Walk-In",
      barberName: selectedbarberName,
      barberId: selectedbarberId,
      services: selectedService
    }

    console.log(queuedata)

    const confirm = window.confirm("Are you sure ? ")

    if(confirm){
      dispatch(singleJoinQueueAction(queuedata))
    }

  }

  return (
    <>

      <AdminLayout />
      <div className="singlejoin-barber-quebarber-wrapper">
        {/* <div>
              <input
                type="text"
                placeholder='Search'
              />
              <button>src</button>
            </div>

            <div className='header-bbr'>
              <p>Email</p>
              <p>Name</p>
              <p>User Name</p>
              <p>Mobile Number</p>
              <p>isActive</p>
            </div>

            {
              barberList?.getAllBarbers?.map((barber) => (
                <div className='content-bbr' key={barber._id} onClick={() => routechangeHandler(barber.barberId,barber.name)}>
                  <p>{barber.email}</p>
                  <p>{barber.name}</p>
                  <p>{barber.userName}</p>
                  <p>{barber.mobileNumber}</p>
                  <p>{barber.isActive === true ? "Yes" : "No"}</p>
                </div>
              ))
            } */}

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

          <div className='barber-single-join-dropdown'>
            <p>Choose Your Barber</p>
            {/* <button onClick={() => setBarberDrop(!barberDrop)}>drop</button> */}
          </div>

            <div className='barber-single-join-dropdown-list'>
              {
                barberList ? barberList?.getAllBarbers?.map((barber) => (
                  <div className='barber-single-join-content-bbr' key={barber._id}>
                    <p>{barber.email}</p>
                    <p>{barber.name}</p>
                    <p>{barber.userName}</p>
                    <p>{barber.mobileNumber}</p>
                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                    <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)}>Select</button>
                  </div>


                )) : <p>No Barber Present</p>
              }
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
              getBarberServicesBybarberId?.response?.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.serviceCode}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                </div>
              ))
            }

          </div>


          <p>Your Selected Services</p>
          <div className='barber-single-join-services'>
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

export default QueuebarberList


