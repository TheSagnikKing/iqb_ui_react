// import React from 'react'
// import "./AppointBarber.css"
// import { useSelector } from 'react-redux'
// import AdminLayout from '../../layout/Admin/AdminLayout'

// const AppointBarber = () => {

//     const signin = useSelector(state => state.signin)
//     const { user } = signin

//   return (
//     <>
//             {
//                 user?.isAdmin ? (<>
//                     <AdminLayout />
//                     <div className='queue-wrapper-app'>
//                         <p>Select Your Barber</p>
                        
                      
//                     </div>
//                 </>) : (<h1>Only Admins can access this page</h1>)
//             }
//         </>
//   )
// }

// export default AppointBarber


import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { barberListAction } from '../../../redux/actions/barberAction'
import {useNavigate} from "react-router-dom"

const AppointBarber = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(barberListAction())
  }, [dispatch])

  const barberList = useSelector(state => state.barberList)

  const navigate = useNavigate()

  const routechangeHandler = (barberId,name) => {
    navigate(`/appointment/barberservices/${barberId}/${name}`)
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
                <div className='content-bbr' key={barber._id} onClick={() => routechangeHandler(barber.barberId,barber.name)}>
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

export default AppointBarber;