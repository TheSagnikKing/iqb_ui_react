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
import UpdateSalon from './components/Salon/updateSalon/UpdateSalon'
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
import BarberResetPassword from './components/admin_authentication/BarberResetPassword';
import BarberResetNewPassword from './components/admin_authentication/BarberResetNewPassword';
import BarberAuth from './components/admin_authentication/BarberAuth';
import BarberAccountDetail from './components/admin_authentication/BarberAccountDetail';
import CreateAppointment from './components/Appoinment/CreateAppointment/CreateAppointment';
import BarberAppointment from './components/barber/BarberAppointment/BarberAppointment';
import BarberCalenderEvent from './components/barber/BarberCalenderEvent/BarberCalenderEvent';
import BarberCalenderList from './components/barber/BarberCalenderList/BarberCalenderList';
import BarberQueLists from './components/barber/BarberQueLists/BarberQueLists';
import SalonSettings from './components/Salon/SalonSettings/SalonSettings';
import Map from './components/Map/Map';


const Advertisement = React.lazy(() => import("./components/Advertisement/Advertisement"))

import EditAppointment from './components/Appoinment/EditAppointment/EditAppointment';
import AdminVerifyEmail from './components/VerifyEmail/AdminVerifyEmail';
import BarberUpdateProfile from './components/barber/BarberUpdateProfile/BarberUpdateProfile';
import CustomerEmail from './components/CustomerEmail/CustomerEmail';
import Kyosks from './components/kyosks/Kyosks';
import SingleBarberNotification from './components/barber/BarberNotification/SingleBarberNotification/SingleBarberNotification';
import MultipleBarberNotification from './components/barber/BarberNotification/MultipleBarberNotification/MultipleBarberNotification';
import AllBarberNotification from './components/barber/BarberNotification/AllBarberNotification/AllBarberNotification';
import BarberVerifyEmail from './components/barber/BarberverifyEmail/BarberVerifyEmail';
import Hello from './components/Hello';


import Signin from './components/newAuth/Admin/Signin/Signin';
import Signup from './components/newAuth/Admin/Signup/Signup';

import BarberSignin from "./components/newAuth/Barber/Signin/Signin"
import BarberSignup from "./components/newAuth/Barber/Signup/Signup"
import { useSelector } from 'react-redux';
import Test from './pages/Test';


import ProtectedAdminRoute from './components/ProtectedRoutes/Admin/ProtectedRoute';
import ProtectedAuthAdminRoute from './components/ProtectedRoutes/Admin/ProtectedAuthRoute';

import BarberProtectedroute from './components/ProtectedRoutes/Barber/ProtectedRoute'
import BarberProtectedAuthroute from './components/ProtectedRoutes/Barber/ProtectedAuthRoute'

