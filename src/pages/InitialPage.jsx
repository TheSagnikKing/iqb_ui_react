import React from 'react'
import { Link } from 'react-router-dom'

const InitialPage = () => {

  return (
    <main className='demo_menu'>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <h1 style={{fontSize:"3.5rem",fontWeight:"500",color:"#000"}}>WELCOME TO IQB BARBER</h1>
        <div>
          {/* <Link to="/admin-signin" style={{background:"#fff",boxShadow:"0px 0px 4px rgba(0,0,0,0.5)",padding:"1rem 3rem"}}><h2>Signin</h2></Link> */}
          <Link to="/admin-signin" style={{background:"#fff",boxShadow:"0px 0px 4px rgba(0,0,0,0.5)",padding:"1rem 3rem"}}><h3>Admin Signin</h3></Link>
          <Link to="/barber-signin" style={{background:"#fff",boxShadow:"0px 0px 4px rgba(0,0,0,0.5)",padding:"1rem 3rem"}}><h3>Barber Signin</h3></Link>
        </div>
      </div>
    </main>
  )
}

export default InitialPage