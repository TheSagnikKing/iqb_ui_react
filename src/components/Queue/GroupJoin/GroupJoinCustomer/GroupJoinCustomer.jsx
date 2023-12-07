import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { groupjoinAction } from '../../../../redux/actions/joinQueueAction'
import "./GroupJoinCustomer.css"

const GroupJoinCustomer = () => {

    const [name,setName] = useState("")
    const [username,setUsername] = useState("")

    const navigate = useNavigate()

    const submitHandler = () => {
        const customerData = {
            name,username
        }
        const serializedData = JSON.stringify(customerData);
        localStorage.setItem("customer", serializedData);

        navigate("/queue/group/barberlist")
    }

    const [allbarbers,setAllBarbers] = useState([])

    useEffect(() => {
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
  
      const Barbers = getAllBarbers();
    //   console.log(Barbers);
      setAllBarbers(Barbers)
    },[])

    console.log(allbarbers)

    const dispatch = useDispatch()

    const gpjoinHandler = () => { 
        dispatch(groupjoinAction(allbarbers))
        alert("successfull")
        window.location.reload()
    }

  return (
    <>
    <AdminLayout/>
    <div className="cs-gj-quebarber-wrapper">
        <h1>Customers</h1>
        <div>
            <input 
            type="text" 
            placeholder='Enter Customer Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input 
            type="text" 
            placeholder='Enter Customer Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
     
        <button onClick={submitHandler}>Add Customers</button>

        <br/>
        <br/>

        <button
        disabled={allbarbers && allbarbers.length > 0 ? false : true}
        onClick={gpjoinHandler}
        >Group Join</button>
    </div>
    </>
  )
}

export default GroupJoinCustomer