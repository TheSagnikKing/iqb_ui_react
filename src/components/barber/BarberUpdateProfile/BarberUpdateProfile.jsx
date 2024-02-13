import React, { useEffect, useState } from 'react'
import "./BarberUpdateProfile.css"
import Layout from '../../layout/Layout'
import { adminVerifyEmailAction, updateAdminAction } from '../../../redux/actions/AdminAuthAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";
import { barberVerifyEmailAction, updateBarberAccountDetailsAction } from '../../../redux/actions/BarberAuthAction'
import { FaCheck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BarberUpdateProfile = () => {

      // const [username, setUsername] = useState("")
      const [mobileNumber, setMobileNumber] = useState("")
      const [name, setName] = useState("")
      const [gender, setGender] = useState("")
      const [dob, setDob] = useState("")
  
      const dispatch = useDispatch()
  
      const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
      const navigate = useNavigate()
  
      const submitHandler = () => {
          const profiledata = {
              email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
              salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
              // username,
              mobileNumber,
              name,
              gender
          }
  
          dispatch(updateBarberAccountDetailsAction(profiledata,navigate))
      }
  
      // console.log(LoggedInMiddleware?.user[0]?.profile[0]?.url)

      const barberUpdateAccount = useSelector(state => state.barberUpdateAccount)
      const {loading} = barberUpdateAccount
  
  
      useEffect(() => {
          // setUsername(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.userName)
          setMobileNumber(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.mobileNumber)
          setName(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.name)
          setGender(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.gender)
          // setDob(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.dateOfBirth.split('T')[0])
      }, [LoggedInMiddleware?.user])
  
  
      const verifyEmailHandler = () => {
          const confirm = window.confirm("Are you sure ?")
          if(confirm){
              dispatch(barberVerifyEmailAction(navigate,{
                  email:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
              }))
          }
      }


  return (
    <>
    <Layout/>

    <div className="ad-profile-wrapper">

                <div className="sa-br-right_main_head">
                    <h1>Update Profile</h1>
                </div>

                <div className="ad-profile-sa-br-right_main_form-update">

                    <div>
                        <h2>Email</h2>
                        <input
                            type="text"
                            value={LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email}
                        />
                        {
                            LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].emailVerified ? <div style={{
                                background:"limegreen",
                                color:"#fff",
                                border:"none",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                height:"3.5rem",
                                paddingInline:"1rem",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between"
                            }}>
                            <p style={{color:"#fff",fontSize:"1.6rem",fontWeight:"500"}}>Email verified</p>
                            <div style={{background:"#fff",color:"#000",fontSize:"1.4rem",width:"2.5rem",height:"2.5rem",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",boxShadow:"0px 0px 6px #fff",color:"limegreen"}}><FaCheck /></div>
                            </div> : <div
                             style={{
                                background:"crimson",
                                color:"#fff",
                                border:"none",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                height:"3.5rem",
                                paddingInline:"1rem",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-between",
                                cursor:"pointer"
                            }}
                            ><p 
                            style={{color:"#fff",fontSize:"1.6rem",fontWeight:"500"}}
                            onClick={verifyEmailHandler}>Email Not Verified</p>
                            <div style={{background:"#fff",color:"#000",fontSize:"1.4rem",width:"2.5rem",height:"2.5rem",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"50%",boxShadow:"0px 0px 6px #fff",color:"crimson"}}><ImCross /></div></div>
                        }
                        
                    </div>

                    {/* <div>
                        <label htmlFor="">User Name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div> */}

                    <div>
                        <h2>Mobile Number</h2>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Name</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2>Choose gender</h2>

                        <select 
                        name="gender" 
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <h2>Date of Birth</h2>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className="sa-br-btn_box-up">
                        <button onClick={submitHandler}>
                            {loading === true ? <ClipLoader/> : <p style={{fontSize:"1.2rem"}}>Submit</p>}
                        </button>
                    </div>

                </div>

                <ToastContainer />
            </div>
    </>
  )
}

export default BarberUpdateProfile