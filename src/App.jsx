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
import ProtectedRoute from './components/authentification/ProtectedRoute'
import ResetNewPassword from './components/authentification/ResetNewPassword'

const App = () => {


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
          <Route path="/resetnewpassword" element={<ResetNewPassword/>}/>
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>} />

          <Route path="/barber/barberform" element={
            <ProtectedRoute>
              <BarberformPage />
            </ProtectedRoute>
          } />
          <Route path="/barber/dashboard2" element={
            <ProtectedRoute>
              <Dashboard2Page />
            </ProtectedRoute>
          } />

          <Route path="/customer/customerform" element={
            <ProtectedRoute>
              <CustomerformPage />
            </ProtectedRoute>
          } />
          <Route path="/customer/dashboard3" element={
            <ProtectedRoute>
              <Dashboard3Page />
            </ProtectedRoute>
          } />


          {/* //BarberDashboard */}
          <Route path="/barberdashboard" element={
            <ProtectedRoute>
              <BarberDashboardPage />
              </ProtectedRoute>
          } />
          <Route path="*" element={<h1>404 Page Not Found !!</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
