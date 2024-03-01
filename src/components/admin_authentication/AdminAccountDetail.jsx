import React, { useState } from 'react'
import "./AdminAccountDetail.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminAccountDetailsAction } from '../../redux/actions/AdminAuthAction'
import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminAccountDetail = () => {
    
    const location = useLocation()
    const admindata = location?.state?.newUser

    const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("male")
    const [dob, setDob] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = () => {
        //email authentication  theke asbe
        const profiledata = { email: admindata?.email, mobileNumber, name, gender, dateOfBirth: dob, salonId:admindata?.salonId };

        dispatch(updateAdminAccountDetailsAction(navigate, profiledata))

    }

    const skipHandler = () => {

        // For the skip dispatch the same action with all fields empty and say arghay to remove the field validation here

        const profiledata = { email: admindata?.email, mobileNumber:"", name:"", gender:"", dateOfBirth:"", salonId:admindata?.salonId };

        dispatch(updateAdminAccountDetailsAction(navigate, profiledata)) 

    }

    const updateAdminAccountDetails = useSelector(state => state.updateAdminAccountDetails)
    const { loading } = updateAdminAccountDetails

    const darkMode = useSelector(state => state.color.darkmode)

    const currentmode = darkMode === "On"

    return (
        <div className='admin_account_detail_container'
            style={{ background: "none", padding: "10rem" }}
        >

            <div style={{ background: "#fff", padding: "2rem", borderRadius: "5px", boxShadow: "0px 0px 4px rgba(0,0,0,0.4)" }}>
                <div>
                    <h1 style={{ color: "#000" }}>Fill Your Admin Account Details</h1>
                </div>
                <div className='admin_account_detail'>

                    <div>
                        <h3 style={{ color: "#000" }}>Mobile Number</h3>
                        <input
                            type="text"
                            placeholder='Enter Mobile Number'
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }}>Name</h3>
                        <input
                            type="text"
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>

                        <h3 style={{ color: "#000" }}>Gender:</h3>

                        <select name="cars" id="cars" onChange={(e) => setGender(e.target.value)} value={gender} style={{ background: "#f1f6fc", border: "1px solid black" }}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }}>Date of Birth</h3>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className="sa-br-btn_box">
                        {
                            loading === true ? <button><ClipLoader /></button> : <button onClick={submitHandler}>
                                Submit
                            </button>
                        }

                    </div>

                    <button className='skip' onClick={skipHandler} style={{
                        marginTop: "1rem",
                        height: "3.5rem",
                    }}>Skip</button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AdminAccountDetail