import React, { useState } from 'react'
import "./AdminAccountDetail.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBarberSignupAccountDetailsAction } from '../../redux/actions/BarberAuthAction'
import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BarberAccountDetail = () => {

    const location = useLocation()
    const barberdata = location?.state?.newUser

    console.log(barberdata)

    const [nickName, setNickName] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("male")
    const [dob, setDob] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const submitHandler = () => {
        //email authentication  theke asbe
        const profiledata = { email:barberdata?.email, mobileNumber, name, gender, dateOfBirth: dob, salonId:barberdata?.salonId, nickName };
        
        dispatch(updateBarberSignupAccountDetailsAction(navigate, profiledata))

        console.log(profiledata)
    }

    const skipHandler = () => {
        const profiledata = { email: barberdata?.email, mobileNumber:"", name:"", gender:"", dateOfBirth:"", salonId:barberdata?.salonId };

        dispatch(updateBarberSignupAccountDetailsAction(navigate, profiledata))
    }

    const barberUpdateAccount = useSelector(state => state.barberUpdateAccount)
    const { loading } = barberUpdateAccount

    return (
        <div className='admin_account_detail_container'
            style={{ background: "none"}}
        >
            <div style={{ background: "#fff", padding: "2rem", borderRadius: "5px", boxShadow: "0px 0px 4px rgba(0,0,0,0.4)" }}>
                <div>
                    <h1 style={{ color: "#000" }}>Fill Your Barber Account Details</h1>
                </div>
                <div className='admin_account_detail'>

                    {/* <div>
                        <label htmlFor="">Salon Id</label>
                        <input
                            type="text"
                        />
                    </div> */}

                    <div>
                        <h3 style={{ color: "#000" }} htmlFor="">Nick Name</h3>
                        <input
                            type="text"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }} htmlFor="">Mobile Number</h3>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }} htmlFor="">Name</h3>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }}>Gender:</h3>

                        <select name="cars" id="cars" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <h3 style={{ color: "#000" }} htmlFor="">Date of Birth</h3>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className="sa-br-btn_box">
                        {
                            loading ? <button><ClipLoader /></button> : <button onClick={submitHandler}>
                                Submit
                            </button>
                        }

                    </div>

                    <button className='skip' onClick={skipHandler}>Skip</button>
                </div>

                <ToastContainer />
            </div>
        </div>
    )
}

export default BarberAccountDetail