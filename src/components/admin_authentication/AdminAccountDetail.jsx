import React, { useState } from 'react'
import "./AdminAccountDetail.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminAccountDetailsAction } from '../../redux/actions/AdminAuthAction'
import ClipLoader from "react-spinners/ClipLoader";

const AdminAccountDetail = () => {

    const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("male")
    const [dob, setDob] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const submitHandler = () => {
        //email authentication  theke asbe
        const profiledata = { email: LoggedInMiddleware?.user[0]?.email, mobileNumber, name, gender, dateOfBirth: dob, salonId: LoggedInMiddleware?.user[0]?.salonId, userName: username };

        dispatch(updateAdminAccountDetailsAction(navigate, profiledata))
    }

    const skipHandler = () => {
        navigate("/admin-dashboard")
    }

    const updateAdminAccountDetails = useSelector(state => state.updateAdminAccountDetails)
    const { loading } = updateAdminAccountDetails

    return (
        <div className='admin_account_detail_container'>
            <div>
                <h1>Fill Your Admin Account Details</h1>
            </div>
            <div className='admin_account_detail'>

                <div>
                    <h2>Mobile Number</h2>
                    <input
                        type="text"
                        placeholder='Enter Mobile Number'
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </div>

                <div>
                    <h2>Name</h2>
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>

                    <h2>Gender:</h2>

                    <select name="cars" id="cars" onChange={(e) => setGender(e.target.value)} value={gender} style={{background:"#f1f6fc",border:"1px solid black"}}>
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

        </div>
    )
}

export default AdminAccountDetail