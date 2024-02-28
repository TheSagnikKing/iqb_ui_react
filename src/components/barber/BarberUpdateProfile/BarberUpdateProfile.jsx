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
    const [nickName, setNickName] = useState("")

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const navigate = useNavigate()

    const submitHandler = () => {
        const profiledata = {
            email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            nickName,
            mobileNumber,
            name,
            gender
        }

        dispatch(updateBarberAccountDetailsAction(profiledata, navigate))
    }

    // console.log(LoggedInMiddleware?.user[0]?.profile[0]?.url)

    const barberUpdateAccount = useSelector(state => state.barberUpdateAccount)
    const { loading } = barberUpdateAccount


    useEffect(() => {
        setNickName(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.nickName)
        setMobileNumber(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.mobileNumber)
        setName(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.name)
        setGender(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.gender)
        // setDob(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.dateOfBirth.split('T')[0])
    }, [LoggedInMiddleware?.user])


    const verifyEmailHandler = () => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            dispatch(barberVerifyEmailAction(navigate, {
                email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
            }))
        }
    }


    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <>
            <Layout />

            <div className={`ad-profile-wrapper ${currentmode && 'ad-profile-wrapper_dark'}`}>

                <div className="sa-br-right_main_head">
                    <h1 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Update Profile</h1>
                </div>

                <div className={`ad-profile-sa-br-right_main_form-update ${currentmode && 'ad-profile-sa-br-right_main_form-update_dark'}`}>

                    <div>
                        <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Email</h3>
                        <input
                            type="text"
                            value={LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email}
                        />
                        {
                            LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].emailVerified ? <div style={{
                                background: "limegreen",
                                color: "#fff",
                                border: "none",
                                boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                height: "3.5rem",
                                paddingInline: "1rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <p style={{ color: "#fff", fontSize: "1.6rem", fontWeight: "500" }}>Email verified</p>
                                <div style={{ background: "#fff", color: "#000", fontSize: "1.4rem", width: "2.5rem", height: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", boxShadow: "0px 0px 6px #fff", color: "limegreen" }}><FaCheck /></div>
                            </div> : <div
                                style={{
                                    background: "crimson",
                                    color: "#fff",
                                    border: "none",
                                    boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                    height: "3.5rem",
                                    paddingInline: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "pointer"
                                }}
                            ><p
                                style={{ color: "#fff", fontSize: "1.6rem", fontWeight: "500" }}
                                onClick={verifyEmailHandler}>Email Not Verified</p>
                                <div style={{ background: "#fff", color: "#000", fontSize: "1.4rem", width: "2.5rem", height: "2.5rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", boxShadow: "0px 0px 6px #fff", color: "crimson" }}><ImCross /></div></div>
                        }

                    </div>

                    <div>
                        <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}} htmlFor="">Nick Name</h3>
                        <input
                            type="text"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Mobile Number</h3>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Name</h3>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Choose gender</h3>

                        <select
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={{
                                background: currentmode ? "var(--dark-primary-color)" : "var(--light-tertiary-color)",
                                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Date of Birth</h3>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className={`sa-br-btn_box-up ${currentmode && 'sa-br-btn_box-up_dark'}`}>
                        <button onClick={submitHandler}>
                            {loading === true ? <ClipLoader /> : <p style={{ fontSize: "1.2rem",color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Submit</p>}
                        </button>
                    </div>

                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default BarberUpdateProfile