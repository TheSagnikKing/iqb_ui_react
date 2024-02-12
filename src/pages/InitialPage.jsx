import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {
  return (
    <>
    <main className='demo_menu'>
    <h1>WELCOME TO IQG BARBERS...</h1>
    <div>
      <Link to="/admin-signin"><h2>Signin</h2></Link>
    </div>
    </main>
    </>
  )
}

export default InitialPage