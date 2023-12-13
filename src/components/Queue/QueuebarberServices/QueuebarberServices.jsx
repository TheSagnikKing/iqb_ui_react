import React, { useEffect } from 'react'
import "./QueuebarberServices.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'

import { useParams } from "react-router-dom"
import { getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'

const QueuebarberServices = () => {

  const { barberid, barbername } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getbarberServicesbyBarberIdAction(Number(barberid)))
  }, [dispatch])

  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const joinqueueHandler = (serviceId,barberServiceEWT,serviceName) => {
    const queuedata = {
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      name: "Manish Singh",
      userName: "manish",
      joinedQType: "Single-Join",
      methodUsed: "Walk-In",
      barberName: barbername,
      barberId: Number(barberid),
      services: [
       {
        serviceId: serviceId,
        barberServiceEWT: barberServiceEWT,
        serviceName: serviceName
       }
      ]
    }

    console.log(queuedata)

    dispatch(singleJoinQueueAction(queuedata))
    alert("Joined to the queue successfully")
  }

  return (
    <>

      <AdminLayout />
      <div className="quebarberserv-wrapper">
        <p>Barber Services</p>

        <div>
          <p>Service Id</p>
          <p>Service Name</p>
          <p>Service EWT</p>
          <p>Action</p>
        </div>

        {
          getBarberServicesBybarberId?.response?.map((b) => (
            <div className='quebarberserv-content' key={b._id}>
              <p>{b.serviceId}</p>
              <p>{b.serviceName}</p>
              <p>{b.barberServiceEWT}</p>
              <button onClick={() => joinqueueHandler(b.serviceId,b.barberServiceEWT,b.serviceName)}>Join Queue</button>
            </div>
          ))
        }

      </div>

    </>
  )
}

export default QueuebarberServices