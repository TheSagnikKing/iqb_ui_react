import React, { useState } from 'react'
import "./AdminAccountDetail.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminAccountDetailsAction } from '../../redux/actions/AdminAuthAction'

const AdminAccountDetail = () => {

    const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
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

    return (
            <div className='admin_account_detail_container'>
                <div>
                    <h1>Fill Your Admin Account Details</h1>
                </div>
                <div className='admin_account_detail'>

                    {/* <div>
                        <label htmlFor="">Salon Id</label>
                        <input
                            type="text"
                        />
                    </div> */}

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
                        {/* <label htmlFor="">Gender</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        /> */}

                        <h2>Gender:</h2>

                        <select 
                        name="gender" 
                        id="gender" 
                        onChange={(e) => setGender(e.target.value)} 
                        value={gender}>
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
                        <button onClick={submitHandler}>
                            Submit
                        </button>
                    </div>

                    <button className='skip' onClick={skipHandler} style={{
                        marginTop:"1rem",
                        height:"3.5rem",
                    }}>Skip</button>
                </div>

            </div>
    )
}

export default AdminAccountDetail