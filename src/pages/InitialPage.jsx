import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {
  return (
    <>
    <main className='demo_menu'>
    <h1>WELCOME TO IQG BARBERS...</h1>
    <div>
    <Link to="/signup"><h4>Sign Up</h4></Link>
      <Link to="/signin"><h4>Sign In</h4></Link>
      <Link to="/resetpassword"><h4>Reset Password</h4></Link>
      <Link to="/verifyemail"><h4>Verify Email</h4></Link>
      <Link to="/dashboard"><h4>Dashboard</h4></Link>
      <Link to="/barber/dashboard2"><h4>Dashboard2</h4></Link>
      <Link to="/customer/dashboard3"><h4>Dashboard3</h4></Link>

      <Link to="/admin-signin"><h4>Admin Signin</h4></Link>
      <Link to="/admin-signup"><h4>Admin Signup</h4></Link>
    </div>
    </main>
    </>
  )
}

export default InitialPage