const App = () => {
  const darkMode = useSelector(state => state.color.darkmode)

  console.log("Darkmode dashboard", darkMode)

  return (
    <BrowserRouter>
      <div style={{
        background: darkMode === "On" ? "var(--dark-primary-color)" : "var(--light-primary-color)"
      }} className="main-outer-div">
        <Routes>

          {/* <Route path="/hello" element={<Hello />} />

          <Route path="/" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <InitialPage />
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
          <Route path="/resetpassword/:token" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <ResetNewPassword />
            </Suspense>
          } />

          <Route path="/adminaccountdetail" element={<Auth><AdminAccountDetail /></Auth>} />
          <Route path="/barberaccountdetail" element={<BarberAuth><BarberAccountDetail /></BarberAuth>} />

          <Route path='/barber-dashboard' element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberAuth>
                <DashboardPage />
              </BarberAuth>
            </Suspense>
          } />


          <Route path='/barber-resetpassword' element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberResetPassword />
            </Suspense>
          } />
          <Route path="/barber-resetpassword/:token" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberResetNewPassword />
            </Suspense>
          } />


          <Route path="/barber/dashboard2" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth>
                <Dashboard2Page />
              </Auth>
            </Suspense>

          } />

          <Route path="/barber/updatebarber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><UpdateBarber /></Auth>
            </Suspense>

          } />

          <Route path="/barber/createbarber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><CreateBarber /></Auth>
            </Suspense>

          } />


          <Route path="/customer/customerform" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><CustomerformPage /></Auth>
            </Suspense>

          } />
          <Route path="/customer/dashboard3" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><Dashboard3Page /></Auth>
            </Suspense>

          } />

          <Route path="/customer/customeremail" element={<Auth><CustomerEmail /></Auth>} />


          {/* //BarberDashboard */}
          {/* <Route path="/barberdashboard" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><BarberDashboardPage /></Auth>
            </Suspense>

          } /> 

          <Route path="*" element={<h1>404 Page Not Found !!</h1>} />


          {/* Admin Signin 
          <Route path="/admin-signin" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Signin />
            </Suspense>} />


          <Route path="/admin-signup" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Signup />
            </Suspense>
          } />

          <Route path="/barber-signin" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberSignin />
            </Suspense>} />


          <Route path="/barber-signup" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <BarberSignup />
            </Suspense>
          } />

          <Route path='/admin-dashboard' element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth>
                <AdminDashboardPage />
              </Auth>
            </Suspense>
          } />

          <Route path="/admin/updateprofile" element={<Auth><UpdateAdminprofile /></Auth>} />
          <Route path="/barber/updateprofile" element={<BarberAuth><BarberUpdateProfile /></BarberAuth>} />

          <Route path="/salon/createsalon" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><CreateSalon /></Auth>
            </Suspense>

          } />

          <Route path="/salon/salonlist" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><SalonList /></Auth>
            </Suspense>

          } />

          <Route path="/salon/salonsettings" element={<Auth><SalonSettings /></Auth>} />

          <Route path="/salon/updateSalon" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><UpdateSalon /></Auth>
            </Suspense>

          } />

          <Route path="/queue" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><Queue /></Auth>
            </Suspense>

          } />

          <Route path="/queue/barberlist" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><QueuebarberList /></Auth>
            </Suspense>

          } />

          <Route path="/queue/barberlist/kyosks" element={<Auth><Kyosks /></Auth>} />
          <Route path="/map" element={<Test />} />

          {/* <Route path="/queue/barberservices/:barberid/:barbername" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><QueuebarberServices /></Auth>
            </Suspense>

          } /> 

          <Route path="/queue/selectservices" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><QueueselectServices /></Auth>
            </Suspense>

          } />

          <Route path="/queue/selectservicebarber/:serviceid" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><QueueselectBarber /></Auth>
            </Suspense>

          } />

          <Route path="/queue/group/customers" element={<Auth><GroupJoinCustomer /></Auth>} />
          <Route path="/queue/group/barberlist" element={<Auth><QueueGroupBarberList /></Auth>} />
          <Route path="/queue/group/barberservices/:barberid/:barbername" element={<Auth><QueueGroupBarberServices /></Auth>} />

          <Route path="/queue/autoqueservices" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><Queautojoinservices /></Auth>
            </Suspense>

          } />

          <Route path="/queue/mycustomer" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><MyCustomer /></Auth>
            </Suspense>

          } />

          <Route path='/barber/appoinment' element={<BarberAuth><BarberAppointment /></BarberAuth>} />
          <Route path="/barber/appoinment/calender" element={<BarberAuth><BarberCalenderEvent /></BarberAuth>} />
          <Route path="/barber/appoinment/calender/list" element={<BarberAuth><BarberCalenderList /></BarberAuth>} />

          <Route path="/barber/queuelist" element={<BarberAuth><BarberQueLists /></BarberAuth>} />

          <Route path="/appoinment" element={<Auth><Month /></Auth>} />
          <Route path="/appoinment/createappointment" element={<Auth><CreateAppointment /></Auth>} />
          <Route path="/appoinment/editappointment" element={<Auth><EditAppointment /></Auth>} />
          <Route path="/appoinment/calender" element={<Auth><CalenderEvent /></Auth>} />
          <Route path="/appoinment/calender/list" element={<Auth><CalenderList /></Auth>} />

          <Route path="/appoinment/abcd" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              {/* <Appoinment /> 
            </Suspense>

          } />

          <Route path="/appointment/barber" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><AppointBarber /></Auth>
            </Suspense>

          } />

          <Route path="/appointment/barberservices/:barberid/:barbername" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><AppointBarberServices /></Auth>
            </Suspense>

          } />

          <Route path="/appoinment/service" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><AppointSelectServices /></Auth>
            </Suspense>

          } />

          <Route path="/appointment/selectservicebarber/:serviceid" element={

            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Auth><AppointmentSelectBarber /></Auth>
            </Suspense>

          } />

          <Route path="/advertisement" element={<Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}><Auth><Advertisement /></Auth></Suspense>} />

          <Route path="/map" element={<Map />} />

          <Route path="/admin/verifyemailstatus" element={<Auth><AdminVerifyEmail /></Auth>} />
          <Route path="/barber/verifyemailstatus" element={<BarberAuth><BarberVerifyEmail /></BarberAuth>} />

          {/* Notification part  

          <Route path="/barber/dashboard2/singlenotification" element={<Auth>
            <SingleBarberNotification />
          </Auth>} />

          <Route path="/barber/dashboard2/multiplenotification" element={<Auth><MultipleBarberNotification /></Auth>} />

          <Route path="/barber/allnotification" element={<BarberAuth><AllBarberNotification /></BarberAuth>} /> */}


          {/* //Admin  402 ===========*/}

          {/* ADMIN AUTH ROUTES 404 ========== */}

          <Route element={<ProtectedAuthAdminRoute />}>

            <Route path="/admin-signin" element={
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Signin />
              </Suspense>} />


            <Route path="/admin-signup" element={
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Signup />
              </Suspense>
            } />

            <Route path="/adminaccountdetail" element={<AdminAccountDetail />} />

          </Route>

          <Route element={<ProtectedAdminRoute />}>
            <Route path='/admin-dashboard' element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>

                <AdminDashboardPage />
              </Suspense>
            } />

            <Route path="/admin/updateprofile" element={<UpdateAdminprofile />} />
            <Route path="/admin/verifyemailstatus" element={<AdminVerifyEmail />} />

            <Route path="/salon/salonlist" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <SalonList />
              </Suspense>

            } />

            <Route path="/salon/salonsettings" element={<SalonSettings />} />

            <Route path="/salon/createsalon" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <CreateSalon />
              </Suspense>

            } />

            <Route path="/salon/updateSalon" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <UpdateSalon />
              </Suspense>

            } />

            <Route path="/barber/dashboard2" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>

                <Dashboard2Page />

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

            <Route path="/barber/dashboard2/multiplenotification" element={<MultipleBarberNotification />} />

            <Route path="/customer/dashboard3" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Dashboard3Page />
              </Suspense>

            } />

            <Route path="/advertisement" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <Advertisement />
            </Suspense>} 
            />

            <Route path="/queue" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Queue />
              </Suspense>

            } />

            <Route path="/queue/group/customers" element={<GroupJoinCustomer />} />
            <Route path="/queue/barberlist/kyosks" element={<Kyosks />} />

            <Route path="/queue/autoqueservices" element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <Queautojoinservices />
              </Suspense>

            } />

            <Route path="/appoinment" element={<Month />} />

            <Route path="/appoinment/createappointment" element={<CreateAppointment />} />
            <Route path="/appoinment/editappointment" element={<EditAppointment />} />
            <Route path="/appoinment/calender" element={<CalenderEvent />} />
            <Route path="/appoinment/calender/list" element={<CalenderList />} />

          </Route>


          {/* BARBER ROUTES 512 ============ */}

          {/* BARBER AUTH ROUTES */}

          <Route element={<BarberProtectedAuthroute />}>

            <Route path="/barber-signin" element={
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <BarberSignin />
              </Suspense>} />


            <Route path="/barber-signup" element={
              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <BarberSignup />
              </Suspense>
            } />

            <Route path="/barberaccountdetail" element={<BarberAccountDetail />} />

          </Route>

          <Route element={<BarberProtectedroute />}>

            <Route path='/barber-dashboard' element={

              <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
                <DashboardPage />
              </Suspense>
            } />

            <Route path="/barber/updateprofile" element={<BarberUpdateProfile />} />
            <Route path="/barber/verifyemailstatus" element={<BarberVerifyEmail />} />
            <Route path="/barber/queuelist" element={<BarberQueLists />} />

            <Route path='/barber/appoinment' element={<BarberAppointment />} />
            <Route path="/barber/appoinment/calender" element={<BarberCalenderEvent />} />
            <Route path="/barber/appoinment/calender/list" element={<BarberCalenderList />} />

          </Route>


          <Route path="/" element={
            <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
              <InitialPage />
            </Suspense>
          } />
          <Route path="*" element={<h1>404 Page Not Found !!</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
