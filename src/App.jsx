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
import MyCustomer from './components/Queue/MyCustomer/MyCustomer';
import Appoinmentacbd from './components/Appoinment/Appoinmentacbd';
import AppointBarber from './components/Appoinment/AppointBarber/AppointBarber';
import AppointBarberServices from './components/Appoinment/AppointBarberServices/AppointBarberServices';
import AppointSelectServices from './components/Appoinment/AppointSelectServices/AppointSelectServices';
import AppointmentSelectBarber from './components/Appoinment/AppointmentSelectBarber/AppointmentSelectBarber';
import Auth from './components/admin_authentication/Auth';
import UpdateAdminprofile from './components/UpdateAdminprofile/UpdateAdminprofile';

const AdminSignin = React.lazy(() => import("./components/admin_authentication/Signin"))
const AdminSignup = React.lazy(() => import("./components/admin_authentication/SignUp"))

import QueueGroupBarberList from "./components/Queue/GroupJoin/QueuebarberList/QueuebarberList"
import QueueGroupBarberServices from "./components/Queue/GroupJoin/QueuebarberServices/QueuebarberServices"
import GroupJoinCustomer from './components/Queue/GroupJoin/GroupJoinCustomer/GroupJoinCustomer';
import Month from './components/Appoinment/Month/Month';
import CalenderEvent from './components/Appoinment/CalenderEvent/CalenderEvent';
import CalenderList from './components/Appoinment/CalenderList/CalenderList'
import AdminAccountDetail from './components/admin_authentication/AdminAccountDetail';

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
          <Route path="/resetnewpassword/:token" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <ResetNewPassword />
            </Suspense>
          } />

          <Route path="/adminaccountdetail" element={<AdminAccountDetail/>}/>

          <Route path='/dashboard' element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>       
              <DashboardPage />         
            </Suspense>
          } />

          <Route path="/barber/dashboard2" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              {/* <Auth> */}
              <Dashboard2Page />
              {/* </Auth> */}
            </Suspense>

          } />

          <Route path="/barber/updatebarber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <UpdateBarber />
            </Suspense>

          } />

          <Route path="/barber/createbarber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <CreateBarber />
            </Suspense>

          } />


          <Route path="/customer/customerform" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <CustomerformPage />
            </Suspense>

          } />
          <Route path="/customer/dashboard3" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Dashboard3Page />
            </Suspense>

          } />


          {/* //BarberDashboard */}
          <Route path="/barberdashboard" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberDashboardPage />
            </Suspense>

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

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth>
              <AdminDashboardPage />
              </Auth>
            </Suspense>
          } />

          <Route path="/admin/updateprofile" element={<UpdateAdminprofile/>}/>

          <Route path="/salon/createsalon" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <CreateSalon />
            </Suspense>

          } />

          <Route path="/salon/salonlist" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <SalonList />
            </Suspense>

          } />

          <Route path="/salon/updateSalon" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <UpdateSalon />
            </Suspense>

          } />

          <Route path="/queue" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Queue />
            </Suspense>

          } />

          <Route path="/queue/barberlist" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <QueuebarberList />
            </Suspense>

          } />

          <Route path="/queue/barberservices/:barberid/:barbername" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <QueuebarberServices />
            </Suspense>

          } />

          <Route path="/queue/selectservices" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <QueueselectServices />
            </Suspense>

          } />

          <Route path="/queue/group/customers" element={<GroupJoinCustomer/>}/>
          <Route path="/queue/group/barberlist" element={<QueueGroupBarberList/>}/>
          <Route path="/queue/group/barberservices/:barberid/:barbername" element={<QueueGroupBarberServices/>}/>


          <Route path="/queue/selectservicebarber/:serviceid" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <QueueselectBarber />
            </Suspense>

          } />

          <Route path="/queue/autoqueservices" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Queautojoinservices />
            </Suspense>

          } />

          <Route path="/queue/mycustomer" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <MyCustomer />
            </Suspense>

          } />

         
          <Route path="/appoinment" element={<Month/>}/>
          <Route path="/appoinment/calender" element={<CalenderEvent/>}/>
          <Route path="/appoinment/calender/list" element={<CalenderList/>}/>

          <Route path="/appoinment/abcd" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              {/* <Appoinment /> */}
            </Suspense>

          } />

          <Route path="/appointment/barber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AppointBarber />
            </Suspense>

          } />

          <Route path="/appointment/barberservices/:barberid/:barbername" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AppointBarberServices />
            </Suspense>

          } />

          <Route path="/appoinment/service" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AppointSelectServices />
            </Suspense>

          } />

          <Route path="/appointment/selectservicebarber/:serviceid" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <AppointmentSelectBarber />
            </Suspense>

          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
