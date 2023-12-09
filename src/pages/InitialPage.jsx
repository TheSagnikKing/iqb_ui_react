import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {
  return (
    <>
    <main className='demo_menu'>
    <h1>WELCOME TO IQG BARBERS...</h1>
    <div>
      <Link to="/admin-dashboard"><h4>Dashboard</h4></Link>
      <Link to="/admin-signin"><h4>Admin Signin</h4></Link>
    </div>
    </main>
    </>
  )
}

export default InitialPage