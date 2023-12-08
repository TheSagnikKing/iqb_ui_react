import React from 'react'
import "./Appoinmentacbd.css"
import { useSelector } from 'react-redux'
import AdminLayout from '../layout/Admin/AdminLayout'
import { Link } from 'react-router-dom'

const Appoinment = () => {

  return (
    <>
      <AdminLayout />
      <div className='queue-wrapper-app'>
        <p>Select Your Appoinment</p>

        <div>
          <Link to="/appointment/barber">Select Barber</Link>
          <Link to="/appoinment/service">Select Service</Link>
        </div>
      </div>

    </>
  )
}

export default Appoinment