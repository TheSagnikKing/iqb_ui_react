import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatLoader
  from "react-spinners/BeatLoader";

const SigninPage = React.lazy(() => import("./pages/SigninPage"))
const SignupPage = React.lazy(() => import('./pages/SignupPage'))
const VerifyemailPage = React.lazy(() => import('./pages/VerifyemailPage'))
const ResetpasswordPage = React.lazy(() => import('./pages/ResetpasswordPage'))
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))
const BarberformPage = React.lazy(() => import("./pages/barber/BarberformPage"))
const Dashboard2Page = React.lazy(() => import('./pages/barber/Dashboard2Page'))
const CustomerformPage = React.lazy(() => import('./pages/customer/CustomerformPage'))
const Dashboard3Page = React.lazy(() => import('./pages/customer/Dashboard3Page'))
const InitialPage = React.lazy(() => import('./pages/InitialPage'))
const BarberDashboardPage = React.lazy(() => import('./pages/barberDashboard/BarberDashboardPage'))
const ResetNewPassword = React.lazy(() => import('./components/authentification/ResetNewPassword'))

import ProtectedRoute from './components/authentification/ProtectedRoute'

const AdminSignin = React.lazy(() => import("./components/admin_authentication/Signin"))
const AdminSignup = React.lazy(() => import("./components/admin_authentication/SignUp"))

const AdminDashboard = React.lazy(() => import("./components/Admin/dashboard/Dashboard"))

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <InitialPage />
            </Suspense>
          } />
          <Route path='/signup' element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <SignupPage />
            </Suspense>
          } />
          <Route path="/signin" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <SigninPage />
            </Suspense>
          } />
          <Route path='/verifyemail' element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <VerifyemailPage />
            </Suspense>
          } />
          <Route path='/resetpassword' element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <ResetpasswordPage />
            </Suspense>
          } />
          <Route path="/resetnewpassword" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <ResetNewPassword />
            </Suspense>
          } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <DashboardPage />
              </Suspense>
            </ProtectedRoute>} />

          <Route path="/barber/barberform" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <BarberformPage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/barber/dashboard2" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Dashboard2Page />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/customer/customerform" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <CustomerformPage />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/customer/dashboard3" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Dashboard3Page />
              </Suspense>
            </ProtectedRoute>
          } />


          {/* //BarberDashboard */}
          <Route path="/barberdashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <BarberDashboardPage />
              </Suspense>
            </ProtectedRoute>
          } />


          {/* Admin Signin */}
          <Route path="/admin-signin" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AdminSignin />
            </Suspense>} />
          <Route path="*" element={<h1>404 Page Not Found !!</h1>} />

          <Route path="/admin-signup" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AdminSignup />
            </Suspense>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <AdminDashboard />
              </Suspense>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
