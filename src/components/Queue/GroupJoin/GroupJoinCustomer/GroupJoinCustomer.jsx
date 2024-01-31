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
import { barberListAction, getbarberServicesbyBarberIdAction, groupBarberServicesByBarberIdAction } from '../../../../redux/actions/barberAction'
import { groupjoinAction, singleJoinQueueAction } from '../../../../redux/actions/joinQueueAction'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { appoinmentBarberListAction } from '../../../../redux/actions/AppointmentAction'

const GroupJoinCustomer = () => {

  const dispatch = useDispatch()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
  const salonId = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId

  useEffect(() => {
    if (salonId) {
      dispatch(appoinmentBarberListAction(salonId))
    }
  }, [dispatch, salonId])

  const appoinmentBarberList = useSelector(state => state.appoinmentBarberList)

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
      dispatch(groupBarberServicesByBarberIdAction(Number(barberId)))
    }

  }

  const groupBarberServicesByBarberId = useSelector(state => state.groupBarberServicesByBarberId)

  console.log("new", groupBarberServicesByBarberId)


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
        customerEmail,
        customerMobile,
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

  const navigate = useNavigate()

  const joinqueueHandler = () => {
    if(selectedCustomer.length > 5){
      alert("Exceed 5 customer")
    }else{
      const queuedata = {
        salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
        groupInfo: selectedCustomer
      }

      console.log(queuedata)

      const confirm = window.confirm("Are you sure ?")
  
      if (confirm) {
        dispatch(groupjoinAction(queuedata, setSelectedCustomer,navigate))
      }
    }
    
  }

  const groupjoin = useSelector(state => state.groupjoin)

  return (
    <>
      <AdminLayout height={"200vh"} />
      <div className="singlejoin-barber-quebarber-wrapper"
        style={{ height: "140vh" }}
      >

        <h1>Group Join</h1>

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

          <div className='barber-single-join-dropdown'>
            <h2>Choose Your Barber</h2>
            {/* <button onClick={() => setBarberDrop(!barberDrop)}>drop</button> */}
          </div>

          <div className='barber-single-join-dropdown-list'>

            <div className='barber-single-join-content-bbr'>
              <p>Email</p>
              <p>Name</p>
              {/* <p>User Name</p> */}
              <p>Estimated Wait Time</p>
              <p>Active</p>
              <p>Action</p>
            </div>

            {
              appoinmentBarberList ? appoinmentBarberList?.response?.map((barber) => (
                <div className='barber-single-join-content-bbr' key={barber._id}>
                  <p>{barber.email}</p>
                  <p>{barber.name}</p>
                  {/* <p>{barber.userName}</p> */}
                  <p>{barber.barberEWT}</p>
                  <p>{barber.isActive === true ? "Yes" : "No"}</p>
                  <button onClick={() => barberServiceCallHandler(barber.barberId, barber.name)} style={{
                    border:"1px solid blue",
                    color:"blue",
                    background:"#fff",
                    boxShadow:"0px 0px 4px blue",
                    cursor:"pointer"
                  }}>+</button>
                </div>


              )) : <p>No Barber Present</p>
            }
          </div>

          <h2>Choose Barber Services</h2>
          <div className='barber-single-join-services'>
            <div className='barber-single-join-quebarberserv-content'>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>
            {
              groupBarberServicesByBarberId?.response?.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceHandler(b, index)} style={{
                    border:"1px solid blue",
                    color:"blue",
                    background:"#fff",
                    boxShadow:"0px 0px 4px blue",
                    cursor:"pointer"
                  }}>+</button>
                </div>
              ))
            }

          </div>


          <h2>Your Selected Services</h2>
          <div className='barber-single-join-services'>

            <div className='barber-single-join-quebarberserv-content'>
              <p>Service ID</p>
              <p>Service Name</p>
              <p>Service Price</p>
              <p>Estimated Wait Time</p>
              <p>Action</p>
            </div>
            {
              selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                  <p>{b.serviceId}</p>
                  <p>{b.serviceName}</p>
                  <p>{b.servicePrice}</p>
                  <p>{b.barberServiceEWT}</p>
                  <button onClick={() => selectedServiceDelete(b)} style={{
                    border:"1px solid red",
                    color:"red",
                    background:"#fff",
                    boxShadow:"0px 0px 4px red",
                    cursor:"pointer"
                  }}>-</button>
                </div>
              )) : <p>No Services Available</p>
            }
          </div>

          <button onClick={addCustomerHandler}>Add Customer</button>

          <h2>Customers</h2>
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
                  <button onClick={() => selectedCustomerDelete(cus)} style={{
                    border:"1px solid red",
                    color:"red",
                    background:"#fff",
                    boxShadow:"0px 0px 4px red",
                    cursor:"pointer"
                  }}>-</button>
                </div>
              ))) : (<p>No Customers</p>)
            }
          </div>

          <button onClick={joinqueueHandler}>{
            groupjoin?.loading == true ? <h2>Loading...</h2> : "Join Queue"
          }</button>
        </div>
      </div>

    </>
  )
}

export default GroupJoinCustomer


