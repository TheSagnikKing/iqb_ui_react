import React from 'react'
import "./Dashboard.css"
import Layout from '../../layout/Layout'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  const signin = useSelector(state => state.signin)

  return (
    <>
    <Layout/>
    {
      signin?.user?.isAdmin === true ? <div>
      
        <h1>Dashboard</h1>
        <p>Apples</p>
        <p>Banana</p>
        <p>Cucumber</p>
        <p>Orange</p>
    </div> : <h1>Only Admins can access this page</h1>
    }
    
    </>
  )
}

export default Dashboard