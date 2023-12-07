import React, { useEffect, useState } from 'react'
import "./QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'

import { barberListAction } from '../../../../redux/actions/barberAction'
import { useNavigate } from "react-router-dom"
import AdminLayout from '../../../layout/Admin/AdminLayout'

const QueuebarberList = () => {


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(barberListAction())
  }, [dispatch])

  const barberList = useSelector(state => state.barberList)

  const navigate = useNavigate()


   //For groupJoin
  const routechangeHandler = (barberId, name) => {
    // const barberData = {
    //   name: "Aniket Dey",
    //   userName: "Aniket",
    //   joinedQType: "Group-Join",
    //   methodUsed: "Walk-In",
    //   barberName: name,
    //   barberId
    // }

    // console.log(barberData)
    // localStorage.setItem("groupInfo", [])
    navigate(`/queue/group/barberservices/${barberId}/${name}`)
  }
  return (
    <>

      <AdminLayout />
      <div className="quebarber-wrapper">
        <div>
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
            <div className='content-bbr' key={barber._id} onClick={() => routechangeHandler(barber.barberId, barber.name)}>
              <p>{barber.email}</p>
              <p>{barber.name}</p>
              <p>{barber.userName}</p>
              <p>{barber.mobileNumber}</p>
              <p>{barber.isActive === true ? "Yes" : "No"}</p>
            </div>
          ))
        }


      </div>

    </>
  )
}

export default QueuebarberList