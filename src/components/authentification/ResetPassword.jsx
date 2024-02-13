import React, { useEffect, useState } from 'react'
import './ResetPassword.css'
import { AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AdminForgetPasswordAction } from '../../redux/actions/AdminAuthAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

//This is sign-up page not sign-in

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resetEmailHandler = () => {
        if (!email) {
            alert("Please Enter Email")
        } else {
            dispatch(AdminForgetPasswordAction(email,navigate))
            // navigate("/verifyemail", { state: email })
        }
    }

    const AdminForgetPassword = useSelector(state => state.AdminForgetPassword)
    const {error:adminForgetError ,loading} = AdminForgetPassword

    console.log(adminForgetError?.message)

    useEffect(() => {
        if(adminForgetError){
            toast.error(adminForgetError?.message, {
                position: "top-right"
            });
        }

    },[adminForgetError])

    return (
            <main className="resetpassword">
                <div className="left">
                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                        alt="signup" />
                </div>

                <div className="right">
                    <div className="right_inner_container">

                        <div className="divone">
                            <h1>Reset your password</h1>
                            <p>Enter the email address associated your account and we will send you a link to reset your password</p>
                        </div>

                        <div className="divtwo">

                            <div className="input_container">
                                <div>
                                    <AiOutlineMail />
                                </div>
                                <input type="email" placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        { loading === true ? <button className="divthree"><ClipLoader color="white"/></button> : <button className="divthree"
                            onClick={resetEmailHandler}
                        >Continue</button>}
                        

                        <p className="divfour"><Link to="/admin-signin" style={{ color: "black", textDecoration: "none" }}><strong>Back to sign in</strong></Link></p>

                        <p className="divfive">Don't have an account? <Link to="/admin-signup" style={{ textDecoration: "none", color: "black" }}><strong>Sign Up</strong></Link></p>

                    </div>
                </div>

                <ToastContainer />
            </main>
    )
}

export default ResetPassword