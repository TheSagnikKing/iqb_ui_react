import React, { useState } from 'react'
import './ResetPassword.css'
import { AiOutlineMail } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { passwordResetEmailAction } from '../../redux/actions/userAction'

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
            dispatch(passwordResetEmailAction(email))
            navigate("/verifyemail", { state: email })
        }
    }

    return (
        <>
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

                        <button className="divthree"
                            onClick={resetEmailHandler}
                        >Continue</button>

                        <p className="divfour"><Link to="/signin" style={{ color: "black", textDecoration: "none" }}><strong>Back to sign in</strong></Link></p>

                        <p className="divfive">Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "black" }}><strong>Sign Up</strong></Link></p>

                    </div>
                </div>
            </main>
        </>
    )
}

export default ResetPassword