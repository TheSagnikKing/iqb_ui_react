// import React, { useEffect, useState } from 'react'
// import AdminLayout from '../../../layout/Admin/AdminLayout'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { groupjoinAction } from '../../../../redux/actions/joinQueueAction'
// import "./GroupJoinCustomer.css"

// const GroupJoinCustomer = () => {

//     const [name,setName] = useState("")
//     const [username,setUsername] = useState("")

//     const navigate = useNavigate()

//     const submitHandler = () => {
//         const customerData = {
//             name,username
//         }
//         const serializedData = JSON.stringify(customerData);
//         localStorage.setItem("customer", serializedData);

//         navigate("/queue/group/barberlist")
//     }

//     const [allbarbers,setAllBarbers] = useState([])

//     useEffect(() => {
//     // Function to retrieve all barbers from local storage
//     const getAllBarbers = () => {
//         const barbers = [];

//         // Iterate through local storage keys
//         for (let i = 0; i < localStorage.length; i++) {
//           const key = localStorage.key(i);

//           // Check if the key starts with "barber_" to identify barber data
//           if (key && key.startsWith("barber_")) {
//             const serializedData = localStorage.getItem(key);

//             // Parse the serialized data to get the barber object
//             const barberData = JSON.parse(serializedData);

//             // Add the barber object to the array
//             barbers.push(barberData);
//           }
//         }

//         return barbers;
//       };

//       const Barbers = getAllBarbers();
//     //   console.log(Barbers);
//       setAllBarbers(Barbers)
//     },[])

//     console.log(allbarbers)

//     const dispatch = useDispatch()

//     const gpjoinHandler = () => { 
//         dispatch(groupjoinAction(allbarbers))
//         alert("successfull")
//         window.location.reload()
//     }

//   return (
//     <>
//     <AdminLayout/>
//     <div className="cs-gj-quebarber-wrapper">
//         <h1>Customers</h1>
//         <div>
//             <input 
//             type="text" 
//             placeholder='Enter Customer Name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             />

//             <input 
//             type="text" 
//             placeholder='Enter Customer Username'
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             />
//         </div>

//         <button onClick={submitHandler}>Add Customers</button>

//         <br/>
//         <br/>

//         <button
//         disabled={allbarbers && allbarbers.length > 0 ? false : true}
//         onClick={gpjoinHandler}
//         >Group Join</button>
//     </div>
//     </>
//   )
// }

// export default GroupJoinCustomer


import React, { useEffect, useState } from 'react'
import "../QueuebarberList/QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router-dom"
import { barberListAction, getbarberServicesbyBarberIdAction } from '../../../../redux/actions/barberAction'
import { groupjoinAction, singleJoinQueueAction } from '../../../../redux/actions/joinQueueAction'
import AdminLayout from '../../../layout/Admin/AdminLayout'


const GroupJoinCustomer = () => {

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
  const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

  useEffect(() => {
    if (salonId) {
      dispatch(barberListAction(salonId))
    }
  }, [dispatch, salonId])

  const barberList = useSelector(state => state.barberList)

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
      const serviceWithEWT = { ...ser };

      setSelectedService([...selectedService, serviceWithEWT]);
    }
  }

  const selectedServiceDelete = (ser) => {
    const deleteService = selectedService.filter((f) => f._id !== ser._id)
    setSelectedService(deleteService)
  }

  const [selectedCustomer, setSelectedCustomer] = useState([])

  const addCustomerHandler = () => {
    if (!name) {
      alert("Customer name required")
    } else {
      const customerdata = {
        salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
        name,
        joinedQType: "Group-Join",
        methodUsed: "Walk-In",
        barberName: selectedbarberName,
        barberId: selectedbarberId,
        services: selectedService
      }

      setSelectedCustomer([...selectedCustomer, customerdata])
      setName("")
      setSelectedService([])
    }

  }

  console.log("customer", selectedCustomer)

  const selectedCustomerDelete = (cus) => {
    const deleteCustomer = selectedCustomer.filter((f) => f.name !== cus.name)
    setSelectedCustomer(deleteCustomer)
  }


  const joinqueueHandler = () => {
    const queuedata = {
      salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
      groupInfo: selectedCustomer
    }

    console.log(queuedata)

    const confirm = window.confirm("Are you sure ?")

    if (confirm) {
      dispatch(groupjoinAction(queuedata, setSelectedCustomer))
    }

    // console.log(queuedata)

    // const confirm = window.confirm("Are you sure ? ")

    // if(confirm){
    //   dispatch(singleJoinQueueAction(queuedata))
    // }

  }

  return (
    <>
      <AdminLayout height={"200vh"} />
      <div className="singlejoin-barber-quebarber-wrapper"
        style={{ height: "140vh" }}
      >

        <h2>Group Join</h2>

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
                  <p>{barber.barberEWT}</p>
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

          <button onClick={addCustomerHandler}>Add Customer</button>

          <p>Customers</p>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content-ggp'>
              <p>Customer Name</p>
              <p>Barber Name</p>
              <p>Joined QType</p>
              <p>Method</p>
              <p>No. of Services</p>
              <p>Action</p>
            </div>
            {
              selectedCustomer && selectedCustomer.length > 0 ? (selectedCustomer.map((cus, index) => (
                <div className='barber-single-join-quebarberserv-content-ggp' key={index}>
                  <p>{cus.name}</p>
                  <p>{cus.barberName}</p>
                  <p>{cus.joinedQType}</p>
                  <p>{cus.methodUsed}</p>
                  <p>{cus.services.length}</p>
                  <button onClick={() => selectedCustomerDelete(cus)}>Del</button>
                </div>
              ))) : (<p>No Customers</p>)
            }
          </div>

          <button onClick={joinqueueHandler}>Join Queue</button>
        </div>
      </div>

    </>
  )
}

export default GroupJoinCustomer


