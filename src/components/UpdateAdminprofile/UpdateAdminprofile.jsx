import React, { useEffect, useRef, useState } from 'react'
import "./UpdateAdminprofile.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { adminVerifyEmailAction, updateAdminAction } from '../../redux/actions/AdminAuthAction'
import { MdDelete } from 'react-icons/md'
import { FaCamera } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'

const UpdateAdminprofile = () => {

    // const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const submitHandler = () => {
        const profiledata = {
            email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            // username,
            mobileNumber,
            name,
            gender
        }

        dispatch(updateAdminAction(profiledata))
    }

    // console.log(LoggedInMiddleware?.user[0]?.profile[0]?.url)


    useEffect(() => {
        // setUsername(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.userName)
        setMobileNumber(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.mobileNumber)
        setName(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.name)
        setGender(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.gender)
        setDob(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.dateOfBirth.split('T')[0])
    }, [LoggedInMiddleware?.user])

    const navigate = useNavigate()

    const verifyEmailHandler = () => {
        const confirm = window.confirm("Are you sure ?")
        if(confirm){
            dispatch(adminVerifyEmailAction(navigate,{
                email:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
            }))
        }
    }

    return (
        <>
            <AdminLayout />
            <div className="wrapper">

                <div className="sa-br-right_main_head">
                    <p>Crud</p>
                </div>

                <div className="sa-br-right_main_form-update">

                    <div>
                        <label htmlFor="">Email</label>
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
                                height:"25px"
                            }}
                            >Email verified</button> : <button 
                            style={{
                                background:"crimson",
                                color:"#fff",
                                border:"none",
                                boxShadow:"0px 0px 4px rgba(0,0,0,0.4)",
                                height:"25px",
                                cursor:"pointer"
                            }}
                            onClick={verifyEmailHandler}>Email Not Verified</button>
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
                        <label htmlFor="">Mobile Number</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label for="gender">Choose gender</label>

                        <select 
                        name="gender" 
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className="sa-br-btn_box-up">
                        <button onClick={submitHandler}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateAdminprofile