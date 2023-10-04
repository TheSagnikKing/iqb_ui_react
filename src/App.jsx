import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SigninPage from "./pages/SigninPage"
import SignupPage from './pages/SignupPage'
import VerifyemailPage from './pages/VerifyemailPage'
import ResetpasswordPage from './pages/ResetpasswordPage'
import DashboardPage from './pages/DashboardPage'

import BarberformPage from "./pages/barber/BarberformPage"
import Dashboard2Page from './pages/barber/Dashboard2Page'
import CustomerformPage from './pages/customer/CustomerformPage'
import Dashboard3Page from './pages/customer/Dashboard3Page'
import InitialPage from './pages/InitialPage'
import BarberDashboardPage from './pages/barberDashboard/BarberDashboardPage'

import { auth } from "./config.js/firebase.config"
import { onAuthStateChanged } from 'firebase/auth'

import { USER_SIGNIN_SUCCESS } from './redux/constants/userConstants'
import { useDispatch } from 'react-redux'
import ProtectedRoute from './components/authentification/ProtectedRoute'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: currentUser,
      })
      if (currentUser) {
        window.localStorage.setItem("auth", "true")
        currentUser.getIdToken().then(token => {  
          console.log(token)    
        }) 
      }
  
    });
    return () => {
      unsubscribe();
    }
  }, []);


  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* //Admin  */}
          <Route path="/" element={<InitialPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path='/verifyemail' element={<VerifyemailPage />} />
          <Route path='/resetpassword' element={<ResetpasswordPage />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>} />

          <Route path="/barber/barberform" element={<BarberformPage />} />
          <Route path="/barber/dashboard2" element={<Dashboard2Page />} />

          <Route path="/customer/customerform" element={<CustomerformPage />} />
          <Route path="/customer/dashboard3" element={<Dashboard3Page />} />


          {/* //BarberDashboard */}
          <Route path="/barberdashboard" element={<BarberDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
