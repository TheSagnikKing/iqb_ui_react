import React, { useEffect, useRef, useState } from 'react'
import "./UpdateAdminprofile.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { adminVerifyEmailAction, updateAdminAction } from '../../redux/actions/AdminAuthAction'
import { MdDelete } from 'react-icons/md'
import { FaCamera } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'

import ClipLoader from "react-spinners/ClipLoader";

const UpdateAdminprofile = () => {

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

        dispatch(updateAdminAction(profiledata,navigate))
    }

    // console.log(LoggedInMiddleware?.user[0]?.profile[0]?.url)


    useEffect(() => {
        // setUsername(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.userName)
        setMobileNumber(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.mobileNumber)
        setName(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.name)
        setGender(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.gender)
        // setDob(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.dateOfBirth.split('T')[0]) // split method ta disturb korche
    }, [LoggedInMiddleware?.user])


    const verifyEmailHandler = () => {
        const confirm = window.confirm("Are you sure ?")
        if(confirm){
            dispatch(adminVerifyEmailAction(navigate,{
                email:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
            }))
        }
    }

    const updateAdmin = useSelector(state => state.updateAdmin)
    const {loading} = updateAdmin

    return (
        <>
            <AdminLayout />
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
                            LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].emailVerified ? <button 
                            style={{
                                background:"limegreen",
                                color:"#fff",
                                border:"none",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                height:"3.5rem"
                            }}
                            >Email verified</button> : <button 
                            style={{
                                background:"crimson",
                                color:"#fff",
                                border:"none",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                height:"3.5rem",
                                cursor:"pointer"
                            }}
                            onClick={verifyEmailHandler}>Email Not Verified</button>
                        }
                        
                    </div>

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

                    <div >
                        <label for="gender"><h2>Choose gender</h2></label>

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
                        {loading === true ? <button><ClipLoader/></button> : <button onClick={submitHandler}>
                            Submit
                        </button>}
                        
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateAdminprofile