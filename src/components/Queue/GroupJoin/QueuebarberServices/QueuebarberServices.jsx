import React, { useEffect, useState } from 'react'
import "./QueuebarberServices.css"
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getbarberServicesbyBarberIdAction } from '../../../../redux/actions/barberAction'
import AdminLayout from '../../../layout/Admin/AdminLayout'

const QueuebarberServices = () => {

  const { barberid, barbername } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getbarberServicesbyBarberIdAction(Number(barberid)))
  }, [dispatch])

  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)


  const [selectServices, setSelectServices] = useState([]);

  const localStoragecustomer = localStorage.getItem("customer")
  const customer = JSON.parse(localStoragecustomer)

  // For groupJoin
  const groupJoinQueueHandler = (serviceId, serviceName, serviceEWT) => {

    const serviceData = { serviceId, serviceName, serviceEWT };

    const serviceExists = selectServices.find(
      (service) => service.serviceId === serviceId
    );

    if (!serviceExists) {
      const userConfirmed = window.confirm(`Do you want to select ${serviceName}?`);

      if (userConfirmed) {
        setSelectServices([...selectServices, serviceData]);
      }
    }

  };

  console.log(selectServices)

  const barberData = {
    name: customer?.name,
    userName: customer?.username,
    joinedQType: "Group-Join",
    methodUsed: "Walk-In",
    barberName: barbername,
    barberId: barberid,
    services: selectServices
  };

  useEffect(() => {
    if (selectServices.length > 0 ) {

      const serializedData = JSON.stringify(barberData);

      const storageKey = `barber_${customer?.username}_${barbername}_${barberid}`;

      localStorage.setItem(storageKey, serializedData);

    }
  }, [selectServices])


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
              <p>{b.serviceEWT}</p>
              <button onClick={() => groupJoinQueueHandler(b.serviceId, b.serviceName, b.serviceEWT)}>Add Service</button>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default QueuebarberServices