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
import CreateSalon from './components/Salon/CreateSalon/CreateSalon';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SalonList from './components/Salon/SalonList/SalonList';
import UpdateBarber from './components/updateBarber/UpdateBarber';
import CreateBarber from './components/createBarber/CreateBarber';
import UpdateSalon from './components/Salon/updateSalon/updateSalon';
import Queue from './components/Queue/Queue';

import QueuebarberList from './components/Queue/QueuebarberList/QueuebarberList';
import QueuebarberServices from './components/Queue/QueuebarberServices/QueuebarberServices';
import QueueselectServices from './components/Queue/QueueselectServices/QueueselectServices';
import QueueselectBarber from './components/Queue/QueueselectBarber/QueueselectBarber';
import Queautojoinservices from './components/Queue/AutoJoine/Queautojoinservices/Queautojoinservices';

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

          <Route path="/barber/dashboard2" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Dashboard2Page />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/barber/updatebarber" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <UpdateBarber />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/barber/createbarber" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <CreateBarber />
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

          <Route path='/admin-dashboard' element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <AdminDashboardPage />
              </Suspense>
            </ProtectedRoute>} />

          <Route path="/salon/createsalon" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <CreateSalon />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/salon/salonlist" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <SalonList />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/salon/updateSalon/:salonId" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <UpdateSalon />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Queue />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue/barberlist" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <QueuebarberList />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue/barberservices/:barberid/:barbername" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <QueuebarberServices />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue/selectservices" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <QueueselectServices />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue/selectservicebarber/:serviceid" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <QueueselectBarber />
              </Suspense>
            </ProtectedRoute>
          } />

          <Route path="/queue/autoqueservices" element={
            <ProtectedRoute>
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Queautojoinservices/>
              </Suspense>
            </ProtectedRoute>
          } />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
