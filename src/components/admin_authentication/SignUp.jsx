import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { RiErrorWarningLine } from 'react-icons/ri'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AdminGoogleloginAction, AdminRegisterAction } from '../../redux/actions/AdminAuthAction'
import { GoogleLogin } from '@react-oauth/google'

const SignUp = () => {

    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = async () => {
        try {
            if (!email) {
                alert("Email Required")
            } else if (!password) {
                alert("Password required")
            } else {
                const signupdata = { email, password }
                dispatch(AdminRegisterAction(signupdata, navigate))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const [activeTab, setActiveTab] = useState("Admin")

    const handleTabClick = (e, cityName) => {
        setActiveTab(cityName);
    };

     //Google Admin Action
     const responseMessage = async (response) => {
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <>
            <main className="signup">
                <div className="left">
                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                        alt="signup" />
                </div>
                <div className="right">
                    <div className="right_inner_container">

                        {/* Tab start ==== */}
                        <div className="tab-buttons">
                            <button
                                className={`tablinks ${activeTab === 'Admin' && 'active3'}`}
                                onClick={(e) => handleTabClick(e, 'Admin')}
                            >
                                Admin
                            </button>
                            <button
                                className={`tablinks ${activeTab === 'Barber' && 'active3'}`}
                                onClick={(e) => handleTabClick(e, 'Barber')}
                            >
                                Barber
                            </button>
                        </div>
                        {/* Tab end =====  */}

                        {/* Tab-Content start ==== */}

                        {
                            activeTab == "Admin" ? <>
                                <div className="divone">
                                    <h1>Sign Up Admin for an Account</h1>
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

                                    <div className="input_container_password">
                                        <div className="password_icon">
                                            <RiLockPasswordLine />
                                        </div>
                                        <input
                                            type={visible ? "text" : "password"}
                                            placeholder='Password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="password"
                                            style={{ border: error ? "1px solid red" : "" }}
                                        />
                                        <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                            {visible ? <BiShow /> : <BiHide />}
                                        </div>
                                    </div>

                                    <div className="error">
                                        <div>
                                            <RiErrorWarningLine />
                                        </div>
                                        <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                                    </div>

                                    <div className="input_container_end">

                                        <div style={{ color: "white", backgroundColor: check ? "black" : "" }}
                                            onClick={isChecked}>
                                            <BsCheckLg />
                                        </div>

                                        <p>By creating an account means you agree to the
                                            <span style={{ color: "black" }}> Terms & Conditions</span> and our <span style={{ color: "black" }}> Privacy Policy</span></p>
                                    </div>
                                </div>

                                <button className="divthree"
                                    onClick={submitHandler}
                                >Sign Up</button>

                                <div className="divfour">
                                    <div>

                                    </div>
                                    <p>Or sign in with</p>
                                    <div>

                                    </div>
                                </div>

                                <div className="divfive">
                                    <GoogleLogin
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                        size='large'
                                        shape='circle'
                                        width={400}
                                        logo_alignment='left'
                                        text='continue_with'
                                    />
                                </div>

                                <p className="divsix">Already have an account? <Link to="/admin-signin" className="link"><strong>Log In</strong></Link> </p>
                            </> : <>
                                <div className="divone">
                                    <h1>Sign Up Barber for an Account</h1>
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

                                    <div className="input_container_password">
                                        <div className="password_icon">
                                            <RiLockPasswordLine />
                                        </div>
                                        <input
                                            type={visible ? "text" : "password"}
                                            placeholder='Password'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            className="password"
                                            style={{ border: error ? "1px solid red" : "" }}
                                        />
                                        <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                            {visible ? <BiShow /> : <BiHide />}
                                        </div>
                                    </div>

                                    <div className="error">
                                        <div>
                                            <RiErrorWarningLine />
                                        </div>
                                        <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                                    </div>

                                    <div className="input_container_end">

                                        <div style={{ color: "white", backgroundColor: check ? "black" : "" }}
                                            onClick={isChecked}>
                                            <BsCheckLg />
                                        </div>

                                        <p>By creating an account means you agree to the
                                            <span style={{ color: "black" }}> Terms & Conditions</span> and our <span style={{ color: "black" }}> Privacy Policy</span></p>
                                    </div>
                                </div>

                                <button className="divthree"
                                    onClick={submitHandler}
                                >Sign Up</button>

                                <div className="divfour">
                                    <div>

                                    </div>
                                    <p>Or sign in with</p>
                                    <div>

                                    </div>
                                </div>

                                <div className="divfive">
                                    <div className="social_button" onClick={() => { }}>
                                        <div>
                                            <FcGoogle />
                                        </div>
                                        <p>Google</p>
                                    </div>

                                    <div className="social_button">
                                        <div>
                                            <BsFacebook />
                                        </div>
                                        <p>facebook</p>
                                    </div>
                                </div>

                                <p className="divsix">Already have an account? <Link to="/admin-signin" className="link"><strong>Log In</strong></Link> </p>
                            </>
                        }
                        {/* Tab-Content end ===== */}


                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp