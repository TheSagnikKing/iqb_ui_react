import React, { useEffect } from 'react'
import "./QueuebarberList.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { barberListAction } from '../../../redux/actions/barberAction'
import {useNavigate} from "react-router-dom"

const QueuebarberList = () => {

  const signin = useSelector(state => state.signin)
  const { user } = signin

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(barberListAction())
  }, [dispatch])

  const barberList = useSelector(state => state.barberList)

  const navigate = useNavigate()

  const routechangeHandler = (barberId,name) => {
    navigate(`/queue/barberservices/${barberId}/${name}`)
  }
  return (
    <>
      {
        user?.isAdmin ? (<>
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
        </>) : (<h1>Only Admins can access this page</h1>)
      }
    </>
  )
}

export default QueuebarberList