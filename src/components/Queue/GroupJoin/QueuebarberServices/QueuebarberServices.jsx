import React, { useEffect, useState } from 'react'
import "./QueuebarberServices.css"
import { useSelector, useDispatch } from 'react-redux'

import { useParams } from "react-router-dom"
import { getbarberServicesbyBarberIdAction } from '../../../../redux/actions/barberAction'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { GROUP_BARBER_SERVICE_JOIN_SUCCESS } from '../../../../redux/constants/joinQueueConstants'

const QueuebarberServices = () => {

  const { barberid, barbername } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getbarberServicesbyBarberIdAction(Number(barberid)))
  }, [dispatch])

  const getBarberServicesBybarberId = useSelector(state => state.getBarberServicesBybarberId)


  const [selectServices, setSelectServices] = useState([]);

  // For groupJoin
  const groupJoinQueueHandler = (serviceId, serviceName, serviceEWT) => {

    const serviceData = { serviceId, serviceName, serviceEWT };

    // Check if the service already exists in the array
    const serviceExists = selectServices.find(
      (service) => service.serviceId === serviceId
    );

    if (!serviceExists) {
      // Use the spread operator correctly to update the state
      setSelectServices([...selectServices, serviceData]);
    }
    // console.log(barberData);
  };

  const barberData = {
    name: "Aniket Dey",
    userName: "Aniket",
    joinedQType: "Group-Join",
    methodUsed: "Walk-In",
    barberName: barbername,
    barberId: barberid,
    services: selectServices
  };

  useEffect(() => {
    if (selectServices.length > 0) {

      const serializedData = JSON.stringify(barberData);

      const storageKey = `barber_${barberid}`;

      // Store the serialized data in local storage
      localStorage.setItem(storageKey, serializedData);

    }

    // Function to retrieve all barbers from local storage
    const getAllBarbers = () => {
      const barbers = [];

      // Iterate through local storage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        // Check if the key starts with "barber_" to identify barber data
        if (key && key.startsWith("barber_")) {
          const serializedData = localStorage.getItem(key);

          // Parse the serialized data to get the barber object
          const barberData = JSON.parse(serializedData);

          // Add the barber object to the array
          barbers.push(barberData);
        }
      }

      return barbers;
    };

    const allBarbers = getAllBarbers();
    console.log(allBarbers);
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


