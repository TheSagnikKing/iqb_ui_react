import React, { useEffect } from 'react'
import "./QueuebarberServices.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'

import { useParams } from "react-router-dom"
import { getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'

const QueuebarberServices = () => {

  const { barberid, barbername } = useParams()

  const signin = useSelector(state => state.signin)
  const { user } = signin

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getbarberServicesbyBarberIdAction(Number(barberid)))
  }, [dispatch])

  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)

  const joinqueueHandler = (serviceId) => {
    const queuedata = {
      salonId: 1,
      name: "Manish Singh",
      userName: "manish",
      joinedQType: "Single-Join",
      methodUsed: "Walk-In",
      barberName: barbername,
      barberId: Number(barberid),
      serviceId
    }

    dispatch(singleJoinQueueAction(queuedata))
    alert("Joined to the queue successfully")
  }

  return (
    <>
      {
        user?.isAdmin ? (<>
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
                  <p>{b.serviceEWT}</p>
                  <button onClick={() => joinqueueHandler(b.serviceId)}>Join Queue</button>
                </div>
              ))
            }

          </div>
        </>) : (<h1>Only Admins can access this page</h1>)
      }
    </>
  )
}

export default QueuebarberServices